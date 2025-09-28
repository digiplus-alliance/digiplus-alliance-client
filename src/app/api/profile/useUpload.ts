// Upload multipart form data to the server

import { z } from 'zod';
import useSend from '@/lib/useSend';
import { useAuthStore } from '@/store/auth';

export function useUpload() {
  return useSend<FormData, { message: string; success: boolean }>({
    url: 'profile/uploadlogo',
    method: 'post',
    hasAuth: true,
    config: {
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
      },
    },
  });
}
