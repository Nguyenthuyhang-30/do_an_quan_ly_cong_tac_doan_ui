import React from 'react';
import { Modal, message, Typography, List, Tag } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import cohortService from '../../../../services/api/cohort.service';

const { Text } = Typography;

interface DeleteCohortModalProps {
  visible: boolean;
  cohortIds: number[];
  onCancel: () => void;
  onSuccess: () => void;
}

const DeleteCohortModal: React.FC<DeleteCohortModalProps> = ({
  visible,
  cohortIds,
  onCancel,
  onSuccess,
}) => {
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      if (cohortIds.length === 1) {
        // Delete single cohort
        const response = await cohortService.deleteById(cohortIds[0]);
        if (response.code === 200) {
          message.success('Xóa khóa học thành công');
          onSuccess();
        } else {
          message.error(response.message || 'Lỗi khi xóa khóa học');
        }
      } else {
        // Delete multiple cohorts
        const response = await cohortService.deleteMany({ ids: cohortIds });
        if (response.code === 200) {
          message.success(`Xóa ${cohortIds.length} khóa học thành công`);
          onSuccess();
        } else {
          message.error(response.message || 'Lỗi khi xóa khóa học');
        }
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Lỗi khi xóa khóa học';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const isMultiple = cohortIds.length > 1;

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ExclamationCircleOutlined style={{ color: '#faad14' }} />
          <span>Xác nhận xóa {isMultiple ? 'nhiều khóa học' : 'khóa học'}</span>
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
            <Text>
              Bạn có chắc chắn muốn xóa <strong>{cohortIds.length}</strong> khóa học đã chọn?
            </Text>
            <div style={{ marginTop: 12 }}>
              <Text type="secondary">Danh sách ID khóa học sẽ bị xóa:</Text>
              <List
                style={{ marginTop: 8 }}
                size="small"
                dataSource={cohortIds}
                renderItem={(id) => (
                  <List.Item style={{ padding: '4px 0' }}>
                    <Tag color="red">ID: {id}</Tag>
                  </List.Item>
                )}
              />
            </div>
          </>
        ) : (
          <Text>
            Bạn có chắc chắn muốn xóa khóa học có ID <Tag color="red">{cohortIds[0]}</Tag>?
          </Text>
        )}

        <div style={{ marginTop: 16, padding: 12, backgroundColor: '#fff2f0', borderRadius: 6 }}>
          <Text type="warning" style={{ fontSize: '14px' }}>
            ⚠️ <strong>Cảnh báo:</strong> Hành động này không thể hoàn tác. Tất cả dữ liệu liên quan
            đến
            {isMultiple ? ' các khóa học này' : ' khóa học này'} sẽ bị xóa vĩnh viễn.
          </Text>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteCohortModal;
