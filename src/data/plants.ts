export interface PlantDetail {
  slug: string;
  name: string;
  botanicalName: string;
  family: string;
  origin: string;
  category: 'Aroid' | 'Succulent' | 'Foliage' | 'Tree' | 'Flowering';
  difficulty: 'Beginner' | 'Easy' | 'Moderate' | 'Advanced';
  imageUrl: string;
  imageAlt: string;
  summary: string;
  light: {
    ideal: string;
    footCandles: string;
    exposure: string;
    placement: string;
  };
  watering: {
    frequency: string;
    soilCheck: string;
    winterAdjustment: string;
    tapWaterSensitivity: boolean;
  };
  humidity: {
    recommended: string;
    minimum: string;
    idealRange: [number, number];
  };
  temperature: {
    rangeF: string;
    rangeC: string;
    hardinessMinF: number;
  };
  soil: {
    mixType: string;
    recipe: string;
    drainageNeeds: string;
  };
  fertilizer: {
    npkRatio: string;
    schedule: string;
    winterPause: boolean;
  };
  petToxicity: {
    toxicToDogs: boolean;
    toxicToCats: boolean;
    toxicPrinciple: string;
    aspcaNotes: string;
  };
  propagation: {
    method: string;
    timeline: string;
    medium: string;
  };
  commonProblems: Array<{
    symptom: string;
    cause: string;
    solution: string;
  }>;
  faqs: Array<{
    q: string;
    a: string;
  }>;
  relatedToolSlugs: string[];
}

export const PLANTS_DATA: PlantDetail[] = [
  {
    slug: 'monstera-deliciosa',
    name: 'Monstera Deliciosa',
    botanicalName: 'Monstera deliciosa',
    family: 'Araceae',
    origin: 'Tropical rainforests of Southern Mexico and Central America',
    category: 'Aroid',
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Vibrant Monstera Deliciosa with iconic fenestrated foliage in a modern living space',
    summary: 'The iconic Swiss Cheese Plant celebrated for its architectural fenestrations, rapid vigorous growth, and ease of indoor care.',
    light: {
      ideal: 'Bright, indirect sunlight',
      footCandles: '200 to 500 FC',
      exposure: 'East-facing window or 3–6 feet back from a South/West window with sheer filtration.',
      placement: 'Avoid direct scorching afternoon sun which bleaches and crisps foliage.'
    },
    watering: {
      frequency: 'Every 7–10 days during warm months; 14–18 days in winter dormancy.',
      soilCheck: 'Allow top 2–3 inches (5–7 cm) of soil to dry completely before drenching thoroughly.',
      winterAdjustment: 'Reduce frequency by roughly 40% when daylight hours shorten.',
      tapWaterSensitivity: false
    },
    humidity: {
      recommended: '55% – 70%',
      minimum: '40%',
      idealRange: [50, 75]
    },
    temperature: {
      rangeF: '65°F to 85°F',
      rangeC: '18°C to 29°C',
      hardinessMinF: 55
    },
    soil: {
      mixType: 'Chunky Aroid Mix',
      recipe: '40% Coco Coir, 30% Orchid Bark, 20% Perlite, 10% Worm Castings.',
      drainageNeeds: 'Mandatory drainage holes; roots rot rapidly in stagnant water.'
    },
    fertilizer: {
      npkRatio: 'Balanced 20-20-20 or Nitrogen-rich 3-1-2',
      schedule: 'Dilute to half-strength every 2–3 weeks from April to September.',
      winterPause: true
    },
    petToxicity: {
      toxicToDogs: true,
      toxicToCats: true,
      toxicPrinciple: 'Insoluble calcium oxalate crystals',
      aspcaNotes: 'Ingestion causes intense oral burning, excessive drooling, vomiting, and difficulty swallowing. Keep elevated from curious pets.'
    },
    propagation: {
      method: 'Stem cutting with at least one viable node and aerial root',
      timeline: 'Roots develop in water within 3–4 weeks at 72°F+.',
      medium: 'Filtered water or damp sphagnum moss.'
    },
    commonProblems: [
      {
        symptom: 'Yellowing lower leaves with black mushy stems',
        cause: 'Overwatering causing early fungal root rot (Pythium).',
        solution: 'Inspect root system, prune darkened squishy roots, and transfer to aerated aroid medium.'
      },
      {
        symptom: 'Crispy brown leaf edges or unfurling torn leaves',
        cause: 'Low ambient humidity below 40% or dry air from heating vents.',
        solution: 'Group with other plants or introduce an evaporative humidifier.'
      },
      {
        symptom: 'Small non-split foliage without fenestrations',
        cause: 'Insufficient light levels or young vine stage.',
        solution: 'Move closer to bright indirect light and provide a sturdy coco-coir or moss pole.'
      }
    ],
    faqs: [
      {
        q: 'Why are my Monstera leaves not splitting?',
        a: 'Fenestrations (leaf holes) require bright indirect light and plant maturity. Give it 200–400 foot-candles of light and support with a moss pole.'
      },
      {
        q: 'What should I do with Monstera aerial roots?',
        a: 'You can tuck them back into the potting soil to absorb nutrients, train them onto a moss pole, or trim them cleanly with sterilized shears.'
      }
    ],
    relatedToolSlugs: ['plant-watering-calculator', 'soil-mix-calculator', 'plant-light-finder']
  },
  {
    slug: 'pothos',
    name: 'Golden Pothos',
    botanicalName: 'Epipremnum aureum',
    family: 'Araceae',
    origin: 'Mo’orea, Society Islands (French Polynesia)',
    category: 'Aroid',
    difficulty: 'Beginner',
    imageUrl: 'https://images.unsplash.com/photo-1596724817758-009772c67699?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Cascading Golden Pothos vine with heart-shaped variegated leaves',
    summary: 'The ultimate forgiving indoor vine. Adapts to varied light, cleans indoor air, and thrives with minimal maintenance.',
    light: {
      ideal: 'Medium to bright indirect light; tolerates low light',
      footCandles: '75 to 250 FC',
      exposure: 'North or East-facing window, or under office fluorescent lighting.',
      placement: 'Tolerates low light, but golden variegation fades in deep shade.'
    },
    watering: {
      frequency: 'Every 7–12 days depending on warmth and pot volume.',
      soilCheck: 'Wait until the top 50% of the potting medium feels dry to the touch.',
      winterAdjustment: 'Allow entire rootball to dry slightly; leaves will droop softly when thirsty.',
      tapWaterSensitivity: false
    },
    humidity: {
      recommended: '40% – 60%',
      minimum: '30%',
      idealRange: [40, 65]
    },
    temperature: {
      rangeF: '60°F to 85°F',
      rangeC: '15°C to 29°C',
      hardinessMinF: 50
    },
    soil: {
      mixType: 'Standard Well-Draining Potting Mix',
      recipe: '60% Peat/Coco Coir, 25% Perlite, 15% Compost or bark chips.',
      drainageNeeds: 'Essential drainage to prevent standing soggy soil.'
    },
    fertilizer: {
      npkRatio: '10-10-10 Balanced Liquid',
      schedule: 'Once monthly during active spring/summer growth.',
      winterPause: true
    },
    petToxicity: {
      toxicToDogs: true,
      toxicToCats: true,
      toxicPrinciple: 'Insoluble calcium oxalates',
      aspcaNotes: 'Mild to moderate oral irritation and vomiting. Ideal for hanging planters out of reach.'
    },
    propagation: {
      method: 'Single-node vine cuttings in water',
      timeline: 'Roots visible within 10–14 days.',
      medium: 'Tap water, perlite, or directly in moist soil.'
    },
    commonProblems: [
      {
        symptom: 'Drooping, limp leaves that perk up after watering',
        cause: 'Underwatering or root dehydration.',
        solution: 'Give a deep bottom-soaking until substrate is evenly moistened.'
      },
      {
        symptom: 'Yellowing leaves accompanied by moist soil',
        cause: 'Overwatering and root hypoxia.',
        solution: 'Let soil dry out thoroughly between waterings and verify pot drainage.'
      }
    ],
    faqs: [
      {
        q: 'Can Golden Pothos grow in pure water forever?',
        a: 'Yes, Pothos can survive in water culture for years if given occasional hydroponic nutrients, though soil growth produces sturdier vines.'
      }
    ],
    relatedToolSlugs: ['plant-watering-calculator', 'plant-propagation-guide', 'plant-light-finder']
  },
  {
    slug: 'snake-plant',
    name: 'Snake Plant',
    botanicalName: 'Dracaena trifasciata',
    family: 'Asparagaceae',
    origin: 'Tropical West Africa from Nigeria east to the Congo',
    category: 'Succulent',
    difficulty: 'Beginner',
    imageUrl: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Architectural upright Snake Plant in a ceramic pot',
    summary: 'Virtually indestructible architectural succulent with upright sword-like foliage. Exceptional drought tolerance and nighttime oxygen release.',
    light: {
      ideal: 'Adaptable: from low light to direct morning sunlight',
      footCandles: '50 to 400 FC',
      exposure: 'Thrives anywhere from dim hallways to bright south balconies.',
      placement: 'One of the rare indoor plants that handles both low shade and sunny windowsills.'
    },
    watering: {
      frequency: 'Every 2–4 weeks in summer; once every 4–6 weeks in winter.',
      soilCheck: 'Ensure the soil is 100% bone dry throughout the entire pot depth before watering.',
      winterAdjustment: 'Nearly stop watering in cold rooms; water once every 6–8 weeks.',
      tapWaterSensitivity: false
    },
    humidity: {
      recommended: '30% – 50% (Standard household ambient)',
      minimum: '25%',
      idealRange: [25, 50]
    },
    temperature: {
      rangeF: '65°F to 90°F',
      rangeC: '18°C to 32°C',
      hardinessMinF: 50
    },
    soil: {
      mixType: 'Gritty Succulent & Cactus Blend',
      recipe: '50% Potting Soil, 30% Coarse Pumice/Perlite, 20% Coarse Horticultural Sand.',
      drainageNeeds: 'Maximum drainage; prone to root rot if moisture lingers.'
    },
    fertilizer: {
      npkRatio: 'Low Nitrogen 8-8-8 or Cactus Fertilizer',
      schedule: 'Once or twice during the entire growing season at half strength.',
      winterPause: true
    },
    petToxicity: {
      toxicToDogs: true,
      toxicToCats: true,
      toxicPrinciple: 'Saponins',
      aspcaNotes: 'Causes nausea, vomiting, salivation, and diarrhea if chewed.'
    },
    propagation: {
      method: 'Rhizome division or leaf blade cuttings in dry perlite',
      timeline: 'Division is instant; leaf cuttings take 6–10 weeks to develop pups.',
      medium: 'Cactus soil or perlite.'
    },
    commonProblems: [
      {
        symptom: 'Mushy, foul-smelling base and floppy leaves',
        cause: 'Severe root rot from overwatering in cold soil.',
        solution: 'Cut off rotten base, allow leaf tops to callus for 3 days, and re-root in pumice.'
      },
      {
        symptom: 'Wrinkled, indented leaves',
        cause: 'Severe chronic dehydration.',
        solution: 'Drench thoroughly; leaves will plump up within 48 hours.'
      }
    ],
    faqs: [
      {
        q: 'How long can a Snake Plant survive without water?',
        a: 'In low light, mature Snake Plants can comfortably withstand 6 to 8 weeks without water due to thick succulent water storage cells.'
      }
    ],
    relatedToolSlugs: ['pot-size-calculator', 'plant-watering-calculator', 'soil-mix-calculator']
  },
  {
    slug: 'zz-plant',
    name: 'ZZ Plant',
    botanicalName: 'Zamioculcas zamiifolia',
    family: 'Araceae',
    origin: 'Eastern Africa from Kenya to northeastern South Africa',
    category: 'Aroid',
    difficulty: 'Beginner',
    imageUrl: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Glossy dark green ZZ Plant with potato-like underground rhizomes',
    summary: 'Glossy feathered foliage that looks polished with wax. Stores abundant water in potato-like underground rhizomes, making it drought-proof.',
    light: {
      ideal: 'Low to moderate indirect light',
      footCandles: '50 to 200 FC',
      exposure: 'Thrives in windowless offices, north corners, and dappled rooms.',
      placement: 'Keep away from harsh midday direct sun which scorches leaf blades.'
    },
    watering: {
      frequency: 'Every 2–3 weeks in summer; monthly in winter.',
      soilCheck: 'Allow 100% of the soil profile to dry out completely.',
      winterAdjustment: 'Water only once a month or less when dormant.',
      tapWaterSensitivity: false
    },
    humidity: {
      recommended: '40% – 50%',
      minimum: '30%',
      idealRange: [30, 60]
    },
    temperature: {
      rangeF: '65°F to 85°F',
      rangeC: '18°C to 29°C',
      hardinessMinF: 55
    },
    soil: {
      mixType: 'Fast-Draining Well-Aerated Blend',
      recipe: '50% Quality Potting Soil, 30% Perlite, 20% Fine Bark.',
      drainageNeeds: 'Must have bottom drainage holes.'
    },
    fertilizer: {
      npkRatio: 'Balanced 10-10-10',
      schedule: 'Apply once in spring and once in mid-summer at quarter strength.',
      winterPause: true
    },
    petToxicity: {
      toxicToDogs: true,
      toxicToCats: true,
      toxicPrinciple: 'Calcium oxalate crystals',
      aspcaNotes: 'Mild to moderate toxic irritant. Keep out of reach of puppies and cats.'
    },
    propagation: {
      method: 'Stem cuttings or individual leaflet propagation',
      timeline: 'Slow! Leaflets produce miniature tubers over 3–6 months.',
      medium: 'Moist perlite/vermiculite mix.'
    },
    commonProblems: [
      {
        symptom: 'Yellowing stems falling over from the root ball',
        cause: 'Overwatering rotting the subterranean tuberous rhizomes.',
        solution: 'Immediately stop watering, dig out soggy soil, cut away soft tuber mush, and repot dry.'
      }
    ],
    faqs: [
      {
        q: 'Do ZZ plants need leaf shine spray?',
        a: 'Never use commercial leaf shine oils on ZZ plants as they clog stomata. Wipe with a damp microfiber cloth to restore natural glossy luster.'
      }
    ],
    relatedToolSlugs: ['plant-watering-calculator', 'pot-size-calculator', 'fertilizer-calculator']
  },
  {
    slug: 'peace-lily',
    name: 'Peace Lily',
    botanicalName: 'Spathiphyllum wallisii',
    family: 'Araceae',
    origin: 'Tropical Americas and Southeast Asia rainforests',
    category: 'Flowering',
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Peace Lily with deep green glossy foliage and elegant white floral spathes',
    summary: 'A dramatic communicator that visibly droops when thirsty and perks up hours after a drink. Produces long-lasting white flower spathes.',
    light: {
      ideal: 'Moderate to bright filtered indirect light',
      footCandles: '100 to 300 FC',
      exposure: 'East window or filtered through sheer curtains. More light prompts more blooms.',
      placement: 'Avoid direct sunlight which burns broad leaves.'
    },
    watering: {
      frequency: 'Every 5–8 days.',
      soilCheck: 'Check top 1 inch (2.5 cm); water when lightly damp or at the earliest sign of leaf slump.',
      winterAdjustment: 'Slightly reduce as growth slows.',
      tapWaterSensitivity: true
    },
    humidity: {
      recommended: '50% – 70%',
      minimum: '45%',
      idealRange: [50, 75]
    },
    temperature: {
      rangeF: '65°F to 80°F',
      rangeC: '18°C to 27°C',
      hardinessMinF: 55
    },
    soil: {
      mixType: 'Moisture-Retentive yet Aerated Potting Mix',
      recipe: '60% Peat/Coco Coir, 20% Perlite, 20% Worm Castings.',
      drainageNeeds: 'Drainage holes are vital to avoid stagnant anaerobic water.'
    },
    fertilizer: {
      npkRatio: 'High Phosphorus 10-15-10 or Balanced 10-10-10',
      schedule: 'Quarter strength every 4–6 weeks during blooming season.',
      winterPause: true
    },
    petToxicity: {
      toxicToDogs: true,
      toxicToCats: true,
      toxicPrinciple: 'Insoluble calcium oxalate crystals',
      aspcaNotes: 'Not a true lily (Liliaceae); does not cause feline kidney failure, but causes intense oral and stomach irritation.'
    },
    propagation: {
      method: 'Crown division during repotting',
      timeline: 'Established crowns separate immediately into independent root systems.',
      medium: 'Moist standard potting mix.'
    },
    commonProblems: [
      {
        symptom: 'Brown, crispy leaf tips despite regular watering',
        cause: 'Sensitivity to chlorine, fluoride, or dissolved salts in city tap water.',
        solution: 'Switch to filtered, distilled, or rainwater, and flush pot periodically.'
      },
      {
        symptom: 'Green flowers instead of pure white blooms',
        cause: 'Excess chemical nitrogen fertilizer or naturally aging bloom.',
        solution: 'Cut back fertilizer strength and let flower fade naturally.'
      }
    ],
    faqs: [
      {
        q: 'Why does my Peace Lily droop so suddenly?',
        a: 'Peace lilies are notorious drama queens. As soon as soil moisture drops below root capacity, cells lose turgor pressure. A thorough drink restores them in 2-4 hours.'
      }
    ],
    relatedToolSlugs: ['plant-humidity-calculator', 'fertilizer-calculator', 'plant-watering-calculator']
  },
  {
    slug: 'spider-plant',
    name: 'Spider Plant',
    botanicalName: 'Chlorophytum comosum',
    family: 'Asparagaceae',
    origin: 'Tropical and southern Africa',
    category: 'Foliage',
    difficulty: 'Beginner',
    imageUrl: 'https://images.unsplash.com/photo-1572688484437-31820e39ec14?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Arched variegated Spider Plant in a hanging pot with runners and spiderettes',
    summary: 'Cheerful ribbon foliage producing cascades of miniature plantlets ("spiderettes"). Completely non-toxic to cats and dogs.',
    light: {
      ideal: 'Bright indirect light',
      footCandles: '150 to 400 FC',
      exposure: 'East or West exposure with gentle morning or late afternoon sun.',
      placement: 'Too dark leads to faded stripes; hot direct sun bleaches foliage.'
    },
    watering: {
      frequency: 'Every 7–10 days in growing season.',
      soilCheck: 'Water when top 1–2 inches are dry.',
      winterAdjustment: 'Allow deeper drying between waterings.',
      tapWaterSensitivity: true
    },
    humidity: {
      recommended: '40% – 60%',
      minimum: '35%',
      idealRange: [40, 65]
    },
    temperature: {
      rangeF: '60°F to 75°F',
      rangeC: '15°C to 24°C',
      hardinessMinF: 45
    },
    soil: {
      mixType: 'Standard Loamy Houseplant Mix',
      recipe: '60% Potting Soil, 25% Perlite, 15% Coarse Sand.',
      drainageNeeds: 'Strong drainage; thick tuberous roots store water.'
    },
    fertilizer: {
      npkRatio: 'Balanced 20-20-20',
      schedule: 'Half-strength once monthly in spring and summer.',
      winterPause: true
    },
    petToxicity: {
      toxicToDogs: false,
      toxicToCats: false,
      toxicPrinciple: 'Non-toxic (ASPCA Certified Safe)',
      aspcaNotes: 'Contains mild opium-like compounds that attract cats without toxicity; safe if nibbled.'
    },
    propagation: {
      method: 'Spiderette rooting in water or damp potting medium',
      timeline: 'Roots establish in 7–12 days.',
      medium: 'Water or direct soil pin-down.'
    },
    commonProblems: [
      {
        symptom: 'Blackened, crispy tips on ribbon foliage',
        cause: 'Fluoride sensitivity in municipal tap water.',
        solution: 'Use filtered water or rain water, as spider plants cannot metabolize fluorides.'
      }
    ],
    faqs: [
      {
        q: 'Why does my cat obsess over eating spider plant leaves?',
        a: 'Spider plant contains a compound related to opium that has a mild psychedelic effect on felines, similar to catnip! It is non-toxic, but best kept hanging out of reach.'
      }
    ],
    relatedToolSlugs: ['plant-propagation-guide', 'plant-watering-calculator', 'pot-size-calculator']
  },
  {
    slug: 'fiddle-leaf-fig',
    name: 'Fiddle Leaf Fig',
    botanicalName: 'Ficus lyrata',
    family: 'Moraceae',
    origin: 'Lowland tropical rainforests of Western Africa',
    category: 'Tree',
    difficulty: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Impressive indoor Fiddle Leaf Fig tree with broad violin-shaped leaves',
    summary: 'The interior designer darling with violin-shaped leathery leaves. Demands consistent bright light and stable conditions without drafts.',
    light: {
      ideal: 'Very bright, filtered to direct morning sunlight',
      footCandles: '400 to 1,000 FC',
      exposure: 'Directly in front of an unobstructed South, West, or East window.',
      placement: 'Rotate every 2 weeks for even canopy balance.'
    },
    watering: {
      frequency: 'Every 8–12 days depending on container volume and temperature.',
      soilCheck: 'Allow top 2–3 inches (or top 50% of soil) to dry before soaking.',
      winterAdjustment: 'Slow significantly in cold winter weather.',
      tapWaterSensitivity: false
    },
    humidity: {
      recommended: '50% – 65%',
      minimum: '40%',
      idealRange: [50, 70]
    },
    temperature: {
      rangeF: '65°F to 85°F',
      rangeC: '18°C to 29°C',
      hardinessMinF: 55
    },
    soil: {
      mixType: 'Chunky Aerated Tree Soil',
      recipe: '50% Organic Potting Soil, 30% Bark/Perlite, 20% Peat.',
      drainageNeeds: 'Must have large, open drainage holes.'
    },
    fertilizer: {
      npkRatio: 'Nitrogen Heavy 3-1-2 Formulation',
      schedule: 'Feed every 2–3 weeks during active spring and summer flushes.',
      winterPause: true
    },
    petToxicity: {
      toxicToDogs: true,
      toxicToCats: true,
      toxicPrinciple: 'Proteolytic enzymes (ficin) and ficusin',
      aspcaNotes: 'Milky sap causes dermatitis on skin and oral inflammation if ingested.'
    },
    propagation: {
      method: 'Stem tip cutting or air layering on mature branches',
      timeline: 'Roots in 6–8 weeks with bottom heat.',
      medium: 'Moist perlite or water with rooting hormone.'
    },
    commonProblems: [
      {
        symptom: 'Small red speckling on brand new leaves (Edema)',
        cause: 'Irregular moisture uptake while cellular walls form.',
        solution: 'Maintain consistent soil moisture cycle; edema naturally fades as leaf matures.'
      },
      {
        symptom: 'Dark brown spots starting in center of leaf, dropping lower leaves',
        cause: 'Root rot from overwatering or inadequate light.',
        solution: 'Increase lighting drastically and let soil dry further down.'
      }
    ],
    faqs: [
      {
        q: 'Why did my Fiddle Leaf Fig drop leaves after moving rooms?',
        a: 'Ficus lyrata is sensitive to sudden changes in light, temperature, and humidity. It sheds leaves in response to shock. Keep conditions stable and new growth will follow.'
      }
    ],
    relatedToolSlugs: ['plant-light-finder', 'plant-watering-calculator', 'plant-problem-checker']
  },
  {
    slug: 'philodendron',
    name: 'Heartleaf Philodendron',
    botanicalName: 'Philodendron hederaceum',
    family: 'Araceae',
    origin: 'Central America and the Caribbean',
    category: 'Aroid',
    difficulty: 'Beginner',
    imageUrl: 'https://images.unsplash.com/photo-1599685315640-9ceab2f58944?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Delicate cascading Heartleaf Philodendron with glossy heart foliage',
    summary: 'Charming sweetheart vine that cascades gracefully from shelves and hanging baskets. Thrives in moderate light and tolerates occasional dry spells.',
    light: {
      ideal: 'Medium to bright indirect light',
      footCandles: '100 to 350 FC',
      exposure: 'Gentle morning light or dappled shade.',
      placement: 'Tolerates dimmer corners better than many other tropicals.'
    },
    watering: {
      frequency: 'Every 7–10 days.',
      soilCheck: 'Allow top 1–2 inches (3–5 cm) to dry between waterings.',
      winterAdjustment: 'Reduce watering when indoor heating is running.',
      tapWaterSensitivity: false
    },
    humidity: {
      recommended: '40% – 60%',
      minimum: '35%',
      idealRange: [40, 65]
    },
    temperature: {
      rangeF: '65°F to 80°F',
      rangeC: '18°C to 27°C',
      hardinessMinF: 55
    },
    soil: {
      mixType: 'Airy Aroid Mix',
      recipe: '50% Potting Soil, 30% Perlite, 20% Orchid Bark.',
      drainageNeeds: 'Free-draining potting container.'
    },
    fertilizer: {
      npkRatio: 'Balanced 15-15-15 or Foliage 3-1-2',
      schedule: 'Monthly in spring and summer at half strength.',
      winterPause: true
    },
    petToxicity: {
      toxicToDogs: true,
      toxicToCats: true,
      toxicPrinciple: 'Insoluble calcium oxalates',
      aspcaNotes: 'Oral irritation, drooling, and vomiting. Best suited for high shelves.'
    },
    propagation: {
      method: 'Stem cuttings with 2–3 nodes in water',
      timeline: 'Roots within 14 days.',
      medium: 'Water or moist sphagnum moss.'
    },
    commonProblems: [
      {
        symptom: 'Long leggy vines with sparse small leaves',
        cause: 'Insufficient light; plant is stretching toward a light source.',
        solution: 'Prune vine tips to encourage bushy branching and move closer to a window.'
      }
    ],
    faqs: [
      {
        q: 'How do I tell Heartleaf Philodendron apart from Golden Pothos?',
        a: 'Philodendron leaves are thinner, distinctly heart-shaped with pointed tips, and have smooth stems with papery sheaths (cataphylls). Pothos stems have grooved petiole channels.'
      }
    ],
    relatedToolSlugs: ['soil-mix-calculator', 'plant-propagation-guide', 'plant-watering-calculator']
  },
  {
    slug: 'calathea',
    name: 'Pinstripe Calathea',
    botanicalName: 'Goeppertia ornata (Calathea ornata)',
    family: 'Marantaceae',
    origin: 'Rainforest floor of South America (Colombia, Venezuela)',
    category: 'Foliage',
    difficulty: 'Advanced',
    imageUrl: 'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Striking Calathea Ornata with fine pink brushstroke stripes and purple leaf undersides',
    summary: 'The mesmerizing prayer plant that moves its leaves in circadian rhythm. Demands filtered water and high humidity to prevent crispy margins.',
    light: {
      ideal: 'Medium, dappled indirect light',
      footCandles: '100 to 250 FC',
      exposure: 'North or shaded East window; mimics rainforest floor canopy.',
      placement: 'Keep strictly away from direct sun, which fades pink lines and bleaches leaves.'
    },
    watering: {
      frequency: 'Every 5–7 days; never let dry out completely.',
      soilCheck: 'Keep soil consistently and evenly moist, like a wrung-out sponge.',
      winterAdjustment: 'Slightly reduce water volume but maintain even dampness.',
      tapWaterSensitivity: true
    },
    humidity: {
      recommended: '60% – 80%',
      minimum: '50%',
      idealRange: [60, 85]
    },
    temperature: {
      rangeF: '65°F to 80°F',
      rangeC: '18°C to 27°C',
      hardinessMinF: 60
    },
    soil: {
      mixType: 'Porous Peat & Perlite Retentive Medium',
      recipe: '50% Peat/Coco Coir, 25% Perlite, 15% Fine Bark, 10% Charcoal.',
      drainageNeeds: 'Must have excellent drainage while holding uniform moisture.'
    },
    fertilizer: {
      npkRatio: 'Gentle Organic 5-5-5 or Fish Emulsion',
      schedule: 'Quarter strength once monthly during summer only. Very sensitive to fertilizer salts.',
      winterPause: true
    },
    petToxicity: {
      toxicToDogs: false,
      toxicToCats: false,
      toxicPrinciple: 'Non-toxic (ASPCA Pet-Safe)',
      aspcaNotes: '100% safe for cats and dogs. A premier choice for pet-loving indoor gardeners.'
    },
    propagation: {
      method: 'Careful root ball division during spring repotting',
      timeline: 'Establishes in 3–4 weeks with humidity tenting.',
      medium: 'Moist aroid/peat medium.'
    },
    commonProblems: [
      {
        symptom: 'Crispy curled leaf edges with brown burnt tips',
        cause: 'Hard municipal tap water salts or low relative humidity under 50%.',
        solution: 'Switch strictly to distilled, reverse-osmosis, or rain water, and run an ultrasonic humidifier.'
      },
      {
        symptom: 'Leaves stop folding upwards at night',
        cause: 'Extreme thirst or excessive intense light.',
        solution: 'Check soil hydration and move away from intense glare.'
      }
    ],
    faqs: [
      {
        q: 'Why do Calathea leaves fold upwards in the evening?',
        a: 'This movement is called nyctinasty, controlled by small swollen joints at the base of the leaf called pulvini. It helps preserve moisture in darkness.'
      }
    ],
    relatedToolSlugs: ['plant-humidity-calculator', 'fertilizer-calculator', 'plant-problem-checker']
  },
  {
    slug: 'rubber-plant',
    name: 'Rubber Tree Plant',
    botanicalName: 'Ficus elastica',
    family: 'Moraceae',
    origin: 'South and Southeast Asia (India, Nepal, Myanmar, Malaysia)',
    category: 'Tree',
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1597055181300-e3633a917c9c?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Lush Burgundy Ficus Elastica Rubber Tree with glossy leathery leaves',
    summary: 'Stately upright foliage with thick, leathery leaves and burgundy sheaths. Fast growing, structural, and straightforward to care for indoors.',
    light: {
      ideal: 'Bright indirect to partial direct morning sun',
      footCandles: '300 to 800 FC',
      exposure: 'East or South window with sheer curtains.',
      placement: 'Darker varieties like Burgundy maintain rich deep color in higher light.'
    },
    watering: {
      frequency: 'Every 8–14 days.',
      soilCheck: 'Let top 50% of the soil dry out before drenching thoroughly.',
      winterAdjustment: 'Water sparingly once every 2–3 weeks.',
      tapWaterSensitivity: false
    },
    humidity: {
      recommended: '45% – 65%',
      minimum: '35%',
      idealRange: [40, 70]
    },
    temperature: {
      rangeF: '65°F to 85°F',
      rangeC: '18°C to 29°C',
      hardinessMinF: 50
    },
    soil: {
      mixType: 'Chunky Aerated Tropical Blend',
      recipe: '60% Potting Mix, 20% Perlite, 20% Pine Bark.',
      drainageNeeds: 'Must drain freely.'
    },
    fertilizer: {
      npkRatio: 'Balanced 20-20-20 or 3-1-2',
      schedule: 'Feed every 3–4 weeks throughout active spring and summer.',
      winterPause: true
    },
    petToxicity: {
      toxicToDogs: true,
      toxicToCats: true,
      toxicPrinciple: 'Ficus latex sap',
      aspcaNotes: 'Milky latex sap causes mild digestive upset and mouth irritation.'
    },
    propagation: {
      method: 'Stem tip cutting or air layering',
      timeline: 'Roots in 4–6 weeks in warm perlite.',
      medium: 'Perlite or moist peat.'
    },
    commonProblems: [
      {
        symptom: 'Dropping green healthy leaves from bottom',
        cause: 'Sudden cold draft or moving location.',
        solution: 'Keep away from AC units or drafty doorways.'
      },
      {
        symptom: 'Dull, dusty leaves',
        cause: 'Accumulated indoor dust film blocking photosynthesis.',
        solution: 'Wipe leaves monthly with a lukewarm damp cloth.'
      }
    ],
    faqs: [
      {
        q: 'How tall can a Rubber Tree grow indoors?',
        a: 'In indoor pots, Ficus elastica can easily reach 8 to 10 feet tall. You can prune the apical stem in spring to control height and encourage branching.'
      }
    ],
    relatedToolSlugs: ['pot-size-calculator', 'plant-watering-calculator', 'plant-light-finder']
  }
];
