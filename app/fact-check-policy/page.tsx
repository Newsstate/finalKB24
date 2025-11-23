import React from 'react';
import Link from 'next/link';

// Define metadata for the specific page
export const metadata = {
  title: 'फैक्ट-चेक नीति (Fact Check Policy) - Khabar24Live',
  description: 'खबर 24 लाइव की पत्रकारिता में तथ्यों के सत्यापन, सटीकता और पारदर्शिता को सुनिश्चित करने की नीति।',
};

const FactCheckPolicyPage: React.FC = () => {
    // Define the website URL for clarity
    // Note: The URL here has been updated based on the content provided by the user in this specific request.
    const websiteUrl = 'https://www.khabar24live.com';

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-xl rounded-xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">फैक्ट-चेक नीति (Fact Check Policy)</h1>

            <p className="text-gray-700 mb-6">
                Khabar24live.com (`{websiteUrl}`) पाठकों को **सटीक, निष्पक्ष और भरोसेमंद समाचार** प्रदान करने के लिए प्रतिबद्ध है। हमारी फैक्ट-चेक नीति यह सुनिश्चित करती है कि हमारी वेबसाइट पर प्रकाशित सभी समाचार और रिपोर्ट **सत्यापित तथ्यों पर आधारित** हों।
            </p>

            {/* --- 1. Our Commitment --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">1. हमारी प्रतिबद्धता (Our Commitment)</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
                <li>
                    <span className="font-semibold">सत्यापन:</span> सभी समाचार और रिपोर्ट प्रकाशित होने से पहले **स्रोतों और तथ्यों की गहन जांच** की जाती है।
                </li>
                <li>
                    <span className="font-semibold">पारदर्शिता:</span> यदि किसी जानकारी में त्रुटि पाई जाती है, तो उसे हमारी <Link href="/corrections-policy" className="text-red-600 hover:underline">सुधार नीति</Link> के तहत तुरंत सुधारा जाता है और पाठकों को **स्पष्ट नोटिस** के माध्यम से सूचित किया जाता है।
                </li>
                <li>
                    <span className="font-semibold">जिम्मेदारी:</span> पाठकों को भरोसेमंद और निष्पक्ष जानकारी प्रदान करना हमारी प्राथमिक जिम्मेदारी है, और हम किसी भी गलत सूचना (misinformation) के प्रसार को रोकने का प्रयास करते हैं।
                </li>
            </ul>

            {/* --- 2. Fact-Check Procedure --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">2. फैक्ट-चेक प्रक्रिया (Fact-Check Procedure)</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
                <li>
                    <span className="font-semibold">स्रोत की पुष्टि:</span> समाचार के सभी स्रोतों की विश्वसनीयता, प्रासंगिकता और प्रामाणिकता की पुष्टि की जाती है।
                </li>
                <li>
                    <span className="font-semibold">तथ्यों की जाँच:</span> रिपोर्ट में दिये गए आंकड़ों, उद्धरण, स्थानों और घटनाओं की **सत्यता की जाँच** कम से कम दो स्वतंत्र विश्वसनीय स्रोतों से की जाती है।
                </li>
                <li>
                    <span className="font-semibold">सुधार और नोटिस:</span> किसी गलती की पहचान होने पर, रिपोर्ट को तुरंत **सुधारकर** और लेख के अंत में एक **सुधार नोटिस** प्रकाशित करके पाठकों को बदलाव के बारे में सूचित किया जाता है।
                </li>
            </ul>

            {/* --- 3. Standards for Fact-Checking --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">3. फैक्ट-चेक के मानक (Standards for Fact-Checking)</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
                <li>
                    समाचार और लेख **विश्वसनीय स्रोतों और आधिकारिक आंकड़ों** पर आधारित होंगे। हम केवल प्राथमिक स्रोतों (Primary Sources) या प्रतिष्ठित सेकंडरी स्रोतों (Secondary Sources) का उपयोग करते हैं।
                </li>
                <li>
                    **सार्वजनिक दावे, अफवाहें या अनसत्यापित जानकारी** कभी भी तथ्यों के रूप में प्रकाशित नहीं की जाएगी। यदि अफवाहों पर रिपोर्टिंग आवश्यक है, तो उन्हें स्पष्ट रूप से **अपुष्ट दावे** के रूप में पहचाना जाएगा।
                </li>
                <li>
                    सामग्री की **स्वतंत्र और निष्पक्ष समीक्षा** सुनिश्चित की जाती है ताकि संपादकीय पक्षपात को दूर रखा जा सके।
                </li>
            </ul>

            {/* --- 4. Role of Readers --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">4. पाठकों की भूमिका (Role of Readers)</h2>
            <p className="text-gray-700">
                हमारा फैक्ट-चेक प्रयास हमारे पाठकों की भागीदारी से मजबूत होता है।
            </p>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
                <li>
                    पाठकों को आमंत्रित किया जाता है कि वे किसी भी **संदिग्ध जानकारी या संभावित त्रुटियों** की सूचना हमें दें।
                </li>
                <li>
                    पाठक हमें ईमेल या वेबसाइट फॉर्म के माध्यम से फ़ीडबैक दे सकते हैं, जिससे हमारी टीम को त्वरित कार्रवाई करने में मदद मिलती है।
                </li>
            </ul>

            {/* --- 5. Contact Information --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">5. संपर्क जानकारी (Contact Information)</h2>
            <p className="text-gray-700">
                यदि आप किसी खबर या रिपोर्ट के सत्यापन के बारे में हमें सूचित करना चाहते हैं, तो कृपया संपर्क करें:
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

export default FactCheckPolicyPage;