import React from 'react';
import { MapPin, Star, Users } from 'lucide-react';

interface SearchResultsProps {
  searchData: any;
  onBook: (venue: any) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchData, onBook }) => {
  const venues = [
    {
      id: 1,
      title: "Rooftop Venue in Jaipur",
      description: "Beautiful rooftop space with city views, perfect for parties and events. Fully equipped with modern amenities.",
      location: "Jaipur, Rajasthan",
      rating: 4.8,
      capacity: 150,
      price: "₹5,000/hour",
      image: "https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 2,
      title: "Conference Hall in Jodhpur",
      description: "Professional meeting space with state-of-the-art technology. Ideal for corporate events and workshops.",
      location: "Jodhpur, Rajasthan",
      rating: 4.6,
      capacity: 80,
      price: "₹3,500/hour",
      image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 3,
      title: "Garden Venue in Udaipur",
      description: "Serene garden setting with lake views. Perfect for outdoor events and celebrations.",
      location: "Udaipur, Rajasthan",
      rating: 4.9,
      capacity: 200,
      price: "₹7,000/hour",
      image: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Available Venues
          </h2>
          <p className="text-secondary text-lg">
            Found {venues.length} venues matching your criteria
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {venues.map((venue, index) => (
            <div 
              key={venue.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden animate-fadeInUp"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={venue.image}
                  alt={venue.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{venue.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-text mb-2">{venue.title}</h3>
                <p className="text-secondary mb-4 line-clamp-2">{venue.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 text-sm text-secondary">
                    <MapPin className="w-4 h-4" />
                    <span>{venue.location}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-secondary">
                    <Users className="w-4 h-4" />
                    <span>{venue.capacity} people</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{venue.price}</span>
                  <button 
                    onClick={() => onBook(venue)}
                    className="bg-primary hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchResults;