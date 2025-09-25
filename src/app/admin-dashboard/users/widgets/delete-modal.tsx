import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  deleteModalOpen: boolean;
  setDeleteModalOpen: (open: boolean) => void;
  confirmDeleteUser: () => void;
};

export default function DeactivateUserModal({
  deleteModalOpen,
  setDeleteModalOpen,
  confirmDeleteUser,
}: Props) {
  return (
    <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
      <DialogContent className="max-w-md rounded-lg bg-white">
        <DialogHeader className="flex flex-row items-center space-x-2">
          {/* Warning Icon */}
          <AlertTriangle className="text-[#D63A3A] w-5 h-5" />
          <DialogTitle className="text-lg font-normal text-[#171616]">
            Deactivate User?
          </DialogTitle>
        </DialogHeader>

        {/* Description */}
        <p className="text-[#706C6C] text-base px-10">
          Are you sure you want to deactivate this user? If you do, the user
          will not have any means of accessing this platform again.
        </p>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button onClick={confirmDeleteUser}>Deactivate</Button>
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
