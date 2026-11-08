/**
 * Google AdSense Official Configuration for PlantCare Lab
 */

export const ADSENSE_CONFIG = {
  PUBLISHER_ID: 'ca-pub-3618365568004987',
  SLOTS: {
    // Ad Unit 1 — Multiplex / Auto Relaxed
    MULTIPLEX: '4040739123',
    // Ad Unit 2 — Responsive Display Advertisement
    RESPONSIVE_DISPLAY: '2283795165',
  },
  // In development, we can test safely or render placeholder if blocked
  ENABLED: true,
  DEBUG: process.env.NODE_ENV === 'development',
} as const;

export type AdSlotType = 'responsive' | 'multiplex';
