import React, { useState } from 'react';
import { Upload, Button, Progress, List, Space, Typography, Tag } from 'antd';
import {
  UploadOutlined,
  InboxOutlined,
  DeleteOutlined,
  FileOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useUpload } from '../../hooks/useUpload';
import type { UploadedFile } from '../../types/upload';
import { UploadFolder } from '../../types/upload';
import { uploadService, ImageVersionPreference } from '../../services/api/upload.service';

const { Dragger } = Upload;
const { Text } = Typography;

interface FileUploadProps {
  /**
   * Single or multiple file upload
   */
  multiple?: boolean;
  /**
   * Member ID for the upload
   */
  memberId?: number;
  /**
   * Branch ID for the upload
   */
  branchId?: number;
  /**
   * Upload folder
   */
  folder?: UploadFolder | string;
  /**
   * File description
   */
  description?: string;
  /**
   * Use drag and drop area
   */
  useDragger?: boolean;
  /**
   * Maximum number of files
   */
  maxCount?: number;
  /**
   * Show uploaded files list
   */
  showUploadedList?: boolean;
  /**
   * Callback when upload is successful
   */
  onUploadSuccess?: (files: UploadedFile | UploadedFile[]) => void;
  /**
   * Callback when upload fails
   */
  onUploadError?: (error: Error) => void;
  /**
   * Callback when upload starts
   */
  onUploadStart?: () => void;
  /**
   * Custom accept file types
   */
  accept?: string;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Image version preference for optimized images
   */
  imageVersionPreference?: ImageVersionPreference;
  /**
   * Auto upload after file selection
   */
  autoUpload?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  multiple = false,
  memberId,
  branchId,
  folder = UploadFolder.GENERAL,
  description,
  useDragger = false,
  maxCount,
  showUploadedList = true,
  onUploadSuccess,
  onUploadError,
  onUploadStart,
  accept,
  disabled = false,
  imageVersionPreference,
  autoUpload = false,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { uploading, progress, uploadedFiles, uploadSingle, uploadMultiple, deleteFile } =
    useUpload({
      onSuccess: onUploadSuccess,
      onError: onUploadError,
      imageVersionPreference,
    });

  const handleUpload = async () => {
    if (fileList.length === 0) return;

    try {
      const files = fileList.map((file) => file.originFileObj as File);
      await handleUploadWithFiles(files);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const handleUploadWithFiles = async (files: File[]) => {
    try {
      // Notify upload start
      onUploadStart?.();

      if (multiple) {
        await uploadMultiple({
          files,
          memberId,
          branchId,
          description,
          folder,
        });
      } else {
        await uploadSingle({
          file: files[0],
          memberId,
          branchId,
          description,
          folder,
        });
      }

      // Clear file list after successful upload
      setFileList([]);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const uploadProps: UploadProps = {
    multiple,
    fileList,
    beforeUpload: (file) => {
      setFileList((prev) => {
        const newFileList = !multiple
          ? [file]
          : maxCount && prev.length >= maxCount
          ? prev
          : [...prev, file];

        // Auto upload if enabled
        if (autoUpload) {
          setTimeout(() => {
            handleUploadWithFiles([file]);
          }, 100);
        }

        return newFileList;
      });
      return false; // Prevent auto upload by antd
    },
    onRemove: (file) => {
      setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    },
    maxCount,
    accept,
    disabled: disabled || uploading,
  };

  const handleDeleteUploaded = async (fileId: number) => {
    try {
      await deleteFile(fileId);
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const renderUploadButton = () => (
    <Button
      type="primary"
      onClick={handleUpload}
      disabled={fileList.length === 0}
      loading={uploading}
      icon={<UploadOutlined />}
    >
      {uploading ? 'Đang upload...' : 'Bắt đầu upload'}
    </Button>
  );

  const renderFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) {
      return <FileOutlined style={{ color: '#1890ff' }} />;
    } else if (mimeType.includes('pdf')) {
      return <FileOutlined style={{ color: '#f5222d' }} />;
    } else if (mimeType.includes('word') || mimeType.includes('document')) {
      return <FileOutlined style={{ color: '#1890ff' }} />;
    } else if (mimeType.includes('excel') || mimeType.includes('sheet')) {
      return <FileOutlined style={{ color: '#52c41a' }} />;
    }
    return <FileOutlined />;
  };

  return (
    <div className="file-upload-container">
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        {/* Upload Area */}
        {useDragger ? (
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Nhấp hoặc kéo file vào khu vực này để upload</p>
            <p className="ant-upload-hint">
              {multiple
                ? `Hỗ trợ upload một hoặc nhiều file cùng lúc${
                    maxCount ? ` (Tối đa ${maxCount} file)` : ''
                  }`
                : 'Chỉ upload được một file'}
            </p>
          </Dragger>
        ) : (
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />} disabled={disabled || uploading}>
              Chọn file
            </Button>
          </Upload>
        )}

        {/* Upload Progress */}
        {uploading && (
          <div>
            <Progress percent={progress} status="active" />
            <Text type="secondary">Đang upload...</Text>
          </div>
        )}

        {/* Upload Button */}
        {!autoUpload && fileList.length > 0 && renderUploadButton()}

        {/* Uploaded Files List */}
        {showUploadedList && uploadedFiles.length > 0 && (
          <div>
            <Text strong>Danh sách file đã upload:</Text>
            <List
              dataSource={uploadedFiles}
              renderItem={(file) => (
                <List.Item
                  actions={[
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteUploaded(file.id)}
                    >
                      Xóa
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={renderFileIcon(file.mimeType)}
                    title={
                      <Space>
                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                          {file.originalName}
                        </a>
                        <CheckCircleOutlined style={{ color: '#52c41a' }} />
                      </Space>
                    }
                    description={
                      <Space size="small">
                        <Tag color="blue">{uploadService.formatFileSize(file.fileSize)}</Tag>
                        {file.folder && <Tag>{file.folder}</Tag>}
                        {file.description && <Text type="secondary">{file.description}</Text>}
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        )}
      </Space>
    </div>
  );
};

export default FileUpload;
