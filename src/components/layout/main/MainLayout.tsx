import HeaderClient from '@components/headers/client/HeaderClient';
import { Outlet } from '@tanstack/react-router';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: 'var(--background-color)' }}>
      <Layout>
        <HeaderClient />
        <Content
          style={{
            backgroundColor: 'var(--background-color)',
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
