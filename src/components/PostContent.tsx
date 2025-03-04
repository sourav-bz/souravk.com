"use client";

import { format, parseISO } from "date-fns";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { Post } from "contentlayer/generated";
import Image from "next/image";

interface PostContentProps {
  post: Post;
}

export default function PostContent({ post }: PostContentProps) {
  const MDXContent = useMDXComponent(post.body.code);
  console.log("MDXContent: ", MDXContent);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <div className="text-center mb-8">
          <time className="text-gray-500 mb-2 block">
            {format(parseISO(post.date), "MMMM dd, yyyy")}
          </time>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 mb-4">{post.description}</p>
          <div className="text-gray-500">By {post.author}</div>
        </div>

        {/* {post.image && (
          <div className="relative h-96 mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        )} */}

        <div className="prose prose-lg max-w-none">
          <MDXContent />
        </div>
      </div>
    </article>
  );
}
