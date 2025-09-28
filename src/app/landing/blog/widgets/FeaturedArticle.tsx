import Image from "next/image";
import Link from "next/link";

type FeaturedArticleProps = {
  id: string;
  image: string;
  title: string;
  description: string;
  tags: string[];
};

export function FeaturedArticle({
  id,
  image,
  title,
  description,
  tags,
}: FeaturedArticleProps) {
  return (
    <Link href={`/landing/blog/${id}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
        <Image
          src={image}
          alt={title}
          width={1200}
          height={600}
          className="w-full h-80 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold hover:text-blue-600 transition-colors">{title}</h2>
          <p className="mt-2 text-gray-600 line-clamp-3">{description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm rounded-full bg-black text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
