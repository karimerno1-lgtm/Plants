export interface ToolMeta {
  slug: string;
  name: string;
  shortTitle: string;
  tagline: string;
  description: string;
  category: 'Hydration' | 'Environment' | 'Repotting & Soil' | 'Nutrition' | 'Diagnostics' | 'Propagation';
  icon: string; // Lucide icon name
  badge?: string;
  schemaType: 'SoftwareApplication' | 'WebApplication';
}

export const TOOLS_DATA: ToolMeta[] = [
  {
    slug: 'plant-watering-calculator',
    name: 'Plant Watering Calculator',
    shortTitle: 'Watering Calculator',
    tagline: 'Calculate dynamic soil drying intervals and tailored moisture checks',
    description: 'Calculates realistic watering frequencies based on species, pot material, soil drainage, room temperature, light levels, and seasonal growth cycles. Never rely on rigid calendar watering again.',
    category: 'Hydration',
    icon: 'Droplets',
    badge: 'Most Popular',
    schemaType: 'WebApplication'
  },
  {
    slug: 'plant-light-finder',
    name: 'Plant Light Finder & Foot-Candle Calculator',
    shortTitle: 'Light Finder',
    tagline: 'Match plants to window directions, lux, and distance from light',
    description: 'Determine exact usable foot-candles and lux in your space based on window orientation, distance from glass, and sheer obstructions. Get matched with plants that flourish in your exact lighting conditions.',
    category: 'Environment',
    icon: 'Sun',
    badge: 'Essential',
    schemaType: 'WebApplication'
  },
  {
    slug: 'pot-size-calculator',
    name: 'Pot Size & Volume Calculator',
    shortTitle: 'Pot Size Calculator',
    tagline: 'Determine proper container upgrade sizing and required soil volume',
    description: 'Calculates the scientifically safe pot diameter upgrade and required potting mix volume in liters/quarts based on current container size, root density, and plant vigor.',
    category: 'Repotting & Soil',
    icon: 'Box',
    schemaType: 'WebApplication'
  },
  {
    slug: 'soil-mix-calculator',
    name: 'Chunky Soil Mix Recipe Calculator',
    shortTitle: 'Soil Mix Calculator',
    tagline: 'Calculate custom ingredient ratios for aroids, succulents, and ferns',
    description: 'Customizes component ratios (bark, perlite, pumice, coco coir, worm castings) for 6 plant families and converts desired pot batch sizes into exact cups and liters.',
    category: 'Repotting & Soil',
    icon: 'Layers',
    badge: 'Horticulturist Pick',
    schemaType: 'WebApplication'
  },
  {
    slug: 'fertilizer-calculator',
    name: 'Fertilizer Dilution & Routine Calculator',
    shortTitle: 'Fertilizer Calculator',
    tagline: 'Precise dilution ratios, NPK balance, and seasonal schedules',
    description: 'Calculates accurate fertilizer concentrate dilution in milliliters, teaspoons, and drops for any watering can volume based on formulation strength and the "weakly weekly" method.',
    category: 'Nutrition',
    icon: 'FlaskConical',
    schemaType: 'WebApplication'
  },
  {
    slug: 'plant-problem-checker',
    name: 'Plant Problem Checker & Symptom Diagnostic',
    shortTitle: 'Problem Checker',
    tagline: 'Identify root causes of yellow leaves, brown spots, and wilting',
    description: 'Interactive symptom triage engine. Analyzes leaf symptoms, location on plant, watering history, and light exposure to identify high-probability issues like root rot, edema, light scorch, or nutrient deficiency.',
    category: 'Diagnostics',
    icon: 'Activity',
    badge: 'Diagnostic Tool',
    schemaType: 'WebApplication'
  },
  {
    slug: 'plant-humidity-calculator',
    name: 'Plant Humidity & VPD Calculator',
    shortTitle: 'Humidity & VPD Calculator',
    tagline: 'Assess transpiration pressure and calculate vapor pressure deficit',
    description: 'Evaluates indoor relative humidity and room temperature to calculate ambient Vapor Pressure Deficit (VPD). Provides tailored humidity-raising techniques tailored to high-transpiration tropicals.',
    category: 'Environment',
    icon: 'Gauge',
    schemaType: 'WebApplication'
  },
  {
    slug: 'plant-propagation-guide',
    name: 'Plant Propagation Timeline & Cutting Guide',
    shortTitle: 'Propagation Timeline',
    tagline: 'Interactive cutting protocols, water change reminders, and root timelines',
    description: 'Generates step-by-step node cutting guides, expected root emergence timelines in days, water change intervals, and soil transition criteria for dozens of houseplant varieties.',
    category: 'Propagation',
    icon: 'Scissors',
    badge: 'Interactive',
    schemaType: 'WebApplication'
  }
];
