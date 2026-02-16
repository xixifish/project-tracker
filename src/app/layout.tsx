import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/src/components/Sidebar";

export const metadata: Metadata = {
  title: "Project Tracker",
  description: "Manage projects easily with your team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
