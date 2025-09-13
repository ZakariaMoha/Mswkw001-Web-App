import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Miswak World - Premium Natural Oral Care | Follow the Sunnah 🌿',
  description: 'Discover authentic miswak sticks from Miswak World. 100% natural oral care following Islamic tradition. Strengthens gums, whitens teeth naturally. Order on WhatsApp.',
  keywords: 'miswak, siwak, natural oral care, Islamic tradition, sunnah, teeth whitening, gum care, antibacterial, Pakistan',
  authors: [{ name: 'Miswak World' }],
  openGraph: {
    title: 'Miswak World - Premium Natural Oral Care',
    description: 'Revive the Sunnah 🌿 Refresh Your Smile Naturally with our premium miswak sticks',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Miswak World',
    images: [
      {
        url: 'https://images.pexels.com/photos/4239032/pexels-photo-4239032.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Miswak World - Natural Miswak Sticks',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Miswak World - Premium Natural Oral Care',
    description: 'Revive the Sunnah 🌿 Refresh Your Smile Naturally',
    images: ['https://images.pexels.com/photos/4239032/pexels-photo-4239032.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop'],
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌿</text></svg>" />
        <meta name="theme-color" content="#2F4F2F" />
        <meta property="business:contact_data:street_address" content="Karachi" />
        <meta property="business:contact_data:locality" content="Karachi" />
        <meta property="business:contact_data:region" content="Sindh" />
        <meta property="business:contact_data:postal_code" content="75000" />
        <meta property="business:contact_data:country_name" content="Pakistan" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              "name": "Miswak World",
              "description": "Premium natural miswak sticks following Islamic tradition",
              "url": process.env.NEXT_PUBLIC_SITE_URL,
              "logo": "https://images.pexels.com/photos/4239032/pexels-photo-4239032.jpeg",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Karachi",
                "addressCountry": "Pakistan"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": `+92${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`,
                "contactType": "customer service"
              },
              "sameAs": [
                `https://instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE}`
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}