import React, { useState, useEffect } from 'react';
import { 
  Instagram, 
  MapPin, 
  MessageCircle, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ArrowDown, 
  Building,
  Facebook,
  Share,
  Copy,
  Check,
  Twitter,
  Clock,
  Shield,
  BedDouble,
  Utensils,
  Wifi,
  Coffee,
  Calendar,
  Star,
  Quote
} from 'lucide-react';

const pageData = {
  name: "Aquarius Hotel",
  phone: "6281253784850",
  address: "Jl. Imam Bonjol No.5, Palangka Raya, Kalteng.",
  title: "Pengalaman Menginap Terbaik di Jantung Kota",
  description: "Nikmati kenyamanan premium, layanan bintang lima, dan fasilitas modern di Aquarius Hotel Palangka Raya. Destinasi sempurna untuk perjalanan bisnis maupun liburan Anda di Kalimantan Tengah.",
  profileImg: "/logo-aquarius.jpg", 
  heroImg: "/background-aquarius.jpeg",
  links: {
    instagram: "https://www.instagram.com/",
    maps: "https://maps.app.goo.gl/", 
    facebook: "https://facebook.com/", 
    tiktok: "https://tiktok.com/" 
  },
  locationHighlights: [
    { time: "Premium", place: "Pusat Kota" },
    { time: "24 Jam", place: "Layanan Kamar" },
    { time: "Free", place: "High-Speed WiFi" }
  ],
  facilities: [
    { name: "Kamar Mewah", icon: "BedDouble" },
    { name: "Restoran & Cafe", icon: "Utensils" },
    { name: "Layanan Spa", icon: "Coffee" },
    { name: "Internet Cepat", icon: "Wifi" }
  ],
  testimonials: [
    { name: "Budi Santoso", rating: 5, text: "Kamar sangat luas dan bersih. Lokasi strategis di tengah kota Palangka Raya, mudah mencari makan. Sarapan enak dan bervariasi." },
    { name: "Siti Rahma", rating: 5, text: "Pelayanan staf sangat ramah dan responsif. Fasilitas lengkap, wifi kencang sangat membantu untuk urusan pekerjaan." },
    { name: "Ahmad Wijaya", rating: 4, text: "Hotel favorit setiap kali perjalanan dinas ke Kalteng. Suasana nyaman dan tenang meskipun berada di jalan utama." }
  ],
  galleryPhotos: [
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=400&h=600",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=400&h=600",
    "https://images.unsplash.com/photo-1542314831-c6a4d14d885?auto=format&fit=crop&q=80&w=400&h=600",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400&h=600",
    "https://images.unsplash.com/photo-1551882547-ff40c0d519ac?auto=format&fit=crop&q=80&w=400&h=600",
  ]
};

export default function App() {
  const [lightbox, setLightbox] = useState({ isOpen: false, images: [], currentIndex: 0 });
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openLightbox = (images, index) => {
    setLightbox({ isOpen: true, images, currentIndex: index });
    document.body.style.overflow = 'hidden'; 
  };

  const closeLightbox = () => {
    setLightbox({ ...lightbox, isOpen: false });
    document.body.style.overflow = 'unset';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length
    }));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
    }));
  };

  const scrollToForm = () => {
    document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const checkin = formData.get('checkin');
    const roomType = formData.get('roomType');
    const notes = formData.get('notes');
    const waUrl = `https://wa.me/${pageData.phone}?text=Halo%20Resepsionis%20${pageData.name},%20saya%20${name}.%20Saya%20ingin%20cek%20ketersediaan%20untuk%20${roomType}%20pada%20tanggal%20${checkin}.%20Catatan:%20${notes}`;
    window.open(waUrl, '_blank');
  };

  const handleShare = async () => {
    const shareData = {
      title: pageData.name,
      text: pageData.title,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      setShowShareModal(true);
    }
  };

  const copyToClipboard = () => {
    const tempInput = document.createElement('input');
    tempInput.value = window.location.href;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(pageData.title + ' ' + window.location.href)}`, '_blank');
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(pageData.name)}`, '_blank');
  };

  const renderFacilityIcon = (iconName) => {
    switch(iconName) {
      case 'BedDouble': return <BedDouble size={20} />;
      case 'Utensils': return <Utensils size={20} />;
      case 'Coffee': return <Coffee size={20} />;
      case 'Wifi': return <Wifi size={20} />;
      default: return <Check size={20} />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        
        body {
          background-color: #F8FAFC;
          color: #0F172A;
          margin: 0;
          font-family: 'Plus Jakarta Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <main className="w-full max-w-[480px] mx-auto relative shadow-2xl bg-[#F8FAFC] min-h-screen overflow-hidden pb-32">
        
        {/* HERO SECTION */}
        <section className="relative w-full min-h-[100dvh] flex flex-col justify-end pb-12 px-6 bg-slate-900">
          
          <button
            onClick={handleShare}
            aria-label="Share this page"
            className="absolute top-6 right-6 z-20 p-3 bg-slate-900/40 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-slate-900/60 transition-all shadow-sm"
          >
            <Share size={20} />
          </button>

          <div className="absolute inset-0 z-0">
            <img 
              src={pageData.heroImg} 
              alt={pageData.name} 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#021f35] via-[#021f35]/80 to-transparent"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center mt-40">
            <div className="w-32 h-32 rounded-full p-1 bg-white/10 backdrop-blur-md mb-6 shadow-2xl border border-[#b4904b]/40">
              <img 
                src={pageData.profileImg} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            <h1 className="text-4xl font-extrabold text-[#e5c786] mb-3 leading-tight tracking-tight drop-shadow-md">
              {pageData.name}
            </h1>
            <p className="text-slate-200 font-light text-sm leading-relaxed mb-6 max-w-[95%]">
              {pageData.description}
            </p>

            <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-8">
              <a 
                href={pageData.links.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-white shadow-sm text-sm font-medium"
              >
                <Instagram size={18} /> Instagram
              </a>
              <a 
                href={pageData.links.maps}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-white shadow-sm text-sm font-medium"
              >
                <MapPin size={18} /> Lokasi
              </a>
              <a 
                href={pageData.links.facebook}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-white shadow-sm text-sm font-medium"
              >
                <Facebook size={18} /> Facebook
              </a>
              <a 
                href={pageData.links.tiktok}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-white shadow-sm text-sm font-medium"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg> TikTok
              </a>
            </div>

            <button 
              onClick={scrollToForm}
              className="group relative flex items-center justify-center gap-3 w-full max-w-sm py-4 bg-[#b4904b] text-white rounded-2xl font-bold text-[13px] uppercase tracking-wider hover:bg-[#9a7b3e] transition-all shadow-lg"
            >
              Reservasi Sekarang
              <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </section>

        {/* GALERI HOTEL */}
        <section className="pt-16 pb-8">
          <div className="px-6 mb-6 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Building className="text-[#b4904b]" size={22} />
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Galeri Hotel</h2>
            </div>
            <p className="text-slate-500 text-xs ml-8">Intip kenyamanan dan fasilitas mewah yang kami tawarkan.</p>
          </div>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-6 no-scrollbar">
            {pageData.galleryPhotos.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => openLightbox(pageData.galleryPhotos, idx)}
                className="snap-center shrink-0 w-[240px] aspect-[4/5] rounded-[1.5rem] overflow-hidden cursor-pointer relative group border border-slate-200 shadow-md bg-white"
              >
                <img 
                  src={img} 
                  alt={"Galeri Hotel " + (idx + 1)} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-8 px-6 bg-[#021f35] shadow-inner">
          <div className="flex flex-wrap justify-center gap-3 w-full max-w-md mx-auto">
            {pageData.locationHighlights.map((loc, idx) => (
              <span key={idx} className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs text-white font-medium shadow-sm">
                <Clock size={14} className="text-[#e5c786]" />
                {loc.time} {loc.place}
              </span>
            ))}
          </div>
        </section>

        {/* FASILITAS HOTEL */}
        <section className="py-10 px-6 bg-white border-b border-slate-200">
          <div className="mb-6 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Shield className="text-[#b4904b]" size={22} />
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Fasilitas & Layanan</h2>
            </div>
            <p className="text-slate-500 text-xs ml-8">Nikmati pengalaman menginap tak terlupakan dengan pelayanan kelas satu.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {pageData.facilities.map((fac, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-white p-2 rounded-xl text-[#021f35] shadow-sm border border-slate-100">
                  {renderFacilityIcon(fac.icon)}
                </div>
                <span className="text-[13px] font-bold text-slate-800 leading-tight">{fac.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONI PELANGGAN */}
        <section className="py-10 px-6 bg-slate-50 border-b border-slate-200">
          <div className="mb-6 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Quote className="text-[#b4904b]" size={22} />
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Testimoni Tamu</h2>
            </div>
            <p className="text-slate-500 text-xs ml-8">Apa kata mereka yang telah menikmati kenyamanan di Aquarius Hotel.</p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar">
            {pageData.testimonials.map((testi, idx) => (
              <div key={idx} className="snap-center shrink-0 w-[280px] bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(testi.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#b4904b] text-[#b4904b]" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed italic">"{testi.text}"</p>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#021f35] flex items-center justify-center text-[#e5c786] font-bold text-sm">
                    {testi.name.charAt(0)}
                  </div>
                  <span className="text-[13px] font-bold text-slate-800">{testi.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BOOKING FORM */}
        <section id="booking-form" className="py-12 px-6 bg-slate-50">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#f4ebd8] rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#f4ebd8] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10 mb-8">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Reservasi Kamar</h2>
              <p className="text-slate-500 text-sm leading-relaxed">Hubungi resepsionis kami untuk mengecek ketersediaan kamar dan mendapatkan harga terbaik via WhatsApp.</p>
            </div>
            
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 relative z-10">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide ml-1">Nama Pemesan</label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  placeholder="Ketik nama lengkap"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#b4904b] focus:ring-1 focus:ring-[#b4904b] transition-all"
                />
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide ml-1">Tanggal Check-In</label>
                  <input 
                    type="date" 
                    name="checkin" 
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#b4904b] focus:ring-1 focus:ring-[#b4904b] transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide ml-1">Tipe Kamar Diminati</label>
                <select 
                  name="roomType" 
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-800 focus:outline-none focus:border-[#b4904b] focus:ring-1 focus:ring-[#b4904b] transition-all appearance-none"
                >
                  <option value="">Pilih tipe kamar...</option>
                  <option value="Superior Room">Superior Room</option>
                  <option value="Deluxe Room">Deluxe Room</option>
                  <option value="Executive Suite">Executive Suite</option>
                  <option value="Presidential Suite">Presidential Suite</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide ml-1">Permintaan Khusus (Opsional)</label>
                <textarea 
                  name="notes" 
                  rows="3"
                  placeholder="Cth: Ingin kamar dengan kasur double bed, bebas asap rokok..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#b4904b] focus:ring-1 focus:ring-[#b4904b] transition-all resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full mt-2 bg-[#021f35] text-[#e5c786] font-bold text-sm tracking-wide py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#032a47] transition-colors shadow-md border border-[#021f35]"
              >
                Kirim Pesan WhatsApp
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </button>
            </form>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-8 pb-12 text-center flex flex-col items-center justify-center mx-6 mt-4">
          <div className="w-full h-px bg-slate-200 mb-8"></div>
          
          <div className="w-16 h-16 bg-white rounded-full shadow-sm border border-slate-200 flex items-center justify-center mb-4 p-1 overflow-hidden">
            <img src={pageData.profileImg} alt="Footer Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          
          <div className="text-slate-500 text-xs flex flex-col gap-1 items-center">
            <span className="font-extrabold text-slate-700 text-sm">{pageData.name}</span>
            <span className="max-w-[250px]">{pageData.address}</span>
          </div>

          <p className="text-slate-400 text-[10px] mt-8">
            © {new Date().getFullYear()} {pageData.name}. All rights reserved.
          </p>
          
          <a 
            href="https://www.solusilokal.id" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 text-[10px] mt-2 tracking-wide font-medium hover:text-slate-700 transition-colors"
          >
            powered by solusilokal.id
          </a>
        </footer>

        {/* STICKY CTA */}
        <div 
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-[432px] z-40 transition-all duration-500 ease-out ${
            showStickyCTA ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
          }`}
        >
          <button 
            onClick={scrollToForm}
            className="w-full flex items-center justify-between px-6 py-4 bg-[#021f35] backdrop-blur-xl border border-[#b4904b]/50 rounded-2xl text-white shadow-[0_10px_40px_rgba(2,31,53,0.4)] hover:bg-[#032a47] active:scale-[0.98] transition-all"
          >
            <span className="font-bold text-sm tracking-wide text-[#e5c786]">Reservasi Kamar</span>
            <div className="bg-[#b4904b] text-white p-2 rounded-xl">
              <Calendar size={18} className="fill-none stroke-current stroke-2" />
            </div>
          </button>
        </div>

      </main>

      {/* LIGHTBOX MODAL */}
      {lightbox.isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-xl"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-6 right-6 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all z-50 border border-white/20"
            onClick={closeLightbox}
          >
            <X size={20} />
          </button>

          {lightbox.images.length > 1 && (
            <button 
              className="absolute left-4 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all z-50 border border-white/20"
              onClick={prevImage}
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <div className="w-full max-w-4xl max-h-[100dvh] p-4 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={lightbox.images[lightbox.currentIndex]} 
              alt="Lightbox View" 
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
          </div>

          {lightbox.images.length > 1 && (
            <button 
              className="absolute right-4 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all z-50 border border-white/20"
              onClick={nextImage}
            >
              <ChevronRight size={24} />
            </button>
          )}
          
          {lightbox.images.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-xs font-bold tracking-[0.2em] bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20">
              {lightbox.currentIndex + 1} / {lightbox.images.length}
            </div>
          )}
        </div>
      )}

      {/* SHARE MODAL */}
      {showShareModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 backdrop-blur-sm sm:items-center transition-opacity"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="w-full max-w-[480px] bg-white sm:rounded-3xl rounded-t-3xl p-6 relative overflow-hidden animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center items-center mb-6 relative">
              <h3 className="text-slate-900 font-bold text-[15px]">Bagikan {pageData.name}</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="absolute right-0 p-1 text-slate-500 hover:bg-slate-100 rounded-full transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-[24px] p-8 flex flex-col items-center justify-center mb-8 shadow-sm">
              <img src={pageData.profileImg} alt="Profile" className="w-[72px] h-[72px] rounded-full border border-slate-200 mb-4 object-cover" />
              <h4 className="text-slate-900 font-bold text-lg text-center tracking-tight">@{pageData.name.toLowerCase().replace(/\s/g, '')}</h4>
              <p className="text-slate-500 text-sm mt-1 text-center font-medium opacity-90">{pageData.links.instagram.replace('https://www.', '')}</p>
            </div>

            <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar items-start px-1 mb-4">
              <div className="flex flex-col items-center gap-2 min-w-[76px]">
                <button
                  onClick={copyToClipboard}
                  className="w-[60px] h-[60px] rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-all shadow-sm border border-slate-200"
                >
                  {copied ? <Check size={26} className="text-green-600" /> : <Copy size={26} />}
                </button>
                <span className="text-[11px] font-semibold text-slate-600 text-center">
                  {copied ? 'Tersalin' : 'Salin Tautan'}
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 min-w-[76px]">
                <button
                  onClick={shareToTwitter}
                  className="w-[60px] h-[60px] rounded-full bg-slate-900 flex items-center justify-center text-white hover:bg-slate-800 transition-all shadow-sm"
                >
                  <Twitter size={26} />
                </button>
                <span className="text-[11px] font-semibold text-slate-600 text-center">X</span>
              </div>

              <div className="flex flex-col items-center gap-2 min-w-[76px]">
                <button
                  onClick={shareToFacebook}
                  className="w-[60px] h-[60px] rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:brightness-110 transition-all shadow-sm"
                >
                  <Facebook size={26} className="fill-current" />
                </button>
                <span className="text-[11px] font-semibold text-slate-600 text-center">Facebook</span>
              </div>

              <div className="flex flex-col items-center gap-2 min-w-[76px]">
                <button
                  onClick={shareToWhatsApp}
                  className="w-[60px] h-[60px] rounded-full bg-[#25D366] flex items-center justify-center text-white hover:brightness-110 transition-all shadow-sm"
                >
                  <MessageCircle size={26} className="fill-current" />
                </button>
                <span className="text-[11px] font-semibold text-slate-600 text-center">WhatsApp</span>
              </div>
            </div>
            
            <div className="w-full h-px bg-slate-200 mb-4"></div>
            
            <div className="flex flex-col items-center text-center">
              <h5 className="text-slate-900 font-bold text-[13px] mb-1">Ikuti Kami</h5>
              <p className="text-slate-500 text-[11px] mb-4">Follow media sosial kami untuk update promo terbaru.</p>
              <a href={pageData.links.instagram} target="_blank" rel="noreferrer" className="w-full py-3 bg-[#021f35] text-[#e5c786] text-sm font-bold rounded-xl hover:bg-[#032a47] transition-colors">
                Kunjungi Instagram
              </a>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}
