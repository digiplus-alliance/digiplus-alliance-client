import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "react-feather";

export default function RecentAssessment() {
  const router = useRouter();
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-3 border-b pb-2">
        <h3 className="font-normal text-[#171616] ">Recent Assessment</h3>
        <button
          className="text-sm text-[#8F8F8F] border border-[#227C9D] p-2 rounded-lg items-center flex"
          onClick={() => router.push("/admin-dashboard/assessment")}
        >
          See all{" "}
          <span className="inline-block ml-1">
            <ArrowRight size={16} />
          </span>
        </button>
      </div>
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex justify-between items-center p-3 border rounded-md"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/about/team-placeholder-four.png"
                alt="user"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <p className="font-regular text-[#171616] text-base">
                  Name of Company
                </p>
                <p className="text-sm text-[#A3A3A3]">
                  April 20, 2022 at 04:00 PM
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button className="text-sm text-[#227C9D] font-normal bg-[#EBFBFF] px-3 py-2 rounded-lg">
                Submitted
              </button>
              <p className="flex justify-end text-[#B8B8B8] text-sm font-medium">
                Qty: 1
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
