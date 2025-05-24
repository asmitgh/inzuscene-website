import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import AudioToggle from "@/components/AudioToggle";
import { ScrollProgress } from "@/components/scroll-progress";
import Preloader from "@/components/Preloader";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: 'Inzuscene | Enterprise IT Solutions',
  description: 'Empowering enterprises with AI, ERP, Cloud, and Cybersecurity solutions tailored for digital transformation and future scalability.',
  keywords: ['Inzuscene', 'Enterprise Solutions', 'ERP', 'AI', 'Cloud Computing', 'Cybersecurity', 'IT Consulting', 'Digital Transformation', 'Enterprise Intelligence', 'Enterprise Automation', 'Enterprise Intelligence Simplified',  'Implementation Services'],
  icons: {
    icon: '/favicon-inz.ico',
  },
  openGraph: {
    title: 'Inzuscene | Enterprise IT Solutions',
    description: 'Discover how Inzuscene is redefining enterprise excellence through intelligent automation, secure infrastructure, and scalable cloud solutions.',
    url: 'https://inzuscene.com',
    siteName: 'Inzuscene',
    images: [
      {
        url: '/assets/og/inzuscene-banner.png', // replace with actual optimized path
        width: 1200,
        height: 630,
        alt: 'Inzuscene Banner',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  metadataBase: new URL('https://inzuscene.com'),
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-noto antialiased`}>
        <div>
          
          <Preloader>
            <Navbar />
            <main>
              <ScrollProgress />
              {children}
            </main>
            <Footer />
          </Preloader>
        </div>
        <Toaster />
        <Analytics/>
        <SpeedInsights/>
      </body>
    </html>
  );
}
