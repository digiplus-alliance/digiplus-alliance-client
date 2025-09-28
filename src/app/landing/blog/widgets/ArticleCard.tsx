import Image from "next/image";
import Link from "next/link";

type ArticleCardProps = {
  id: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
  title: string;
  description: string;
};

export function ArticleCard({
  id,
  image,
  date,
  category,
  readTime,
  title,
  description,
}: ArticleCardProps) {
  return (
    <Link href={`/landing/blog/${id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-md transition-all p-3 cursor-pointer group">
        <Image
          src={image}
          alt={title}
          width={400}
          height={250}
          className="w-full h-48 object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
        />
        <div className="mt-3 text-xs text-gray-500">
          {date} • {category} • {readTime}
        </div>
        <h3 className="mt-2 font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="mt-1 text-sm text-gray-600 line-clamp-3">{description}</p>
      </div>
    </Link>
  );
}
