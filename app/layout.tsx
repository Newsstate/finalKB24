// app/layout.tsx
import './globals.css';
import { Header } from '@/components/Header'; // <-- New Import
import { Footer } from '@/components/Footer'; 

export const metadata = {
  title: 'Khabar24Live - Next.js',
  description: 'Recreation of khabar24live.com using Next.js and WordPress API',
};

// NOTE: The 'categories' array is now defined and used inside Header.tsx.
// We remove the redundant array definition here.

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <body>
        
        {/* === HEADER COMPONENT === */}
        <Header /> 

        {/* === Main Content Area === */}
        <main className="container mx-auto p-4 min-h-screen">
          <div className="flex">
            <div className="w-full lg:w-3/4 pr-4">
              {children}
            </div>
            {/* Simple Sidebar Placeholder */}
            <aside className="hidden lg:block w-1/4 pt-4 border-l pl-4">
              <h3 className="text-xl font-bold mb-4 text-red-700">Trending News</h3>
              {/* This will be dynamic content later */}
              <div className="bg-gray-100 p-3 rounded h-64">
                Loading sidebar content...
              </div>
            </aside>
          </div>
        </main>
        
        {/* === Footer Integration === */}
        <Footer />

      </body>
    </html>
  );
}