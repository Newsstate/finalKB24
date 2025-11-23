// app/disclaimer/page.tsx
import React from 'react';
import Link from 'next/link';

// Define metadata for the specific page
export const metadata = {
  title: 'अस्वीकरण (Disclaimer) - Khabar24Live',
  description: 'खबर 24 लाइव वेबसाइट के उपयोग से संबंधित सामान्य अस्वीकरण और शर्तें।',
};

const DisclaimerPage: React.FC = () => {
    // Define the website URL for clarity within the disclaimer
    const websiteUrl = 'https://www.khabar24live.com';

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-xl rounded-xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">अस्वीकरण (Disclaimer)</h1>

            <p className="text-gray-600 mb-8">
                यह अस्वीकरण खबर 24 लाइव (`{websiteUrl}`) के उपयोग को नियंत्रित करता है। इस वेबसाइट का उपयोग करके, आप इस अस्वीकरण को पूरी तरह से स्वीकार करते हैं।
            </p>

            {/* --- 1. General Information and Accuracy --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">1. सामान्य जानकारी और सटीकता</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
                <li>
                    इस वेबसाइट पर प्रदान की गई सभी जानकारी केवल **सामान्य सूचना उद्देश्यों** के लिए है। जबकि हम जानकारी को अद्यतन और सही रखने का प्रयास करते हैं, हम वेबसाइट या जानकारी, उत्पादों, सेवाओं, या संबंधित ग्राफिक्स की पूर्णता, सटीकता, विश्वसनीयता, उपयुक्तता या उपलब्धता के बारे में किसी भी प्रकार का कोई प्रतिनिधित्व या वारंटी, व्यक्त या निहित नहीं देते हैं।
                </li>
                <li>
                    ऐसी जानकारी पर आपके द्वारा किया गया कोई भी भरोसा **सख्ती से आपके अपने जोखिम** पर है।
                </li>
            </ul>

            {/* --- 2. External Links Disclaimer --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">2. बाहरी लिंक अस्वीकरण</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
                <li>
                    हमारी वेबसाइट में अन्य वेबसाइटों के लिंक हो सकते हैं जो हमारे नियंत्रण में नहीं हैं। हम उन साइटों की प्रकृति, कंटेंट और उपलब्धता पर कोई नियंत्रण नहीं रखते हैं।
                </li>
                <li>
                    किसी भी लिंक का समावेश जरूरी नहीं कि उसमें व्यक्त विचारों की सिफारिश या समर्थन करे। लिंक का होना केवल आपकी सुविधा के लिए प्रदान किया गया है।
                </li>
                <li>
                    जब आप हमारी वेबसाइट छोड़ते हैं, तो आपको अन्य साइटों की गोपनीयता नीतियों और उपयोग की शर्तों की समीक्षा करनी चाहिए।
                </li>
            </ul>

            {/* --- 3. Professional Advice Disclaimer --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">3. पेशेवर सलाह अस्वीकरण</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
                <li>
                    इस वेबसाइट पर मौजूद कोई भी कंटेंट (जिसमें स्वास्थ्य, वित्त, कानून या अन्य क्षेत्रों से संबंधित लेख शामिल हैं) को पेशेवर सलाह के रूप में नहीं माना जाना चाहिए।
                </li>
                <li>
                    यदि आपको कानूनी, वित्तीय, चिकित्सा या किसी अन्य विशेषज्ञ सहायता की आवश्यकता है, तो आपको उचित रूप से लाइसेंस प्राप्त या जानकार पेशेवर से सलाह लेनी चाहिए।
                </li>
            </ul>

            {/* --- 4. Advertising and Sponsorships --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">4. विज्ञापन और प्रायोजन</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
                <li>
                    इस वेबसाइट में विज्ञापन और प्रायोजित कंटेंट शामिल हो सकता है। यह कंटेंट विज्ञापनदाताओं द्वारा प्रदान किया जाता है।
                </li>
                <li>
                    हम विज्ञापनों में दी गई किसी भी जानकारी की सटीकता की पुष्टि नहीं करते हैं। विज्ञापनदाता स्वयं अपने विज्ञापनों के लिए जिम्मेदार होते हैं।
                </li>
                <li>
                    विज्ञापनदाताओं या प्रायोजकों के साथ किसी भी संबंध के परिणामस्वरूप उत्पन्न होने वाली किसी भी हानि या क्षति के लिए हम उत्तरदायी नहीं होंगे।
                </li>
            </ul>

            {/* --- 5. Limitation of Liability --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">5. दायित्व की सीमा</h2>
            <p className="text-gray-700">
                किसी भी स्थिति में हम किसी भी हानि या क्षति, बिना किसी सीमा के अप्रत्यक्ष या परिणामी हानि या क्षति, या इस वेबसाइट के उपयोग से उत्पन्न होने वाले डेटा या मुनाफे की किसी भी हानि या क्षति के लिए उत्तरदायी नहीं होंगे।
            </p>

            {/* --- 6. Contact Information --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">6. संपर्क</h2>
            <p className="text-gray-700">
                यदि इस अस्वीकरण के संबंध में आपके कोई प्रश्न हैं, तो कृपया हमसे संपर्क करें:
            </p>
            <p className="text-gray-700 font-semibold mt-2">
                ईमेल: [अपना संपर्क ईमेल पता यहां जोड़ें]
            </p>

        </div>
    );
};

export default DisclaimerPage;