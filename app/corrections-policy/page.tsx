// app/corrections-policy/page.tsx
import React from 'react';

// Define metadata for the specific page
export const metadata = {
  title: 'सुधार नीति (Corrections Policy) - Khabar24Live',
  description: 'खबर 24 लाइव पर प्रकाशित कंटेंट में त्रुटियों को सुधारने की प्रक्रिया और प्रतिबद्धता।',
};

const CorrectionsPolicyPage: React.FC = () => {
    // Define the website URL for clarity
    const websiteUrl = 'https://www.newsstate24.com';

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-xl rounded-xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">सुधार नीति (Corrections Policy)</h1>

            <p className="text-gray-600 mb-8">
                खबर 24 लाइव (`{websiteUrl}`) सटीकता और सत्यनिष्ठा के उच्चतम मानकों के प्रति प्रतिबद्ध है। हम समझते हैं कि मानवीय त्रुटियाँ हो सकती हैं। यह नीति उस प्रक्रिया की रूपरेखा बताती है जिसके तहत हम अपनी प्रकाशित कंटेंट में तथ्यात्मक त्रुटियों को सुधारते हैं।
            </p>

            {/* --- 1. Our Commitment to Accuracy --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">1. सटीकता के प्रति हमारी प्रतिबद्धता</h2>
            <p className="text-gray-700">
                हमारा लक्ष्य है कि सभी समाचार और जानकारी त्रुटियों से मुक्त हो। यदि हमारे कंटेंट में कोई त्रुटि पाई जाती है, तो हम अपनी विश्वसनीयता बनाए रखने के लिए उसे तुरंत, पारदर्शी रूप से और प्रमुखता से सुधारने का वादा करते हैं।
            </p>

            {/* --- 2. Definition of a Correction --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">2. सुधार की परिभाषा (Definition of a Correction)</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
                <li>
                    एक सुधार आवश्यक है जब प्रकाशित कंटेंट में कोई **तथ्यात्मक त्रुटि** (factual error) होती है, जैसे गलत नाम, गलत तारीखें, गलत उद्धरण, या महत्वपूर्ण संख्याओं का गलत विवरण।
                </li>
                <li>
                    छोटी स्टाइलिंग त्रुटियाँ (जैसे टाइपो या व्याकरण संबंधी मामूली त्रुटियाँ) बिना किसी औपचारिक सुधार सूचना के ठीक की जा सकती हैं, जब तक कि वे कंटेंट के अर्थ को न बदलें।
                </li>
            </ul>

            {/* --- 3. The Correction Process --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">3. सुधार प्रक्रिया (The Correction Process)</h2>
            <ol className="list-decimal ml-6 text-gray-700 space-y-3 mt-3">
                <li>
                    **रिपोर्टिंग:** किसी त्रुटि की पहचान होने या विज़िटर्स द्वारा रिपोर्ट किए जाने पर, हमारी संपादकीय टीम तुरंत उसकी समीक्षा करती है।
                </li>
                <li>
                    **सत्यापन:** हम त्रुटि को सत्यापित करने के लिए अपने मूल स्रोतों और बाहरी सूचनाओं की जांच करते हैं।
                </li>
                <li>
                    **संशोधन:** मूल लेख में त्रुटि को जल्द से जल्द ठीक किया जाता है।
                </li>
                <li>
                    **सूचना:** लेख के अंत में एक **'सुधार नोट'** जोड़ा जाता है। इस नोट में बताया जाता है कि क्या गलत था, क्या सुधारा गया है, और सुधार कब किया गया है।
                </li>
                <li>
                    **पुन: प्रकाशन:** संशोधित और नोट किया गया लेख फिर से प्रकाशित किया जाता है।
                </li>
            </ol>

            {/* --- 4. How to Report a Correction --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">4. सुधार की रिपोर्ट कैसे करें</h2>
            <p className="text-gray-700">
                यदि आप हमारी वेबसाइट पर कोई तथ्यात्मक त्रुटि देखते हैं, तो हम आपसे अनुरोध करते हैं कि आप निम्नलिखित जानकारी के साथ हमसे तुरंत संपर्क करें:
            </p>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
                <li>लेख का URL (लिंक)।</li>
                <li>वह विशिष्ट वाक्य या पैराग्राफ जिसमें त्रुटि है।</li>
                <li>सही जानकारी क्या होनी चाहिए।</li>
                <li>उस सही जानकारी का एक विश्वसनीय स्रोत (यदि उपलब्ध हो)।</li>
            </ul>

            {/* --- 5. Contact Information --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">5. संपर्क जानकारी</h2>
            <p className="text-gray-700">
                सुधार रिपोर्ट करने या इस नीति के संबंध में प्रश्न पूछने के लिए, कृपया हमसे संपर्क करें:
            </p>
            <p className="text-gray-700 font-semibold mt-2">
                ईमेल: [अपना संपर्क ईमेल पता यहां जोड़ें]
            </p>

        </div>
    );
};

export default CorrectionsPolicyPage;