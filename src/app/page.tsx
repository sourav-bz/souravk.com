"use client";
import dayjs from "dayjs";
import { allPosts } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";

export default function BlogTimeline() {
  return (
    <div className="w-full h-full mx-auto">
      <div className="flex gap-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-12">Blogs</h1>
          <div className="">
            {allPosts.map((post) => (
              <article
                key={post._id}
                className="group border-b border-gray-200 pb-[24px] mb-[24px]"
              >
                <Link
                  href={post.url}
                  className="flex justify-between items-start gap-8"
                >
                  <div className="flex-1">
                    <h2 className="text-xl font-medium text-gray-900 group-hover:text-gray-600">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-gray-600 text-sm">
                      {post.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100">
                        <Image
                          src="/images/author.jpg"
                          alt="Sourav"
                          width={24}
                          height={24}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm text-gray-500 uppercase">
                        SOURAV
                      </span>
                      <span className="text-sm text-gray-400">
                        {dayjs(post.date).format("D MMM YYYY")}
                      </span>
                    </div>
                  </div>
                  {post.image && (
                    <div className="w-32 h-24 relative rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={post.image}
                        alt={post.title}
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
