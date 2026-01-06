
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { generatePortfolio } from '../services/geminiService';

const SellerOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    experience: '0-2 years',
    skills: '',
    productName: '',
    productPrice: '',
    language: 'Hindi'
  });
  
  const [sellerImage, setSellerImage] = useState<string | null>(null);
  const [productImage, setProductImage] = useState<string | null>(null);
  
  const sellerFileRef = useRef<HTMLInputElement>(null);
  const productFileRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'seller' | 'product') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'seller') setSellerImage(reader.result as string);
        else setProductImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFinalSubmit = async () => {
    if (!productImage) return alert('Please upload a photo of your craft');
    if (!formData.phone) return alert('Phone number is required');
    
    setLoading(true);
    try {
      const aiResponse = await generatePortfolio(productImage, {
        ...formData,
        hasSellerPhoto: !!sellerImage
      });
      
      const finalProfile = {
        ...formData,
        ...aiResponse,
        profileImage: sellerImage || 'https://via.placeholder.com/150',
        productImage: productImage,
        onboardingDate: new Date().toISOString()
      };

      localStorage.setItem('artisan_profile', JSON.stringify(finalProfile));
      navigate('/seller/dashboard');
    } catch (err) {
      console.error(err);
      alert('Error generating portfolio. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50/30 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-[40px] shadow-2xl overflow-hidden border border-orange-100">
        <div className="bg-orange-600 h-2 transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }} />
        
        <div className="p-8 md:p-12">
          <div className="mb-8">
            <span className="text-orange-600 font-bold text-sm uppercase tracking-widest">Step {step} of 3</span>
            <h2 className="text-4xl font-black text-gray-900 mt-2">
              {step === 1 && "Personal Details"}
              {step === 2 && "Artisan Profile"}
              {step === 3 && "Product Showcase"}
            </h2>
          </div>

          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none transition-all text-gray-900"
                  placeholder="e.g. Kamala Devi"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none transition-all text-gray-900"
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email (Optional)</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none transition-all text-gray-900"
                  placeholder="email@example.com"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Village / District *</label>
                <input 
                  type="text" 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none transition-all text-gray-900"
                  placeholder="Where are you located?"
                  required
                />
              </div>

              <div className="md:col-span-2 pt-4">
                <button 
                  onClick={() => setStep(2)}
                  className="w-full bg-orange-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20"
                >
                  Continue to Profile
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex flex-col items-center mb-8">
                <div 
                  onClick={() => sellerFileRef.current?.click()}
                  className="w-32 h-32 rounded-full border-4 border-dashed border-orange-200 flex items-center justify-center cursor-pointer overflow-hidden bg-orange-50 hover:bg-orange-100 transition-colors"
                >
                  {sellerImage ? (
                    <img src={sellerImage} alt="Seller" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-2">
                      <span className="text-2xl">👤</span>
                      <p className="text-[10px] font-bold text-orange-400">Add Photo</p>
                    </div>
                  )}
                </div>
                <input type="file" ref={sellerFileRef} onChange={(e) => handleImageUpload(e, 'seller')} className="hidden" accept="image/*" />
                <p className="text-xs text-gray-400 mt-2 font-medium italic">Photo of the artisan</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Years of Experience</label>
                  <select 
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none transition-all appearance-none text-gray-900"
                  >
                    <option>0-2 years</option>
                    <option>3-5 years</option>
                    <option>5-10 years</option>
                    <option>10+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Craft Skill / Category</label>
                  <input 
                    type="text" 
                    value={formData.skills}
                    onChange={(e) => setFormData({...formData, skills: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none transition-all text-gray-900"
                    placeholder="e.g. Bamboo Weaving"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-100 text-gray-700 py-5 rounded-2xl font-bold"
                >
                  Back
                </button>
                <button 
                  onClick={() => setStep(3)}
                  className="flex-[2] bg-orange-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20"
                >
                  Add Your Product
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div 
                onClick={() => productFileRef.current?.click()}
                className={`border-2 border-dashed rounded-[32px] p-8 text-center transition-all cursor-pointer ${productImage ? 'border-green-200 bg-green-50/30' : 'border-gray-200 hover:border-orange-300'}`}
              >
                {productImage ? (
                  <img src={productImage} alt="Product" className="max-h-56 mx-auto rounded-2xl shadow-xl border-4 border-white" />
                ) : (
                  <div className="space-y-4 py-8">
                    <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-4xl">📦</span>
                    </div>
                    <p className="text-gray-400 font-bold">Upload a photo of your product</p>
                    <p className="text-xs text-gray-400">Our AI will detect details from this photo</p>
                  </div>
                )}
                <input type="file" ref={productFileRef} onChange={(e) => handleImageUpload(e, 'product')} className="hidden" accept="image/*" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                  <input 
                    type="text" 
                    value={formData.productName}
                    onChange={(e) => setFormData({...formData, productName: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none transition-all text-gray-900"
                    placeholder="What are you selling today?"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Expected Price (₹)</label>
                  <input 
                    type="number" 
                    value={formData.productPrice}
                    onChange={(e) => setFormData({...formData, productPrice: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none transition-all text-gray-900"
                    placeholder="e.g. 1500"
                  />
                  <p className="text-[10px] text-gray-400 mt-2 italic">Our team will verify this for fair market pricing.</p>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-6 bg-orange-50 rounded-3xl border border-orange-100">
                  <div className="animate-spin w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full mx-auto mb-4" />
                  <p className="text-orange-600 font-black text-lg animate-pulse">Building your AI Portfolio...</p>
                  <p className="text-xs text-orange-500 mt-1">Analyzing skills and craft details</p>
                </div>
              ) : (
                <div className="flex gap-4 pt-6">
                  <button 
                    onClick={() => setStep(2)}
                    className="flex-1 bg-gray-100 text-gray-700 py-5 rounded-2xl font-bold"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleFinalSubmit}
                    disabled={!productImage || !formData.phone}
                    className={`flex-[2] py-5 rounded-2xl font-bold text-xl transition-all shadow-lg ${!productImage || !formData.phone ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' : 'bg-green-600 text-white hover:bg-green-700 shadow-green-600/20'}`}
                  >
                    Launch My Studio
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerOnboarding;
