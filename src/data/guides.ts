export interface CareGuide {
  slug: string;
  category: 'Watering' | 'Lighting' | 'Soil & Fertilizer' | 'Plant Problems' | 'Repotting' | 'Propagation' | 'Beginner Care';
  title: string;
  seoTitle: string;
  metaDescription: string;
  quickAnswer: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedDate: string;
  updatedDate: string;
  readTime: string;
  heroImage: string;
  heroAlt: string;
  sections: Array<{
    heading: string;
    content: string;
    bulletPoints?: string[];
    callout?: {
      title: string;
      text: string;
    };
  }>;
  faqs: Array<{
    q: string;
    a: string;
  }>;
  relatedToolSlug: string;
  relatedPlantSlugs: string[];
}

export const GUIDES_DATA: CareGuide[] = [
  {
    slug: 'houseplant-watering-finger-test-vs-meters',
    category: 'Watering',
    title: 'The Complete Houseplant Watering Guide: Finger Test vs. Moisture Meters',
    seoTitle: 'Houseplant Watering Guide: How Often to Water Indoor Plants',
    metaDescription: 'Learn how to accurately water indoor houseplants. Understand the finger test, wooden skewer method, weight check, and why calendar watering fails.',
    quickAnswer: 'Direct Answer: Never water indoor plants on a rigid calendar schedule. Instead, measure actual soil dryness by inserting your finger or a dry wooden skewer 2 inches into the soil. Water only when the species-specific moisture threshold is reached (e.g., 50% dry for aroids, 100% dry for succulents), then saturate the root ball thoroughly until water drains freely from the bottom.',
    author: {
      name: 'Dr. Evelyn Vance',
      role: 'Horticultural Scientist & PlantCare Lab Lead',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    publishedDate: '2025-04-12',
    updatedDate: '2026-10-18',
    readTime: '6 min read',
    heroImage: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
    heroAlt: 'Carefully watering indoor potted monstera plant with a slim gooseneck watering can',
    sections: [
      {
        heading: 'Why Strict Calendar Watering Kills Plants',
        content: 'The number one cause of houseplant demise worldwide is chronic overwatering driven by calendar schedules. Environmental conditions change week to week: higher summer temperatures accelerate transpiration, while dark cloudy winter weeks cause water to stagnate around dormant roots for weeks.',
        bulletPoints: [
          'Transpiration rates fluctuate up to 300% depending on ambient humidity and light intensity.',
          'Potted plants in terracotta pots dry out 30-40% faster than those in non-porous glazed ceramic or plastic.',
          'Stagnant water creates anaerobic conditions where opportunistic fungi like Pythium and Phytophthora destroy root rootlets in as little as 48 hours.'
        ]
      },
      {
        heading: 'The 3 Proven Soil Moisture Tests',
        content: 'Rather than guessing, rely on tactile physical indicators before pouring water.',
        callout: {
          title: 'The Wooden Skewer Test',
          text: 'Insert a standard unfinished wooden kitchen skewer deep into the root ball and leave it for 3 minutes. Pull it out: if the wood is dark and cool with clinging soil particles, moisture is present. If it comes out pale and dry, water is needed.'
        },
        bulletPoints: [
          'The 2-Inch Finger Test: Insert your index finger past the second knuckle. If the soil feels cool, dark, and sticky, wait.',
          'The Lift-Weight Test: Get familiar with the heft of your pot when dry versus immediately after a thorough drench. Hefting the nursery pot is the fastest daily diagnostic.'
        ]
      },
      {
        heading: 'The Drench and Drain Technique',
        content: 'When it is time to water, never give small sips. Shallow watering creates weak surface roots and causes mineral salt crusting. Take the plant to a sink or tray, saturate the potting medium evenly until copious water flows out of the drainage holes, let it drain completely for 15 minutes, and discard drainage runoff.'
      }
    ],
    faqs: [
      {
        q: 'Is bottom watering better than top watering?',
        a: 'Bottom watering ensures deep, even absorption in compacted or hydrophobic peat soils and keeps topsoil dry to deter fungus gnats. However, you should still top-water once every 2 months to flush out accumulated fertilizer salts.'
      },
      {
        q: 'Can I use ice cubes on my orchids or houseplants?',
        a: 'No. Ice cubes cause thermal shock to tropical roots, damaging root cellular structures and inviting secondary fungal infections.'
      }
    ],
    relatedToolSlug: 'plant-watering-calculator',
    relatedPlantSlugs: ['monstera-deliciosa', 'peace-lily', 'snake-plant']
  },
  {
    slug: 'indoor-plant-lighting-foot-candles-lux',
    category: 'Lighting',
    title: 'Indoor Plant Lighting Explained: Foot-Candles, Lux, and Window Orientation',
    seoTitle: 'Indoor Plant Light Guide: Foot-Candles, Lux & Window Directions',
    metaDescription: 'Demystify indoor lighting for houseplants. Compare foot-candles and lux across North, South, East, and West windows with science-backed positioning tips.',
    quickAnswer: 'Direct Answer: Human eyes dilate in dim rooms, creating the optical illusion that a room is bright when it is actually too dim for photosynthesis. North windows provide 75–200 Foot-Candles (FC) of low indirect light; East windows yield 200–500 FC of gentle morning light; South windows offer 800–2,000+ FC of intense sun; and West windows deliver hot afternoon light. Light intensity drops by the inverse square law: moving a plant just 3 feet away from a window reduces usable light by over 50%.',
    author: {
      name: 'Marcus Chen',
      role: 'Indoor Agronomist & Lighting Designer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    publishedDate: '2025-06-04',
    updatedDate: '2026-09-22',
    readTime: '7 min read',
    heroImage: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=1200&q=80',
    heroAlt: 'Sunlight streaming through an East-facing window illuminating lush indoor houseplants',
    sections: [
      {
        heading: 'The Inverse Square Law of Light',
        content: 'Indoor foliage requires light energy (photons) to manufacture carbohydrates via photosynthesis. The inverse-square law dictates that light intensity is inversely proportional to the square of the distance from the source. A plant placed 6 feet back from a window receives only one-quarter of the photons it would receive directly on the sill.',
        bulletPoints: [
          'Direct Sunlight: 1,000 to 5,000+ Foot-Candles (10,000 - 50,000 Lux)',
          'Bright Indirect Light: 250 to 800 Foot-Candles (2,500 - 8,000 Lux)',
          'Medium Indirect Light: 100 to 250 Foot-Candles (1,000 - 2,500 Lux)',
          'Low / Maintenance Light: 50 to 100 Foot-Candles (500 - 1,000 Lux)'
        ]
      },
      {
        heading: 'Window Orientation Guide',
        content: 'Understand which window your room faces using a smartphone compass to position plants accurately.',
        callout: {
          title: 'East Windows: The Sweet Spot',
          text: 'East-facing windows offer gentle, cool morning rays from sunrise until around 11 AM. They are universally safe for almost all indoor tropical foliage without risk of sunburn.'
        },
        bulletPoints: [
          'South Windows: Highest light and heat intensity. Perfect for Ficus, Strelitzia, and Cacti. Filter with sheer linen curtains for aroids.',
          'West Windows: Strong, hot afternoon sun. Can scorch delicate leaves in mid-summer.',
          'North Windows: Consistent, soft, indirect light all year. Ideal for ZZ Plants, Snake Plants, and Cast Iron Plants.'
        ]
      }
    ],
    faqs: [
      {
        q: 'Can standard LED ceiling lights replace sunlight?',
        a: 'Standard household lighting typically provides under 30 Foot-Candles at table level—far too weak for sustained vegetative growth. Dedicated full-spectrum LED grow lights with high PPFD ratings are needed.'
      }
    ],
    relatedToolSlug: 'plant-light-finder',
    relatedPlantSlugs: ['fiddle-leaf-fig', 'monstera-deliciosa', 'zz-plant']
  },
  {
    slug: 'chunky-aroid-soil-mix-recipe',
    category: 'Soil & Fertilizer',
    title: 'Crafting the Ultimate Chunky Aroid Soil Mix: Recipe & Component Ratios',
    seoTitle: 'Best Chunky Aroid Soil Mix Recipe: Monstera & Philodendron',
    metaDescription: 'Master the DIY chunky aroid soil blend. Prevent root rot with optimal porosity, orchid bark, pumice, coco coir, and worm castings.',
    quickAnswer: 'Direct Answer: The ideal chunky aroid potting mix provides 60% aeration and 40% moisture retention. Combine 40% coarse coconut coir or peat, 30% medium-grade orchid bark, 20% coarse pumice or horticultural perlite, and 10% organic worm castings with a handful of horticultural charcoal to sweeten the mix.',
    author: {
      name: 'Dr. Evelyn Vance',
      role: 'Horticultural Scientist & PlantCare Lab Lead',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    publishedDate: '2025-07-15',
    updatedDate: '2026-10-05',
    readTime: '5 min read',
    heroImage: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80',
    heroAlt: 'Horticultural soil components including pine bark, pumice, and coco coir for indoor potting',
    sections: [
      {
        heading: 'Why Standard Store-Bought Potting Soil Compacts',
        content: 'Commercial "all-purpose" potting soils consist largely of fine, milled peat moss. When peat repeatedly wets and dries, it shrinks, consolidates, and suffocates epiphytic roots. Monstera, Philodendron, and Anthurium grow wild as climbing epiphytes whose roots cling to aerated tree bark rather than dense mud.',
        bulletPoints: [
          'Fine peat collapses into dense anaerobic zones after 4-6 months of regular watering.',
          'Chunky amendments create macro-pores that retain pockets of oxygen even immediately after deep irrigation.',
          'Horticultural charcoal binds impurities and prevents sour soil odor.'
        ]
      },
      {
        heading: 'The 4-Part Master Ratio Recipe',
        content: 'Use volume-based measurements (scoops or quarts) for consistent batch blending.',
        bulletPoints: [
          'Part 1: 4 Scoops Chunky Coco Coir chunks or rehydrated coco chips (sustainable moisture retention).',
          'Part 2: 3 Scoops Pine or Fir Orchid Bark (medium 1/2-inch grading for structure).',
          'Part 3: 2 Scoops Coarse Horticultural Perlite or Pumice (non-compacting aeration).',
          'Part 4: 1 Scoop Organic Earthworm Castings (gentle non-burning biological nutrients).'
        ]
      }
    ],
    faqs: [
      {
        q: 'Is pumice better than perlite?',
        a: 'Yes, pumice is heavier and will not float to the top of the pot during watering like perlite tends to do, and it provides superior trace minerals and long-term durability.'
      }
    ],
    relatedToolSlug: 'soil-mix-calculator',
    relatedPlantSlugs: ['monstera-deliciosa', 'philodendron', 'calathea']
  },
  {
    slug: 'diagnose-and-treat-houseplant-root-rot',
    category: 'Plant Problems',
    title: 'How to Diagnose and Treat Houseplant Root Rot Before It’s Too Late',
    seoTitle: 'How to Fix Houseplant Root Rot: Symptoms, Pruning & Cure',
    metaDescription: 'Step-by-step emergency protocol for curing houseplant root rot. Spot black mushy roots, sanitize with hydrogen peroxide, and repot for recovery.',
    quickAnswer: 'Direct Answer: Root rot occurs when anaerobic waterlogged soil suffocates roots, allowing fungi to consume root tissues. Symptoms include sudden yellowing leaves, damp soil that stays wet for weeks, and a sour odor. To save the plant, unpot it immediately, wash away old soil, excise all mushy black/brown roots using sterilized scissors, dip healthy remaining roots in a 3% hydrogen peroxide solution (1 part H2O2 to 3 parts water), and repot in a fresh aerated medium.',
    author: {
      name: 'Dr. Evelyn Vance',
      role: 'Horticultural Scientist & PlantCare Lab Lead',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    publishedDate: '2025-08-01',
    updatedDate: '2026-10-14',
    readTime: '8 min read',
    heroImage: 'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&w=1200&q=80',
    heroAlt: 'Inspecting indoor potted plant roots and troubleshooting yellowing leaves',
    sections: [
      {
        heading: 'Identifying Healthy vs. Rotten Roots',
        content: 'Healthy roots are firm, pale white, cream, or light tan, and snap cleanly with light tension. Rotten roots are dark brown or black, hollow, stringy, and slough off like wet noodles when gently pulled.',
        bulletPoints: [
          'A sour, swampy sulfur smell is a conclusive indicator of advanced fungal decomposition.',
          'Upper plant symptoms lag root rot by 7 to 14 days; yellowing leaves indicate damage that occurred weeks ago.'
        ]
      },
      {
        heading: 'The 5-Step Emergency Rescue Protocol',
        content: 'Act immediately once root rot is confirmed. Do not wait for the soil to dry naturally.',
        bulletPoints: [
          '1. Unpot and rinse: Gently tease roots under lukewarm running water until every grain of old infected substrate is removed.',
          '2. Sanitize cutting tools: Wipe pruning shears with 70% isopropyl alcohol.',
          '3. Prune rotten tissue: Cut back rotten roots into firm, healthy white tissue.',
          '4. Antifungal soak: Swirl remaining roots in a diluted 3% hydrogen peroxide bath (1:3 with water) for 5 minutes.',
          '5. Downsize the pot: Repot into a smaller pot matching the reduced root system with sterile chunky mix.'
        ]
      }
    ],
    faqs: [
      {
        q: 'Can a plant survive with 80% of its roots removed?',
        a: 'Yes! Plants have remarkable regenerative abilities. If you lose most roots, prune back 30-40% of the upper foliage to balance moisture demand, and place the plant under high humidity.'
      }
    ],
    relatedToolSlug: 'plant-problem-checker',
    relatedPlantSlugs: ['peace-lily', 'monstera-deliciosa', 'fiddle-leaf-fig']
  },
  {
    slug: 'signs-houseplant-rootbound-repotting-guide',
    category: 'Repotting',
    title: 'Signs Your Houseplant Is Rootbound & How to Repot Safely',
    seoTitle: 'How to Repot a Rootbound Houseplant: Step-by-Step Guide',
    metaDescription: 'Recognize the telltale signs of a rootbound houseplant. Learn when to step up container size, how to tease circling roots, and avoid transplant shock.',
    quickAnswer: 'Direct Answer: A houseplant is rootbound when roots escape the bottom drainage holes, circle tightly around the inside perimeter of the pot, or push the plant upward out of its container. Repot during active spring or early summer growth into a new pot only 1 to 2 inches (2.5 to 5 cm) larger in diameter than the existing container.',
    author: {
      name: 'Marcus Chen',
      role: 'Indoor Agronomist & Lighting Designer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    publishedDate: '2025-08-20',
    updatedDate: '2026-09-30',
    readTime: '6 min read',
    heroImage: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=1200&q=80',
    heroAlt: 'Repotting a healthy rootbound indoor plant with fresh organic potting substrate',
    sections: [
      {
        heading: 'Why You Must Not Jump to a Huge Pot',
        content: 'Beginner gardeners often place a small plant into a giant pot thinking it will give roots room to thrive. In reality, excess surrounding soil remains saturated with stagnant water for weeks because the small root system cannot drink that volume of water. Always follow the 1-2 inch rule.',
        bulletPoints: [
          'Small to medium plants (4-8" pots): Upgrade by 1-2 inches in diameter.',
          'Large floor specimens (10-14" pots): Upgrade by 2-3 inches in diameter max.'
        ]
      },
      {
        heading: 'How to Handle Circling Roots',
        content: 'If roots have formed a dense tight spiral matching the bottom of the pot, gently tease the outer 20% loose with clean fingers or make three shallow vertical scores with a razor to break root memory and stimulate outward growth into fresh soil.'
      }
    ],
    faqs: [
      {
        q: 'Should I water right before or right after repotting?',
        a: 'Water the plant 2 days before repotting so roots are well-hydrated and flexible. After repotting with slightly damp soil, water thoroughly to settle air pockets.'
      }
    ],
    relatedToolSlug: 'pot-size-calculator',
    relatedPlantSlugs: ['rubber-plant', 'snake-plant', 'zz-plant']
  },
  {
    slug: 'water-propagation-node-cutting-timelines',
    category: 'Propagation',
    title: 'Water Propagation 101: Identifying Nodes and Rooting Timelines',
    seoTitle: 'Water Propagation Guide: Where to Cut Nodes & Rooting Times',
    metaDescription: 'Learn how to propagate houseplants in water. Identify stem nodes, aerial root initials, water change hygiene, and transition to soil without shock.',
    quickAnswer: 'Direct Answer: To propagate vining aroids (Pothos, Monstera, Philodendron), locate a stem node—the small swelling or joint on the vine where leaves and aerial root bumps emerge. Make a clean 45-degree angle cut approximately 1/4 inch below the node using sterilized shears. Submerge the node in clean room-temperature water while keeping leaves dry. Replace the water every 5 days.',
    author: {
      name: 'Dr. Evelyn Vance',
      role: 'Horticultural Scientist & PlantCare Lab Lead',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    publishedDate: '2025-09-10',
    updatedDate: '2026-10-25',
    readTime: '6 min read',
    heroImage: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=1200&q=80',
    heroAlt: 'Glass jars with water-propagated Monstera and Pothos cuttings showing healthy white roots',
    sections: [
      {
        heading: 'Anatomy of a Viable Cutting',
        content: 'You cannot root a plain leaf blade with a petiole for aroids—there must be actual nodal tissue present. A node contains active meristematic cells capable of generating both root primordial cells and new apical shoots.',
        bulletPoints: [
          'Always use a sterile razor or pruners; blunt scissors crush vascular xylem bundles.',
          'Remove any lower leaves that would sit submerged in water to avoid bacterial slime.',
          'Maintain warm ambient temperatures (72°F to 80°F / 22°C to 27°C) for fastest root cell division.'
        ]
      },
      {
        heading: 'When is a Cutting Ready for Soil?',
        content: 'Wait until primary water roots are at least 2 to 3 inches long and have developed secondary lateral root hairs. Water roots are fragile; keep the soil consistently damp for the first 10-14 days after transplanting to ease the adaptation to soil texture.'
      }
    ],
    faqs: [
      {
        q: 'Does adding cinnamon help root cuttings?',
        a: 'Cinnamon is a mild natural antifungal agent for sealing dry cut wounds on parent plants, but should not be sprinkled into water propagation vessels as it clouds water and encourages bacterial bloom.'
      }
    ],
    relatedToolSlug: 'plant-propagation-guide',
    relatedPlantSlugs: ['pothos', 'philodendron', 'monstera-deliciosa']
  },
  {
    slug: 'unkillable-indoor-plants-for-beginners',
    category: 'Beginner Care',
    title: 'Top 7 Virtually Unkillable Indoor Plants for Beginners and Busy Homes',
    seoTitle: '7 Hard-to-Kill Indoor Plants for Beginners and Low Light',
    metaDescription: 'Discover the most durable, resilient indoor houseplants that survive neglect, low light, and missed waterings. Perfect for apartments and first-time plant parents.',
    quickAnswer: 'Direct Answer: The 7 most durable indoor houseplants are Snake Plant (Dracaena trifasciata), ZZ Plant (Zamioculcas zamiifolia), Golden Pothos (Epipremnum aureum), Cast Iron Plant (Aspidistra elatior), Heartleaf Philodendron, Spider Plant, and Rubber Tree. These species have specialized drought-resilient adaptations such as tuberous rhizomes, waxy cuticles, and low photosynthetic compensation points.',
    author: {
      name: 'Marcus Chen',
      role: 'Indoor Agronomist & Lighting Designer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    publishedDate: '2025-10-01',
    updatedDate: '2026-11-01',
    readTime: '7 min read',
    heroImage: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
    heroAlt: 'Collection of low maintenance indoor foliage plants in minimalist terracotta planters',
    sections: [
      {
        heading: 'The Secret to Beginner Plant Success: The Neglect Advantage',
        content: 'More houseplants perish from over-attentive over-watering than from neglect. Resilient species have adapted to arid climates or dense jungle floors where resources are scarce.',
        bulletPoints: [
          'Succulent rhizomes in ZZ and Snake plants store water for 4-8 weeks without soil dehydration.',
          'Pothos communicates thirst by softening its foliage before permanent wilting occurs.',
          'Spider plants tolerate varied humidity without crispy edges.'
        ]
      }
    ],
    faqs: [
      {
        q: 'Which indoor plant is best for a windowless bathroom?',
        a: 'No plant can survive indefinitely in pitch darkness without artificial light. However, the ZZ plant and Snake plant can thrive in a bathroom if rotated every 2-3 weeks near natural light, or placed under an LED bulb left on 8 hours daily.'
      }
    ],
    relatedToolSlug: 'plant-light-finder',
    relatedPlantSlugs: ['snake-plant', 'zz-plant', 'pothos', 'spider-plant']
  }
];
