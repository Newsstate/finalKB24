// app/content-policy/page.tsx
import React from 'react';

// Define metadata for the specific page
export const metadata = {
  title: 'कंटेंट पॉलिसी - Newsstate24',
  description: 'न्यूज़ स्टेट 24 पर कंटेंट के प्रकाशन, सटीकता और उपयोग से संबंधित नीतियां।',
};

const ContentPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-xl rounded-xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">कंटेंट पॉलिसी (Content Policy)</h1>

      <p className="text-gray-600 mb-8">
      न्यूज़ स्टेट 24 (`https://www.newsstate24.com`) एक विश्वसनीय और ज़िम्मेदार न्यूज़ प्लेटफ़ॉर्म बनने के लिए प्रतिबद्ध है। यह कंटेंट पॉलिसी हमारे द्वारा प्रकाशित, साझा और उपयोग किए जाने वाले कंटेंट के लिए हमारे मानकों, नियमों और नैतिक दिशानिर्देशों की रूपरेखा बताती है।
      </p>

      {/* --- 1. Accuracy and Verification --- */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">1. सटीकता और सत्यापन (Accuracy and Verification)</h2>
      <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
        <li>
          **सत्यनिष्ठा:** हम यह सुनिश्चित करने के लिए हर संभव प्रयास करते हैं कि प्रकाशित सभी जानकारी सटीक, तथ्यात्मक और अद्यतन (up-to-date) हो।
        </li>
        <li>
          **स्रोत:** कंटेंट प्रकाशित करने से पहले उसकी पुष्टि विश्वसनीय स्रोतों से की जाती है। यदि कोई जानकारी अनुमान (speculation) या अविश्वसनीय स्रोत पर आधारित है, तो उसे स्पष्ट रूप से इंगित किया जाता है।
        </li>
        <li>
          **सुधार:** यदि किसी कंटेंट में कोई त्रुटि पाई जाती है, तो हम उसे तुरंत सुधारते हैं और, यदि आवश्यक हो, तो उस सुधार को स्पष्ट रूप से स्वीकार करते हैं।
        </li>
      </ul>

      {/* --- 2. Originality and Copyright --- */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">2. मौलिकता और कॉपीराइट (Originality and Copyright)</h2>
      <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
        <li>
          **मौलिकता:** हम मौलिक कंटेंट (Original content) बनाने को प्राथमिकता देते हैं।
        </li>
        <li>
          **कॉपीराइट:** हम कॉपीराइट कानूनों का सख्ती से पालन करते हैं। किसी भी थर्ड-पार्टी कंटेंट (जैसे टेक्स्ट, चित्र, वीडियो) का उपयोग केवल कानूनी अनुमति, लाइसेंस या उचित उपयोग (Fair Use) के तहत किया जाएगा और स्रोत को स्पष्ट रूप से श्रेय दिया जाएगा।
        </li>
        <li>
          **उल्लंघन:** यदि आपको लगता है कि हमारी वेबसाइट पर कोई कंटेंट आपके कॉपीराइट का उल्लंघन करता है, तो कृपया तुरंत हमसे संपर्क करें।
        </li>
      </ul>

      {/* --- 3. Prohibited Content --- */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">3. प्रतिबंधित कंटेंट (Prohibited Content)</h2>
      <p className="text-gray-700">
        हमारी वेबसाइट पर निम्नलिखित प्रकार का कंटेंट **सख्ती से प्रतिबंधित** है, चाहे वह हमारे द्वारा प्रकाशित हो या यूज़र्स द्वारा सबमिट किया गया हो:
      </p>
      <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
        <li>घृणित भाषा, नस्लवाद, जातिवाद, लिंगवाद या किसी अन्य प्रकार का भेदभाव फैलाने वाला कंटेंट।</li>
        <li>हिंसा, अवैध गतिविधियों या आत्म-नुकसान को बढ़ावा देने वाला कंटेंट।</li>
        <li>मानहानिकारक, दुर्भावनापूर्ण या किसी व्यक्ति या समूह की प्रतिष्ठा को नुकसान पहुँचाने वाला कंटेंट।</li>
        <li>स्पष्ट रूप से अश्लील या यौन-उन्मुख कंटेंट।</li>
        <li>फिशिंग, मैलवेयर या दुर्भावनापूर्ण कोड फैलाने के उद्देश्य से लिंक।</li>
      </ul>

      {/* --- 4. User-Submitted Content (Comments) --- */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">4. यूज़र-सबमिटेड कंटेंट (टिप्पणियाँ)</h2>
      <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
        <li>
          टिप्पणियाँ (Comments) हमेशा विषय से संबंधित, रचनात्मक और सम्मानजनक होनी चाहिए।
        </li>
        <li>
          हम बिना किसी पूर्व सूचना के ऐसा कोई भी यूज़र कंटेंट हटाने का अधिकार सुरक्षित रखते हैं जो इस पॉलिसी का उल्लंघन करता हो।
        </li>
      </ul>

      {/* --- 5. Editorial Independence --- */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">5. संपादकीय स्वतंत्रता (Editorial Independence)</h2>
      <p className="text-gray-700">
        खबर 24 लाइव अपनी **संपादकीय स्वतंत्रता** (Editorial Independence) बनाए रखने के लिए प्रतिबद्ध है।
      </p>
      <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
        <li>
          विज्ञापनदाताओं (Advertisers) या अन्य बाहरी संस्थाओं का हमारे न्यूज़ कवरेज या कंटेंट की प्राथमिकता पर कोई सीधा प्रभाव नहीं पड़ेगा।
        </li>
        <li>
          प्रायोजित कंटेंट (Sponsored Content) को स्पष्ट रूप से चिह्नित किया जाएगा ताकि विज़िटर्स को संपादकीय कंटेंट और विज्ञापन के बीच अंतर पता चल सके।
        </li>
      </ul>

      {/* --- 6. Contact --- */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">6. संपर्क (Contact)</h2>
      <p className="text-gray-700">
        यदि इस कंटेंट पॉलिसी के संबंध में आपके कोई प्रश्न हैं या आप किसी उल्लंघन की रिपोर्ट करना चाहते हैं, तो कृपया हमसे संपर्क करें:
      </p>
      <p className="text-gray-700 font-semibold mt-2">
        ईमेल: [अपना संपर्क ईमेल पता यहां जोड़ें]
      </p>

    </div>
  );
};

export default ContentPolicyPage;