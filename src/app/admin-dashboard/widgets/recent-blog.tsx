'use client";';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "react-feather";

export default function RecentBlog() {
  const router = useRouter();
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center border-b pb-2 mb-3">
        <h3 className="font-normal text-[#171616] ">Blog Post</h3>
        <button
          className="text-sm text-[#8F8F8F] border border-[#227C9D] p-2 rounded-lg items-center flex"
          onClick={() => router.push("/admin-dashboard/blog")}
        >
          See all{" "}
          <span className="inline-block ml-1">
            <ArrowRight size={16} />
          </span>
        </button>
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between p-2 border rounded-md"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/about/team-placeholder-four.png"
                alt="author"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <div>
                <p className="font-normal text-base">Post Title</p>
                <span
                  className={`text-xs ${
                    i % 2 === 0
                      ? "text-[#008080] bg-[#EBFBFF] px-2 py-1 rounded-2xl text-xs"
                      : "text-gray-400 bg-[#F5F5F5] px-2 py-1 rounded-2xl text-xs"
                  }`}
                >
                  {i % 2 === 0 ? "Published" : "Unpublished"}
                </span>
              </div>
            </div>
            <span className="text-xs text-[#B8B8B8]">10 hours ago</span>
          </div>
        ))}
      </div>
    </div>
  );
}
