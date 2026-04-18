// src/lib/revenueIntelligenceQueue.ts

export interface EnvironmentalTrigger {
  stormSeverity: number; // 0-10
  powerOutageProbability: number; // 0-1
  eventMagnitude: number; // 0-10
  flightCancellationRate: number; // percentage 0-100
}

export interface EmergencyPricingResult {
  isEmergencyDeclaerd: boolean;
  heldRooms: number;
  premiumRate: number;
  baseRate: number;
  projectedRevenueLift: number; // How much extra money this AI action makes
}

export interface WaitlistGuest {
  id: string;
  name: string;
  priorityScore: number;
  timeAdded: number; // timestamp
}

/**
 * 1. AI-Driven Emergency Holdback Logic (Core Trigger)
 * Analyzes environmental chaos factors to automatically trigger "Emergency Demand Mode".
 */
export function evaluateEmergencyTriggers(
  data: EnvironmentalTrigger, 
  totalAvailableGeneralInventory: number
): { isEmergency: boolean; roomsToHold: number } {
  // AI Logic: Weight the environmental factors
  const riskScore = 
    (data.stormSeverity * 1.5) + 
    (data.powerOutageProbability * 20) + 
    (data.eventMagnitude * 1.0) + 
    (data.flightCancellationRate * 0.5);

  // Threshold for declaring an emergency demand spike
  if (riskScore > 35) {
    // 15% of total remaining standard inventory is held back for emergencies
    const holdbackCount = Math.ceil(totalAvailableGeneralInventory * 0.15);
    return { isEmergency: true, roomsToHold: holdbackCount };
  }

  return { isEmergency: false, roomsToHold: 0 };
}

/**
 * 2. Revenue Intel Integration: Dynamic Premium Pricing
 * Calculates a premium price based on scarcity and environmental severity,
 * tracking extra revenue generated vs standard pricing.
 */
export function calculateEmergencyPremiumPricing(
  baseRate: number,
  severityScore: number,
  marketElasticity: number // 0-1, 1 means highly elastic (will pay anything)
): EmergencyPricingResult {
  // Base mathematical logic for scarcity + panic pricing
  // Premium Multiplier = 1 + (Severity/100) * Elasticity 
  // Max multiplier capped at 3.5x to prevent extreme gouging while maximizing yield.
  let multiplier = 1 + (severityScore / 100) * marketElasticity * 2.5; 
  if (multiplier > 3.5) multiplier = 3.5;
  if (multiplier < 1) multiplier = 1;

  const premiumRate = Math.round(baseRate * multiplier);
  const revenueLift = premiumRate - baseRate;

  return {
    isEmergencyDeclaerd: severityScore > 35,
    heldRooms: 0, // Injected downstream
    baseRate,
    premiumRate,
    projectedRevenueLift: revenueLift
  };
}

/**
 * 3. Intelligent Booking Queues
 * Queue structure for waitlist guests.
 */
export class EmergencyBookingQueue {
  private queue: WaitlistGuest[] = [];

  enqueue(guest: Omit<WaitlistGuest, 'timeAdded'>) {
    this.queue.push({
      ...guest,
      timeAdded: Date.now()
    });

    // Rank strictly by AI priority score (e.g., stranded CIPs get higher score)
    this.queue.sort((a, b) => b.priorityScore - a.priorityScore);
  }

  dequeue(): WaitlistGuest | undefined {
    return this.queue.shift();
  }

  getQueue(): WaitlistGuest[] {
    return [...this.queue];
  }

  getQueueLength(): number {
    return this.queue.length;
  }
}

export interface RoomOffer {
  guestId: string;
  guestName: string;
  assignedRoomId: string;
  offeredPremiumRate: number;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'EXPIRED';
  timestamp: number;
}

export class IntelligentQueueManager {
  private queue: EmergencyBookingQueue;
  private heldRoomsQueue: string[]; // List of room IDs reserved for emergencies
  private activeOffers: Map<string, RoomOffer>; // guestId -> RoomOffer
  private baseRate: number;
  private currentSeverityScore: number;

  constructor(queue: EmergencyBookingQueue, heldRooms: string[], baseRate: number, severityScore: number) {
    this.queue = queue;
    this.heldRoomsQueue = heldRooms;
    this.activeOffers = new Map();
    this.baseRate = baseRate;
    this.currentSeverityScore = severityScore;
  }

  /**
   * Autonomous AI Management: 
   * Polls the queue and matches highest-priority guests directly to available held rooms.
   */
  processQueue(marketElasticity: number = 0.8): RoomOffer[] {
    const newOffers: RoomOffer[] = [];
    
    // As long as there are held rooms AND people in the queue, systematically assign them
    while (this.heldRoomsQueue.length > 0 && this.queue.getQueueLength() > 0) {
      const topGuest = this.queue.dequeue();
      const availableRoom = this.heldRoomsQueue.shift();

      if (topGuest && availableRoom) {
         // Dynamically calculate the EXACT premium price based on AI scarcity metrics at this specific moment
         const pricingResult = calculateEmergencyPremiumPricing(
             this.baseRate, 
             this.currentSeverityScore, 
             marketElasticity
         );

         const offer: RoomOffer = {
             guestId: topGuest.id,
             guestName: topGuest.name,
             assignedRoomId: availableRoom,
             offeredPremiumRate: pricingResult.premiumRate,
             status: 'PENDING',
             timestamp: Date.now()
         };

         this.activeOffers.set(topGuest.id, offer);
         newOffers.push(offer);
      }
    }
    
    return newOffers;
  }

  // Method to mock user response to the AI's offer
  handleOfferResponse(guestId: string, response: 'ACCEPTED' | 'DECLINED'): void {
      const offer = this.activeOffers.get(guestId);
      if (offer && offer.status === 'PENDING') {
          offer.status = response;
          // If declined, push the room back into the pool for the next person
          if (response === 'DECLINED') {
              this.heldRoomsQueue.push(offer.assignedRoomId);
              // Trigger a re-process of the queue
              this.processQueue();
          }
      }
  }
}

