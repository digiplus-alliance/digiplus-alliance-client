import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import loading from "@/app/landing/blog/loading";
import SpinnerIcon from "@/components/icons/spinner";

type Props = {
  deleteModalOpen: boolean;
  setDeleteModalOpen: (open: boolean) => void;
  confirmDeleteUser: () => void;
  loading?: boolean;
  title?: string;
  description?: string;
  confirmButtonText?: string;
};

export default function DeactivateUserModal({
  deleteModalOpen,
  setDeleteModalOpen,
  confirmDeleteUser,
  loading,
  title = "Deactivate User?",
  description = "Are you sure you want to deactivate this user? If you do, the user will not have any means of accessing this platform again.",
  confirmButtonText = "Deactivate",
}: Props) {
  return (
    <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
      <DialogContent className="max-w-md rounded-lg bg-white">
        <DialogHeader className="flex flex-row items-center space-x-2">
          {/* Warning Icon */}
          <AlertTriangle className="text-[#D63A3A] w-5 h-5" />
          <DialogTitle className="text-lg font-normal text-[#171616]">
            {title}
          </DialogTitle>
        </DialogHeader>

        {/* Description */}
        <DialogDescription className="text-[#706C6C] text-base px-10">
          {description}
        </DialogDescription>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button onClick={confirmDeleteUser}>
            {loading ? <SpinnerIcon /> : confirmButtonText}
          </Button>
          <Button
            variant="outline"
            className="border-[#FBEFEF] text-[#D63A3A] hover:bg-red-50"
            onClick={() => setDeleteModalOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
