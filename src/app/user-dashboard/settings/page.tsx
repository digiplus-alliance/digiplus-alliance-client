'use client';
import PageHeader from '@/components/PageHeader';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useChangePassword } from '@/app/api/user/useChangePassword';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/auth';
import { useAuthGuard } from '@/components/AuthGuard';

const SettingsPage = () => {
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { mutate: changePassword, isPending } = useChangePassword();
  const { redirectToLogin } = useAuthGuard();

  const handleResetPasswordClick = () => {
    setShowResetPassword(true);
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    changePassword(
      {
        oldPassword: oldPassword,
        newPassword: confirmPassword,
      },
      {
        onSuccess: () => {
          toast.success('Password changed successfully');
          setShowResetPassword(false);
          redirectToLogin();
        },
        onError: () => {
          toast.error('Failed to change password');
        },
      }
    );
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title={showResetPassword ? 'Reset Password' : 'Settings'}
        description={showResetPassword ? 'Kindly change your password for security reasons' : ''}
      />

      {showResetPassword && (
        <div className="p-0 text-start">
          <Button
            type="button"
            variant="ghost"
            className="w-min h-11 bg-transparent text-[#5E5B5B] hover:bg-[#EBEBEB] rounded-lg"
            onClick={() => {
              setShowResetPassword(false);
            }}
          >
            <ChevronLeft /> Back
          </Button>
        </div>
      )}
      {!showResetPassword ? (
        <button
          onClick={handleResetPasswordClick}
          className="flex items-center justify-between w-full p-4 max-w-[500px] rounded-lg "
        >
          <div className="text-left">
            <h2 className="text-lg font-semibold">Reset your Password</h2>
            <p className="text-sm text-gray-500">Reset your password here and secure your account</p>
          </div>
          <ChevronRight className="w-6 h-6" />
        </button>
      ) : (
        <Card className="p-6 bg-white rounded-lg shadow w-full max-w-[500px]">
          <div className="space-y-4">
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                Old Password
              </label>
              <Input
                id="old-password"
                type="password"
                className="mt-1 block w-full"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <Input
                id="new-password"
                type="password"
                className="mt-1 block w-full"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Input
                id="confirm-password"
                type="password"
                className="mt-1 block w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button onClick={handleResetPassword} disabled={isPending} className="w-full cursor-pointer">
              Reset
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SettingsPage;
