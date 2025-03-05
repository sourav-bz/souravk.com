"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";
import { Blog } from "contentlayer/generated";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";

interface BlogContentProps {
  blog: Blog;
}

export default function BlogContent({ blog }: BlogContentProps) {
  const MDXContent = useMDXComponent(blog.body.code);

  return (
    <article className="max-w-4xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center text-black hover:text-gray-900 mb-[18px]"
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
        BACK TO BLOGS
      </Link>
      <div className="py-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {blog.title}
          </h1>
          <p className="text-xl text-gray-600 mb-4">{blog.description}</p>
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100">
              <Image
                src="/images/author.jpg"
                alt="Sourav"
                width={24}
                height={24}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-black">{blog.author}</div>
            <div className="h-[15px] w-[2px] bg-gray-500 rounded"></div>
            <div className="text-[#8A8484]">
              {dayjs(blog.date).format("D MMM YYYY")}
            </div>
          </div>
        </div>

        {blog.image && (
          <div className="relative h-96 mb-8">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <MDXContent />
        </div>
      </div>
    </article>
  );
}
