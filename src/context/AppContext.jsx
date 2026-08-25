import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_USER_ROLES, 
  INITIAL_LISTINGS, 
  INITIAL_INQUIRIES, 
  INITIAL_MARKET_STATS 
} from '../data/mockData';
import { supabase } from '../lib/supabase';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 1. Session & Auth State
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // 2. Navigation / View State
  // Active tabs: 'landing' | 'marketplace' | 'create_listing' | 'seller_dashboard' | 'buyer_dashboard' | 'admin'
  const [activeTab, setActiveTab] = useState('marketplace');

  // 3. Modals State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null); // Listing detail modal
  const [inquiryListing, setInquiryListing] = useState(null);   // Buyer quote request modal

  // 4. Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all'); // 'all' | 'Dry' | 'Semi-Wet' | 'Wet'
  const [pincodeSearch, setPincodeSearch] = useState('');
  const [maxDistanceKm, setMaxDistanceKm] = useState(300);

  // 5. Listings State (Supabase Table + Local Fallback for Network Failure)
  const [dbListings, setDbListings] = useState([]);
  const [isListingsLoading, setIsListingsLoading] = useState(true);
  const [listingsError, setListingsError] = useState(null);

  const [localListings, setLocalListings] = useState(() => {
    const saved = localStorage.getItem('cococycle_listings');
    return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
  });

  // Saved / Favorited Listing IDs
  const [savedListingIds, setSavedListingIds] = useState(() => {
    const saved = localStorage.getItem('cococycle_saved');
    return saved ? JSON.parse(saved) : ['lst_101', 'lst_102'];
  });

  // 7. Toast Notifications
  const [toasts, setToasts] = useState([]);

  // Fetch Listings from Supabase public.listings with joined public.profiles
  const fetchListings = async () => {
    setIsListingsLoading(true);
    setListingsError(null);
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*, seller:profiles(full_name, company, phone, location, pincode, verified, rating, avatar)')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching listings from Supabase:', error);
        setListingsError(error.message);
      } else if (data) {
        const mapped = data.map((item) => {
          const sellerObj = item.seller || {};
          return {
            id: item.id,
            title: item.title,
            category: item.category,
            categoryName: item.category_name,
            sellerId: item.seller_id,
            sellerName: sellerObj.full_name || 'Agro Supplier',
            sellerPhone: sellerObj.phone || '',
            sellerVerified: sellerObj.verified ?? false,
            sellerRating: sellerObj.rating ?? 0,
            location: item.location,
            pincode: item.pincode,
            quantity: Number(item.quantity),
            unit: item.unit,
            minOrder: Number(item.min_order),
            pricePerUnit: Number(item.price_per_unit),
            condition: item.condition,
            moisturePercent: Number(item.moisture_percent),
            packaging: item.packaging,
            applications: item.applications || [],
            images: Array.isArray(item.images) && item.images.length > 0 ? item.images : ['https://images.unsplash.com/photo-1541480601022-2308c0f02487?auto=format&fit=crop&q=80&w=800'],
            description: item.description,
            status: item.status,
            featured: !!item.featured,
            postedAt: item.created_at ? new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recently'
          };
        });
        setDbListings(mapped);
      }
    } catch (err) {
      console.error('Unexpected error fetching listings:', err);
      setListingsError(err.message || 'Unknown error');
    } finally {
      setIsListingsLoading(false);
    }
  };

  // Initial Fetch on Mount
  useEffect(() => {
    fetchListings();
  }, []);

  // Use real DB listings if query succeeded (even if 0 rows). Fallback to localListings ONLY if query failed.
  const listings = listingsError ? localListings : dbListings;

  // Profile Fetcher Helper
  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user profile from public.profiles:', error);
      } else if (data) {
        setUserProfile(data);
      }
    } catch (err) {
      console.error('Unexpected error fetching profile:', err);
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Attach Supabase Auth State Change Listener & Restore Initial Session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setIsAuthLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      setSession(currentSession);
      if (currentSession?.user) {
        await fetchUserProfile(currentSession.user.id);
      } else {
        setUserProfile(null);
        setIsAuthLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Derived Auth Properties
  const isLoggedIn = !!session && !!session.user;

  // userRole MUST come from public.profiles.role (upper-cased)
  const userRole = userProfile?.role ? userProfile.role.toUpperCase() : 'BUYER';

  // Dynamic currentUser object derived from authenticated session & public.profiles row
  const currentUser = isLoggedIn ? {
    id: session.user.id,
    email: session.user.email,
    name: userProfile?.full_name || session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'CocoCycle User',
    company: userProfile?.company || '',
    phone: userProfile?.phone || '',
    pincode: userProfile?.pincode || '',
    location: userProfile?.location || '',
    avatar: userProfile?.avatar || (userRole === 'SELLER' ? '🌴' : userRole === 'ADMIN' ? '⚡' : '🏬'),
    role: userRole,
    verified: userProfile?.verified ?? false,
    rating: userProfile?.rating ?? 0
  } : null;

  // Persistence Effects for local mock state
  useEffect(() => {
    localStorage.setItem('cococycle_listings', JSON.stringify(localListings));
  }, [localListings]);

  useEffect(() => {
    localStorage.setItem('cococycle_saved', JSON.stringify(savedListingIds));
  }, [savedListingIds]);

  // Toast Notification Handlers
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Real Supabase Auth Actions
  const loginWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      addToast(`Sign in failed: ${error.message}`, 'error');
      return { success: false, error };
    }
    addToast(`Signed in successfully as ${data.user.email}!`, 'success');
    setIsAuthModalOpen(false);
    return { success: true, data };
  };

  const registerWithEmail = async (email, password, metadata = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: metadata.fullName || metadata.name || '',
          company: metadata.company || metadata.companyName || '',
          phone: metadata.phone || '',
          pincode: metadata.pincode || '',
          role: metadata.role ? metadata.role.toLowerCase() : 'buyer'
        }
      }
    });

    if (error) {
      addToast(`Registration failed: ${error.message}`, 'error');
      return { success: false, error };
    }

    addToast(`Account created for ${email}! Signed in to CocoCycle.`, 'success');
    setIsAuthModalOpen(false);
    return { success: true, data };
  };

  const loginDemoPersona = async (roleKey) => {
    const demoEmails = {
      BUYER: 'buyer@cococycle.io',
      SELLER: 'seller@cococycle.io',
      ADMIN: 'admin@cococycle.io'
    };

    const email = demoEmails[roleKey];
    if (!email) return { success: false, error: 'Unknown persona' };

    // Attempt sign in to pre-created account only
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: 'DemoPassword123!'
    });

    if (error) {
      addToast(`Demo ${roleKey} persona account (${email}) does not exist in Supabase. Please create it manually in Supabase Auth.`, 'warning');
      return { success: false, error };
    }

    addToast(`Logged in as Demo ${roleKey} Persona (${email})!`, 'success');
    setIsAuthModalOpen(false);

    if (roleKey === 'SELLER') setActiveTab('seller_dashboard');
    else if (roleKey === 'BUYER') setActiveTab('buyer_dashboard');
    else setActiveTab('admin');

    return { success: true, data };
  };

  const logoutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error during Supabase sign out:', error);
    }
    setSession(null);
    setUserProfile(null);
    addToast('Logged out of CocoCycle', 'info');
  };

  // Supabase RPC Profile Update Handler
  const updateProfile = async (profileData) => {
    if (!isLoggedIn || !session?.user) {
      addToast('You must be signed in to update your profile.', 'error');
      return { success: false, error: 'Unauthenticated' };
    }

    const p_full_name = profileData.name || profileData.fullName || currentUser?.name || '';
    const p_company = profileData.company || profileData.companyName || currentUser?.company || '';
    const p_phone = profileData.phone || currentUser?.phone || '';
    const p_pincode = profileData.pincode || currentUser?.pincode || '';
    const p_location = profileData.location || currentUser?.location || '';
    const p_avatar = profileData.avatar || currentUser?.avatar || '🌴';

    try {
      // Execute Supabase RPC call to update_my_profile SECURITY DEFINER function
      const { data, error } = await supabase.rpc('update_my_profile', {
        p_full_name,
        p_company,
        p_phone,
        p_pincode,
        p_location,
        p_avatar
      });

      if (error) {
        console.error('Error updating profile via Supabase RPC update_my_profile:', error);
        addToast(`Profile update failed: ${error.message}`, 'error');
        return { success: false, error };
      }

      // Re-fetch updated profile from database
      await fetchUserProfile(session.user.id);

      addToast('Profile updated successfully!', 'success');
      return { success: true, data };
    } catch (err) {
      console.error('Unexpected error calling update_my_profile RPC:', err);
      addToast(`Error updating profile: ${err.message || 'Unknown error'}`, 'error');
      return { success: false, error: err };
    }
  };

  // Listing Handlers (Supabase public.listings Integration)
  const addListing = async (newListingData) => {
    if (!isLoggedIn || !session?.user) {
      addToast('Sign in required to post a waste listing.', 'error');
      return { success: false, error: 'Unauthenticated' };
    }

    const payload = {
      seller_id: session.user.id,
      title: newListingData.title,
      category: newListingData.category,
      category_name: newListingData.categoryName || 'Agricultural Waste',
      description: newListingData.description,
      quantity: Number(newListingData.quantity),
      unit: newListingData.unit || 'Ton',
      min_order: Number(newListingData.minOrder || 1),
      price_per_unit: Number(newListingData.pricePerUnit),
      condition: newListingData.condition || 'Dry',
      moisture_percent: Number(newListingData.moisturePercent || 10),
      packaging: newListingData.packaging || 'Baled',
      pincode: newListingData.pincode,
      location: newListingData.location,
      images: newListingData.images || [],
      applications: newListingData.applications || []
    };

    const { data, error } = await supabase.from('listings').insert([payload]).select();

    if (error) {
      console.error('Error inserting listing into Supabase:', error);
      addToast(`Failed to post listing: ${error.message}`, 'error');
      return { success: false, error };
    }

    addToast(`Listing "${newListingData.title}" posted successfully! Awaiting moderation.`, 'success');
    await fetchListings();
    setActiveTab('marketplace');
    return { success: true, data };
  };

  const updateListing = async (listingId, updatedFields) => {
    if (!isLoggedIn || !session?.user) {
      addToast('Sign in required to update listing.', 'error');
      return { success: false, error: 'Unauthenticated' };
    }

    const payload = {};
    if (updatedFields.title !== undefined) payload.title = updatedFields.title;
    if (updatedFields.description !== undefined) payload.description = updatedFields.description;
    if (updatedFields.quantity !== undefined) payload.quantity = Number(updatedFields.quantity);
    if (updatedFields.pricePerUnit !== undefined) payload.price_per_unit = Number(updatedFields.pricePerUnit);
    if (updatedFields.minOrder !== undefined) payload.min_order = Number(updatedFields.minOrder);
    if (updatedFields.condition !== undefined) payload.condition = updatedFields.condition;
    if (updatedFields.moisturePercent !== undefined) payload.moisture_percent = Number(updatedFields.moisturePercent);
    if (updatedFields.packaging !== undefined) payload.packaging = updatedFields.packaging;
    if (updatedFields.pincode !== undefined) payload.pincode = updatedFields.pincode;
    if (updatedFields.location !== undefined) payload.location = updatedFields.location;

    const { error } = await supabase.from('listings').update(payload).eq('id', listingId);

    if (error) {
      console.error('Error updating listing in Supabase:', error);
      addToast(`Failed to update listing: ${error.message}`, 'error');
      return { success: false, error };
    }

    addToast('Listing updated successfully', 'success');
    await fetchListings();
    return { success: true };
  };

  const toggleSaveListing = (listingId) => {
    setSavedListingIds((prev) => {
      const isSaved = prev.includes(listingId);
      if (isSaved) {
        addToast('Removed listing from saved items', 'info');
        return prev.filter((id) => id !== listingId);
      } else {
        addToast('Saved listing to your favorites!', 'success');
        return [...prev, listingId];
      }
    });
  };

  // Admin Moderation Handlers
  const approveListing = async (listingId) => {
    if (userRole !== 'ADMIN') {
      addToast('Admin authorization required', 'error');
      return;
    }
    const { error } = await supabase.from('listings').update({ status: 'approved' }).eq('id', listingId);
    if (error) {
      console.error('Error approving listing:', error);
      addToast(`Failed to approve listing: ${error.message}`, 'error');
      return;
    }
    addToast(`Listing approved for public marketplace!`, 'success');
    await fetchListings();
  };

  const flagListing = async (listingId) => {
    if (userRole !== 'ADMIN') {
      addToast('Admin authorization required', 'error');
      return;
    }
    const { error } = await supabase.from('listings').update({ status: 'flagged' }).eq('id', listingId);
    if (error) {
      console.error('Error flagging listing:', error);
      addToast(`Failed to flag listing: ${error.message}`, 'error');
      return;
    }
    addToast(`Listing flagged for review`, 'warning');
    await fetchListings();
  };

  const featureListing = async (listingId) => {
    if (userRole !== 'ADMIN') {
      addToast('Admin authorization required', 'error');
      return;
    }
    const target = listings.find((item) => item.id === listingId);
    if (!target) return;
    const nextFeatured = !target.featured;

    const { error } = await supabase.from('listings').update({ featured: nextFeatured }).eq('id', listingId);
    if (error) {
      console.error('Error featuring listing:', error);
      addToast(`Failed to update featured status: ${error.message}`, 'error');
      return;
    }
    addToast(nextFeatured ? `Listing featured on marketplace carousel!` : `Listing unfeatured`, 'success');
    await fetchListings();
  };

  const rejectListing = async (listingId) => {
    if (userRole !== 'ADMIN') {
      addToast('Admin authorization required', 'error');
      return;
    }
    const { error } = await supabase.from('listings').update({ status: 'rejected' }).eq('id', listingId);
    if (error) {
      console.error('Error rejecting listing:', error);
      addToast(`Failed to reject listing: ${error.message}`, 'error');
      return;
    }
    addToast(`Listing rejected`, 'info');
    await fetchListings();
  };

  const deleteListing = async (listingId) => {
    const { error } = await supabase.from('listings').delete().eq('id', listingId);
    if (error) {
      console.error('Error deleting listing from Supabase:', error);
      addToast(`Failed to delete listing: ${error.message}`, 'error');
      return;
    }
    addToast(`Listing removed from platform`, 'info');
    await fetchListings();
  };

  // 6. Inquiries / RFQs State (Supabase Table + Local Fallback for Network Failure)
  const [dbInquiries, setDbInquiries] = useState([]);
  const [isInquiriesLoading, setIsInquiriesLoading] = useState(true);
  const [inquiriesError, setInquiriesError] = useState(null);

  const [localInquiries, setLocalInquiries] = useState(() => {
    const saved = localStorage.getItem('cococycle_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  // Fetch Inquiries from Supabase public.inquiries
  const fetchInquiries = async () => {
    if (!isLoggedIn || !session?.user) {
      setDbInquiries([]);
      setIsInquiriesLoading(false);
      return;
    }

    setIsInquiriesLoading(true);
    setInquiriesError(null);
    try {
      const query = userRole === 'SELLER'
        ? supabase.from('inquiries').select('*, listing:listings(title, category_name, unit, price_per_unit, images), buyer:profiles!buyer_id(full_name, company, phone, location, pincode, verified, rating, avatar)').eq('seller_id', session.user.id)
        : supabase.from('inquiries').select('*, listing:listings(title, category_name, unit, price_per_unit, images), seller:profiles!seller_id(full_name, company, phone, location, pincode, verified, rating, avatar)').eq('buyer_id', session.user.id);

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching inquiries from Supabase:', error);
        setInquiriesError(error.message);
      } else if (data) {
        const mapped = data.map((item) => {
          const listingObj = item.listing || {};
          const buyerObj = item.buyer || {};
          const sellerObj = item.seller || {};

          return {
            id: item.id,
            listingId: item.listing_id,
            listingTitle: listingObj.title || 'Agricultural Waste Supply',
            sellerId: item.seller_id,
            sellerName: sellerObj.full_name || 'Agro Seller',
            sellerPhone: sellerObj.phone || '',
            buyerId: item.buyer_id,
            buyerName: buyerObj.full_name || 'Procurement Buyer',
            buyerCompany: buyerObj.company || 'Bio-Pack Corp',
            buyerPhone: buyerObj.phone || '',
            requestedQuantity: Number(item.requested_quantity),
            unit: item.unit,
            offeredPricePerUnit: Number(item.offered_price_per_unit),
            totalAmount: Number(item.total_amount || (item.requested_quantity * item.offered_price_per_unit)),
            deliveryLocation: item.delivery_location,
            expectedDeliveryDate: item.expected_delivery_date,
            message: item.message || '',
            status: item.status,
            createdAt: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : 'Just now'
          };
        });
        setDbInquiries(mapped);
      }
    } catch (err) {
      console.error('Unexpected error fetching inquiries:', err);
      setInquiriesError(err.message || 'Unknown error');
    } finally {
      setIsInquiriesLoading(false);
    }
  };

  // Re-fetch inquiries when session or userRole changes
  useEffect(() => {
    if (isLoggedIn && session?.user) {
      fetchInquiries();
    } else {
      setDbInquiries([]);
    }
  }, [isLoggedIn, session?.user, userRole]);

  // Use real DB inquiries if query succeeded. Fallback to localInquiries ONLY if query failed.
  const inquiries = inquiriesError ? localInquiries : dbInquiries;

  useEffect(() => {
    localStorage.setItem('cococycle_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Buyer Inquiry / RFQ Handlers
  const submitRFQ = async (listing, requestedQuantity, offeredPricePerUnit, deliveryLocation, expectedDeliveryDate, message) => {
    if (!isLoggedIn || !session?.user) {
      addToast('Sign in required to submit a quote request.', 'error');
      return { success: false, error: 'Unauthenticated' };
    }

    const payload = {
      listing_id: listing.id,
      seller_id: listing.sellerId,
      buyer_id: session.user.id,
      requested_quantity: Number(requestedQuantity),
      unit: listing.unit || 'Ton',
      offered_price_per_unit: Number(offeredPricePerUnit),
      delivery_location: deliveryLocation,
      expected_delivery_date: expectedDeliveryDate,
      message: message || ''
    };

    const { data, error } = await supabase.from('inquiries').insert([payload]).select();

    if (error) {
      console.error('Error inserting inquiry into Supabase:', error);
      addToast(`Failed to send RFQ: ${error.message}`, 'error');
      return { success: false, error };
    }

    addToast(`RFQ sent successfully to ${listing.sellerName}!`, 'success');
    setInquiryListing(null);
    await fetchInquiries();
    return { success: true, data };
  };

  const updateInquiryStatus = async (inquiryId, newStatus) => {
    if (!isLoggedIn || !session?.user) {
      addToast('Sign in required to update quote status.', 'error');
      return { success: false, error: 'Unauthenticated' };
    }

    const { error } = await supabase
      .from('inquiries')
      .update({ status: newStatus })
      .eq('id', inquiryId);

    if (error) {
      console.error('Error updating inquiry status in Supabase:', error);
      addToast(`Failed to update inquiry status: ${error.message}`, 'error');
      return { success: false, error };
    }

    addToast(`Inquiry status updated to "${newStatus}"`, 'info');
    await fetchInquiries();
    return { success: true };
  };

  const value = {
    // Auth & User
    session,
    userRole,
    currentUser,
    isLoggedIn,
    isAuthLoading,
    loginWithEmail,
    registerWithEmail,
    loginDemoPersona,
    logoutUser,
    updateProfile,

    // Tabs & Navigation
    activeTab,
    setActiveTab,

    // Modals
    isAuthModalOpen,
    setIsAuthModalOpen,
    isEditProfileOpen,
    setIsEditProfileOpen,
    selectedListing,
    setSelectedListing,
    inquiryListing,
    setInquiryListing,

    // Filters
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedCondition,
    setSelectedCondition,
    pincodeSearch,
    setPincodeSearch,
    maxDistanceKm,
    setMaxDistanceKm,

    // Listings
    listings,
    setListings,
    savedListingIds,
    toggleSaveListing,
    addListing,
    updateListing,
    approveListing,
    flagListing,
    featureListing,
    rejectListing,
    deleteListing,

    // Inquiries / RFQs
    inquiries,
    setInquiries,
    orders: inquiries, // Backward compatibility alias for Header/App
    submitRFQ,
    updateInquiryStatus,

    // Toasts
    toasts,
    addToast,
    removeToast,

    // Market Stats
    marketStats: INITIAL_MARKET_STATS
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
