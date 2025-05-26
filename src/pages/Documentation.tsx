import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Documentation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Counter
        </button>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Documentation</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Getting Started</h2>
              <p className="text-gray-600 mb-4">
                Count Note Pro is a powerful and user-friendly tool designed to help you count and manage your currency notes and coins efficiently. Whether you're handling Indian Rupees (INR) or US Dollars (USD), our application makes it easy to keep track of your money.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Features</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 text-gray-700">Multi-Currency Support</h3>
                  <p className="text-gray-600">
                    Switch between INR and USD currencies easily using the currency selector in the top navigation bar.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2 text-gray-700">Denomination Counter</h3>
                  <p className="text-gray-600">
                    Count notes and coins by entering the quantity for each denomination. The application automatically calculates the total amount and number of items.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2 text-gray-700">Privacy Mode</h3>
                  <p className="text-gray-600">
                    Use the eye icon to hide amounts when privacy is needed. This feature masks all monetary values with asterisks.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2 text-gray-700">History Tracking</h3>
                  <p className="text-gray-600">
                    Save your counts and view them later in the History tab. Each entry includes the date, time, and complete breakdown of denominations.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2 text-gray-700">Built-in Calculator</h3>
                  <p className="text-gray-600">
                    Use the integrated calculator for quick calculations. The calculator maintains a history of your calculations for reference.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">How to Use</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 text-gray-700">Counting Money</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Select your preferred currency (INR or USD) from the top navigation bar</li>
                    <li>Enter the quantity for each denomination using the + and - buttons or type directly</li>
                    <li>View the total amount and count in the summary section</li>
                    <li>Optionally save your count by clicking the "Save" button</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2 text-gray-700">Using the Calculator</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Enter calculations directly or use the provided buttons</li>
                    <li>View calculation history by clicking the history icon</li>
                    <li>Click on previous calculations to reuse them</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2 text-gray-700">Managing History</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Switch to the History tab to view all saved counts</li>
                    <li>Click on an entry to view detailed information</li>
                    <li>Use the "Load to Counter" button to restore a previous count</li>
                    <li>Delete unwanted entries using the delete button</li>
                  </ol>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Tips and Tricks</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Use the keyboard for quick data entry - type numbers directly into the denomination fields</li>
                <li>Add notes to your saved counts to help identify them later</li>
                <li>Use the privacy mode when counting in public places</li>
                <li>Check the calculator history for recent calculations</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;