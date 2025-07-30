import React, { useState } from 'react';
import { Eye, EyeOff, MapPin, ArrowLeft } from 'lucide-react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

interface LoginProps {
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (isLogin) {
      // Login logic
      try {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;
        // Optionally fetch user profile from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ fullName: '', mobile: '', email: '', password: '' });
        }, 3000);
      } catch (err: any) {
        setError(err.message || 'Login failed.');
      }
    } else {
      // Signup logic
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;
        // Store user profile in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          fullName: formData.fullName,
          mobile: formData.mobile,
          email: formData.email,
          createdAt: new Date().toISOString()
        });
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ fullName: '', mobile: '', email: '', password: '' });
        }, 3000);
      } catch (err: any) {
        setError(err.message || 'Registration failed.');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setIsSubmitted(false);
  };

  const firebaseConfig = {
    apiKey: "AIzaSyCC8MTC35Adn4FDTFQHxjmoibodRY67RCY",
    authDomain: "sthala-42da0.firebaseapp.com",
    projectId: "sthala-42da0",
    storageBucket: "sthala-42da0.appspot.com",
    messagingSenderId: "512144678960",
    appId: "1:512144678960:web:98bacd89e8b80c83d48df5",
    measurementId: "G-3Y3DJ77XMQ"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-primary to-accent flex items-center justify-center p-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary opacity-20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-accent opacity-20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-primary opacity-20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="mb-6 flex items-center space-x-2 text-white hover:text-primary transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm animate-fadeInUp">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold text-text">Sthala</span>
            </div>
            <h1 className="text-2xl font-bold text-text mb-2">
              {isLogin ? 'Welcome Back!' : 'Join Sthala'}
            </h1>
            <p className="text-secondary">
              {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
            </p>
          </div>

          {!isSubmitted && error && (
            <div className="text-center text-red-500 mb-4">{error}</div>
          )}

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Full Name
                </label>
                <input 
                  type="text"
                  required
                  className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
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
                  Email Address
                </label>
                <input 
                  type="email"
                  required
                  className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Password
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="w-full p-4 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondary hover:text-primary transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary hover:bg-orange-600 text-white p-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {isLogin ? 'Login' : 'Register'}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-2xl font-bold text-green-600 mb-2">
                Welcome to Sthala!
              </h4>
              <p className="text-secondary">
                You're successfully logged in. Redirecting...
              </p>
            </div>
          )}

          {!isSubmitted && (
            <div className="mt-6 text-center">
              <p className="text-secondary">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={toggleMode}
                  className="text-primary hover:text-orange-600 font-medium transition-colors duration-200"
                >
                  {isLogin ? 'Register here' : 'Login here'}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;