import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  onSearch?: (searchData: any) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    userName: '',
    userPhone: '',
    userEmail: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, isBot: boolean = false) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      isBot,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setTimeout(() => {
        addMessage("Hi! I'm here to help you find the perfect place on Sthala. 🏢", true);
        setTimeout(() => {
          addMessage("What's your name?", true);
        }, 1000);
      }, 500);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue, false);
    const userInput = inputValue.toLowerCase();
    setInputValue('');

    setTimeout(() => {
      handleBotResponse(inputValue, userInput);
    }, 500);
  };

  const handleBotResponse = (originalInput: string, userInput: string) => {
    if (currentStep === 0) {
      // Collecting name
      setUserData(prev => ({ ...prev, userName: originalInput }));
      addMessage(`Nice to meet you, ${originalInput}! 👋`, true);
      setTimeout(() => {
        addMessage("What's your mobile number?", true);
        setCurrentStep(1);
      }, 1000);
    } else if (currentStep === 1) {
      // Collecting phone
      setUserData(prev => ({ ...prev, userPhone: originalInput }));
      addMessage("Great! Now, what's your email address?", true);
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Collecting email
      setUserData(prev => ({ ...prev, userEmail: originalInput }));
      addMessage(`Thanks ${userData.userName}! I can now help you find venues in Rajasthan. What type of event are you planning? 🎉`, true);
      setCurrentStep(3);
    } else {
      // Handle venue search queries
      if (userInput.includes('meeting') || userInput.includes('party') || userInput.includes('workshop')) {
        let activity = '';
        let district = '';
        
        if (userInput.includes('meeting')) activity = 'meeting';
        else if (userInput.includes('party')) activity = 'party';
        else if (userInput.includes('workshop')) activity = 'workshop';

        if (userInput.includes('jaipur')) district = 'jaipur';
        else if (userInput.includes('jodhpur')) district = 'jodhpur';
        else if (userInput.includes('udaipur')) district = 'udaipur';
        else if (userInput.includes('kota')) district = 'kota';
        else if (userInput.includes('ajmer')) district = 'ajmer';

        addMessage("Got it! Let me show you some great venues. 🏢✨", true);
        
        // Trigger search if callback is provided
        if (onSearch) {
          setTimeout(() => {
            onSearch({
              activity,
              district,
              date: new Date().toISOString().split('T')[0],
              time: '18:00'
            });
            handleClose();
          }, 1500);
        }
      } else {
        addMessage("I can help you find venues for parties, meetings, or workshops in Rajasthan. Try asking something like 'I want a meeting room in Jaipur' or 'I need a party venue in Udaipur'! 🎯", true);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary hover:bg-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center animate-float"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col animate-fadeInUp">
          {/* Header */}
          <div className="bg-primary text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Sthala Assistant</h3>
                <p className="text-xs opacity-80">Online</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${message.isBot ? 'bg-primary' : 'bg-secondary'}`}>
                    {message.isBot ? (
                      <Bot className="w-3 h-3 text-white" />
                    ) : (
                      <User className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      message.isBot
                        ? 'bg-gray-100 text-text'
                        : 'bg-primary text-white'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-primary hover:bg-orange-600 text-white rounded-lg transition-colors duration-200"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;