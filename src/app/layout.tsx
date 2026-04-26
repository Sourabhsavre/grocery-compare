import "./globals.css";

export const metadata = {
  title: "GroceryCompare AI - by Sourabh Savre",
  description: "AI-Powered Grocery Price Comparison across Zepto, BigBasket & Blinkit. Built by Sourabh Savre.",
};

import { AppProviders } from "@/providers/AppProviders";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
