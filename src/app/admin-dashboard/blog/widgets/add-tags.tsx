import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AddTags({
  tags,
  setTags,
}: {
  tags: string;
  setTags: (tags: string) => void;
}) {
  return (
    <div className="p-4 space-y-1 font-secondary bg-[#FFFFFF] rounded-sm border shadow-md border-[#C4C4C4] h-fit">
      <p className="text-[#8F8F8F] text-xs text-center">Add Tags</p>
      <Label className="text-xs font-medium text-[#706C6C]">Labels</Label>
      <input
        type="text"
        className="p-2 border border-gray-300 rounded-md w-full placeholder:text-xs"
        placeholder="Enter tags separated by commas"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <div className="flex justify-center mt-4">
        <Button
          variant="ghost"
          onClick={() => {}}
          className="bg-[#3D3A3A] text-white hover:bg-gray-500"
        >
          Enter
        </Button>
      </div>
    </div>
  );
}
