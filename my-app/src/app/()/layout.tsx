import { NavBar } from "../components/Navbar";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gradient-to-l from-cyan-500 to-sky-100 h-full">
          <Toaster position="top-center"/>
          <NavBar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
