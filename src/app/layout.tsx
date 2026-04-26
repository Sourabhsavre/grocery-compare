import "./globals.css";

export const metadata = {
  title: "GroceryCompare AI",
  description: "AI-Powered Grocery Price Comparison",
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
