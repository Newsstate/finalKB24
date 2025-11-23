// app/editorial-policy/page.tsx
import React from 'react';

// Define metadata for the specific page
export const metadata = {
  title: 'संपादकीय नीति (Editorial Policy) - Khabar24Live',
  description: 'खबर 24 लाइव की पत्रकारिता, सटीकता, निष्पक्षता और स्वतंत्रता के मानक।',
};

const EditorialPolicyPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-xl rounded-xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">संपादकीय नीति (Editorial Policy)</h1>

            <p className="text-gray-700 mb-6">
                Khabar24live.com की प्राथमिकता है कि पाठकों को **सटीक, निष्पक्ष और भरोसेमंद समाचार** प्रदान किए जाएँ। हमारी संपादकीय नीति इस सिद्धांत पर आधारित है कि समाचार का उद्देश्य केवल **सूचना और जागरूकता** प्रदान करना होना चाहिए, न कि किसी भी पक्षपात या प्रचार का माध्यम।
            </p>

            {/* --- 1. Our Editorial Vision --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">1. हमारी संपादकीय दृष्टि (Our Editorial Vision)</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
                <li>
                    <span className="font-semibold">सत्यापन और तथ्य-जांच:</span> सभी समाचार और लेख प्रकाशित होने से पहले **स्रोतों की जांच और सत्यापन** (fact-checking) से गुजरते हैं।
                </li>
                <li>
                    <span className="font-semibold">निष्पक्षता और संतुलन:</span> Khabar24live.com यह सुनिश्चित करता है कि समाचार **सभी दृष्टिकोणों का संतुलित चित्रण** करें, किसी एक पक्ष का अनावश्यक समर्थन न हो।
                </li>
                <li>
                    <span className="font-semibold">गोपनीयता और सम्मान:</span> व्यक्तिगत जानकारी का सम्मान किया जाता है और किसी भी समाचार में इसे बिना अनुमति या मजबूत संपादकीय औचित्य के साझा नहीं किया जाता।
                </li>
            </ul>

            {/* --- 2. Content Creation --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">2. सामग्री निर्माण (Content Creation)</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
                <li>
                    <span className="font-semibold">पेशेवर मानक:</span> सभी सामग्री **प्रोफेशनल पत्रकारों और संपादकों** द्वारा तैयार की जाती है जो नैतिक पत्रकारिता के मानकों का पालन करते हैं।
                </li>
                <li>
                    <span className="font-semibold">उद्देश्य:</span> हमारी सामग्री का उद्देश्य केवल पाठकों को **जागरूक और शिक्षित** करना है, न कि राय थोपना।
                </li>
                <li>
                    <span className="font-semibold">संवेदनशील विषय:</span> विवादास्पद और संवेदनशील विषयों पर रिपोर्टिंग करते समय **सत्यापन और जिम्मेदारी** के उच्चतम मानक का पालन किया जाता है ताकि नुकसान को कम किया जा सके।
                </li>
            </ul>

            {/* --- 3. Editorial Independence --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">3. संपादकीय स्वतंत्रता (Editorial Independence)</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
                <li>
                    <span className="font-semibold">पूर्ण स्वतंत्रता:</span> Khabar24live.com का संपादकीय विभाग **पूर्ण स्वतंत्रता** के साथ समाचार का चयन, रिपोर्टिंग और प्रकाशन करता है।
                </li>
                <li>
                    <span className="font-semibold">बाहरी दबावों से मुक्ति:</span> हमारी टीम **राजनीतिक, व्यावसायिक या अन्य बाहरी दबावों** से स्वतंत्र रहती है।
                </li>
                <li>
                    <span className="font-semibold">मानक पालन:</span> सभी लेख और रिपोर्ट **संपादकीय दिशानिर्देशों और नैतिक मानकों** के अनुसार प्रकाशित होते हैं।
                </li>
            </ul>

            {/* --- 4. Our Commitment to Readers --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">4. पाठकों के लिए हमारी प्रतिबद्धता</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
                <li>
                    पाठकों को **सटीक, समयोचित और भरोसेमंद जानकारी** प्रदान करना।
                </li>
                <li>
                    गलत जानकारी, अफवाह या भ्रांतिपूर्ण रिपोर्टिंग से बचना।
                </li>
                <li>
                    पाठकों के सवाल और शिकायतों का त्वरित और पारदर्शी समाधान, जैसा कि हमारी सुधार नीति में उल्लिखित है।
                </li>
            </ul>

            {/* --- 5. Contact Information --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">5. संपर्क जानकारी (Contact Information)</h2>
            <p className="text-gray-700">
                यदि आपके पास हमारी संपादकीय नीति के बारे में कोई प्रश्न या सुझाव है, तो कृपया हमसे संपर्क करें:
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

export default EditorialPolicyPage;