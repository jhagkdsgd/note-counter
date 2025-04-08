import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { IndianRupee, Menu, Github, Globe, History, Calculator, Save, Eye, EyeOff, HelpCircle, X, Mail, Heart } from 'lucide-react';
import { supabase } from './lib/supabase';
import DenominationCounter from './components/DenominationCounter';
import HistoryTab from './components/HistoryTab';
import SimpleCalculator from './components/SimpleCalculator';
import Advertisement from './components/Advertisement';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const DENOMINATIONS = [
  { value: 500, type: 'note' },
  { value: 200, type: 'note' },
  { value: 100, type: 'note' },
  { value: 50, type: 'note' },
  { value: 20, type: 'note' },
  { value: 10, type: 'note' },
  { value: 5, type: 'note' },
  { value: 2, type: 'coin' },
  { value: 1, type: 'coin' },
];

interface CountState {
  [key: number]: number;
}

function App() {
  const [activeTab, setActiveTab] = useState<'counter' | 'history'>('counter');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sendToCalculator, setSendToCalculator] = useState(false);
  const [hideAmounts, setHideAmounts] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [showAdInquiry, setShowAdInquiry] = useState(false);
  const [counts, setCounts] = useState<CountState>(() => {
    const savedCounts = localStorage.getItem('denominationCounts');
    if (savedCounts) {
      return JSON.parse(savedCounts);
    }
    
    const initialCounts: CountState = {};
    DENOMINATIONS.forEach(denom => {
      initialCounts[denom.value] = 0;
    });
    return initialCounts;
  });

  const totalAmount = Object.entries(counts).reduce(
    (sum, [denomination, count]) => sum + (Number(denomination) * count), 
    0
  );

  const totalCount = Object.values(counts).reduce(
    (sum, count) => sum + count, 
    0
  );

  useEffect(() => {
    localStorage.setItem('denominationCounts', JSON.stringify(counts));
  }, [counts]);

  const handleCountChange = (denomination: number, count: number) => {
    setCounts(prev => ({
      ...prev,
      [denomination]: count
    }));
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all counts?')) {
      const resetCounts: CountState = {};
      DENOMINATIONS.forEach(denom => {
        resetCounts[denom.value] = 0;
      });
      setCounts(resetCounts);
    }
  };

  const handleSave = () => {
    const currentCounts = localStorage.getItem('denominationCounts');
    if (!currentCounts) return;
    
    const counts = JSON.parse(currentCounts);
    
    const totalAmount = Object.entries(counts).reduce(
      (sum, [denomination, count]) => sum + (Number(denomination) * Number(count)), 
      0
    );
    
    const totalCount = Object.values(counts).reduce(
      (sum, count) => sum + Number(count), 
      0
    );
    
    const savedHistory = localStorage.getItem('countNoteHistory') || '[]';
    const history = JSON.parse(savedHistory);
    
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      totalAmount,
      totalCount,
      denominationCounts: counts
    };
    
    const updatedHistory = [newEntry, ...history];
    localStorage.setItem('countNoteHistory', JSON.stringify(updatedHistory));
    
    alert('Summary saved successfully!');
  };

  const handleAdInquirySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      message: formData.get('message')
    };

    try {
      // Save to Supabase
      const { error } = await supabase
        .from('ad_inquiries')
        .insert([data]);

      if (error) throw error;

      // Open email client with pre-filled content
      const subject = encodeURIComponent('Advertisement Inquiry - Count Note Pro');
      const body = encodeURIComponent(`
Name: ${data.name}
Company: ${data.company}
Email: ${data.email}

Message:
${data.message}
      `);
      window.location.href = `mailto:patilyasshh@gmail.com?subject=${subject}&body=${body}`;
      setShowAdInquiry(false);
    } catch (error) {
      console.error('Error saving inquiry:', error);
      alert('There was an error submitting your inquiry. Please try again.');
    }
  };

  const leftColumnDenominations = DENOMINATIONS.slice(0, 5);
  const rightColumnDenominations = DENOMINATIONS.slice(5);

  const formatAmount = (amount: number) => {
    return hideAmounts ? '••••••' : amount.toLocaleString('en-IN');
  };

  const AdInquiryModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Advertise with Us</h2>
            <button
              onClick={() => setShowAdInquiry(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600">
              Interested in advertising on Count Note Pro? Fill out the form below and we'll get back to you with advertising options and rates.
            </p>
          </div>

          <form onSubmit={handleAdInquirySubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Tell us about your advertising needs"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              <Mail size={18} className="mr-2" />
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={
          <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <header className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-4 shadow-lg">
              <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold flex items-center">
                  <IndianRupee className="mr-2" />
                  Count Note Pro
                </h1>
                <div className="md:hidden">
                  <button 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 rounded-md hover:bg-indigo-700/50 transition-colors"
                  >
                    <Menu size={24} />
                  </button>
                </div>
                <div className="hidden md:flex space-x-4 items-center">
                  <button
                    className={`py-2 px-4 rounded-md font-medium transition-all ${
                      activeTab === 'counter'
                        ? 'bg-white text-indigo-600'
                        : 'text-white hover:bg-indigo-700/50'
                    }`}
                    onClick={() => setActiveTab('counter')}
                  >
                    <div className="flex items-center">
                      <IndianRupee className="mr-2" size={18} />
                      Money Counter
                    </div>
                  </button>
                  <button
                    className={`py-2 px-4 rounded-md font-medium transition-all ${
                      activeTab === 'history'
                        ? 'bg-white text-indigo-600'
                        : 'text-white hover:bg-indigo-700/50'
                    }`}
                    onClick={() => setActiveTab('history')}
                  >
                    <div className="flex items-center">
                      <History className="mr-2" size={18} />
                      History
                    </div>
                  </button>
                  <button
                    onClick={() => setShowDocs(true)}
                    className="ml-2 p-2 rounded-full hover:bg-indigo-700/50 transition-colors"
                    title="Documentation"
                  >
                    <HelpCircle size={20} />
                  </button>
                </div>
              </div>
            </header>

            {mobileMenuOpen && (
              <div className="md:hidden bg-indigo-500 text-white">
                <div className="container mx-auto p-2">
                  <button
                    className={`w-full py-2 px-4 rounded-md font-medium mb-2 transition-all ${
                      activeTab === 'counter'
                        ? 'bg-white text-indigo-600'
                        : 'text-white hover:bg-indigo-700/50'
                    }`}
                    onClick={() => {
                      setActiveTab('counter');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <div className="flex items-center">
                      <IndianRupee className="mr-2" size={18} />
                      Money Counter
                    </div>
                  </button>
                  <button
                    className={`w-full py-2 px-4 rounded-md font-medium mb-2 transition-all ${
                      activeTab === 'history'
                        ? 'bg-white text-indigo-600'
                        : 'text-white hover:bg-indigo-700/50'
                    }`}
                    onClick={() => {
                      setActiveTab('history');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <div className="flex items-center">
                      <History className="mr-2" size={18} />
                      History
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setShowDocs(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 px-4 rounded-md font-medium mb-2 text-white hover:bg-indigo-700/50"
                  >
                    <div className="flex items-center">
                      <HelpCircle className="mr-2" size={18} />
                      Documentation
                    </div>
                  </button>
                </div>
              </div>
            )}

            {showDocs && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold text-gray-800">Documentation</h2>
                      <button
                        onClick={() => setShowDocs(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={24} />
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      <section>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Quick Math Input</h3>
                        <p className="text-gray-600 mb-2">
                          You can perform quick calculations directly in the count input fields:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          <li>Type <code className="bg-gray-100 px-1 rounded">+13</code> to add 13 to the current count</li>
                          <li>Type <code className="bg-gray-100 px-1 rounded">-5</code> to subtract 5 from the current count</li>
                          <li>Press Enter or click outside to calculate</li>
                        </ul>
                      </section>

                      <section>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Privacy Features</h3>
                        <p className="text-gray-600 mb-2">
                          Keep your counts private with the hide amounts feature:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          <li>Click the eye icon to toggle amount visibility</li>
                          <li>Hides all amounts across the application</li>
                          <li>Perfect for privacy in public settings</li>
                        </ul>
                      </section>

                      <section>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Calculator Integration</h3>
                        <p className="text-gray-600 mb-2">
                          Use the built-in calculator for additional calculations:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          <li>Check "Use total amount in calculator" to transfer the current total</li>
                          <li>Supports basic arithmetic operations</li>
                          <li>Maintains calculation history</li>
                        </ul>
                      </section>

                      <section>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">History & Saving</h3>
                        <p className="text-gray-600 mb-2">
                          Keep track of your counts:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          <li>Click "Save" to store the current count</li>
                          <li>View past counts in the History tab</li>
                          <li>Load previous counts when needed</li>
                          <li>All data is stored locally on your device</li>
                        </ul>
                      </section>

                      <section>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Tips & Shortcuts</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          <li>Use the + and - buttons for quick adjustments</li>
                          <li>Press Enter after typing to confirm input</li>
                          <li>Click Reset to start fresh (requires confirmation)</li>
                          <li>All changes are automatically saved</li>
                        </ul>
                      </section>

                      <section>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Advertising</h3>
                        <p className="text-gray-600 mb-2">
                          Interested in advertising on Count Note Pro?
                        </p>
                        <button
                          onClick={() => {
                            setShowDocs(false);
                            setShowAdInquiry(true);
                          }}
                          className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center"
                        >
                          <Mail size={18} className="mr-2" />
                          Contact for Advertising
                        </button>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showAdInquiry && <AdInquiryModal />}

            <div className="container mx-auto p-4">
              {activeTab === 'counter' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <div className="bg-white rounded-lg shadow-lg p-4 h-full border border-gray-200">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Count Your Money</h2>
                        <button
                          onClick={() => setHideAmounts(!hideAmounts)}
                          className="text-gray-600 hover:text-indigo-600 transition-colors"
                          title={hideAmounts ? "Show amounts" : "Hide amounts"}
                        >
                          {hideAmounts ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      <div className="space-y-3">
                        {leftColumnDenominations.map((denom) => (
                          <DenominationCounter
                            key={denom.value}
                            value={denom.value}
                            type={denom.type}
                            count={counts[denom.value] || 0}
                            onCountChange={(count) => handleCountChange(denom.value, count)}
                            hideAmount={hideAmounts}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-1">
                    <div className="bg-white rounded-lg shadow-lg p-4 h-full border border-gray-200">
                      <h2 className="text-xl font-semibold mb-4 text-gray-800">&nbsp;</h2>
                      <div className="space-y-3">
                        {rightColumnDenominations.map((denom) => (
                          <DenominationCounter
                            key={denom.value}
                            value={denom.value}
                            type={denom.type}
                            count={counts[denom.value] || 0}
                            onCountChange={(count) => handleCountChange(denom.value, count)}
                            hideAmount={hideAmounts}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-1">
                    <div className="bg-white rounded-lg shadow-lg p-4 h-full border border-gray-200">
                      <h2 className="text-xl font-semibold mb-4 text-gray-800">Summary</h2>
                      
                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100">
                          <h3 className="text-lg font-medium text-gray-700">Total Count</h3>
                          <p className="text-3xl font-bold text-indigo-600">
                            {formatAmount(totalCount)}
                          </p>
                        </div>
                        
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100">
                          <h3 className="text-lg font-medium text-gray-700">Total Amount</h3>
                          <p className="text-3xl font-bold text-indigo-600 flex items-center">
                            <IndianRupee className="mr-1" size={24} />
                            {formatAmount(totalAmount)}
                          </p>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button 
                            onClick={handleReset}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-all shadow-md active:transform active:scale-95"
                          >
                            Reset All
                          </button>
                          <button 
                            onClick={handleSave}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-all shadow-md active:transform active:scale-95 flex items-center justify-center"
                          >
                            <Save size={18} className="mr-2" />
                            Save
                          </button>
                        </div>

                        <div className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            id="sendToCalculator"
                            checked={sendToCalculator}
                            onChange={(e) => setSendToCalculator(e.target.checked)}
                            className="mr-2"
                          />
                          <label htmlFor="sendToCalculator" className="text-sm text-gray-600">
                            Use total amount in calculator
                          </label>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex items-center mb-2">
                            <Calculator size={18} className="mr-2 text-indigo-600" />
                            <h3 className="text-lg font-medium text-gray-700">Calculator</h3>
                          </div>
                          <SimpleCalculator initialValue={sendToCalculator ? totalAmount.toString() : ''} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <HistoryTab hideAmounts={hideAmounts} />
              )}
            </div>

            <Advertisement />

            <footer className="bg-gray-800 text-white py-6">
              <div className="container mx-auto px-4">
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <a 
                    href="https://github.com/PATILYASHH" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
                  >
                    <Github size={20} className="mr-2" />
                    <span>Developed by Yash Patil</span>
                  </a>
                  <a 
                    href="https://yashpatil.tech" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
                  >
                    <Globe size={20} className="mr-2" />
                    <span>yashpatil.tech</span>
                  </a>
                  <a 
                    href="https://github.com/sponsors/PATILYASHH" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
                  >
                    <Heart size={20} className="mr-2" />
                    <span>Sponsor</span>
                  </a>
                  <span className="text-gray-400 text-sm">v5.3.4</span>
                </div>
              </div>
            </footer>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;