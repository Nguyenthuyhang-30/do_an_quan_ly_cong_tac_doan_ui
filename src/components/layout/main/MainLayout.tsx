import HeaderClient from '@components/headers/client/HeaderClient';
import { Outlet } from '@tanstack/react-router';
import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
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
          <HeaderClient />
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
  );
};

export default MainLayout;
