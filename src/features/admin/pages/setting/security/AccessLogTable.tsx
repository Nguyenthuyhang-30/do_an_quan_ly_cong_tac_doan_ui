// src/pages/settings/security/AccessLogTable.tsx
import React from 'react';
import { Table, Typography, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FileTextOutlined } from '@ant-design/icons';
import { AccessLog } from './types';

const { Title, Text } = Typography;

interface Props {
  logs: AccessLog[];
}

const AccessLogTable: React.FC<Props> = ({ logs }) => {
  const columns: ColumnsType<AccessLog> = [
    {
      title: 'Người dùng',
      dataIndex: 'user',
      key: 'user',
      width: 150,
    },
    {
      title: 'Địa chỉ IP',
      dataIndex: 'ip',
      key: 'ip',
      width: 120,
      align: 'center',
    },
    {
      title: 'Thiết bị',
      dataIndex: 'device',
      key: 'device',
      width: 150,
      align: 'center',
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
      width: 180,
      align: 'center',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      align: 'center',
      render: (status: string) => (
        <Tag color={status === 'success' ? 'success' : 'error'}>
          {status === 'success' ? 'Thành công' : 'Thất bại'}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <Space direction="vertical" size="small" style={{ marginBottom: '16px' }}>
        <Title level={4} style={{ margin: 0 }}>
          <FileTextOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          Nhật ký truy cập
        </Title>
        <Text type="secondary" style={{ fontSize: '14px' }}>
          Theo dõi các lần đăng nhập gần đây vào hệ thống.
        </Text>
      </Space>

      <Table
        columns={columns}
        dataSource={logs}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} bản ghi`,
        }}
        style={{
          borderRadius: '12px',
          overflow: 'hidden',
        }}
        size="middle"
      />
    </div>
  );
};

export default AccessLogTable;
