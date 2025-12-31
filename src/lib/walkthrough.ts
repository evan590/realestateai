// Walkthrough System - Checklists and data structures

export interface WalkthroughItem {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'normal' | 'warning' | 'critical';
  notes?: string;
  photoUrl?: string;
  estimatedRepairCost?: { min: number; max: number };
  negotiationLeverage?: string;
}

export interface WalkthroughRoom {
  id: string;
  name: string;
  icon: string;
  items: WalkthroughItem[];
  completed: boolean;
}

export interface WalkthroughReport {
  propertyId: string;
  propertyAddress: string;
  date: Date;
  rooms: WalkthroughRoom[];
  overallRisk: 'low' | 'medium' | 'high';
  totalEstimatedRepairs: { min: number; max: number };
  totalNegotiationLeverage: number;
  recommendations: string[];
}

// Dynamic checklists based on property type
export function getWalkthroughChecklist(propertyType: string, yearBuilt: number, location: string): WalkthroughRoom[] {
  const currentYear = new Date().getFullYear();
  const age = currentYear - yearBuilt;
  const isOlderHome = age > 30;
  const isTexas = location.toLowerCase().includes('texas') || location.toLowerCase().includes('tx');
  const isMidwest = ['ohio', 'michigan', 'indiana', 'illinois', 'wisconsin', 'minnesota'].some(
    s => location.toLowerCase().includes(s)
  );

  const baseRooms: WalkthroughRoom[] = [
    {
      id: 'exterior',
      name: 'Exterior',
      icon: '🏠',
      completed: false,
      items: [
        { id: 'roof', name: 'Roof Condition', description: 'Check for missing shingles, sagging, or visible damage', status: 'pending' },
        { id: 'gutters', name: 'Gutters & Downspouts', description: 'Look for clogs, damage, or improper drainage', status: 'pending' },
        { id: 'siding', name: 'Siding/Exterior Walls', description: 'Check for cracks, rot, or peeling paint', status: 'pending' },
        { id: 'foundation-exterior', name: 'Foundation (Visible)', description: 'Look for cracks, settling, or water stains', status: 'pending' },
        { id: 'drainage', name: 'Yard Drainage', description: 'Check grading and drainage away from house', status: 'pending' },
        { id: 'driveway', name: 'Driveway/Walkways', description: 'Check for cracks or settling', status: 'pending' },
      ],
    },
    {
      id: 'kitchen',
      name: 'Kitchen',
      icon: '🍳',
      completed: false,
      items: [
        { id: 'appliances', name: 'Appliances', description: 'Check age and condition of all appliances', status: 'pending' },
        { id: 'cabinets', name: 'Cabinets', description: 'Open all doors, check for damage or water stains', status: 'pending' },
        { id: 'countertops', name: 'Countertops', description: 'Look for chips, cracks, or stains', status: 'pending' },
        { id: 'sink-plumbing', name: 'Under-Sink Plumbing', description: 'Check for leaks, water damage, or mold', status: 'pending' },
        { id: 'ventilation', name: 'Ventilation/Range Hood', description: 'Test exhaust fan functionality', status: 'pending' },
        { id: 'outlets', name: 'Electrical Outlets', description: 'Check GFCI outlets near water', status: 'pending' },
      ],
    },
    {
      id: 'bathrooms',
      name: 'Bathrooms',
      icon: '🚿',
      completed: false,
      items: [
        { id: 'water-pressure', name: 'Water Pressure', description: 'Test all faucets and showerheads', status: 'pending' },
        { id: 'toilet', name: 'Toilet', description: 'Check for leaks, stability, and proper flushing', status: 'pending' },
        { id: 'tile-grout', name: 'Tile & Grout', description: 'Look for cracks, mold, or missing grout', status: 'pending' },
        { id: 'caulking', name: 'Caulking', description: 'Check around tub, shower, and sink', status: 'pending' },
        { id: 'ventilation-bath', name: 'Ventilation Fan', description: 'Test exhaust fan functionality', status: 'pending' },
        { id: 'signs-of-leaks', name: 'Signs of Leaks', description: 'Check under sinks, around toilet base', status: 'pending' },
      ],
    },
    {
      id: 'bedrooms',
      name: 'Bedrooms',
      icon: '🛏️',
      completed: false,
      items: [
        { id: 'windows', name: 'Windows', description: 'Check operation, seals, and condition', status: 'pending' },
        { id: 'closets', name: 'Closets', description: 'Check for space, mold, or water stains', status: 'pending' },
        { id: 'flooring', name: 'Flooring', description: 'Look for damage, squeaks, or unevenness', status: 'pending' },
        { id: 'walls-ceilings', name: 'Walls & Ceilings', description: 'Check for cracks, stains, or damage', status: 'pending' },
        { id: 'outlets-switches', name: 'Outlets & Switches', description: 'Test all electrical', status: 'pending' },
      ],
    },
    {
      id: 'electrical',
      name: 'Electrical',
      icon: '⚡',
      completed: false,
      items: [
        { id: 'panel', name: 'Electrical Panel', description: 'Check brand, age, and capacity', status: 'pending' },
        { id: 'wiring-type', name: 'Wiring Type', description: 'Identify copper vs aluminum wiring', status: 'pending' },
        { id: 'outlets-condition', name: 'Outlet Condition', description: 'Look for discoloration or damage', status: 'pending' },
        { id: 'gfci', name: 'GFCI Protection', description: 'Verify GFCI outlets in wet areas', status: 'pending' },
      ],
    },
    {
      id: 'plumbing',
      name: 'Plumbing',
      icon: '🔧',
      completed: false,
      items: [
        { id: 'water-heater', name: 'Water Heater', description: 'Check age, capacity, and condition', status: 'pending' },
        { id: 'pipe-material', name: 'Pipe Material', description: 'Identify copper, PEX, or galvanized', status: 'pending' },
        { id: 'water-pressure-main', name: 'Main Water Pressure', description: 'Test pressure throughout home', status: 'pending' },
        { id: 'visible-pipes', name: 'Visible Pipes', description: 'Check for corrosion or leaks', status: 'pending' },
      ],
    },
    {
      id: 'hvac',
      name: 'HVAC',
      icon: '🌡️',
      completed: false,
      items: [
        { id: 'ac-unit', name: 'AC Unit', description: 'Check age, brand, and condition', status: 'pending' },
        { id: 'furnace', name: 'Furnace/Heater', description: 'Check age and condition', status: 'pending' },
        { id: 'thermostat', name: 'Thermostat', description: 'Test functionality', status: 'pending' },
        { id: 'ductwork', name: 'Ductwork', description: 'Check visible ducts for damage', status: 'pending' },
        { id: 'filter', name: 'Filter Condition', description: 'Check filter cleanliness', status: 'pending' },
      ],
    },
  ];

  // Add foundation/basement based on location
  if (isMidwest) {
    baseRooms.push({
      id: 'basement',
      name: 'Basement',
      icon: '🏚️',
      completed: false,
      items: [
        { id: 'water-intrusion', name: 'Water Intrusion Signs', description: 'Look for stains, efflorescence, or mold', status: 'pending' },
        { id: 'sump-pump', name: 'Sump Pump', description: 'Check presence and functionality', status: 'pending' },
        { id: 'foundation-walls', name: 'Foundation Walls', description: 'Check for cracks or bowing', status: 'pending' },
        { id: 'moisture', name: 'Moisture/Humidity', description: 'Check for dampness or musty smell', status: 'pending' },
      ],
    });
  }

  // Texas-specific foundation checks
  if (isTexas) {
    const exteriorRoom = baseRooms.find(r => r.id === 'exterior');
    if (exteriorRoom) {
      exteriorRoom.items.push(
        { id: 'foundation-cracks', name: 'Foundation Cracks', description: 'Look for cracks in slab foundation (common in Texas clay soil)', status: 'pending' },
        { id: 'door-alignment', name: 'Door/Window Alignment', description: 'Check for sticking doors (foundation settling sign)', status: 'pending' }
      );
    }
  }

  // Older home specific checks
  if (isOlderHome) {
    const electricalRoom = baseRooms.find(r => r.id === 'electrical');
    if (electricalRoom) {
      electricalRoom.items.push(
        { id: 'knob-tube', name: 'Knob & Tube Wiring', description: 'Check for outdated wiring (pre-1950s)', status: 'pending' }
      );
    }
  }

  // Add attic for applicable property types
  if (propertyType.toLowerCase().includes('house') || propertyType.toLowerCase().includes('single')) {
    baseRooms.push({
      id: 'attic',
      name: 'Attic',
      icon: '🏠',
      completed: false,
      items: [
        { id: 'insulation', name: 'Insulation', description: 'Check type and depth', status: 'pending' },
        { id: 'ventilation-attic', name: 'Ventilation', description: 'Check for proper airflow', status: 'pending' },
        { id: 'roof-leaks', name: 'Roof Leaks', description: 'Look for water stains or daylight', status: 'pending' },
        { id: 'pests', name: 'Pest Signs', description: 'Look for droppings or damage', status: 'pending' },
      ],
    });
  }

  return baseRooms;
}

export function getStatusIcon(status: WalkthroughItem['status']): string {
  switch (status) {
    case 'normal':
      return '✅';
    case 'warning':
      return '⚠️';
    case 'critical':
      return '🚨';
    default:
      return '○';
  }
}

export function getStatusColor(status: WalkthroughItem['status']): string {
  switch (status) {
    case 'normal':
      return 'text-green-400';
    case 'warning':
      return 'text-yellow-400';
    case 'critical':
      return 'text-red-400';
    default:
      return 'text-slate-400';
  }
}

export function calculateOverallRisk(rooms: WalkthroughRoom[]): 'low' | 'medium' | 'high' {
  let criticalCount = 0;
  let warningCount = 0;

  rooms.forEach(room => {
    room.items.forEach(item => {
      if (item.status === 'critical') criticalCount++;
      if (item.status === 'warning') warningCount++;
    });
  });

  if (criticalCount >= 2) return 'high';
  if (criticalCount === 1 || warningCount >= 4) return 'medium';
  return 'low';
}

export function calculateTotalRepairCosts(rooms: WalkthroughRoom[]): { min: number; max: number } {
  let min = 0;
  let max = 0;

  rooms.forEach(room => {
    room.items.forEach(item => {
      if (item.estimatedRepairCost) {
        min += item.estimatedRepairCost.min;
        max += item.estimatedRepairCost.max;
      }
    });
  });

  return { min, max };
}
