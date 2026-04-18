// src/lib/inventoryIntelligence.ts

export interface EnvironmentData {
  localWeather: string;
  regionalSentiment: number; // 0.0 to 1.0
  flightCancellations: number;
}

export interface MarketDemand {
  competitorOccupancy: number; // 0.0 to 1.0
  eventImpact: 'None' | 'Moderate' | 'Extreme';
  searchVelocity: number; // Searches per minute in the region
}

export interface HoldbackDecision {
  status: 'Normal' | 'Lockdown';
  heldRooms: number;
  reasoning: string;
}

export interface PricingDecision {
  basePrice: number;
  premiumMultiplier: number;
  finalPrice: number;
  urgencyScarcityIndex: number;
}

/**
 * 1. Strategic Inventory Holdback & 4. Data Analysis
 * Analyzes environmental and market data to determine how many rooms to hold back 
 * for urgent-need customers during extreme events.
 */
export function calculateInventoryHoldback(
  env: EnvironmentData, 
  demand: MarketDemand, 
  totalVacantRooms: number
): HoldbackDecision {
  // Data Analysis AI Logic:
  // We evaluate the severity of external factors (e.g., flight cancellations, bad weather events)
  let severityScore = 0;
  
  if (env.flightCancellations > 50) severityScore += 3;
  if (env.flightCancellations > 200) severityScore += 2; // Extra penalty
  if (env.localWeather === 'Storm' || env.localWeather === 'Hurricane') severityScore += 4;
  if (demand.eventImpact === 'Extreme') severityScore += 3;
  if (demand.searchVelocity > 100) severityScore += 2;

  // Strategic Holdback Logic:
  if (severityScore >= 7) {
    // High urgency detected. Lock 40% of remaining inventory for premium/urgent requests
    const lockCount = Math.floor(totalVacantRooms * 0.4);
    return {
      status: 'Lockdown',
      heldRooms: lockCount,
      reasoning: `Extreme conditions detected (Score: ${severityScore}). Holding ${lockCount} rooms for urgent-need overflow.`
    };
  }

  return {
    status: 'Normal',
    heldRooms: 0,
    reasoning: 'Standard operating conditions. No strategic holdback engaged.'
  };
}

/**
 * 2. Dynamic Pricing
 * Calculates the premium price for held-back rooms based on real-time scarcity.
 */
export function calculatePremiumPricing(
  basePrice: number, 
  availableHeldRooms: number, 
  queueSize: number
): PricingDecision {
  // Urgency-Scarcity Index (USI) = (Queue Size / Available Held Rooms)
  // If queue is much larger than available rooms, USI increases.
  const scarcityIndex = availableHeldRooms > 0 ? (queueSize / availableHeldRooms) : queueSize;
  
  // AI Pricing Logic: Exponential premium scaling based on scarcity
  // Premium starts at 1.5x and scales up to 4.0x max dynamically.
  let multiplier = 1.0;
  
  if (scarcityIndex > 0) {
    multiplier = Math.min(1.5 + (scarcityIndex * 0.5), 4.0);
  }

  return {
    basePrice,
    premiumMultiplier: multiplier,
    finalPrice: Math.round(basePrice * multiplier),
    urgencyScarcityIndex: scarcityIndex
  };
}

/**
 * 3. Booking Queues
 * Intelligent waitlist management logic to add users and fulfill them when rooms release.
 */
export class BookingQueueManager {
  private queue: Array<{ guestId: string, timestamp: number, priorityScore: number }> = [];

  // Add guest to intelligent waitlist, scoring their priority based on their history or urgency
  enqueue(guestId: string, isVIP: boolean = false) {
    const priorityScore = isVIP ? 100 : 10;
    this.queue.push({ guestId, timestamp: Date.now(), priorityScore });
    
    // Sort queue by priority first, then by wait time
    this.queue.sort((a, b) => {
      if (b.priorityScore !== a.priorityScore) {
        return b.priorityScore - a.priorityScore;
      }
      return a.timestamp - b.timestamp;
    });
  }

  dequeue() {
    return this.queue.shift();
  }

  getQueueSize() {
    return this.queue.length;
  }

  getQueue() {
    return [...this.queue];
  }
}
