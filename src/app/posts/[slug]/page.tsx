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
  const post = allPosts.find((post) => post.slug === params.slug);

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

type CustomPageProps = {
  params: { slug: string } & Promise<any>;
};

export default function PostPage({ params }: CustomPageProps) {
  const { slug } = params;

  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return <PostContent post={post} />;
}
