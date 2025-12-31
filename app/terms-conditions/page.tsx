// app/terms-and-conditions/page.tsx
import React from 'react';

// Define metadata for the specific page
export const metadata = {
  title: 'नियम और शर्तें (Terms & Conditions) - Newsstate24',
  description: 'न्यूज़ स्टेट 24 वेबसाइट का उपयोग करने से संबंधित नियम और शर्तें।',
};

const TermsAndConditionsPage: React.FC = () => {
    // Define the website URL for clarity
    const websiteUrl = 'https://www.newsstate24.com';

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-xl rounded-xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">नियम और शर्तें (Terms & Conditions)</h1>

            <p className="text-gray-700 mb-6">
                स्वागत है Newsstate24.com पर! इस वेबसाइट (`{websiteUrl}`) का उपयोग करने से आप इन नियम और शर्तों से सहमत होते हैं। कृपया ध्यानपूर्वक पढ़ें।
            </p>

            {/* --- 1. Terms of Use --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">1. उपयोग की शर्तें (Terms of Use)</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
                <li>
                    वेबसाइट की सामग्री केवल **व्यक्तिगत और गैर-व्यावसायिक उपयोग** के लिए है।
                </li>
                <li>
                    कोई भी उपयोगकर्ता Newsstate24.com की सामग्री को कॉपी, पुनःप्रकाशित या वितरित **नहीं कर सकता** बिना हमारी लिखित अनुमति के।
                </li>
            </ul>

            {/* --- 2. Content Responsibility --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">2. सामग्री की जिम्मेदारी (Content Responsibility)</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
                <li>
                    हमारी वेबसाइट पर प्रकाशित समाचार, लेख, तस्वीरें और वीडियो केवल **सामान्य जानकारी और सूचना** के लिए हैं।
                </li>
                <li>
                Newsstate24.com सामग्री की **सटीकता, पूर्णता या अद्यतनता** की गारंटी नहीं देता।
                </li>
                <li>
                    किसी भी जानकारी का उपयोग करने या उस पर भरोसा करने से होने वाली **किसी भी हानि की जिम्मेदारी उपयोगकर्ता की होगी**।
                </li>
            </ul>

            {/* --- 3. Links and Third-Party Sites --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">3. लिंक और तृतीय-पक्ष साइट्स (Links and Third-Party Sites)</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
                <li>
                    हमारी वेबसाइट पर मौजूद **बाहरी लिंक** केवल सुविधा के लिए प्रदान किए गए हैं।
                </li>
                <li>
                    हम किसी भी तृतीय-पक्ष वेबसाइट की सामग्री, गोपनीयता या सुरक्षा के लिए **उत्तरदायी नहीं हैं**।
                </li>
            </ul>

            {/* --- 4. User Responsibility --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">4. उपयोगकर्ता की जिम्मेदारी (User Responsibility)</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
                <li>
                    उपयोगकर्ता को वेबसाइट का उपयोग **कानूनी रूप से** करना होगा।
                </li>
                <li>
                    किसी भी प्रकार की अवैध गतिविधि, कॉपीराइट उल्लंघन या वेबसाइट की सुरक्षा को प्रभावित करने वाले कार्य के लिए Newsstate24.com **उत्तरदायी नहीं होगा**।
                </li>
            </ul>

            {/* --- 5. Changes and Updates --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">5. परिवर्तन और अपडेट (Changes and Updates)</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
                <li>
                Newsstate24.com समय-समय पर **नियम और शर्तों में बदलाव** कर सकता है।
                </li>
                <li>
                    बदलाव प्रकाशित होने के तुरंत बाद प्रभावी हो जाते हैं। उपयोगकर्ताओं को नियमित रूप से इस पेज की समीक्षा करने की सलाह दी जाती है।
                </li>
            </ul>

            {/* --- 6. Copyright and Intellectual Property --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">6. कॉपीराइट और बौद्धिक संपदा (Copyright and Intellectual Property)</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
                <li>
                    वेबसाइट पर मौजूद सभी लेख, तस्वीरें, वीडियो और ग्राफिक्स Newsstate24.com के **कॉपीराइट और बौद्धिक संपदा अधिकार** के अंतर्गत हैं।
                </li>
                <li>
                    बिना अनुमति सामग्री का उपयोग **कानूनी कार्रवाई** का कारण बन सकता है।
                </li>
            </ul>

            {/* --- 7. Contact Information --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">7. संपर्क जानकारी (Contact Information)</h2>
            <p className="text-gray-700">
                यदि आपके पास नियम और शर्तें या वेबसाइट उपयोग के संबंध में कोई सवाल है, तो कृपया हमसे संपर्क करें:
            </p>
            <p className="text-gray-700 mt-2">
                <span className="font-semibold block">ईमेल:</span> newsstate6294@gmail.com
            </p>
            <p className="text-gray-700">
                <span className="font-semibold block">फ़ोन:</span> +91-798306159
            </p>
        </div>
    );
};

export default TermsAndConditionsPage;