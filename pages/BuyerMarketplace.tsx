
import React, { useState, useMemo } from 'react';

const products = [
  { id: '1', name: 'Terracotta Lamp', price: 1800, category: 'Pottery', region: 'Bastar', seller: 'Savitri Devi', img: 'https://picsum.photos/seed/pottery/600/600', rating: 4.8, experience: 12 },
  { id: '2', name: 'Eri Silk Stole', price: 4500, category: 'Textiles', region: 'Assam', seller: 'Purnima SHG', img: 'https://picsum.photos/seed/silk/600/600', rating: 4.9, experience: 8 },
  { id: '3', name: 'Bamboo Fruit Tray', price: 850, category: 'Bamboo', region: 'Nagaland', seller: 'Inaho', img: 'https://picsum.photos/seed/bamboo/600/600', rating: 4.5, experience: 15 },
  { id: '4', name: 'Madhubani Painting', price: 3200, category: 'Art', region: 'Bihar', seller: 'Usha Bai', img: 'https://picsum.photos/seed/art/600/600', rating: 4.7, experience: 20 },
  { id: '5', name: 'Wrought Iron Bell', price: 1200, category: 'Metal', region: 'Kondagaon', seller: 'Gita Marabi', img: 'https://picsum.photos/seed/metal/600/600', rating: 4.6, experience: 10 },
  { id: '6', name: 'Tribal Necklace', price: 2100, category: 'Jewelry', region: 'Odisha', seller: 'Raimati', img: 'https://picsum.photos/seed/jewelry/600/600', rating: 5.0, experience: 6 }
];

const BuyerMarketplace: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const categories = ['All', 'Pottery', 'Textiles', 'Bamboo', 'Art', 'Metal', 'Jewelry'];

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchesCategory = filter === 'All' || p.category === filter;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.seller.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'experience') result.sort((a, b) => b.experience - a.experience);

    return result;
  }, [filter, sortBy, searchQuery]);

  return (
    <div className="bg-white min-h-screen">
      {/* Advanced Filter & Search Bar */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-grow max-w-xl">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by craft, region or artisan..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent focus:bg-white focus:border-orange-500 rounded-2xl outline-none transition-all text-gray-900 font-medium"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Sort By:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="experience">Most Experienced</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-black whitespace-nowrap transition-all uppercase tracking-tighter ${
                  filter === cat ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">Artisan Marketplace</h1>
            <p className="text-gray-500 text-lg">Verified products from 500+ rural women artists.</p>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-2xl font-black text-orange-600">{filteredAndSortedProducts.length}</span>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Creations Found</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredAndSortedProducts.map(product => (
            <div key={product.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-orange-200/20 transition-all duration-500">
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-orange-600 shadow-sm">
                    {product.region}
                  </span>
                  <span className="bg-orange-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-sm">
                    {product.experience}Yrs Exp
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                   <div className="flex items-center gap-2 mb-4">
                     <span className="text-white font-bold text-sm">⭐ {product.rating}</span>
                     <span className="text-gray-300 text-xs font-medium">Rating</span>
                   </div>
                   <button 
                    onClick={() => setSelectedProduct(product)}
                    className="w-full bg-white text-gray-900 py-3 rounded-xl font-black hover:bg-orange-50 transition-colors shadow-lg"
                  >
                    View Studio Portfolio
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-black text-gray-900 group-hover:text-orange-600 transition-colors">{product.name}</h3>
                  <span className="text-xl font-black text-gray-900">₹{product.price}</span>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600 text-xs">
                    {product.seller.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-gray-700">By {product.seller}</span>
                    <span className="text-[10px] text-green-600 font-black uppercase tracking-widest">Master Artisan</span>
                  </div>
                </div>
                <button 
                  className="w-full border-2 border-gray-100 text-gray-900 py-4 rounded-xl font-black group-hover:border-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-sm"
                >
                  Contact Shakti Hub for Purchase
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-100">
            <span className="text-6xl block mb-6">🔍</span>
            <h2 className="text-2xl font-black text-gray-900">No crafts found</h2>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
            <button 
              onClick={() => {setFilter('All'); setSearchQuery('');}}
              className="mt-6 text-orange-600 font-bold underline"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-5xl rounded-[48px] overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center font-bold hover:bg-orange-600 hover:text-white transition-all shadow-xl z-20"
            >
              ✕
            </button>
            <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
              <div className="md:w-1/2 h-[400px] md:h-auto relative">
                <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-8 left-8">
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                      {selectedProduct.rating}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Global Rating</p>
                      <p className="text-sm font-black">Highly Recommended</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-12 space-y-8 overflow-y-auto">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                      {selectedProduct.category}
                    </span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                      Fair Trade
                    </span>
                  </div>
                  <h2 className="text-4xl font-black mb-2 text-gray-900">{selectedProduct.name}</h2>
                  <p className="text-orange-600 font-black text-3xl">₹{selectedProduct.price}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Artisan</p>
                    <p className="text-lg font-black text-gray-900">{selectedProduct.seller}</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Experience</p>
                    <p className="text-lg font-black text-gray-900">{selectedProduct.experience} Years</p>
                  </div>
                </div>

                <div className="bg-orange-50/50 p-8 rounded-[32px] border border-orange-100 relative">
                  <div className="absolute -top-3 -left-3 w-10 h-10 bg-orange-600 rounded-2xl flex items-center justify-center text-white text-xl">📜</div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">The Artisan's Story</h4>
                  <p className="text-gray-700 leading-relaxed italic text-lg font-medium">"Mastering {selectedProduct.category} over two decades, {selectedProduct.seller} is the heart of her village hub. Every curve in this piece represents a traditional motif from {selectedProduct.region}."</p>
                </div>

                <div className="pt-6 space-y-4">
                  <button className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-xl hover:bg-orange-600 transition-all shadow-2xl shadow-gray-900/20 active:scale-95">
                    Express Interest to Team
                  </button>
                  <div className="flex items-center justify-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-tighter">
                    <span className="flex items-center gap-1">🛡️ Secure Payment</span>
                    <span className="flex items-center gap-1">📦 Global Shipping</span>
                    <span className="flex items-center gap-1">🌱 Ethical Sourcing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerMarketplace;
