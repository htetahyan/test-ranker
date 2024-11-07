import React from 'react';

export const TermsOfService = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8">
      <div className="max-w-3xl bg-white shadow-xl rounded-lg p-6 md:p-10 text-gray-800">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Terms of Service
        </h1>

        <p className="text-lg text-gray-700 mb-6 text-center">
          Welcome to TrySkillTest! These Terms of Service govern your use of our AI-based test generation platform. Please read them carefully.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
            <p className="text-base text-gray-700">
              By using TrySkillTest, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">2. Use of Our Services</h2>
            <p className="text-base text-gray-700 mb-4">
              You may use our platform only as permitted by law. We may suspend or terminate your access if you violate our terms or policies.
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-gray-600">
              <li>Do not misuse our platform by attempting to access it in unauthorized ways.</li>
              <li>Follow any policies or guidelines provided within our platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">3. User Accounts</h2>
            <p className="text-base text-gray-700">
              You are responsible for maintaining the confidentiality of your account information and for all activities under your account. Notify us immediately if you suspect any unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">4. Intellectual Property</h2>
            <p className="text-base text-gray-700">
              All content, trademarks, and other intellectual property on TrySkillTest are owned by us or our licensors. You may not use our content without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">5. Limitation of Liability</h2>
            <p className="text-base text-gray-700">
              TrySkillTest is provided "as is" without any warranties. We are not liable for any damages arising from your use of our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">6. Changes to Terms</h2>
            <p className="text-base text-gray-700">
              We may update these Terms of Service occasionally. All changes will be posted here, so please review them periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">7. Contact Us</h2>
            <p className="text-base text-gray-700">
              If you have any questions about these Terms, please contact us at{' '}
              <a href="mailto:terms@tryskilltest.com" className="text-blue-600 underline hover:text-blue-500 transition duration-200">
                terms@tryskilltest.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
