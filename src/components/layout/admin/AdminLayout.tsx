import { Outlet } from '@tanstack/react-router';
import { Layout } from 'antd';
import HeaderAdmin from '@components/headers/admin/HeaderAdmin';
import { SidebarAdmin } from '@components/sidebars/admin/SidebarAdmin';
import ProtectedRoute from '@components/common/ProtectedRoute';
import { UserRole } from '../../../app-types/auth';
import { useState } from 'react';

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ProtectedRoute requiredRole={[UserRole.ADMIN, UserRole.MODERATOR, UserRole.BCH]}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={220}
          style={{
            background: '#001529',
            boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
          }}
        >
          <SidebarAdmin collapsed={collapsed} />
        </Sider>
        <Layout>
          <Header
            style={{
              background: '#fff',
              boxShadow: '0 2px 8px #f0f1f2',
              padding: '0 24px',
              display: 'flex',
              alignItems: 'center',
              height: 64,
            }}
          >
            <HeaderAdmin />
          </Header>
          <Content
            style={{
              margin: '24px',
              background: '#fff',
              borderRadius: 8,
              minHeight: 360,
              boxShadow: '0 1px 4px rgba(0,21,41,.08)',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ProtectedRoute>
  );
};

export default AdminLayout;
