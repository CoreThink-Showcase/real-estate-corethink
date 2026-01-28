export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
  lotSize: number;
  propertyType: 'single-family' | 'condo' | 'townhouse';
  images: string[];
  description: string;
  features: string[];
  pros: string[];
  cons: string[];
  tradeoffs: Tradeoff[];
  commuteTime?: number;
  schoolRating?: number;
  walkScore?: number;
}

export interface Tradeoff {
  label: string;
  type: 'positive' | 'negative' | 'neutral';
  description: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  properties?: Property[];
}

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Craftsman Home',
    address: '1234 Oak Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    price: 1250000,
    beds: 4,
    baths: 3,
    sqft: 2400,
    yearBuilt: 2019,
    lotSize: 4500,
    propertyType: 'single-family',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    ],
    description: 'Stunning modern craftsman home with open floor plan, gourmet kitchen, and beautiful backyard. Recently renovated with high-end finishes throughout.',
    features: [
      'Open floor plan',
      'Gourmet kitchen with island',
      'Hardwood floors',
      'Smart home technology',
      'Energy efficient',
      '2-car garage',
      'Landscaped backyard',
      'Home office',
    ],
    pros: [
      'Excellent location near downtown',
      'Modern amenities and finishes',
      'Energy efficient design',
      'Spacious backyard',
      'Low maintenance landscaping',
    ],
    cons: [
      'Higher price point',
      'Smaller lot size',
      'HOA fees apply',
    ],
    tradeoffs: [
      {
        label: 'Higher Price',
        type: 'negative',
        description: 'Premium location and modern features come at a higher cost',
      },
      {
        label: 'Modern Design',
        type: 'positive',
        description: 'Contemporary layout with high-end finishes',
      },
      {
        label: 'Smaller Lot',
        type: 'neutral',
        description: 'Less outdoor space but easier maintenance',
      },
    ],
    commuteTime: 25,
    schoolRating: 9,
    walkScore: 85,
  },
  {
    id: '2',
    title: 'Charming Victorian',
    address: '567 Pine Avenue',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94103',
    price: 980000,
    beds: 3,
    baths: 2,
    sqft: 1850,
    yearBuilt: 1905,
    lotSize: 3200,
    propertyType: 'single-family',
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    ],
    description: 'Beautifully restored Victorian home with original details, updated systems, and charming period features. Perfect blend of historic character and modern comfort.',
    features: [
      'Original hardwood floors',
      'Crown molding',
      'Updated kitchen',
      'Central heating/AC',
      'Basement',
      'Front porch',
      'Detached garage',
      'Garden',
    ],
    pros: [
      'Historic charm and character',
      'Larger lot size',
      'No HOA fees',
      'Great neighborhood',
      'Potential for appreciation',
    ],
    cons: [
      'Older home maintenance',
      'Higher utility costs',
      'Limited parking',
    ],
    tradeoffs: [
      {
        label: 'Historic Charm',
        type: 'positive',
        description: 'Unique architectural details and character',
      },
      {
        label: 'Maintenance Required',
        type: 'negative',
        description: 'Older home may need more upkeep',
      },
      {
        label: 'Longer Commute',
        type: 'negative',
        description: 'Further from downtown and major employment centers',
      },
    ],
    commuteTime: 35,
    schoolRating: 7,
    walkScore: 72,
  },
  {
    id: '3',
    title: 'Luxury Penthouse Condo',
    address: '890 Market Street #PH',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    price: 1450000,
    beds: 2,
    baths: 2,
    sqft: 1600,
    yearBuilt: 2021,
    lotSize: 0,
    propertyType: 'condo',
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop',
    ],
    description: 'Spectacular penthouse condo with panoramic city views, floor-to-ceiling windows, and premium finishes. Full-service building with amenities.',
    features: [
      'Panoramic city views',
      'Floor-to-ceiling windows',
      'Chef\'s kitchen',
      'In-unit laundry',
      'Concierge service',
      'Fitness center',
      'Rooftop terrace',
      'Parking included',
    ],
    pros: [
      'Prime downtown location',
      'No maintenance required',
      'Building amenities',
      'Modern construction',
      'Excellent security',
    ],
    cons: [
      'Higher HOA fees',
      'No outdoor space',
      'Smaller square footage',
      'Shared walls',
    ],
    tradeoffs: [
      {
        label: 'Prime Location',
        type: 'positive',
        description: 'Walk to everything downtown has to offer',
      },
      {
        label: 'Higher HOA',
        type: 'negative',
        description: 'Monthly fees cover amenities but add to cost',
      },
      {
        label: 'No Yard',
        type: 'neutral',
        description: 'Convenience of no maintenance but no private outdoor space',
      },
    ],
    commuteTime: 10,
    schoolRating: 8,
    walkScore: 98,
  },
  {
    id: '4',
    title: 'Spacious Family Home',
    address: '234 Elm Drive',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94112',
    price: 1100000,
    beds: 5,
    baths: 3,
    sqft: 2800,
    yearBuilt: 1995,
    lotSize: 6000,
    propertyType: 'single-family',
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&h=600&fit=crop',
    ],
    description: 'Perfect family home with plenty of space, large backyard, and excellent school district. Move-in ready with recent updates.',
    features: [
      'Large backyard',
      'Updated kitchen',
      'Master suite',
      'Home theater',
      '3-car garage',
      'Playroom',
      'Updated bathrooms',
      'New roof',
    ],
    pros: [
      'Great for families',
      'Excellent schools',
      'Large lot size',
      'Plenty of storage',
      'Quiet neighborhood',
    ],
    cons: [
      'Further from downtown',
      'Older systems',
      'Longer commute',
    ],
    tradeoffs: [
      {
        label: 'Family Friendly',
        type: 'positive',
        description: 'Great schools and neighborhood for kids',
      },
      {
        label: 'Longer Commute',
        type: 'negative',
        description: '30+ minutes to downtown and tech hubs',
      },
      {
        label: 'More Space',
        type: 'positive',
        description: 'Largest home with room to grow',
      },
    ],
    commuteTime: 40,
    schoolRating: 10,
    walkScore: 65,
  },
];

export const mockMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Welcome to Corethink Real Estate! I\'m your AI home buying assistant. I can help you find and compare properties that match your needs. What are you looking for in your next home?',
    timestamp: new Date(Date.now() - 300000),
  },
  {
    id: '2',
    role: 'user',
    content: 'I\'m looking for a 3-4 bedroom home in San Francisco with good schools. My budget is around $1-1.5M.',
    timestamp: new Date(Date.now() - 240000),
  },
  {
    id: '3',
    role: 'assistant',
    content: 'Great! Based on your criteria, I found several excellent options. Here are 4 properties that match your requirements. Let me highlight the key differences:\n\n1. **Modern Craftsman** ($1.25M) - Best for modern amenities and downtown access\n2. **Charming Victorian** ($980K) - Best value with historic character\n3. **Luxury Penthouse** ($1.45M) - Best for low-maintenance urban living\n4. **Spacious Family Home** ($1.1M) - Best for families with excellent schools\n\nWould you like me to compare any of these in detail?',
    timestamp: new Date(Date.now() - 180000),
    properties: [mockProperties[0]!, mockProperties[1]!, mockProperties[2]!, mockProperties[3]!],
  },
  {
    id: '4',
    role: 'user',
    content: 'Can you compare the Modern Craftsman and the Spacious Family Home? I\'m trying to decide between location and space.',
    timestamp: new Date(Date.now() - 120000),
  },
  {
    id: '5',
    role: 'assistant',
    content: 'Excellent question! Here\'s a detailed comparison:\n\n**Location Advantage - Modern Craftsman:**\n• 25 min commute vs 40 min (15 min savings daily)\n• Walk Score 85 vs 65 (much more walkable)\n• Downtown access for dining and entertainment\n\n**Space Advantage - Family Home:**\n• 2,800 sqft vs 2,400 sqft (400 sqft more)\n• 5 bedrooms vs 4 (extra room for office/guests)\n• 6,000 sqft lot vs 4,500 sqft (larger backyard)\n• School rating 10 vs 9 (top-rated district)\n\n**Tradeoff Analysis:**\nIf you work downtown and value walkability, the Craftsman saves you 2.5 hours weekly in commute. However, the Family Home offers significantly more space for the same price per square foot.\n\nWhat\'s more important to you: daily convenience or long-term space for your family?',
    timestamp: new Date(Date.now() - 60000),
    properties: [mockProperties[0]!, mockProperties[3]!],
  },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatSqft = (sqft: number): string => {
  return new Intl.NumberFormat('en-US').format(sqft) + ' sqft';
};