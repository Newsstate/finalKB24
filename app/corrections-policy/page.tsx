import React from 'react';
import Link from 'next/link'; // Assuming Link is available in your environment

// Define metadata for the specific page
export const metadata = {
  title: 'सुधार नीति (Corrections Policy) - Newsstate24',
  description: 'न्यूज़ स्टेट 24 की सामग्री में त्रुटियों को तेज़ी और पारदर्शिता से सुधारने की नीति।',
};

const CorrectionsPolicyPage: React.FC = () => {
    // Define the website URL (placeholder for context)
    const websiteUrl = 'https://www.Newsstate24.com';

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-xl rounded-xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">सुधार नीति (Corrections Policy)</h1>

            <p className="text-gray-700 mb-6">
            Newsstate24.com पाठकों को सटीक और भरोसेमंद समाचार प्रदान करने के लिए प्रतिबद्ध है। हमारी सुधार नीति इस बात को सुनिश्चित करती है कि यदि किसी समाचार, लेख या रिपोर्ट में कोई त्रुटि हो, तो उसे **तेजी और पारदर्शिता के साथ ठीक किया जाए**।
            </p>

            {/* --- 1. Our Commitment --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">1. हमारी प्रतिबद्धता (Our Commitment)</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
                <li>
                    <span className="font-semibold">सटीकता:</span> हमारी प्राथमिकता हमेशा यह है कि पाठकों को **सही और अद्यतन जानकारी** मिले।
                </li>
                <li>
                    <span className="font-semibold">पारदर्शिता:</span> यदि किसी सामग्री में कोई गलती पाई जाती है, तो हम उसे **स्पष्ट रूप से पहचानते और सुधारते** हैं।
                </li>
                <li>
                    <span className="font-semibold">उत्तरदायित्व:</span> Newsstate24.com पाठकों के भरोसे को महत्व देता है और सुधार प्रक्रिया में पूरी जिम्मेदारी निभाता है।
                </li>
            </ul>

            {/* --- 2. Correction Procedure --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">2. सुधार की प्रक्रिया (Correction Procedure)</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
                <li>
                    <span className="font-semibold">त्रुटि की पहचान:</span> त्रुटि का पता लगने पर संपादक और संबंधित टीम **जांच** करती है।
                </li>
                <li>
                    <span className="font-semibold">सुधार और नोटिस:</span> गलती को ठीक करने के साथ-साथ वेबसाइट पर **Correction नोटिस** प्रकाशित किया जाता है।
                </li>
                <li>
                    <span className="font-semibold">पाठक की सूचना:</span> यदि कोई पाठक गलती की सूचना देता है, तो उसे **24–48 घंटों में प्रतिक्रिया** दी जाती है।
                </li>
            </ul>

            {/* --- 3. Scope of Policy --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">3. सुधार नीति का दायरा (Scope of Policy)</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
                <li>
                    समाचार लेख, रिपोर्ट, फोटो और वीडियो सभी इस नीति के अंतर्गत आते हैं।
                </li>
                <li>
                    सामग्री में सुधार करते समय **सामग्री का मूल अर्थ और संदर्भ सुरक्षित** रखा जाता है।
                </li>
                <li>
                    किसी भी त्रुटि को ठीक करने के लिए **संपादकीय टीम का निर्णय अंतिम** माना जाएगा।
                </li>
            </ul>

            {/* --- 4. Contact Information --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">4. संपर्क जानकारी (Contact Information)</h2>
            <p className="text-gray-700">
                यदि आप किसी त्रुटि या सुधार के बारे में सूचित करना चाहते हैं, तो कृपया हमसे संपर्क करें:
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

export default CorrectionsPolicyPage;