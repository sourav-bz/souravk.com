import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { PiVideoFill } from "react-icons/pi";
import { FaChevronRight } from "react-icons/fa";
import { allProjects } from "contentlayer/generated";
import dayjs from "dayjs";

export default function ProjectsPage() {
  const projects = allProjects.sort(
    (a, b) => dayjs(b.lastUpdated).unix() - dayjs(a.lastUpdated).unix()
  );

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
              {project.demo && (
                <Link
                  href={project.demo ?? ""}
                  className="flex items-center gap-2 text-gray-500 bg-[#F5F5F5] px-2 py-1 rounded-full"
                  target="_blank"
                >
                  <PiVideoFill />
                  <span className="text-[#8A8484]">Checkout Demo</span>
                </Link>
              )}
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
