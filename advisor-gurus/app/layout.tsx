import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";  // Import AuthProvider
import "./globals.css";

// Importing custom fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Adding Metadata
export const metadata: Metadata = {
  title: "Advisor Gurus - Business Consulting",
  description: "Unlock your business potential with expert consulting services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}>
        <AuthProvider>  {/* Wrap the app with AuthProvider */}
          <Header />
          
          <main className="min-h-screen">
            {children}
          </main>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
