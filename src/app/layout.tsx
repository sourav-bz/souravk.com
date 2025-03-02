import "../styles/global.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {/* Sidebar */}
          <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-8">
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-serif font-bold">Sourav</h1>
                <p className="text-gray-600 mt-2 text-sm">
                  Insightful Articles & Endless Inspiration.
                </p>
              </div>

              <nav className="space-y-1">
                <Link
                  href="/"
                  className="block py-2 text-gray-800 hover:text-gray-600 font-medium"
                >
                  ARTICLES
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
          <main className="ml-64">
            <div className="max-w-4xl mx-auto py-12 px-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
