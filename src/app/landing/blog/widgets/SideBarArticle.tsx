import Image from "next/image";
import Link from "next/link";

type SidebarArticleProps = {
  id: string;
  image: string;
  title: string;
  description: string;
};

export function SidebarArticle({ id, image, title, description }: SidebarArticleProps) {
  return (
    <Link href={`/landing/blog/${id}`}>
      <div className="flex gap-3 my-2 items-start bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
        <Image
          src={image}
          alt={title}
          width={100}
          height={80}
          className="w-24 h-20 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="flex-1">
          <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">{title}</h4>
          <p className="text-xs text-gray-500 line-clamp-2">{description}</p>
        </div>
      </div>
    </Link>
  );
}
