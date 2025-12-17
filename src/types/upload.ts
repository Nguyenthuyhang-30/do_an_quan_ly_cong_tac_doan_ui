// Upload Types
export interface UploadedFile {
  id: number;
  originalName: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  folder?: string;
  memberId?: number;
  branchId?: number;
  description?: string;
  uploadedAt: string;
  url: string;
}

// API Response Types
export interface ImageVersion {
  url: string;
  width: number;
  height: number;
  size: number;
}

export interface StorageInfo {
  url: string;
  size: number;
  mimetype: string;
  isImage: boolean;
  versions?: {
    original?: ImageVersion;
    thumbnail?: ImageVersion;
    small?: ImageVersion;
    medium?: ImageVersion;
    large?: ImageVersion;
  };
}

export interface UploadFileInfo {
  id: number;
  member_id?: number;
  branch_id?: number;
  file_name: string;
  file_url: string;
  description?: string;
  uploaded_by?: number;
  uploaded_at: string;
}

export interface ApiUploadData {
  file: UploadFileInfo;
  storage: StorageInfo;
}

export interface ApiUploadResponse {
  code: number;
  success: boolean;
  message: string;
  data: ApiUploadData;
}

export interface UploadSingleRequest {
  file: File;
  memberId?: number;
  branchId?: number;
  description?: string;
  folder?: string;
}

export interface UploadMultipleRequest {
  files: File[];
  memberId?: number;
  branchId?: number;
  description?: string;
  folder?: string;
}

export interface UploadAvatarRequest {
  file: File;
  memberId: number;
}

export interface UploadResponse {
  message: string;
  data: UploadedFile | UploadedFile[];
}

// Helper function to convert API response to UploadedFile
export function convertApiResponseToUploadedFile(apiData: ApiUploadData): UploadedFile {
  return {
    id: apiData.file.id,
    originalName: apiData.file.file_name,
    fileName: apiData.file.file_name,
    filePath: apiData.storage.url,
    fileSize: apiData.storage.size,
    mimeType: apiData.storage.mimetype,
    memberId: apiData.file.member_id,
    branchId: apiData.file.branch_id,
    description: apiData.file.description,
    uploadedAt: apiData.file.uploaded_at,
    // Prioritize medium version for images, fallback to main URL
    url: apiData.storage.versions?.medium?.url || apiData.storage.url,
  };
}

export interface UploadStatistics {
  totalFiles: number;
  totalSize: number;
  filesByType: {
    [key: string]: number;
  };
  filesByFolder: {
    [key: string]: number;
  };
}

export interface DeleteFileResponse {
  message: string;
  deletedFileId: number;
}

// Upload Folder Constants
export enum UploadFolder {
  GENERAL = 'general',
  REPORTS = 'reports',
  DOCUMENTS = 'documents',
  EVENTS = 'events',
  AVATARS = 'avatars',
  CERTIFICATES = 'certificates',
  ACTIVITIES = 'activities',
  MEMBER_DOCUMENTS = 'member-documents',
  SLIDERS = 'sliders',
  BANNERS = 'banners',
}

// Allowed file types
export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
];

export const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
];

export const ALLOWED_FILE_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOCUMENT_TYPES];

// File size limits (in bytes)
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_AVATAR_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_SLIDER_SIZE = 2 * 1024 * 1024; // 2MB for optimal web performance
