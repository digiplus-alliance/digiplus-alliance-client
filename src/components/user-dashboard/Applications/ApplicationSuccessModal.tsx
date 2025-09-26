'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ApplicationSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplicationSuccessModal: React.FC<ApplicationSuccessModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleBackToDashboard = () => {
    if (dontShowAgain) {
      // Store preference in localStorage or user preferences
      sessionStorage.setItem('hideApplicationSuccessModal', 'true');
    }
    onClose();
    router.push('/user-dashboard');
  };

  const handleCheckboxChange = (checked: boolean) => {
    setDontShowAgain(checked);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full mx-auto bg-white rounded-3xl border-none shadow-2xl p-0 overflow-hidden">
        <div className="p-8 space-y-6 flex items-start gap-6">
          <div className="relative">
            <div className="w-12 h-12 bg-[#f7e4e4] rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-[#FFCCCC] rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-[#D63A3A] stroke-[3] " />
              </div>
            </div>
          </div>
          <div className="flex justify-center flex-col h-full gap-5">
            <div className="text-start space-y-1">
              <h2 className="text-lg font-[600] text-[#171616]">Thank you for applying</h2>
              <p className="text-[#7A7A7A] leading-relaxed">
                We will get back to you soon. Kindly look at your mail or dashboard.
              </p>
            </div>
            <div className="space-y-4 flex items-center justify-between">
              {/* Don't show again checkbox */}
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="dont-show-again"
                  checked={dontShowAgain}
                  onCheckedChange={handleCheckboxChange}
                  className="w-5 h-5 border-2 border-gray-300 rounded data-[state=checked]:bg-[#FF5C5C] data-[state=checked]:border-[#FF5C5C]"
                />
                <label htmlFor="dont-show-again" className="text-sm text-[#3D3A3A] cursor-pointer select-none">
                  Don&apos;t show again
                </label>
              </div>

              {/* Back to Dashboard button */}
              <Button
                onClick={handleBackToDashboard}
                className=" h-12 bg-[#FF5C5C] hover:bg-[#FF4444] text-[#000000] font-medium rounded-lg text-base"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationSuccessModal;
