import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchResults from './components/SearchResults';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';
import Login from './components/Login';
import Chatbot from './components/Chatbot';

function App() {
  const [searchData, setSearchData] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null); // Track logged in user

  const handleSearch = (data: any) => {
    setSearchData(data);
  };

  const handleBook = (venue: any) => {
    // Check if user is logged in
    if (!user) {
      // If not logged in, show login page
      setShowLogin(true);
      return;
    }
    
    // If logged in, proceed with booking
    setSelectedVenue(venue);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVenue(null);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleBackToHome = () => {
    setShowLogin(false);
  };

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleChatbotSearch = (data: any) => {
    setSearchData(data);
    setShowLogin(false);
  };

  if (showLogin) {
    return (
      <>
        <Login onBack={handleBackToHome} onLoginSuccess={handleLoginSuccess} />
        <Chatbot onSearch={handleChatbotSearch} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onLogin={handleShowLogin} user={user} onLogout={handleLogout} />
      <Hero onSearch={handleSearch} />
      {searchData && (
        <SearchResults searchData={searchData} onBook={handleBook} />
      )}
      <Footer />
      
      <BookingModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        venue={selectedVenue}
      />
      
      <Chatbot onSearch={handleChatbotSearch} />
    </div>
  );
}

export default App;