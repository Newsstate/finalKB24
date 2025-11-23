// app/diverse-staffing-policy/page.tsx
import React from 'react';

// Define metadata for the specific page
export const metadata = {
  title: 'विविध स्टाफिंग और नीति (Diverse Staffing and Policy) - Khabar24Live',
  description: 'खबर 24 लाइव की कार्यस्थल में विविधता, समानता और समावेशन को बढ़ावा देने की नीति।',
};

const DiverseStaffingPolicyPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-xl rounded-xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">विविध स्टाफिंग और नीति (Diverse Staffing and Policy)</h1>

            <p className="text-gray-700 mb-6">
                Khabar24live.com मानता है कि हमारी टीम की **विविधता ही हमारी ताकत है**। हम ऐसे कार्यस्थल को बढ़ावा देते हैं जहाँ सभी कर्मचारियों को **समान अवसर, सम्मान और समर्थन** मिलता है। हमारी विविध स्टाफिंग नीति इस सिद्धांत पर आधारित है कि विविध पृष्ठभूमि, अनुभव और विचार संगठन की सफलता में योगदान देते हैं।
            </p>

            {/* --- 1. Our Diversity Vision --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">1. हमारी विविधता का दृष्टिकोण (Our Diversity Vision)</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
                <li>
                    <span className="font-semibold">समान अवसर:</span> हम सभी कर्मचारियों और अभ्यर्थियों को योग्यता के आधार पर समान अवसर प्रदान करते हैं।
                </li>
                <li>
                    <span className="font-semibold">सामाजिक और सांस्कृतिक विविधता:</span> हम जाति, धर्म, लिंग, उम्र, राष्ट्रीयता, योग्यता या अन्य भेदभावों के आधार पर किसी भी भेदभाव को अस्वीकार करते हैं।
                </li>
                <li>
                    <span className="font-semibold">समान कार्य वातावरण:</span> हम एक समावेशी और सहयोगी कार्यस्थल बनाने के लिए प्रतिबद्ध हैं जहाँ हर कोई मूल्यवान महसूस करे।
                </li>
            </ul>

            {/* --- 2. Recruitment and Staffing --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">2. भर्ती और स्टाफिंग (Recruitment and Staffing)</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
                <li>
                    <span className="font-semibold">निष्पक्ष चयन प्रक्रिया:</span> सभी रिक्तियों के लिए उम्मीदवारों का चयन **योग्यता और कौशल** के आधार पर किया जाता है, बिना किसी पूर्वाग्रह के।
                </li>
                <li>
                    <span className="font-semibold">समावेशी टीम:</span> हम विभिन्न पृष्ठभूमि वाले प्रतिभाओं को शामिल करने के लिए सक्रिय प्रयास करते हैं ताकि हमारी टीम हमारे पाठकों की तरह विविध हो।
                </li>
                <li>
                    <span className="font-semibold">प्रशिक्षण और विकास:</span> कर्मचारियों को नियमित प्रशिक्षण और विकास के अवसर प्रदान किए जाते हैं ताकि सभी अपनी पूरी क्षमता का उपयोग कर सकें और पेशेवर रूप से आगे बढ़ सकें।
                </li>
            </ul>

            {/* --- 3. Employee Engagement and Support --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">3. कर्मचारी सहभागिता और समर्थन (Employee Engagement and Support)</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
                <li>
                    <span className="font-semibold">सुझाव और फीडबैक:</span> हमारी टीम को अपनी राय व्यक्त करने, खुला फीडबैक और सुझाव देने का अधिकार है।
                </li>
                <li>
                    <span className="font-semibold">समान अधिकार:</span> सभी कर्मचारियों को उनकी भूमिका और पद के आधार पर समान अधिकार, भत्ते और सुविधाएँ उपलब्ध कराई जाती हैं।
                </li>
                <li>
                    <span className="font-semibold">स्वास्थ्य और सुरक्षा:</span> हम कर्मचारियों की भौतिक और मानसिक स्वास्थ्य की सुरक्षा के लिए उचित नीतियां लागू करते हैं और एक सुरक्षित कार्य वातावरण प्रदान करते हैं।
                </li>
            </ul>

            {/* --- 4. Our Commitment --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">4. हमारी प्रतिबद्धता (Our Commitment)</h2>
            <p className="text-gray-700 font-medium">
                Khabar24live.com यह सुनिश्चित करता है कि हमारी विविध स्टाफिंग नीति **केवल शब्दों तक सीमित न रहे**, बल्कि इसे कार्यस्थल पर हर रोज़ लागू किया जाए। हमारी यह प्रतिबद्धता संगठन के सभी स्तरों पर स्पष्ट और प्रभावी रूप से दिखाई देती है।
            </p>

            {/* --- 5. Contact Information --- */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">5. संपर्क जानकारी (Contact Information)</h2>
            <p className="text-gray-700">
                यदि आपके पास हमारी इस Diverse Staffing and Policy के बारे में कोई प्रश्न है, तो कृपया हमसे संपर्क करें:
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

export default DiverseStaffingPolicyPage;