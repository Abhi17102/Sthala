import React, { useState } from 'react';
import { X, QrCode, Check } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  venue: any;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, venue }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    time: ''
  });
  const [isBooked, setIsBooked] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      onClose();
      setFormData({ name: '', mobile: '', time: '' });
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fadeInUp">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-text">Book Your Venue</h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {venue && (
            <div className="mb-6 p-4 bg-background rounded-lg">
              <h4 className="font-semibold text-text">{venue.title}</h4>
              <p className="text-secondary text-sm">{venue.location}</p>
              <p className="text-primary font-bold">{venue.price}</p>
            </div>
          )}

          {!isBooked ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Full Name
                </label>
                <input 
                  type="text"
                  required
                  className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Mobile Number
                </label>
                <input 
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Preferred Time
                </label>
                <input 
                  type="time"
                  required
                  className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                />
              </div>

              <div className="bg-background rounded-lg p-6 text-center">
                <div className="w-32 h-32 bg-white border-2 border-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-secondary" />
                </div>
                <p className="text-sm text-secondary mb-2">Scan to pay</p>
                <p className="font-semibold text-primary">{venue?.price}</p>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary hover:bg-orange-600 text-white p-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Confirm Booking
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-2xl font-bold text-green-600 mb-2">
                Your seat is booked!
              </h4>
              <p className="text-secondary">
                Booking confirmation will be sent to your mobile number.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;