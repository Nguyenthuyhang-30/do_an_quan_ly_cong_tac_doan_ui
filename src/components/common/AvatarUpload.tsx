import React, { useState } from 'react';
import { Upload, Avatar, Button, Spin, message } from 'antd';
import { UserOutlined, CameraOutlined, LoadingOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd/es/upload/interface';
import { useUpload } from '../../hooks/useUpload';
import type { UploadedFile } from '../../types/upload';
import { ALLOWED_IMAGE_TYPES, MAX_AVATAR_SIZE } from '../../types/upload';
import { uploadService } from '../../services/api/upload.service';

interface AvatarUploadProps {
  /**
   * Member ID (required for avatar upload)
   */
  memberId: number;
  /**
   * Current avatar URL
   */
  currentAvatarUrl?: string;
  /**
   * Avatar size
   */
  size?: number;
  /**
   * Shape of avatar
   */
  shape?: 'circle' | 'square';
  /**
   * Show upload button
   */
  showUploadButton?: boolean;
  /**
   * Callback when upload is successful
   */
  onUploadSuccess?: (file: UploadedFile) => void;
  /**
   * Callback when upload fails
   */
  onUploadError?: (error: Error) => void;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Custom class name
   */
  className?: string;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
  memberId,
  currentAvatarUrl,
  size = 120,
  shape = 'circle',
  showUploadButton = true,
  onUploadSuccess,
  onUploadError,
  disabled = false,
  className = '',
}) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(currentAvatarUrl);
  const { uploading, uploadAvatar } = useUpload({
    onSuccess: (data) => {
      const uploadedFile = data as UploadedFile;
      setImageUrl(uploadedFile.url);
      onUploadSuccess?.(uploadedFile);
    },
    onError: onUploadError,
  });

  const beforeUpload = (file: File) => {
    // Validate file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      message.error('Chỉ chấp nhận file ảnh (JPG, PNG, GIF, WEBP)!');
      return Upload.LIST_IGNORE;
    }

    // Validate file size
    if (file.size > MAX_AVATAR_SIZE) {
      message.error(
        `Kích thước ảnh không được vượt quá ${uploadService.formatFileSize(MAX_AVATAR_SIZE)}!`,
      );
      return Upload.LIST_IGNORE;
    }

    // Preview image before upload
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };

    // Upload avatar
    handleUpload(file);

    return false; // Prevent auto upload
  };

  const handleUpload = async (file: File) => {
    try {
      await uploadAvatar({
        file,
        memberId,
      });
    } catch (error) {
      console.error('Avatar upload error:', error);
      // Restore previous image on error
      setImageUrl(currentAvatarUrl);
    }
  };

  const uploadProps: UploadProps = {
    showUploadList: false,
    beforeUpload,
    accept: ALLOWED_IMAGE_TYPES.join(','),
    disabled: disabled || uploading,
  };

  const uploadButton = (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
      }}
    >
      <Avatar
        size={size}
        icon={<UserOutlined />}
        src={imageUrl}
        shape={shape}
        style={{
          cursor: disabled || uploading ? 'not-allowed' : 'pointer',
          opacity: uploading ? 0.6 : 1,
        }}
      />
      {uploading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
      )}
      {!uploading && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: size / 3,
            height: size / 3,
            backgroundColor: '#1890ff',
            borderRadius: shape === 'circle' ? '50%' : '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: '2px solid white',
          }}
        >
          <CameraOutlined style={{ color: 'white', fontSize: size / 6 }} />
        </div>
      )}
    </div>
  );

  return (
    <div className={`avatar-upload-container ${className}`}>
      <Upload {...uploadProps}>{uploadButton}</Upload>
      {showUploadButton && (
        <div style={{ marginTop: 16 }}>
          <Upload {...uploadProps}>
            <Button icon={<CameraOutlined />} loading={uploading} disabled={disabled}>
              {uploading ? 'Đang upload...' : 'Thay đổi avatar'}
            </Button>
          </Upload>
          <div style={{ marginTop: 8, fontSize: 12, color: '#8c8c8c' }}>
            Chấp nhận: JPG, PNG, GIF, WEBP
            <br />
            Kích thước tối đa: {uploadService.formatFileSize(MAX_AVATAR_SIZE)}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarUpload;
