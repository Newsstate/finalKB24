// app/privacy-policy/page.tsx
import React from 'react';
import Link from 'next/link';

// Define metadata for the specific page
export const metadata = {
  title: 'प्राइवेसी पॉलिसी - Khabar24Live',
  description: 'हमारी वेबसाइट khabar24live.com की प्राइवेसी पॉलिसी के बारे में जानें।',
};

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-xl rounded-xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">प्राइवेसी पॉलिसी (Privacy Policy)</h1>

      <p className="text-gray-600 mb-8">
        यह प्राइवेसी पॉलिसी बताती है कि हमारी वेबसाइट **खबर 24 लाइव** (`https://www.khabar24live.com`) अपने विज़िटर्स और यूज़र्स से कौन सी जानकारी एकत्र करती है और उसका उपयोग कैसे करती है।
      </p>

      {/* --- 1. Who We Are --- */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">1. हम कौन हैं (Who we are)</h2>
      <p className="text-gray-700">
        हमारी वेबसाइट का पता है: <code className="bg-gray-100 p-1 rounded">https://www.khabar24live.com</code>। हम अपने विज़िटर्स और यूज़र्स की गोपनीयता की रक्षा के लिए प्रतिबद्ध हैं।
      </p>

      {/* --- 2. Comments --- */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">2. टिप्पणियाँ (Comments)</h2>
      <p className="text-gray-700">
        जब विज़िटर्स साइट पर टिप्पणियाँ छोड़ते हैं, तो हम स्पैम का पता लगाने में मदद के लिए कमेंट फॉर्म में दिखाए गए डेटा के साथ-साथ विज़िटर का **आईपी पता** और **ब्राउज़र यूज़र एजेंट स्ट्रिंग** भी एकत्र करते हैं।
      </p>
      <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
        <li>
          आपके ईमेल पते से बनाया गया एक अनाम स्ट्रिंग (जिसे हैश भी कहा जाता है) **Gravatar सेवा** को यह देखने के लिए प्रदान किया जा सकता है कि क्या आप इसका उपयोग कर रहे हैं। Gravatar सेवा की गोपनीयता नीति यहां उपलब्ध है: <Link href="https://automattic.com/privacy/" target="_blank" className="text-blue-600 hover:underline">https://automattic.com/privacy/</Link>।
        </li>
        <li>
          आपकी टिप्पणी स्वीकृत होने के बाद, आपकी प्रोफ़ाइल तस्वीर टिप्पणी के संदर्भ में जनता के लिए दृश्यमान (Publicly visible) होती है।
        </li>
      </ul>

      {/* --- 3. Media --- */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">3. मीडिया (Media)</h2>
      <p className="text-gray-700">
        यदि आप वेबसाइट पर छवियां (images) अपलोड करते हैं, तो आपको **एम्बेडेड स्थान डेटा (Embedded Location Data - EXIF GPS)** वाली छवियों को अपलोड करने से बचना चाहिए। वेबसाइट के विज़िटर्स वेबसाइट पर मौजूद छवियों से किसी भी स्थान डेटा को डाउनलोड और निकाल सकते हैं।
      </p>

      {/* --- 4. Cookies --- */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">4. कूकीज़ (Cookies)</h2>
      <p className="text-gray-700">
        यदि आप हमारी साइट पर कोई टिप्पणी छोड़ते हैं, तो आप कूकीज़ में अपना नाम, ईमेल पता और वेबसाइट सहेजने का विकल्प चुन सकते हैं। यह आपकी सुविधा के लिए है ताकि अगली बार जब आप कोई अन्य टिप्पणी छोड़ें तो आपको अपना विवरण दोबारा न भरना पड़े। ये कूकीज़ **एक वर्ष** तक रहेंगी।
      </p>
      <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
        <li>
          यदि आप हमारे लॉगिन पेज पर आते हैं, तो हम यह निर्धारित करने के लिए एक अस्थायी कुकी सेट करेंगे कि आपका ब्राउज़र कूकीज़ स्वीकार करता है या नहीं। इस कुकी में **कोई व्यक्तिगत डेटा नहीं** होता है और आपके ब्राउज़र को बंद करने पर इसे हटा दिया जाता है।
        </li>
        <li>
          जब आप लॉगिन करते हैं, तो हम आपकी लॉगिन जानकारी और आपकी स्क्रीन डिस्प्ले विकल्पों को सहेजने के लिए कई कूकीज़ भी सेट करेंगे। लॉगिन कूकीज़ **दो दिनों** तक चलती हैं, और स्क्रीन विकल्प कूकीज़ **एक वर्ष** तक चलती हैं।
        </li>
        <li>
          यदि आप "मुझे याद रखें (Remember Me)" का चयन करते हैं, तो आपका लॉगिन **दो सप्ताह** तक बना रहेगा। यदि आप अपने खाते से लॉग आउट करते हैं, तो लॉगिन कूकीज़ हटा दी जाएंगी।
        </li>
      </ul>

      {/* --- 5. Embedded Content --- */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">5. अन्य वेबसाइटों से एम्बेडेड सामग्री (Embedded Content)</h2>
      <p className="text-gray-700">
        इस साइट के लेखों में एम्बेडेड सामग्री (जैसे वीडियो, चित्र, लेख, विज्ञापन आदि) शामिल हो सकती है। अन्य वेबसाइटों से एम्बेडेड सामग्री उसी तरह व्यवहार करती है जैसे कि विज़िटर ने दूसरी वेबसाइट का दौरा किया हो।
      </p>
      <p className="text-gray-700">
        ये वेबसाइटें आपके बारे में डेटा एकत्र कर सकती हैं, कूकीज़ का उपयोग कर सकती हैं, अतिरिक्त थर्ड-पार्टी ट्रैकिंग को एम्बेड कर सकती हैं, और उस एम्बेडेड सामग्री के साथ आपकी बातचीत की निगरानी कर सकती हैं, खासकर यदि आपका उस वेबसाइट पर खाता है और आप लॉग इन हैं।
      </p>
      
      {/* --- 6. Contact --- */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">6. गोपनीयता पूछताछ के लिए संपर्क करें (Contact for Privacy Inquiries)</h2>
      <p className="text-gray-700">
        यदि इस गोपनीयता नीति के संबंध में आपके कोई प्रश्न हैं, तो आप हमसे संपर्क कर सकते हैं:
      </p>
      <p className="text-gray-700 font-semibold mt-2">
        ईमेल: [अपना संपर्क ईमेल पता यहां जोड़ें]
      </p>

    </div>
  );
};

export default PrivacyPolicyPage;