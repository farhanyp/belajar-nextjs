import "@/styles/globals.css";
import Navbar from '@/components/Nav'
import Provider from "@/components/Provider";
import { useSession } from "next-auth/react";

export const metadata = {
  title: "Promptopiia",
  description: "Discover & Share AI Prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <Provider>
            <div className="main">
              <div className="gradient" />
            </div>
            <main className="app">
              <Navbar />
              {children}
            </main>
          </Provider>
      </body>
    </html>
  );
}
