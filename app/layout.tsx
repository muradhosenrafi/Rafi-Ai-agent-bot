import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import axios from './../node_modules/axios/lib/axios';
import Provider from './provider';

export const metadata: Metadata = {
  title: "Next.js Premium Startup Boilerplate",
  description: "Created using the ultimate interactive Next.js stack generator CLI.",
};

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <ClerkProvider>
      <html lang="en" className={` ${figtree.variable}`}>
        <body style={{ margin: 0, padding: 0 }}>
         <Provider>
          {children}
         </Provider>
        
        </body>
      </html>
    </ClerkProvider>
  );
}