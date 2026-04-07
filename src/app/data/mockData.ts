export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: 'new' | 'contacted' | 'site-visit' | 'negotiation' | 'booked' | 'lost';
  source: string;
  project: string;
  budget: string;
  assignedAgent: string;
  createdAt: string;
  lastActivity: string;
  activities: Activity[];
}

export interface Activity {
  id: string;
  type: 'call' | 'whatsapp' | 'email' | 'visit' | 'note';
  description: string;
  timestamp: string;
  agentName: string;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  type: string;
  towers: number;
  totalUnits: number;
  availableUnits: number;
  priceRange: string;
  image: string;
}

export interface Unit {
  id: string;
  unitNumber: string;
  tower: string;
  floor: number;
  bhk: string;
  area: string;
  price: string;
  status: 'available' | 'blocked' | 'booked' | 'sold';
}

export interface Agent {
  id: string;
  name: string;
  phone: string;
  email: string;
  leadsAssigned: number;
  dealsWon: number;
  revenue: string;
  avatar?: string;
}

export interface Booking {
  id: string;
  leadName: string;
  unitNumber: string;
  project: string;
  totalAmount: string;
  paidAmount: string;
  bookingDate: string;
  status: 'pending' | 'partial' | 'completed';
  nextPaymentDate?: string;
  nextPaymentAmount?: string;
}

export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@email.com',
    status: 'negotiation',
    source: 'Website',
    project: 'Skyline Heights',
    budget: '₹45-50 Lakhs',
    assignedAgent: 'Priya Sharma',
    createdAt: '2026-04-01',
    lastActivity: '2 hours ago',
    activities: [
      { id: 'a1', type: 'call', description: 'Discussed payment plan options', timestamp: '2026-04-07 10:30 AM', agentName: 'Priya Sharma' },
      { id: 'a2', type: 'visit', description: 'Site visit completed - showed 2BHK units', timestamp: '2026-04-05 3:00 PM', agentName: 'Priya Sharma' },
      { id: 'a3', type: 'whatsapp', description: 'Sent project brochure', timestamp: '2026-04-03 11:15 AM', agentName: 'Priya Sharma' },
    ],
  },
  {
    id: '2',
    name: 'Sneha Patel',
    phone: '+91 87654 32109',
    email: 'sneha.patel@email.com',
    status: 'site-visit',
    source: 'Facebook Ads',
    project: 'Green Valley Residency',
    budget: '₹60-70 Lakhs',
    assignedAgent: 'Amit Singh',
    createdAt: '2026-04-03',
    lastActivity: '1 day ago',
    activities: [
      { id: 'a4', type: 'whatsapp', description: 'Confirmed site visit for tomorrow', timestamp: '2026-04-06 5:00 PM', agentName: 'Amit Singh' },
      { id: 'a5', type: 'call', description: 'Initial call - interested in 3BHK', timestamp: '2026-04-04 2:30 PM', agentName: 'Amit Singh' },
    ],
  },
  {
    id: '3',
    name: 'Arjun Reddy',
    phone: '+91 76543 21098',
    email: 'arjun.reddy@email.com',
    status: 'contacted',
    source: '99acres',
    project: 'Skyline Heights',
    budget: '₹40-45 Lakhs',
    assignedAgent: 'Priya Sharma',
    createdAt: '2026-04-05',
    lastActivity: '3 hours ago',
    activities: [
      { id: 'a6', type: 'call', description: 'First contact call - discussed project details', timestamp: '2026-04-07 9:00 AM', agentName: 'Priya Sharma' },
    ],
  },
  {
    id: '4',
    name: 'Meera Desai',
    phone: '+91 65432 10987',
    email: 'meera.desai@email.com',
    status: 'new',
    source: 'Walk-in',
    project: 'Urban Heights',
    budget: '₹55-60 Lakhs',
    assignedAgent: 'Amit Singh',
    createdAt: '2026-04-07',
    lastActivity: 'Just now',
    activities: [],
  },
  {
    id: '5',
    name: 'Vikram Mehta',
    phone: '+91 54321 09876',
    email: 'vikram.mehta@email.com',
    status: 'booked',
    source: 'Referral',
    project: 'Green Valley Residency',
    budget: '₹70-75 Lakhs',
    assignedAgent: 'Priya Sharma',
    createdAt: '2026-03-15',
    lastActivity: '5 days ago',
    activities: [
      { id: 'a7', type: 'note', description: 'Booking completed - Unit B-504', timestamp: '2026-04-02 4:00 PM', agentName: 'Priya Sharma' },
      { id: 'a8', type: 'visit', description: 'Final unit inspection', timestamp: '2026-03-30 11:00 AM', agentName: 'Priya Sharma' },
    ],
  },
];

export const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Skyline Heights',
    location: 'Whitefield, Bangalore',
    type: 'Residential',
    towers: 3,
    totalUnits: 240,
    availableUnits: 85,
    priceRange: '₹42-68 Lakhs',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
  },
  {
    id: '2',
    name: 'Green Valley Residency',
    location: 'Hinjewadi, Pune',
    type: 'Residential',
    towers: 2,
    totalUnits: 160,
    availableUnits: 42,
    priceRange: '₹55-85 Lakhs',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
  },
  {
    id: '3',
    name: 'Urban Heights',
    location: 'Gachibowli, Hyderabad',
    type: 'Residential',
    towers: 4,
    totalUnits: 320,
    availableUnits: 125,
    priceRange: '₹48-72 Lakhs',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
  },
  {
    id: '4',
    name: 'Royal Plaza',
    location: 'Navi Mumbai, Mumbai',
    type: 'Commercial',
    towers: 1,
    totalUnits: 80,
    availableUnits: 18,
    priceRange: '₹95L-1.8Cr',
    image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800',
  },
];

export const mockUnits: Unit[] = [
  { id: 'u1', unitNumber: 'A-101', tower: 'A', floor: 1, bhk: '2BHK', area: '1050 sqft', price: '₹45.5L', status: 'available' },
  { id: 'u2', unitNumber: 'A-102', tower: 'A', floor: 1, bhk: '2BHK', area: '1050 sqft', price: '₹45.5L', status: 'blocked' },
  { id: 'u3', unitNumber: 'A-201', tower: 'A', floor: 2, bhk: '2BHK', area: '1050 sqft', price: '₹46.2L', status: 'available' },
  { id: 'u4', unitNumber: 'A-202', tower: 'A', floor: 2, bhk: '2BHK', area: '1050 sqft', price: '₹46.2L', status: 'sold' },
  { id: 'u5', unitNumber: 'A-301', tower: 'A', floor: 3, bhk: '3BHK', area: '1450 sqft', price: '₹62.8L', status: 'available' },
  { id: 'u6', unitNumber: 'A-302', tower: 'A', floor: 3, bhk: '3BHK', area: '1450 sqft', price: '₹62.8L', status: 'booked' },
  { id: 'u7', unitNumber: 'B-101', tower: 'B', floor: 1, bhk: '2BHK', area: '1100 sqft', price: '₹47.3L', status: 'available' },
  { id: 'u8', unitNumber: 'B-102', tower: 'B', floor: 1, bhk: '2BHK', area: '1100 sqft', price: '₹47.3L', status: 'available' },
];

export const mockAgents: Agent[] = [
  { id: '1', name: 'Priya Sharma', phone: '+91 98765 00001', email: 'priya.sharma@realestate.com', leadsAssigned: 24, dealsWon: 8, revenue: '₹3.2 Cr' },
  { id: '2', name: 'Amit Singh', phone: '+91 98765 00002', email: 'amit.singh@realestate.com', leadsAssigned: 18, dealsWon: 5, revenue: '₹2.1 Cr' },
  { id: '3', name: 'Kavita Nair', phone: '+91 98765 00003', email: 'kavita.nair@realestate.com', leadsAssigned: 21, dealsWon: 7, revenue: '₹2.8 Cr' },
  { id: '4', name: 'Rohit Verma', phone: '+91 98765 00004', email: 'rohit.verma@realestate.com', leadsAssigned: 15, dealsWon: 4, revenue: '₹1.6 Cr' },
];

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    leadName: 'Vikram Mehta',
    unitNumber: 'B-504',
    project: 'Green Valley Residency',
    totalAmount: '₹72,50,000',
    paidAmount: '₹25,00,000',
    bookingDate: '2026-04-02',
    status: 'partial',
    nextPaymentDate: '2026-05-02',
    nextPaymentAmount: '₹15,00,000',
  },
  {
    id: 'b2',
    leadName: 'Anita Deshmukh',
    unitNumber: 'A-301',
    project: 'Skyline Heights',
    totalAmount: '₹62,80,000',
    paidAmount: '₹62,80,000',
    bookingDate: '2026-03-25',
    status: 'completed',
  },
  {
    id: 'b3',
    leadName: 'Suresh Iyer',
    unitNumber: 'C-702',
    project: 'Urban Heights',
    totalAmount: '₹58,20,000',
    paidAmount: '₹15,00,000',
    bookingDate: '2026-04-05',
    status: 'partial',
    nextPaymentDate: '2026-04-20',
    nextPaymentAmount: '₹20,00,000',
  },
];

export const leadStatusColors = {
  new: 'bg-blue-500',
  contacted: 'bg-purple-500',
  'site-visit': 'bg-yellow-500',
  negotiation: 'bg-orange-500',
  booked: 'bg-green-500',
  lost: 'bg-red-500',
};

export const unitStatusColors = {
  available: 'bg-green-500',
  blocked: 'bg-yellow-500',
  booked: 'bg-orange-500',
  sold: 'bg-gray-500',
};
