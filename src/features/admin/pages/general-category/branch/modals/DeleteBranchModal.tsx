import { ExclamationCircleOutlined } from '@ant-design/icons';
import { message, Modal, Typography } from 'antd';
import React from 'react';
import { branchService } from '@services/api';

const { Text } = Typography;

interface DeleteBranchModalProps {
  visible: boolean;
  branchIds: number[];
  onCancel: () => void;
  onSuccess: () => void;
}

const DeleteBranchModal: React.FC<DeleteBranchModalProps> = ({
  visible,
  branchIds,
  onCancel,
  onSuccess,
}) => {
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      if (branchIds.length === 1) {
        // Delete single branch
        await branchService.delete(branchIds[0]);
        message.success('Xóa chi đoàn thành công');
        onSuccess();
      } else {
        // Delete multiple branches
        for (const id of branchIds) {
          await branchService.delete(id);
        }
        message.success(`Xóa ${branchIds.length} chi đoàn thành công`);
        onSuccess();
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Lỗi khi xóa chi đoàn';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const isMultiple = branchIds.length > 1;

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ExclamationCircleOutlined style={{ color: '#faad14' }} />
          <span>Xác nhận xóa {isMultiple ? 'nhiều chi đoàn' : 'chi đoàn'}</span>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      onOk={handleDelete}
      confirmLoading={loading}
      width={500}
      okText="Xóa"
      cancelText="Hủy"
      okButtonProps={{ danger: true }}
    >
      <div style={{ marginTop: 16 }}>
        {isMultiple ? (
          <>
            <Text>Bạn có chắc chắn muốn xóa các chi đoàn đã chọn?</Text>
            <div style={{ marginTop: 12, padding: 12, background: '#fff7e6', borderRadius: 8 }}>
              <Text type="warning">
                ⚠️ Bạn đang xóa <strong>{branchIds.length}</strong> chi đoàn
              </Text>
            </div>
          </>
        ) : (
          <Text>Bạn có chắc chắn muốn xóa chi đoàn này?</Text>
        )}
        <div style={{ marginTop: 12, padding: 12, background: '#fff1f0', borderRadius: 8 }}>
          <Text type="danger">
            <strong>Cảnh báo:</strong> Hành động này không thể hoàn tác!
          </Text>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteBranchModal;
