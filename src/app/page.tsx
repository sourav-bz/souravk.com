"use client";
import { useState, useEffect } from "react";
import { compareDesc, format } from "date-fns";
import { allPosts } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";

export default function BlogTimeline() {
  // Sort posts by date (newest first)
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
  }, {});

  // Get years and sort them in descending order
  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  // Set the latest year as default selected year
  const [selectedYear, setSelectedYear] = useState(
    years.length > 0 ? years[0] : null
  );

  // Function to handle year selection
  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex gap-8">
        {/* Years sidebar */}
        <div className="w-16 flex-shrink-0 mt-[100px]">
          <div className="sticky top-8 relative">
            {/* Year buttons - rotated 90 degrees */}
            <div className="relative space-y-12">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => handleYearClick(year)}
                  className={`block w-full text-center px-0 py-2 transition-colors ${
                    selectedYear === year
                      ? "text-black font-medium"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <span className="inline-block transform -rotate-90 origin-center text-2xl">
                    {year}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Posts for selected year */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-12">BLOGS</h1>
          <div className="space-y-12">
            {selectedYear &&
              postsByYear[selectedYear].map((post) => (
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
      </div>
    </div>
  );
}
