import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import { Post } from "contentlayer/generated";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link href={post.url} className="block hover:opacity-75">
        {post.image && (
          <div className="relative h-48">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <div className="text-sm text-gray-500 mb-2">
            {dayjs(post.date).format("D MMM YYYY")}
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {post.title}
          </h2>
          <p className="text-gray-600 mb-4">{post.description}</p>
          <div className="text-sm text-gray-500">By {post.author}</div>
        </div>
      </Link>
    </div>
  );
}
