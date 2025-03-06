import Link from "next/link";
import { fetchGitHubUpdatesFromFolder } from "@/utils/github";
import MarkdownContent from "@/components/MarkdownContent";
import { FaGithub } from "react-icons/fa";
import { PiVideoFill } from "react-icons/pi";
import { allProjects } from "contentlayer/generated";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = allProjects.find(
    (p) => p._raw.flattenedPath === `projects/${params.id}`
  );

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          Project Not Found
        </h1>
        <Link
          href="/projects"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-[18px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          BACK TO PROJECTS
        </Link>
      </div>
    );
  }

  const updates = await fetchGitHubUpdatesFromFolder(project.github);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/projects"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        BACK TO PROJECTS
      </Link>

      <div className="">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-gray-600 mb-6">{project.description}</p>

          <div className="flex gap-4 mb-8">
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
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Update Logs
          </h2>
          <div className="space-y-8">
            {updates ? (
              updates.map((update, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="absolute -left-[2px] top-2 w-[2px] h-full bg-gray-200"></div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-500 mb-2">
                      {update.date}
                    </div>
                    <div className="prose prose-gray max-w-none">
                      <MarkdownContent content={update.content} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 italic">No updates available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
