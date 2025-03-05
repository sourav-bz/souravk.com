"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <aside className="sticky top-0 w-[320px] h-[800px] bg-[#F3F3F6] border border-[#DBDBDB] p-8 mx-4 mt-4 mb-40 rounded-[14px]">
      <div className="space-y-10">
        <div>
          <h1 className="text-[34px] font-bold font-fraunces">Sourav</h1>
          <p className="text-[#8A8484] text-[16px]">
            A Curious Seeker, Writer, Exploring the Intersection of Technology
            and Humanity.
          </p>
        </div>

        <nav className="space-y-1">
          <Link
            href="/"
            className={`block mb-4 px-3 transition-colors ${
              isActive("/")
                ? "text-gray-900 font-medium border-l-2 border-black"
                : "text-gray-800 hover:text-gray-600 hover:bg-gray-100"
            }`}
          >
            BLOGS
          </Link>
          <Link
            href="/projects"
            className={`block mb-4 px-3 transition-colors ${
              isActive("/projects")
                ? "text-gray-900 font-medium border-l-2 border-black"
                : "text-gray-800 hover:text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span>PROJECTS</span>
          </Link>
          <Link
            href="/about"
            className={`block mb-4 px-3 transition-colors ${
              isActive("/about")
                ? "text-gray-900 font-medium border-l-2 border-black"
                : "text-gray-800 hover:text-gray-600 hover:bg-gray-100"
            }`}
          >
            ABOUT
          </Link>
        </nav>
      </div>
    </aside>
  );
}
