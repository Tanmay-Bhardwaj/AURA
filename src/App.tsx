/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CommandBridge from './pages/CommandBridge';
import GuestDNA from './pages/GuestDNA';
import SpatialEngine from './pages/SpatialEngine';
import EmpathyEngine from './pages/EmpathyEngine';
import PARIntelligence from './pages/PARIntelligence';
import RevenueIntelligence from './pages/RevenueIntelligence';
import CulturalIntelligence from './pages/CulturalIntelligence';
import IntegrationLayer from './pages/IntegrationLayer';
import PrivacySovereignty from './pages/PrivacySovereignty';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CommandBridge />} />
          <Route path="guest-dna" element={<GuestDNA />} />
          <Route path="spatial" element={<SpatialEngine />} />
          <Route path="empathy" element={<EmpathyEngine />} />
          <Route path="par" element={<PARIntelligence />} />
          <Route path="revenue" element={<RevenueIntelligence />} />
          <Route path="cultural" element={<CulturalIntelligence />} />
          <Route path="privacy" element={<PrivacySovereignty />} />
          <Route path="integration" element={<IntegrationLayer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
