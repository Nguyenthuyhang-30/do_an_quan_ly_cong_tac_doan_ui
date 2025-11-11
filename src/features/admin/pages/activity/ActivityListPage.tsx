// Activity List Page
import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button, Card, message } from 'antd';
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ActivityService from '../../../../services/api/activity.service';
import { Activity } from '../../../../types/activity';
import { ActivityStatusBadge } from '../../../../components/common/ActivityStatusBadge';

const ActivityListPage: React.FC = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await ActivityService.getList({
        page: 1,
        limit: 100,
        search,
      });
      setActivities(response.data.list);
    } catch (error) {
      message.error('Không thể tải danh sách hoạt động');
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await ActivityService.delete(id);
      message.success('Xóa hoạt động thành công');
      await fetchActivities();
    } catch (error) {
      message.error('Không thể xóa hoạt động');
      console.error('Error deleting activity:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredActivities = activities.filter((activity) => {
    const searchKey = (activity.name + activity.code).toLowerCase();
    return searchKey.includes(search.toLowerCase());
  });

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Quản lý Hoạt động</h1>
          <p className="text-gray-500">Quản lý các hoạt động, sự kiện, cuộc họp của đoàn.</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate({ to: '/admin/activity/event' })}
        >
          Tạo hoạt động mới
        </Button>
      </div>

      {/* Search */}
      <Card>
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-500 mb-1">Tìm kiếm hoạt động</label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
            placeholder="Nhập tên hoặc mã hoạt động..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </Card>

      {/* Activity List */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        {loading && <div className="text-center py-4 text-gray-500">Đang tải...</div>}
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-100">
              <th className="py-2">Mã</th>
              <th>Tên hoạt động</th>
              <th>Thời gian bắt đầu</th>
              <th>Địa điểm</th>
              <th>Trạng thái</th>
              <th className="text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredActivities.length === 0 ? (
              <tr>
                <td className="py-4 text-center text-gray-500" colSpan={6}>
                  Không tìm thấy hoạt động phù hợp.
                </td>
              </tr>
            ) : (
              filteredActivities.map((activity) => (
                <tr key={activity.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 font-medium text-gray-800">{activity.code}</td>
                  <td>{activity.name}</td>
                  <td>
                    {activity.startDate
                      ? new Date(activity.startDate).toLocaleDateString('vi-VN')
                      : '-'}
                  </td>
                  <td>{activity.location || '-'}</td>
                  <td>
                    <ActivityStatusBadge status={activity.status} />
                  </td>
                  <td className="text-right space-x-2">
                    <button
                      className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1"
                      onClick={() => navigate({ to: `/admin/activity/${activity.id}` })}
                    >
                      <EyeOutlined /> Xem
                    </button>
                    <button
                      className="text-xs text-indigo-600 hover:underline inline-flex items-center gap-1"
                      onClick={() => navigate({ to: `/admin/activity/${activity.id}/edit` })}
                    >
                      <EditOutlined /> Sửa
                    </button>
                    <button
                      className="text-xs text-red-500 hover:underline inline-flex items-center gap-1"
                      onClick={() => {
                        if (window.confirm('Bạn có chắc chắn muốn xóa hoạt động này?')) {
                          handleDelete(activity.id);
                        }
                      }}
                    >
                      <DeleteOutlined /> Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityListPage;
