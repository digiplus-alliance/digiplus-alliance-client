// Upload multipart form data to the server

import { z } from 'zod';
import useSend from '@/lib/useSend';

export function useUpload() {
  return useSend<FormData, { message: string; success: boolean }>({
    url: 'upload',
    method: 'post',
    hasAuth: true,
    config: {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  });
}
