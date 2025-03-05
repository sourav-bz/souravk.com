import { notFound } from "next/navigation";
import { allBlogs } from "contentlayer/generated";
import BlogContent from "@/components/BlogContent";

export async function generateStaticParams() {
  return allBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const blog = allBlogs.find((blog) => blog.slug === params.slug);

  if (!blog) {
    return {};
  }

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      publishedTime: blog.date,
      authors: [blog.author],
    },
  };
}

type CustomPageProps = {
  params: { slug: string } & Promise<any>;
};

export default function PostPage({ params }: CustomPageProps) {
  const { slug } = params;

  const blog = allBlogs.find((blog) => blog.slug === slug);

  if (!blog) {
    notFound();
  }

  return <BlogContent blog={blog} />;
}
