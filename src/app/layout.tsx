import "./globals.css";

export const metadata = {
  title: "GroceryCompare AI - by Sourabh Savre",
  description: "AI-Powered Grocery Price Comparison across Zepto, BigBasket & Blinkit. Built by Sourabh Savre.",
};

export const viewport = {
  themeColor: "#0A0A0A",
};

import { AppProviders } from "@/providers/AppProviders";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
