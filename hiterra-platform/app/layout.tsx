import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Toaster } from "react-hot-toast"

import { ClerkProvider, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hiterra Platform",
  description: "Created by Blnc Tech",
  icons: {
    icon: '/logo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/"
    >
      <html lang="en">
        <body className={inter.className}>
          <ClerkLoading>
          </ClerkLoading>
          <ClerkLoaded>
            <AntdRegistry>
              {children}
              <ScrollToTopButton />
              <Toaster />
            </AntdRegistry>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
