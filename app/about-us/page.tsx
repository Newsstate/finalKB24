// app/about-us/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Newsstate24',
  description: 'Read about the mission, vision, and editorial team of Newsstate24, your source for accurate and fast Hindi news.',
  // Static pages use canonical link pointing to self
  alternates: {
    canonical: 'https://www.newsstate24.com/about-us',
  }
};

export default function AboutUsPage() {
  return (
    <section className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-6 text-red-700 border-b pb-2">
        हमारे बारे में (About Newsstate24)
      </h1>
      
      <div className="space-y-6 text-gray-700">
        <p className="text-lg">
        Newsstate24 एक अग्रणी हिंदी समाचार पोर्टल है जो पाठकों को देश और दुनिया की हर ताज़ा और सटीक खबर पहुँचाने के लिए समर्पित है। हमारा उद्देश्य राजनीति, मनोरंजन, खेल, धर्म, व्यापार और क्षेत्रीय समाचारों (जैसे **बिहार**, **यूपी**, **एमपी**) पर गहराई से रिपोर्टिंग करना है।
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">
          हमारा मिशन (Our Mission)
        </h2>
        <p>
          हमारा मिशन पत्रकारिता के उच्चतम मानकों को बनाए रखते हुए, जनता को निष्पक्ष, संतुलित और समय पर सूचना प्रदान करना है। हम मानते हैं कि सूचित नागरिक ही एक सशक्त राष्ट्र का निर्माण करते हैं।
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">
          संपादकीय टीम (Editorial Team)
        </h2>
        <p>
          हमारी टीम अनुभवी पत्रकारों और संपादकों से बनी है जो अपनी-अपनी बीट में विशेषज्ञता रखते हैं। हम सत्य के प्रति प्रतिबद्ध हैं और अफवाहों के बजाय तथ्यों पर ध्यान केंद्रित करते हैं।
        </p>
        
        {/* You can add team member cards or history here */}
      </div>
    </section>
  );
}