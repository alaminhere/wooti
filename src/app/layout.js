import { Libre_Baskerville, Poppins } from 'next/font/google';
import './globals.css';
import SessionProviderWarp from '@/providers/SessionProviderWarp';
import { CartProvider } from '@/contexts/CartProvider';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  subsets: ['latin'],
});

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '500', '600', '700'],
  variable: '--font-libre-baskerville',
  subsets: ['latin'],
});

export const metadata = {
  metadataBase: new URL("https://alamin-wooti.vercel.app"),

  title: "Wooti | Modern E-Commerce Platform",

  description:
    "Wooti is a modern e-commerce platform where users can explore quality products and enjoy a smooth shopping experience.",

  openGraph: {
    title: "Wooti | Modern E-Commerce Platform",

    description:
      "A modern e-commerce platform built for a smooth and simple shopping experience.",

    url: "https://alamin-wooti.vercel.app",

    siteName: "Wooti",

    images: [
      {
        url: "https://alamin-wooti.vercel.app/images/wooti.webp",
        width: 1200,
        height: 630,
        alt: "Wooti E-Commerce Preview",
      },
    ],

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Wooti | Modern E-Commerce Platform",

    description:
      "A modern e-commerce platform built for a smooth and simple shopping experience.",

    images: [
      "https://alamin-wooti.vercel.app/images/wooti.webp",
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${libreBaskerville.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessionProviderWarp>
          <CartProvider>{children}</CartProvider>
        </SessionProviderWarp>
      </body>
    </html>
  );
}
