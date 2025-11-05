import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, ArrowRight, Home, Layout, CookingPot, Leaf, Building, Phone, Mail, MapPin } from 'lucide-react';
import axios from 'axios';



// 2. Mock Data Structure (This data would come directly from your backend API)
const mockImagesData = {
  Bedroom: [
    { id: 1, url: "https://placehold.co/600x400/1E3A8A/ffffff?text=Luxury+Suite", title: "Luxury Suite", category: "Bedroom" },
    { id: 2, url: "https://placehold.co/600x400/4B5563/ffffff?text=Minimalist+Sleep", title: "Minimalist Sleep", category: "Bedroom" },
    { id: 3, url: "https://placehold.co/600x400/064E3B/ffffff?text=Earthy+Comfort", title: "Earthy Comfort", category: "Bedroom" },
    { id: 4, url: "https://placehold.co/600x400/374151/ffffff?text=Urban+Design", title: "Urban Design", category: "Bedroom" },
  ],
  'Living Room': [
    { id: 5, url: "https://placehold.co/600x400/92400E/000000?text=Opulent+Lounge", title: "Opulent Lounge", category: "Living Room" },
    { id: 6, url: "https://placehold.co/600x400/1F2937/ffffff?text=Contemporary+Sectional", title: "Contemporary Sectional", category: "Living Room" },
    { id: 7, url: "https://placehold.co/600x400/6B7280/000000?text=Industrial+Chic", title: "Industrial Chic", category: "Living Room" },
  ],
  Kitchen: [
    { id: 8, url: "https://placehold.co/600x400/4338CA/ffffff?text=Smart+Kitchen", title: "Smart Kitchen", category: "Kitchen" },
    { id: 9, url: "https://placehold.co/600x400/111827/ffffff?text=Black+Granite+Island", title: "Black Granite Island", category: "Kitchen" },
  ],
  Mandir: [
    { id: 10, url: "https://placehold.co/600x400/D97706/000000?text=Gold+Accents", title: "Gold Accents Mandir", category: "Mandir" },
    { id: 11, url: "https://placehold.co/600x400/65A30D/000000?text=Teak+Wood+Carving", title: "Teak Wood Carving", category: "Mandir" },
  ],
};

// 3. Placeholder for Axios (To maintain the correct async structure for the fetchImages function)
// In a real app, you would replace this entire object with the actual axios import.
const mockAxios = {
  get: (url) => {
    // Simulate network delay for a realistic loading experience
    return new Promise(resolve => {
      setTimeout(() => {
        const params = new URLSearchParams(url.split('?')[1]);
        const category = params.get('category') || 'All';
        const limit = parseInt(params.get('limit') || '4', 10);
        
        let images = mockImagesData[category] ? mockImagesData[category].slice(0, limit) : [];

        resolve({
          data: {
            success: true,
            images: images,
            total: images.length * 2,
            totalPages: 2,
          }
        });
      }, 500); 
    });
  }
};
// --- END PRODUCTION SETUP SIMULATION --url

// --- CORE COMPONENTS ---

// Card Component with elegant hover effects
const DesignCard = ({ image }) => (
  <div className="group relative overflow-hidden rounded-xl shadow-2xl shadow-black/70 h-64 w-80 md:w-96 flex-shrink-0 cursor-pointer transition-transform duration-500 hover:scale-[1.03]">
    <img 
      src={image.url} 
    //   alt={image.title} 
      className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-70"
      onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/111111/D1D5DB?text=Image+Missing`; }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex items-end">
      {/* <h3 className="text-white text-xl font-bold opacity-0 transition-opacity duration-300 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
        {image.title}
      </h3> */}
    </div>
    <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-100 uppercase border border-white/20">
      {image.category}
    </div>
  </div>
);

// Slider Section Component
const ImageSlider = ({ title, category, images, isLoading, onNavigate }) => {
  const isLoaded = !isLoading && images.length > 0;
  
  const handleViewMore = () => {
    // Simulate navigation to the /user page
    onNavigate(category);
  };

  return (
    // SECONDARY BACKGROUND: Deep Gray
    <section id={category.toLowerCase().replace(' ', '')} className="py-16 md:py-24 bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 border-l-4 border-amber-500 pl-4 tracking-tight">
          {title} <span className="text-amber-500">Designs</span>
        </h2>
        <p className="text-lg text-gray-400 mb-12 max-w-2xl">
          Explore our exclusive collection of **{category}** interiors, showcasing dark elegance and functionality.
        </p>

        {/* Horizontal Scroll Area */}
        <div className="flex overflow-x-scroll snap-x space-x-6 pb-4 scrollbar-hide">
          {isLoading && 
            [1, 2, 3].map(i => (
              <div key={i} className="animate-pulse bg-gray-800 rounded-xl h-64 w-80 md:w-96 flex-shrink-0"></div>
            ))
          }

          {isLoaded && images.map(image => (
            <DesignCard key={image.id} image={image} />
          ))}

          {/* View More Button Card */}
          <div className="snap-start flex-shrink-0 w-80 md:w-96 h-64 flex items-center justify-center">
            <button 
              onClick={handleViewMore}
              className="group flex items-center justify-center p-6 w-full h-5/6 rounded-xl border-4 border-dashed border-amber-600 text-amber-500 transition-all duration-300 hover:bg-amber-600 hover:text-black hover:shadow-2xl hover:shadow-amber-900/70 hover:scale-[1.05]"
            >
              <span className="flex flex-col items-center">
                <span className="text-2xl font-bold mb-2">View More Designs</span>
                <span className="text-sm flex items-center">
                  Discover the full {category} gallery <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};


// --- MAIN APP COMPONENT ---
const Mainhome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // Used to simulate navigation
const [imagesData, setImagesData] = useState({
    Bedroom: [],
    "Living Room": [],
    Kitchen: [],
    Mandir: [],
  });    
    

 
  const [loading, setLoading] = useState(true);

   
  
  useEffect(() => {
   const fetchImages = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/client/allimages`);
    console.log(res.data);

    // make sure it's an array
     const images = Array.isArray(res.data.images) ? res.data.images : [];

    // create category buckets
    const categorized = {
      Bedroom: [],
      "Living Room": [],
      Kitchen: [],
      Mandir: [],
    };

    // filter & push
    images.forEach((img) => {
      if (Array.isArray(img.categories)) {
        img.categories.forEach((cat) => {
          if (categorized[cat]) {
            categorized[cat].push({
              url: img.url,
              category: cat,
            });
          }
        });
      }
    });

    // ✅ set the categorized data
    setImagesData(categorized);
      console.log("✅ categorized:", categorized);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching images:", error);
    setLoading(false);
  }
};

    fetchImages();
  }, []);
 

  // Handle simulated navigation (kept the alert/no-alert structure)
  const handleNavigation = (category) => {
    console.log("Navigating to:", category);
  };
  
  // Components for each main section
  const sections = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: Layout, label: 'About Us' },
    { id: 'bedroom', icon: Building, label: 'Bedroom' },
    { id: 'livingroom', icon: Building, label: 'Living Room' },
    { id: 'kitchen', icon: CookingPot, label: 'Kitchen' },
    { id: 'mandir', icon: Leaf, label: 'Mandir' },
    { id: 'contact', icon: Phone, label: 'Contact' },
  ];
  
  // Custom Hook for Scroll Animation (sticky header)
  const useScrollEffect = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return isScrolled;
  };

  const isScrolled = useScrollEffect();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // If we were to implement the /user view:
  if (currentView !== 'home') {
    return (
        // Deep Gray Background with Gold accent
        <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-amber-500 mb-4">User Dashboard (Gallery View)</h1>
            <p className="text-lg text-gray-400 mb-8">This is the dedicated gallery page triggered by "View More" for a category.</p>
            <button
                onClick={() => setCurrentView('home')}
                className="px-6 py-3 bg-amber-600 text-black rounded-lg shadow-xl shadow-amber-900/50 hover:bg-amber-700 transition duration-300 flex items-center"
            >
                <ArrowRight className="w-5 h-5 mr-2 rotate-180" /> Back to Home
            </button>
        </div>
    );
  }


  return (
    // PRIMARY BACKGROUND: Very Deep Gray (Near Black)
    <div className="min-h-screen bg-gray-950 text-gray-100 font-['Inter']">
      
      {/* 1. Navigation Bar (Dark & Sticky) */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-950/90 backdrop-blur-md shadow-2xl shadow-black/70 py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-3xl font-extrabold text-white flex items-center">
            <span className="text-amber-500 italic">Amit</span> 
            <span className="ml-1 tracking-tight">Interiors</span>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden lg:flex space-x-8">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="text-gray-300 hover:text-amber-400 font-medium transition duration-300 relative group"
              >
                {section.label}
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </button>
            ))}
          </nav>

          {/* Contact CTA */}
          <button 
            onClick={() => scrollToSection('contact')}
            className="hidden lg:block px-6 py-2 bg-amber-600 text-black font-semibold rounded-full shadow-md shadow-amber-700/50 transition duration-300 hover:bg-amber-700 transform hover:scale-105"
          >
            Get a Quote
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-white p-2 rounded-lg hover:bg-gray-800 transition duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Panel (Slide-in Effect) */}
        <div 
          className={`lg:hidden fixed inset-x-0 top-[68px] bg-gray-900 shadow-xl transition-transform duration-300 ease-out transform ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}
        >
          <nav className="p-4 flex flex-col space-y-2">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="flex items-center space-x-3 p-3 text-lg text-gray-200 hover:bg-gray-800 rounded-lg transition duration-200"
              >
                <section.icon className="w-5 h-5 text-amber-500" />
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>
      
      <main>
        
        {/* 2. Hero Section (High Impact) */}
        <section id="home" className="relative h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background Image/Video Placeholder with Parallax-like Effect */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000" 
            style={{ 
              // Placeholder image with black and gold theme
              backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
              backgroundAttachment: 'fixed'
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          
          {/* Hero Content */}
          <div className="relative z-10 text-center p-6 max-w-4xl text-white animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg tracking-tighter leading-tight">
              Crafting <span className="text-amber-400 italic">Spaces</span>, Defining <span className="text-amber-400 italic">Lifestyles</span>.
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light drop-shadow-md text-gray-300">
              <span className='font-semibold text-white'> Amit Interiors:</span> Where innovation meets <b className='font-semibold text-white' >timeless elegance</b> in every corner.
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-amber-600 text-black text-lg font-semibold rounded-full shadow-xl shadow-amber-500/50 transition duration-300 transform hover:scale-105 hover:bg-amber-700"
              >
                Start Your Project
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="px-8 py-3 border-2 border-white text-white text-lg font-semibold rounded-full bg-white/20 backdrop-blur-sm transition duration-300 transform hover:scale-105 hover:bg-white/30 hover:text-white"
              >
                Our Vision
              </button>
            </div>
          </div>
        </section>

        
        {/* 3. About Section (Clean & Focused) */}
        <section id="about" className="py-24 bg-gray-900">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <p className="text-sm font-semibold uppercase text-amber-500 mb-2">Who We Are</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                Design Philosophy: <span className="text-amber-500">Form Meets Function</span>
              </h2>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                For over a decade,<span className='font-semibold text-white'> Amit Interiors</span> team's vision has been to  bring the warmth and soul of Indian design into every home. From earthy tones to intricate details, we strive to reflect the essence of India’s culture — creating spaces that feel personal, lively, and truly yours.
              </p>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed border-l-4 border-amber-400 pl-4 italic">
                "Every great design begins with an even better story."
              </p>
             
            </div>
            
            <div className="lg:w-1/2 relative">
                <div className="aspect-video w-full rounded-2xl shadow-2xl shadow-black/70 overflow-hidden transform transition duration-500 hover:scale-[1.01]">
                    <img 
                        src="https://placehold.co/800x600/0A0A0A/FFBF00?text=Our+Design+Studio" 
                        alt="Amit Interiors Studio" 
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* Accent box using amber */}
                <div className="absolute -bottom-4 -right-4 bg-amber-600 text-black p-4 rounded-xl shadow-xl shadow-amber-900/50 font-bold text-xl transform rotate-3">
                    10+ Years of Excellence
                </div>
            </div>
          </div>
        </section>

        {/* 4. Category Sliders */}
        
        {/* The loading state is managed by the main 'loading' state */}
        
        <ImageSlider 
  title="Dream" 
  category="Bedroom" 
  images={imagesData.Bedroom} 
  isLoading={loading}
  onNavigate={handleNavigation}
/>

 <ImageSlider 
  title="Opulent" 
  category="Living Room" 
  images={imagesData['Living Room']} 
  isLoading={loading}
  onNavigate={handleNavigation}
/>

<ImageSlider 
  title="Gourmet" 
  category="Kitchen" 
  images={imagesData.Kitchen} 
  isLoading={loading}
  onNavigate={handleNavigation}
/> 

<ImageSlider 
  title="Serene" 
  category="Mandir" 
  images={imagesData.Mandir} 
  isLoading={loading}
  onNavigate={handleNavigation}
/> 

        {/* 5. Contact Section */}
        <section id="contact" className="py-24 bg-gray-950 text-white">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-extrabold mb-6 border-l-4 border-amber-500 pl-4">
                Get in <span className="text-amber-500">Touch</span>
              </h2>
              <p className="mb-8 text-gray-400 text-lg">
                Let's discuss your next dream project. We are ready to transform your space.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                  <div className="ml-4">
                    <p className="font-semibold">Email</p>
                    <a href="mailto:contact@amitinteriors.com" className="text-gray-300 hover:text-amber-400 transition">contact@amitinteriors.com</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                  <div className="ml-4">
                    <p className="font-semibold">Phone</p>
                    <a href="tel:+919876543210" className="text-gray-300 hover:text-amber-400 transition">+91 987 654 3210</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                  <div className="ml-4">
                    <p className="font-semibold">Visit Our Studio</p>
                    <p className="text-gray-300">123 Design Street, Innovation Hub, City, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-2 bg-gray-900 p-8 rounded-xl shadow-2xl shadow-black/70">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" placeholder="Your Name" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-400 transition duration-200" required />
                  <input type="email" placeholder="Your Email" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-400 transition duration-200" required />
                </div>
                <input type="text" placeholder="Project Type (e.g., Residential, Commercial)" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-400 transition duration-200" required />
                <textarea placeholder="Tell us about your project vision..." rows="5" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-400 transition duration-200" required></textarea>
                <button 
                  type="submit" 
                  className="w-full py-3 bg-amber-600 text-black font-bold rounded-lg text-lg shadow-lg shadow-amber-500/30 transition duration-300 transform hover:scale-[1.01] hover:bg-amber-700"
                >
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </section>
        
      </main>
      
      {/* 6. Footer */}
      <footer className="bg-gray-950 py-6 text-center text-gray-500 border-t border-gray-800">
        <p>&copy; {new Date().getFullYear()} Amit Interiors. All rights reserved. Design by Innovation.</p>
      </footer>
      
      {/* Scrollbar CSS for horizontal sliders (using an internal style tag is allowed for single HTML/React files) */}
      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
        
        /* Keyframes for the hero section content animation */
        @keyframes fadeInMoveUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fadeInMoveUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Mainhome;