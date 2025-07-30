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

  const handleSearch = (data: any) => {
    setSearchData(data);
  };

  const handleBook = (venue: any) => {
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

  const handleChatbotSearch = (data: any) => {
    setSearchData(data);
    setShowLogin(false);
  };

  if (showLogin) {
    return (
      <>
        <Login onBack={handleBackToHome} />
        <Chatbot onSearch={handleChatbotSearch} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onLogin={handleShowLogin} />
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