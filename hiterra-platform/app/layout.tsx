import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";

import { ClerkProvider, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Toaster } from "react-hot-toast"

const dmSans = DM_Sans({ subsets: ["latin"] });

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
        <body className={twMerge(dmSans.className, "antialiased bg-[#EAEEFE]")}>
          {/* <ClerkLoading>
          </ClerkLoading>
          <ClerkLoaded> */}
          <AntdRegistry>
            {children}
            <ScrollToTopButton />
            <Toaster />
          </AntdRegistry>
          {/* </ClerkLoaded> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
