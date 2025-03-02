import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import PostContent from "@/components/PostContent";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  // For server components in App Router, destructure with await
  // to handle the case when params is a Promise
  const { slug } = await params;

  // Find the post
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

// Make sure this is a Server Component by using async
export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  // Log the params object to inspect its contents
  console.log("Params object:", params);
  console.log("Params type:", typeof params);

  // Since we're using an async function, we can safely access params
  const { slug } = await params;
  console.log("Extracted slug:", slug);

  const post = allPosts.find((post) => post.slug === slug);

  console.log("Post: ", post);

  if (!post) {
    notFound();
  }

  return <PostContent post={post} />;
}
