import "./global.css";
import Link from "next/link";
import { satoshi, fraunces } from "./fonts";

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
          <aside className="w-64 bg-[#F3F3F6] border border-[#DBDBDB] p-8 mx-4 mt-4 mb-40 rounded-[14px]">
            <div className="space-y-8">
              <div>
                <h1 className="text-[34px] font-bold font-fraunces">Sourav</h1>
                <p className="text-[#8A8484] text-[16px]">A Curious Seeker</p>
              </div>

              <nav className="space-y-1">
                <Link
                  href="/"
                  className="block py-2 text-gray-800 hover:text-gray-600 font-medium"
                >
                  BLOGS
                </Link>
                <Link
                  href="/newsletter"
                  className="block py-2 text-gray-800 hover:text-gray-600"
                >
                  NEWSLETTER
                </Link>
                <Link
                  href="/projects"
                  className="block py-2 text-gray-800 hover:text-gray-600"
                >
                  PROJECTS
                </Link>
                <Link
                  href="/about"
                  className="block py-2 text-gray-800 hover:text-gray-600"
                >
                  ABOUT
                </Link>
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="ml-4 w-full">
            <div className="mx-auto py-12 pr-24 pl-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
