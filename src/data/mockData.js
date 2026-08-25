// CocoCycle - Coconut & Areca Waste Marketplace Mock Data

export const INITIAL_USER_ROLES = {
  SELLER: {
    id: 'usr_seller_101',
    name: 'Kallada Agro-Coir Mill',
    role: 'seller',
    contactPerson: 'Ramesh Kumar',
    phone: '+91 98470 12345',
    email: 'ramesh@kalladaagro.com',
    company: 'Kallada Bio-Outputs Pvt Ltd',
    location: 'Pollachi, Tamil Nadu',
    pincode: '642001',
    verified: true,
    rating: 4.9,
    dealsCompleted: 42,
    totalTonsSold: 1280,
    avatar: '🌴'
  },
  BUYER: {
    id: 'usr_buyer_202',
    name: 'EcoTable Bio-Pack Corp',
    role: 'buyer',
    contactPerson: 'Ananya Sharma',
    phone: '+91 98110 54321',
    email: 'procurement@ecotable.in',
    company: 'EcoTable Solutions Inc.',
    location: 'Bengaluru, Karnataka',
    pincode: '560001',
    verified: true,
    rating: 4.8,
    dealsCompleted: 19,
    totalTonsProcured: 340,
    avatar: '🏬'
  },
  ADMIN: {
    id: 'usr_admin_001',
    name: 'CocoCycle Admin Ops',
    role: 'admin',
    contactPerson: 'Siddharth Nair',
    phone: '+91 99000 88888',
    email: 'admin@cococycle.io',
    company: 'CocoCycle Waste Exchange Core',
    location: 'Kochi, Kerala',
    pincode: '682001',
    verified: true,
    rating: 5.0,
    avatar: '⚡'
  }
};

export const WASTE_CATEGORIES = [
  { id: 'all', name: 'All Agro Waste', icon: 'Sparkles', count: 6 },
  { id: 'coconut_husk', name: 'Coconut Husk & Fibre', icon: 'Palmtree', count: 2, defaultUnit: 'Ton' },
  { id: 'coir_pith', name: 'Coir Pith / Coco Peat', icon: 'Layers', count: 1, defaultUnit: 'Ton' },
  { id: 'coconut_shell', name: 'Coconut Shells & Charcoal', icon: 'Flame', count: 1, defaultUnit: 'Ton' },
  { id: 'areca_sheath', name: 'Areca Sheaths / Leaves', icon: 'Leaf', count: 1, defaultUnit: 'Ton' },
  { id: 'areca_husk', name: 'Areca Outer Husk', icon: 'Box', count: 1, defaultUnit: 'Ton' },
  { id: 'tender_coconut', name: 'Tender Coconut Waste', icon: 'Recycle', count: 1, defaultUnit: 'Truckload' },
];

export const INITIAL_LISTINGS = [
  {
    id: 'lst_101',
    title: 'Sun-Dried Un-crushed Coconut Husks (High Fibre)',
    category: 'coconut_husk',
    categoryName: 'Coconut Husk',
    sellerId: 'usr_seller_101',
    sellerName: 'Kallada Agro-Coir Mill',
    sellerPhone: '+91 98470 12345',
    sellerVerified: true,
    sellerRating: 4.9,
    location: 'Pollachi, Tamil Nadu',
    pincode: '642001',
    quantity: 85,
    unit: 'Ton',
    minOrder: 5,
    pricePerUnit: 4200,
    condition: 'Dry',
    moisturePercent: 12,
    packaging: 'Baled',
    applications: ['Coir Mattress', 'Erosion Control Mats', 'Geotextiles'],
    images: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Premium quality sun-dried harvested coconut husks stored in moisture-controlled warehouse. Ideal for coir fibre extraction factories and bio-matting units.',
    status: 'approved',
    postedAt: '2 hours ago',
    featured: true
  },
  {
    id: 'lst_102',
    title: 'Raw Areca Sheaths / Leaf Plates Raw Material',
    category: 'areca_sheath',
    categoryName: 'Areca Sheath',
    sellerId: 'usr_seller_102',
    sellerName: 'Malnad Areca Producers Union',
    sellerPhone: '+91 97410 88990',
    sellerVerified: true,
    sellerRating: 4.8,
    location: 'Shivamogga, Karnataka',
    pincode: '577201',
    quantity: 25,
    unit: 'Ton',
    minOrder: 1,
    pricePerUnit: 18500,
    condition: 'Dry',
    moisturePercent: 8,
    packaging: 'Baled',
    applications: ['Eco Disposable Plates', 'Biodegradable Packaging', 'Takeaway Boxes'],
    images: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Freshly shed, fungus-free Areca sheaths sorted by thickness (>1.5mm). Perfect for high-speed eco-tableware heat pressing machines.',
    status: 'approved',
    postedAt: '5 hours ago',
    featured: true
  },
  {
    id: 'lst_103',
    title: 'Low-EC Washed Coir Pith / Coco Peat Blocks',
    category: 'coir_pith',
    categoryName: 'Coir Pith',
    sellerId: 'usr_seller_101',
    sellerName: 'Kallada Agro-Coir Mill',
    sellerPhone: '+91 98470 12345',
    sellerVerified: true,
    sellerRating: 4.9,
    location: 'Tirupur, Tamil Nadu',
    pincode: '641601',
    quantity: 150,
    unit: 'Ton',
    minOrder: 10,
    pricePerUnit: 9500,
    condition: 'Semi-Wet',
    moisturePercent: 18,
    packaging: 'Compressed Blocks',
    applications: ['Hydroponics Substrate', 'Greenhouse Mulch', 'Soil Conditioner'],
    images: [
      'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Triple-washed coco peat blocks with EC < 0.5 mS/cm. Expandable up to 75 Litres per 5kg block. Export specification tested.',
    status: 'approved',
    postedAt: '1 day ago',
    featured: false
  },
  {
    id: 'lst_104',
    title: 'Clean Half Coconut Shells for Activated Charcoal',
    category: 'coconut_shell',
    categoryName: 'Coconut Shell',
    sellerId: 'usr_seller_103',
    sellerName: 'Copra Traders Guild',
    sellerPhone: '+91 94471 22334',
    sellerVerified: true,
    sellerRating: 4.7,
    location: 'Kozhikode, Kerala',
    pincode: '673001',
    quantity: 40,
    unit: 'Ton',
    minOrder: 3,
    pricePerUnit: 11200,
    condition: 'Dry',
    moisturePercent: 9,
    packaging: 'Bagged',
    applications: ['Activated Carbon Plants', 'Hookah Charcoal Briquettes', 'Crafts'],
    images: [
      'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Thick-walled mature coconut shells obtained from oil copra processing mills. Low ash yield guaranteed.',
    status: 'approved',
    postedAt: '1 day ago',
    featured: true
  },
  {
    id: 'lst_105',
    title: 'Shredded Areca Husk Biomass Feedstock',
    category: 'areca_husk',
    categoryName: 'Areca Husk',
    sellerId: 'usr_seller_102',
    sellerName: 'Malnad Areca Producers Union',
    sellerPhone: '+91 97410 88990',
    sellerVerified: false,
    sellerRating: 4.5,
    location: 'Thirthahalli, Karnataka',
    pincode: '577432',
    quantity: 60,
    unit: 'Ton',
    minOrder: 5,
    pricePerUnit: 3100,
    condition: 'Semi-Wet',
    moisturePercent: 22,
    packaging: 'Loose',
    applications: ['Bio-pellets', 'Industrial Boiler Fuel', 'Mushroom Substrate'],
    images: [
      'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Cost-effective alternative biomass fuel for factory boilers and pelletization plants. High calorific value (~3800 kcal/kg).',
    status: 'approved',
    postedAt: '3 days ago',
    featured: false
  },
  {
    id: 'lst_106',
    title: 'Bulk Urban Tender Coconut Waste Shells',
    category: 'tender_coconut',
    categoryName: 'Tender Coconut Waste',
    sellerId: 'usr_seller_104',
    sellerName: 'Metropolitan Fruit Vendors Assn',
    sellerPhone: '+91 98860 11223',
    sellerVerified: false,
    sellerRating: 4.3,
    location: 'Mysuru, Karnataka',
    pincode: '570001',
    quantity: 15,
    unit: 'Truckload',
    minOrder: 1,
    pricePerUnit: 2500,
    condition: 'Wet',
    moisturePercent: 45,
    packaging: 'Loose',
    applications: ['Composting Units', 'Biogas Plants', 'Biochar Pyrolysis'],
    images: [
      'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Daily fresh tender coconut waste collected from street vendors. High organic content ideal for municipal biogas and vermicomposting projects.',
    status: 'pending_approval',
    postedAt: 'Just now',
    featured: false
  }
];

export const INITIAL_INQUIRIES = [
  {
    id: 'inq_9001',
    listingId: 'lst_102',
    listingTitle: 'Raw Areca Sheaths / Leaf Plates Raw Material',
    sellerId: 'usr_seller_102',
    sellerName: 'Malnad Areca Producers Union',
    buyerId: 'usr_buyer_202',
    buyerName: 'EcoTable Bio-Pack Corp',
    buyerPhone: '+91 98110 54321',
    requestedQuantity: 10,
    unit: 'Ton',
    offeredPricePerUnit: 18000,
    message: 'We require 10 tons of Grade A Areca Sheaths for our Bengaluru factory. Can you guarantee <9% moisture upon delivery?',
    status: 'pending',
    createdAt: '2026-08-23'
  },
  {
    id: 'inq_9002',
    listingId: 'lst_101',
    listingTitle: 'Sun-Dried Un-crushed Coconut Husks (High Fibre)',
    sellerId: 'usr_seller_101',
    sellerName: 'Kallada Agro-Coir Mill',
    buyerId: 'usr_buyer_202',
    buyerName: 'EcoTable Bio-Pack Corp',
    buyerPhone: '+91 98110 54321',
    requestedQuantity: 20,
    unit: 'Ton',
    offeredPricePerUnit: 4100,
    message: 'Interested in bulk trial order of 20 tons. Please share transportation timeline to Bengaluru.',
    status: 'accepted',
    createdAt: '2026-08-20'
  }
];

export const INITIAL_ORDERS = INITIAL_INQUIRIES;

export const INITIAL_MARKET_STATS = {
  totalTonsUpcycled: 12450,
  co2SavedTons: 9320,
  activeSellersCount: 340,
  activeBuyersCount: 180,
  avgResponseHours: 3.5
};

