import { useState, useCallback } from 'react';
import { message } from 'antd';
import { uploadService, ImageVersionPreference } from '../services/api/upload.service';
import type {
  UploadSingleRequest,
  UploadMultipleRequest,
  UploadAvatarRequest,
  UploadedFile,
  UploadStatistics,
} from '../app-types/upload';
import {
  ALLOWED_FILE_TYPES,
  ALLOWED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  MAX_AVATAR_SIZE,
} from '../app-types/upload';

interface UseUploadOptions {
  onSuccess?: (data: UploadedFile | UploadedFile[]) => void;
  onError?: (error: Error) => void;
  showNotification?: boolean;
  imageVersionPreference?: ImageVersionPreference;
}

export const useUpload = (options?: UseUploadOptions) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  /**
   * Upload a single file
   */
  const uploadSingle = useCallback(
    async (request: UploadSingleRequest) => {
      try {
        setUploading(true);
        setProgress(0);

        // Validate file type
        if (!uploadService.validateFileType(request.file, ALLOWED_FILE_TYPES)) {
          throw new Error(
            `Loại file không hợp lệ. Chỉ chấp nhận: ${ALLOWED_FILE_TYPES.join(', ')}`,
          );
        }

        // Validate file size
        if (!uploadService.validateFileSize(request.file, MAX_FILE_SIZE)) {
          throw new Error(
            `Kích thước file vượt quá ${uploadService.formatFileSize(MAX_FILE_SIZE)}`,
          );
        }

        // Simulate progress (since we can't track real progress easily with axios)
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return prev;
            }
            return prev + 10;
          });
        }, 100);

        const result = await uploadService.uploadSingle(
          request,
          options?.imageVersionPreference || ImageVersionPreference.MEDIUM,
        );

        clearInterval(progressInterval);
        setProgress(100);

        setUploadedFiles((prev) => [...prev, result]);

        if (options?.showNotification !== false) {
          message.success('Upload file thành công!');
        }

        options?.onSuccess?.(result);

        return result;
      } catch (error) {
        const err = error as Error;
        if (options?.showNotification !== false) {
          message.error(`Upload thất bại: ${err.message}`);
        }
        options?.onError?.(err);
        throw error;
      } finally {
        setUploading(false);
        setTimeout(() => setProgress(0), 1000);
      }
    },
    [options],
  );

  /**
   * Upload multiple files
   */
  const uploadMultiple = useCallback(
    async (request: UploadMultipleRequest) => {
      try {
        setUploading(true);
        setProgress(0);

        // Validate all files
        for (const file of request.files) {
          if (!uploadService.validateFileType(file, ALLOWED_FILE_TYPES)) {
            throw new Error(
              `File "${file.name}" có loại không hợp lệ. Chỉ chấp nhận: ${ALLOWED_FILE_TYPES.join(
                ', ',
              )}`,
            );
          }

          if (!uploadService.validateFileSize(file, MAX_FILE_SIZE)) {
            throw new Error(
              `File "${file.name}" vượt quá kích thước ${uploadService.formatFileSize(
                MAX_FILE_SIZE,
              )}`,
            );
          }
        }

        // Simulate progress
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return prev;
            }
            return prev + 10;
          });
        }, 100);

        const result = await uploadService.uploadMultiple(
          request,
          options?.imageVersionPreference || ImageVersionPreference.MEDIUM,
        );

        clearInterval(progressInterval);
        setProgress(100);

        setUploadedFiles((prev) => [...prev, ...result]);

        if (options?.showNotification !== false) {
          message.success(`Upload thành công ${result.length} file!`);
        }

        options?.onSuccess?.(result);

        return result;
      } catch (error) {
        const err = error as Error;
        if (options?.showNotification !== false) {
          message.error(`Upload thất bại: ${err.message}`);
        }
        options?.onError?.(err);
        throw error;
      } finally {
        setUploading(false);
        setTimeout(() => setProgress(0), 1000);
      }
    },
    [options],
  );

  /**
   * Upload avatar
   */
  const uploadAvatar = useCallback(
    async (request: UploadAvatarRequest) => {
      try {
        setUploading(true);
        setProgress(0);

        // Validate file type (only images for avatar)
        if (!uploadService.validateFileType(request.file, ALLOWED_IMAGE_TYPES)) {
          throw new Error(`Avatar chỉ chấp nhận ảnh: ${ALLOWED_IMAGE_TYPES.join(', ')}`);
        }

        // Validate file size
        if (!uploadService.validateFileSize(request.file, MAX_AVATAR_SIZE)) {
          throw new Error(
            `Kích thước avatar vượt quá ${uploadService.formatFileSize(MAX_AVATAR_SIZE)}`,
          );
        }

        // Simulate progress
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return prev;
            }
            return prev + 10;
          });
        }, 100);

        const result = await uploadService.uploadAvatar(request);

        clearInterval(progressInterval);
        setProgress(100);

        setUploadedFiles((prev) => [...prev, result]);

        if (options?.showNotification !== false) {
          message.success('Upload avatar thành công!');
        }

        options?.onSuccess?.(result);

        return result;
      } catch (error) {
        const err = error as Error;
        if (options?.showNotification !== false) {
          message.error(`Upload avatar thất bại: ${err.message}`);
        }
        options?.onError?.(err);
        throw error;
      } finally {
        setUploading(false);
        setTimeout(() => setProgress(0), 1000);
      }
    },
    [options],
  );

  /**
   * Get upload statistics
   */
  const getStatistics = useCallback(async (): Promise<UploadStatistics> => {
    try {
      const result = await uploadService.getStatistics();
      return result;
    } catch (error) {
      const err = error as Error;
      if (options?.showNotification !== false) {
        message.error(`Lấy thống kê thất bại: ${err.message}`);
      }
      throw error;
    }
  }, [options]);

  /**
   * Delete a file
   */
  const deleteFile = useCallback(
    async (fileId: number) => {
      try {
        await uploadService.deleteFile(fileId);

        setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));

        if (options?.showNotification !== false) {
          message.success('Xóa file thành công!');
        }
      } catch (error) {
        const err = error as Error;
        if (options?.showNotification !== false) {
          message.error(`Xóa file thất bại: ${err.message}`);
        }
        throw error;
      }
    },
    [options],
  );

  /**
   * Clear uploaded files list
   */
  const clearUploadedFiles = useCallback(() => {
    setUploadedFiles([]);
  }, []);

  return {
    uploading,
    progress,
    uploadedFiles,
    uploadSingle,
    uploadMultiple,
    uploadAvatar,
    getStatistics,
    deleteFile,
    clearUploadedFiles,
  };
};

export default useUpload;
