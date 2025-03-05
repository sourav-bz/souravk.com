import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { PiVideoFill } from "react-icons/pi";
import { FaChevronRight } from "react-icons/fa";

const projects = [
  {
    id: "showfer-ai",
    title: "Showfer AI",
    description: "An AI-powered chatbot for showing off your projects",
    category: "ai",
    lastUpdated: "2024-03-05",
    github: "https://github.com/sourav-bz/showfer-ai",
    demo: "https://showfer.ai",
  },
  {
    id: "souravk-com",
    title: "souravk.com",
    description: "A modern portfolio website built with Next.js & Contentlayer",
    category: "web",
    lastUpdated: "2024-03-05",
    github: "https://github.com/sourav-bz/souravk.com",
    demo: "https://souravk.com",
  },
];

export default function ProjectsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="block p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600 mb-4">{project.description}</p>
            {/* <div className="flex items-center gap-2">
              <div className="uppercase text-[#8A8484] bg-[#F5F5F5] px-1 py-1 rounded-full min-w-[50px] text-center text-[10px]">
                {project.category}
              </div>
            </div> */}
            <div className="flex mt-4">
              <Link
                href={project.github ?? ""}
                className="flex items-center gap-2 text-gray-500 bg-[#F5F5F5] px-2 py-1 rounded-full mr-4"
                target="_blank"
              >
                <FaGithub />
                <span className="text-[#8A8484]">View on GitHub</span>
              </Link>
              <Link
                href={project.demo ?? ""}
                className="flex items-center gap-2 text-gray-500 bg-[#F5F5F5] px-2 py-1 rounded-full"
                target="_blank"
              >
                <PiVideoFill />
                <span className="text-[#8A8484]">Checkout Demo</span>
              </Link>
              <Link
                href={`/projects/${project.id}`}
                className="flex items-center gap-2 text-gray-500 ml-auto underline"
              >
                <span className="text-[#8A8484]">Update Logs</span>
                <FaChevronRight />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
