// app/contact-us/page.tsx
import { Metadata } from 'next';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'; // Requires 'npm install react-icons'

export const metadata: Metadata = {
  title: 'Contact Us | Newsstate24',
  description: 'Reach out to the Newsstate24 editorial team for general inquiries, news tips, or advertising opportunities.',
  alternates: {
    canonical: 'https://www.Newsstate24.com/contact-us',
  }
};

export default function ContactUsPage() {
  return (
    <section className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-6 text-red-700 border-b pb-2">
        संपर्क करें (Contact Us)
      </h1>
      
      <p className="mb-8 text-gray-700">
        हमसे संपर्क करने के लिए निम्नलिखित जानकारी का उपयोग करें या नीचे दिए गए फॉर्म को भरें।
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {/* Contact Method 1: Email */}
        <div className="flex items-start p-4 border rounded-lg bg-gray-50">
          <FaEnvelope size={24} className="text-red-700 mr-4 mt-1" />
          <div>
            <h3 className="font-bold text-xl mb-1">ईमेल (Email)</h3>
            <p className="text-sm">For General Inquiries:</p>
            <a href="mailto:info@Newsstate24.com" className="text-red-600 hover:underline font-medium">info@Newsstate24.com</a>
            <p className="text-sm mt-2">For Editorial/News Tips:</p>
            <a href="mailto:editor@Newsstate24.com" className="text-red-600 hover:underline font-medium">editor@Newsstate24.com</a>
          </div>
        </div>

        {/* Contact Method 2: Phone */}
        <div className="flex items-start p-4 border rounded-lg bg-gray-50">
          <FaPhone size={24} className="text-red-700 mr-4 mt-1" />
          <div>
            <h3 className="font-bold text-xl mb-1">फ़ोन (Phone)</h3>
            <p className="text-sm">Advertising / Business:</p>
            <p className="font-medium">+91-9876543210</p>
          </div>
        </div>

        {/* Contact Method 3: Address */}
        <div className="flex items-start p-4 border rounded-lg bg-gray-50">
          <FaMapMarkerAlt size={24} className="text-red-700 mr-4 mt-1" />
          <div>
            <h3 className="font-bold text-xl mb-1">पता (Address)</h3>
            <p className="text-sm">Newsstate24 Media House,</p>
            <p className="text-sm">Office No. 123, New Delhi, India</p>
          </div>
        </div>
      </div>
      
      {/* Contact Form Placeholder */}
      <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">
        मैसेज भेजें
      </h2>
      <div className="bg-gray-100 p-6 rounded-lg border">
        {/* A real contact form would involve client-side components and an API route for submission */}
        <p className="text-gray-600 italic">
          [यहां एक कार्यात्मक संपर्क फ़ॉर्म (जैसे नेम, ईमेल, मैसेज) आएगा। इसे बनाने के लिए आपको क्लाइंट कंपोनेंट और एक Next.js API रूट की आवश्यकता होगी।]
        </p>
      </div>
    </section>
  );
}