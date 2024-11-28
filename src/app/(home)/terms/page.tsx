import SkeletonLoading from '@/components/home/SkeletonLoading';
import React, { Suspense } from 'react';

const TermsOfService = () => {
  return (
    <Suspense fallback={<SkeletonLoading />}>
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
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">1. Legal Name</h2>
              <p className="text-base text-gray-700">
                TrySkillTest is operated by tryskilltest. All references to "we," "us," or "our" refer to tryskilltest.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">2. Refund Policy</h2>
              <p className="text-base text-gray-700">
               We do not refund any payments made to us.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">3. Links to Related Pages</h2>
              <p className="text-base text-gray-700">
                Please refer to the following links for additional information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base text-gray-600">
                <li>
                  <a href="/privacy-policy" className="text-blue-600 underline hover:text-blue-500 transition duration-200">
                    Privacy Policy
                  </a>
                </li>
               
                <li>
                  <a href="/pricing" className="text-blue-600 underline hover:text-blue-500 transition duration-200">
                    Pricing Page
                  </a>
                </li>
              </ul>
            </section>

            {/* Keep the existing sections */}
            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">4. Use of Our Services</h2>
              <p className="text-base text-gray-700 mb-4">
                You may use our platform only as permitted by law. We may suspend or terminate your access if you violate our terms or policies.
              </p>
              <ul className="list-disc list-inside space-y-2 text-base text-gray-600">
                <li>Do not misuse our platform by attempting to access it in unauthorized ways.</li>
                <li>Follow any policies or guidelines provided within our platform.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">5. Intellectual Property</h2>
              <p className="text-base text-gray-700">
                All content, trademarks, and other intellectual property on TrySkillTest are owned by us or our licensors. You may not use our content without permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">6. Limitation of Liability</h2>
              <p className="text-base text-gray-700">
                TrySkillTest is provided "as is" without any warranties. We are not liable for any damages arising from your use of our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">7. Changes to Terms</h2>
              <p className="text-base text-gray-700">
                We may update these Terms of Service occasionally. All changes will be posted here, so please review them periodically.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">8. Contact Us</h2>
              <p className="text-base text-gray-700">
                If you have any questions about these Terms, please contact us at{' '}
                <a href="mailto:aryanhtet@gmail.com" className="text-blue-600 underline hover:text-blue-500 transition duration-200">
                  aryanhtet@gmail.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default TermsOfService;
