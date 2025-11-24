import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

export default function AddTags({
  tags,
  setTags,
}: {
  tags: string;
  setTags: (tags: string) => void;
}) {
  const [isLocked, setIsLocked] = useState(false);
  const [tempTags, setTempTags] = useState("");

  // Sync tempTags with tags prop when it changes (for prefilling)
  useEffect(() => {
    if (tags && !isLocked) {
      setTempTags(tags);
    }
  }, [tags, isLocked]);

  const handleToggle = () => {
    if (!isLocked) {
      // When clicking "Enter", lock and set the tags
      setTags(tempTags);
      setIsLocked(true);
    } else {
      // When clicking "Edit", unlock and reset temp to current tags
      setTempTags(tags);
      setIsLocked(false);
    }
  };

  return (
    <div className="p-4 space-y-1 font-secondary bg-[#FFFFFF] rounded-sm border shadow-md border-[#C4C4C4] h-fit">
      <p className="text-[#8F8F8F] text-xs text-center">Add Tags</p>
      <Label className="text-xs font-medium text-[#706C6C]">Labels</Label>
      <input
        type="text"
        className="p-2 border border-gray-300 rounded-md w-full placeholder:text-xs"
        placeholder="Enter tags separated by commas"
        value={isLocked ? tags : tempTags}
        onChange={(e) => setTempTags(e.target.value)}
        disabled={isLocked}
      />

      <div className="flex justify-center mt-4">
        <Button
          variant="ghost"
          onClick={handleToggle}
          className="bg-[#3D3A3A] text-white hover:bg-gray-500 disabled:opacity-150"
        >
          {isLocked ? "Edit" : "Enter"}
        </Button>
      </div>
    </div>
  );
}
