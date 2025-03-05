import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import { Blog } from "contentlayer/generated";

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link href={blog.url} className="block hover:opacity-75">
        {blog.image && (
          <div className="relative h-48">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <div className="text-sm text-gray-500 mb-2">
            {dayjs(blog.date).format("D MMM YYYY")}
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {blog.title}
          </h2>
          <p className="text-gray-600 mb-4">{blog.description}</p>
          <div className="text-sm text-gray-500">By {blog.author}</div>
        </div>
      </Link>
    </div>
  );
}
