import { compareDesc, format } from "date-fns";
import { allPosts } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  // Group posts by year
  const postsByYear = posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as Record<number, typeof posts>);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-12">ARTICLES</h1>

      <div className="space-y-16">
        {Object.entries(postsByYear).map(([year, yearPosts]) => (
          <div key={year} className="relative">
            <div
              className="sticky top-8 text-sm text-gray-400"
              style={{ float: "left", width: "60px" }}
            >
              {year}
            </div>
            <div className="space-y-12 ml-20">
              {yearPosts.map((post) => (
                <article key={post._id} className="group">
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
                          {format(new Date(post.date), "d MMM yyyy")}
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
        ))}
      </div>
    </div>
  );
}
