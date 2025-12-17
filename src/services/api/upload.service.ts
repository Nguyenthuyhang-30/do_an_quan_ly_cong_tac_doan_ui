import axiosInstance from '../../base/interceptors/axios.instance';
import type {
  UploadSingleRequest,
  UploadMultipleRequest,
  UploadAvatarRequest,
  UploadStatistics,
  DeleteFileResponse,
  UploadedFile,
  ApiUploadData,
} from '../../types/upload';

/**
 * Image version preference for different use cases
 */
export enum ImageVersionPreference {
  ORIGINAL = 'original',
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
  THUMBNAIL = 'thumbnail',
}

/**
 * Upload Service
 * Handles file upload operations
 */
class UploadService {
  private readonly BASE_URL = '/upload';

  /**
   * Convert API response to UploadedFile format
   * @param apiData API response data
   * @param versionPreference Preferred image version
   */
  private convertApiResponse(
    apiData: ApiUploadData,
    versionPreference: ImageVersionPreference = ImageVersionPreference.MEDIUM,
  ): UploadedFile {
    const storage = apiData.storage;
    let imageUrl = storage.url;

    // Select image version based on preference
    if (storage.versions) {
      switch (versionPreference) {
        case ImageVersionPreference.ORIGINAL:
          imageUrl = storage.versions.original?.url || storage.url;
          break;
        case ImageVersionPreference.LARGE:
          imageUrl = storage.versions.large?.url || storage.url;
          break;
        case ImageVersionPreference.MEDIUM:
          imageUrl = storage.versions.medium?.url || storage.url;
          break;
        case ImageVersionPreference.SMALL:
          imageUrl = storage.versions.small?.url || storage.url;
          break;
        case ImageVersionPreference.THUMBNAIL:
          imageUrl = storage.versions.thumbnail?.url || storage.url;
          break;
      }
    }

    return {
      id: apiData.file.id,
      originalName: apiData.file.file_name,
      fileName: apiData.file.file_name,
      filePath: storage.url,
      fileSize: storage.size,
      mimeType: storage.mimetype,
      memberId: apiData.file.member_id,
      branchId: apiData.file.branch_id,
      description: apiData.file.description,
      uploadedAt: apiData.file.uploaded_at,
      url: imageUrl,
    };
  }

  /**
   * Upload a single file
   * @param request Upload single file request
   * @param versionPreference Preferred image version (default: MEDIUM)
   * @returns Uploaded file information
   */
  async uploadSingle(
    request: UploadSingleRequest,
    versionPreference: ImageVersionPreference = ImageVersionPreference.MEDIUM,
  ): Promise<UploadedFile> {
    const formData = new FormData();
    formData.append('file', request.file);

    if (request.memberId) {
      formData.append('memberId', request.memberId.toString());
    }
    if (request.branchId) {
      formData.append('branchId', request.branchId.toString());
    }
    if (request.description) {
      formData.append('description', request.description);
    }
    if (request.folder) {
      formData.append('folder', request.folder);
    }

    const response = await axiosInstance.post(`${this.BASE_URL}/single`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Convert API response to UploadedFile format
    return this.convertApiResponse(response.data.data, versionPreference);
  }

  /**
   * Upload multiple files
   * @param request Upload multiple files request
   * @param versionPreference Preferred image version (default: MEDIUM)
   * @returns Array of uploaded files information
   */
  async uploadMultiple(
    request: UploadMultipleRequest,
    versionPreference: ImageVersionPreference = ImageVersionPreference.MEDIUM,
  ): Promise<UploadedFile[]> {
    const formData = new FormData();

    // Append all files
    request.files.forEach((file) => {
      formData.append('files', file);
    });

    if (request.memberId) {
      formData.append('memberId', request.memberId.toString());
    }
    if (request.branchId) {
      formData.append('branchId', request.branchId.toString());
    }
    if (request.description) {
      formData.append('description', request.description);
    }
    if (request.folder) {
      formData.append('folder', request.folder);
    }

    const response = await axiosInstance.post(`${this.BASE_URL}/multiple`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Handle array of responses
    const apiDataArray = Array.isArray(response.data.data)
      ? response.data.data
      : [response.data.data];

    return apiDataArray.map((apiData: ApiUploadData) =>
      this.convertApiResponse(apiData, versionPreference),
    );
  }

  /**
   * Upload avatar for a member
   * @param request Upload avatar request
   * @returns Uploaded avatar information (uses THUMBNAIL version)
   */
  async uploadAvatar(request: UploadAvatarRequest): Promise<UploadedFile> {
    const formData = new FormData();
    formData.append('file', request.file);
    formData.append('memberId', request.memberId.toString());

    const response = await axiosInstance.post(`${this.BASE_URL}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Use THUMBNAIL version for avatars
    return this.convertApiResponse(response.data.data, ImageVersionPreference.THUMBNAIL);
  }

  /**
   * Get upload statistics
   * @returns Upload statistics
   */
  async getStatistics(): Promise<UploadStatistics> {
    const response = await axiosInstance.get<{ data: UploadStatistics }>(
      `${this.BASE_URL}/statistics`,
    );

    return response.data.data;
  }

  /**
   * Delete a file by ID
   * @param fileId File ID to delete
   * @returns Delete response
   */
  async deleteFile(fileId: number): Promise<DeleteFileResponse> {
    const response = await axiosInstance.delete<DeleteFileResponse>(`${this.BASE_URL}/${fileId}`);

    return response.data;
  }

  /**
   * Validate file type
   * @param file File to validate
   * @param allowedTypes Allowed MIME types
   * @returns true if valid, false otherwise
   */
  validateFileType(file: File, allowedTypes: string[]): boolean {
    return allowedTypes.includes(file.type);
  }

  /**
   * Validate file size
   * @param file File to validate
   * @param maxSize Maximum size in bytes
   * @returns true if valid, false otherwise
   */
  validateFileSize(file: File, maxSize: number): boolean {
    return file.size <= maxSize;
  }

  /**
   * Format file size to human readable format
   * @param bytes File size in bytes
   * @returns Formatted file size string
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  /**
   * Get file extension from filename
   * @param filename File name
   * @returns File extension
   */
  getFileExtension(filename: string): string {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
  }
}

export const uploadService = new UploadService();
export default uploadService;
