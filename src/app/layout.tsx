import "./global.css";
import { satoshi, fraunces } from "./fonts";
import SideBar from "@/components/SideBar";

export const metadata = {
  title: "Sourav",
  description: "Insightful Articles & Endless Inspiration.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${satoshi.className} ${fraunces.className}`}>
      <body>
        <div className="min-h-screen bg-[#fff] flex">
          {/* Sidebar */}
          <SideBar />
          {/* Main content */}
          <main className="ml-4 w-full">
            <div className="mx-auto py-12 pr-24 pl-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
