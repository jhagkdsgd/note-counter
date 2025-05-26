import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Terms: React.FC = () => {
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
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Terms and Conditions</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing and using Count Note Pro, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with these terms, please do not use the application.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">2. Use of Service</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Count Note Pro is provided as a free service for counting and managing currency notes and coins. You agree to use the service only for its intended purpose and in compliance with all applicable laws and regulations.
                </p>
                <p>
                  You are responsible for maintaining the confidentiality of any information you input into the application and for all activities that occur under your usage.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">3. Privacy and Data Security</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  We take your privacy seriously. All counting data is stored locally on your device and is not transmitted to our servers. However, advertising inquiries and related information are stored securely in our database.
                </p>
                <p>
                  While we implement reasonable security measures, we cannot guarantee absolute security of your data. You are responsible for ensuring the security of your device and internet connection.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">4. Limitations of Liability</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Count Note Pro is provided "as is" without any warranties, expressed or implied. We do not guarantee the accuracy of calculations and are not responsible for any errors or discrepancies that may occur.
                </p>
                <p>
                  We shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">5. Intellectual Property</h2>
              <p className="text-gray-600">
                All content, features, and functionality of Count Note Pro, including but not limited to text, graphics, logos, and code, are the exclusive property of Yash Patil and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">6. Advertising</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Count Note Pro may display advertisements. Advertisers are solely responsible for the content of their advertisements and any claims made therein.
                </p>
                <p>
                  By submitting an advertising inquiry, you agree to provide accurate information and acknowledge that we may contact you regarding your inquiry.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">7. Modifications to Terms</h2>
              <p className="text-gray-600">
                We reserve the right to modify these terms at any time without prior notice. Continued use of the service after any modifications indicates your acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">8. Contact Information</h2>
              <p className="text-gray-600">
                For questions or concerns regarding these terms, please contact us at patilyasshh@gmail.com or visit our contact page at https://www.yashpatil.tech/more/contact.html.
              </p>
            </section>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Last updated: April 8, 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;