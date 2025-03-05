"use client";
import dayjs from "dayjs";
import { allBlogs } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";

export default function BlogTimeline() {
  return (
    <div className="max-w-4xl h-full mx-auto">
      <div className="flex gap-8">
        <div className="flex-1">
          {/* <h1 className="text-3xl font-bold mb-12">BLOGS</h1> */}
          <div className="">
            {allBlogs.map((blog) => (
              <article
                key={blog._id}
                className="group border-b border-gray-200 pb-[24px] mb-[24px]"
              >
                <Link
                  href={blog.url}
                  className="flex justify-between items-start gap-8"
                >
                  <div className="flex-1">
                    <h2 className="text-[20px] font-medium text-[#191818] group-hover:text-gray-600">
                      {blog.title}
                    </h2>
                    <p className="mt-1 text-[#8A8484] text-[18px]">
                      {blog.description}
                    </p>
                    <div className="flex items-center gap-2 text-gray-500 mt-[12px]">
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
                    <div className="w-32 h-24 relative rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
