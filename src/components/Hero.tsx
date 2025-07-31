import React, { useState } from 'react';
import { Search, Calendar, Clock } from 'lucide-react';
import TypewriterText from './TypewriterText';
import ImageSlideshow from './ImageSlideshow';

interface HeroProps {
  onSearch: (searchData: any) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [searchData, setSearchData] = useState({
    activity: '',
    district: '',
    date: '',
    time: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    onSearch(searchData);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-secondary via-primary to-accent opacity-90"></div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary opacity-20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-accent opacity-20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-primary opacity-20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Search Form */}
          <div className="animate-fadeInUp">
            <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
              <h1 className="text-3xl md:text-4xl font-bold text-text mb-8 text-center">
                Find Your Perfect Space
              </h1>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    What do you want to do?
                  </label>
                  <select 
                    className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    value={searchData.activity}
                    onChange={(e) => handleInputChange('activity', e.target.value)}
                  >
                    <option value="">Select activity</option>
                    <option value="party">Party</option>
                    <option value="meeting">Meeting</option>
                    <option value="workshop">Workshop</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Select district in Rajasthan
                  </label>
                  <select 
                    className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    value={searchData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                  >
                    <option value="">Select district</option>
                    <option value="jaipur">Jaipur</option>
                    <option value="jodhpur">Jodhpur</option>
                    <option value="udaipur">Udaipur</option>
                    <option value="kota">Kota</option>
                    <option value="ajmer">Ajmer</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Date
                    </label>
                    <input 
                      type="date"
                      className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      value={searchData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Time
                    </label>
                    <input 
                      type="time"
                      className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      value={searchData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                    />
                  </div>
                </div>

                <button 
                  onClick={handleSearch}
                  className="w-full bg-primary hover:bg-orange-600 text-white p-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Search className="w-5 h-5" />
                  <span>Search Venues</span>
                </button>
              </div>
            </div>
          </div>

          {/* Image Slideshow Section */}
          <div className="flex items-center h-full w-full animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <div className="w-full h-full">
              <div className="rounded-2xl overflow-hidden w-full h-full">
                <ImageSlideshow />
              </div>
            </div>
          </div>
        </div>

        <TypewriterText />
      </div>
    </section>
  );
};

export default Hero;