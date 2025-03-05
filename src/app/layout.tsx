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
    <html
      lang="en"
      className={`${satoshi.className} ${fraunces.className} h-full`}
    >
      <body className="h-full">
        <div className="h-screen bg-[#fff] flex overflow-hidden">
          {/* Sidebar */}
          <SideBar />
          {/* Main content */}
          <main className="ml-4 w-full overflow-y-auto">
            <div className="mx-auto py-12 pr-24 pl-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
