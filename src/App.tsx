import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { IndianRupee, Menu, Github, Globe, History, Calculator, Save, Eye, EyeOff, X, Mail, Heart, DollarSign, MenuIcon, FileText, HelpCircle, MessageSquare } from 'lucide-react';
import { supabase } from './lib/supabase';
import DenominationCounter from './components/DenominationCounter';
import HistoryTab from './components/HistoryTab';
import SimpleCalculator from './components/SimpleCalculator';
import Advertisement from './components/Advertisement';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Documentation from './pages/Documentation';
import Terms from './pages/Terms';

const CURRENCY_DENOMINATIONS = {
  INR: [
    { value: 500, type: 'note' },
    { value: 200, type: 'note' },
    { value: 100, type: 'note' },
    { value: 50, type: 'note' },
    { value: 20, type: 'note' },
    { value: 10, type: 'note' },
    { value: 5, type: 'note' },
    { value: 2, type: 'coin' },
    { value: 1, type: 'coin' },
  ],
  USD: [
    { value: 100, type: 'note' },
    { value: 50, type: 'note' },
    { value: 20, type: 'note' },
    { value: 10, type: 'note' },
    { value: 5, type: 'note' },
    { value: 1, type: 'note' },
    { value: 0.25, type: 'coin' },
    { value: 0.10, type: 'coin' },
    { value: 0.05, type: 'coin' },
    { value: 0.01, type: 'coin' },
  ]
};

interface CountState {
  [key: number]: number;
}

function App() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'counter' | 'history'>('counter');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sendToCalculator, setSendToCalculator] = useState(false);
  const [hideAmounts, setHideAmounts] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showAdInquiry, setShowAdInquiry] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<'INR' | 'USD'>('INR');
  const [counts, setCounts] = useState<CountState>(() => {
    const savedCounts = localStorage.getItem(`denominationCounts_${selectedCurrency}`);
    if (savedCounts) {
      return JSON.parse(savedCounts);
    }
    
    const initialCounts: CountState = {};
    CURRENCY_DENOMINATIONS[selectedCurrency].forEach(denom => {
      initialCounts[denom.value] = 0;
    });
    return initialCounts;
  });

  const MenuModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Menu</h2>
            <button
              onClick={() => setShowMenu(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => {
                setShowMenu(false);
                navigate('/documentation');
              }}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
            >
              <FileText className="mr-3" size={20} />
              Documentation
            </button>

            <button
              onClick={() => {
                setShowMenu(false);
                navigate('/terms');
              }}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
            >
              <FileText className="mr-3" size={20} />
              Terms & Conditions
            </button>

            <button
              onClick={() => {
                window.location.href = 'mailto:patilyasshh@gmail.com';
              }}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
            >
              <MessageSquare className="mr-3" size={20} />
              Send Feedback
            </button>

            <button
              onClick={() => {
                window.open('https://www.yashpatil.tech/more/contact.html', '_blank');
              }}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
            >
              <HelpCircle className="mr-3" size={20} />
              Contact Us
            </button>

            <button
              onClick={() => {
                setShowMenu(false);
                setShowAdInquiry(true);
              }}
              className="w-full text-left px-4 py-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors flex items-center text-indigo-600"
            >
              <Mail className="mr-3" size={20} />
              Advertise with Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Routes>
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/documentation" element={<Documentation />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={
        <div className="min-h-screen bg-gray-50">
          {showMenu && <MenuModal />}
          {showAdInquiry && <Advertisement onClose={() => setShowAdInquiry(false)} />}
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col space-y-8">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSelectedCurrency(prev => prev === 'INR' ? 'USD' : 'INR')}
                    className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    {selectedCurrency === 'INR' ? <IndianRupee size={20} /> : <DollarSign size={20} />}
                    <span>{selectedCurrency}</span>
                  </button>
                  
                  <button
                    onClick={() => setHideAmounts(!hideAmounts)}
                    className="p-2 text-gray-600 hover:text-gray-800"
                  >
                    {hideAmounts ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowMenu(true)}
                    className="p-2 text-gray-600 hover:text-gray-800"
                  >
                    <Menu size={20} />
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="border-b border-gray-200">
                  <div className="flex">
                    <button
                      onClick={() => setActiveTab('counter')}
                      className={`flex-1 px-6 py-4 text-center ${
                        activeTab === 'counter'
                          ? 'border-b-2 border-indigo-500 text-indigo-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Calculator className="inline-block mr-2" size={20} />
                      Counter
                    </button>
                    <button
                      onClick={() => setActiveTab('history')}
                      className={`flex-1 px-6 py-4 text-center ${
                        activeTab === 'history'
                          ? 'border-b-2 border-indigo-500 text-indigo-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <History className="inline-block mr-2" size={20} />
                      History
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {activeTab === 'counter' ? (
                    <DenominationCounter
                      denominations={CURRENCY_DENOMINATIONS[selectedCurrency]}
                      counts={counts}
                      setCounts={setCounts}
                      hideAmounts={hideAmounts}
                      sendToCalculator={sendToCalculator}
                      setSendToCalculator={setSendToCalculator}
                    />
                  ) : (
                    <HistoryTab currency={selectedCurrency} />
                  )}
                </div>
              </div>

              {activeTab === 'counter' && (
                <SimpleCalculator
                  counts={counts}
                  denominations={CURRENCY_DENOMINATIONS[selectedCurrency]}
                  hideAmounts={hideAmounts}
                />
              )}
            </div>
          </div>
        </div>
      } />
    </Routes>
  );
}

export default App;