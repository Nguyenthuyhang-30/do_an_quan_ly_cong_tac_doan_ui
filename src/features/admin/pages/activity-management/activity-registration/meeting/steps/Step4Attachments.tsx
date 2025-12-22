// Step 4: Đính kèm file - Sinh hoạt
import { Form, Upload, Button, List, message } from 'antd';
import { FormInstance } from 'antd/es/form';
import { UploadOutlined, DeleteOutlined, FileOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useUpload } from '../../../../../../../hooks/useUpload';
import type { UploadedFile } from '../../../../../../../app-types/upload';

interface Step4AttachmentsProps {
  form: FormInstance;
}

export default function Step4Attachments({ form }: Step4AttachmentsProps) {
  const [fileList, setFileList] = useState<UploadedFile[]>([]);
  const { uploading, uploadSingle, deleteFile } = useUpload({
    showNotification: true,
  });

  const handleUpload = async (file: File) => {
    try {
      const result = await uploadSingle({
        file,
        folder: 'activity-documents',
      });
      setFileList((prev) => [...prev, result]);
      const currentAttachments = form.getFieldValue('attachments') || [];
      form.setFieldsValue({
        attachments: [...currentAttachments, result.url],
      });
      return false;
    } catch (error) {
      message.error('Upload file thất bại');
      return false;
    }
  };

  const handleRemove = async (file: UploadedFile) => {
    try {
      if (file.id) {
        await deleteFile(file.id);
      }
      setFileList((prev) => prev.filter((f) => f.id !== file.id));
      const currentAttachments = form.getFieldValue('attachments') || [];
      form.setFieldsValue({
        attachments: currentAttachments.filter((url: string) => url !== file.url),
      });
      message.success('Xóa file thành công');
    } catch (error) {
      message.error('Xóa file thất bại');
    }
  };

  return (
    <div>
      <h3 style={{ marginBottom: '24px', color: 'var(--text-primary)', fontSize: '18px' }}>
        Đính kèm file
      </h3>

      <Form.Item
        label="Tài liệu đính kèm"
        name="attachments"
        tooltip="Upload các file liên quan đến buổi sinh hoạt (biên bản, tài liệu, hình ảnh...)"
      >
        <div>
          <Upload
            beforeUpload={handleUpload}
            showUploadList={false}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            maxCount={10}
          >
            <Button
              icon={<UploadOutlined />}
              loading={uploading}
              size="large"
              style={{
                borderRadius: '8px',
                marginBottom: '16px',
              }}
            >
              Chọn file để tải lên
            </Button>
          </Upload>

          {fileList.length > 0 && (
            <List
              dataSource={fileList}
              renderItem={(file) => (
                <List.Item
                  actions={[
                    <Button
                      key="delete"
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemove(file)}
                    >
                      Xóa
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<FileOutlined style={{ fontSize: '24px', color: '#1890ff' }} />}
                    title={file.originalName || file.fileName}
                    description={`${(file.fileSize / 1024).toFixed(2)} KB`}
                  />
                </List.Item>
              )}
              style={{
                border: '1px solid #e8e8e8',
                borderRadius: '8px',
                padding: '8px',
              }}
            />
          )}

          {fileList.length === 0 && (
            <div
              style={{
                padding: '40px',
                textAlign: 'center',
                border: '1px dashed #d9d9d9',
                borderRadius: '8px',
                color: '#999',
              }}
            >
              Chưa có file nào được tải lên
            </div>
          )}
        </div>
      </Form.Item>
    </div>
  );
}

