import React from 'react';
import { RouterProvider } from '@tanstack/react-router';
import ErrorBoundary from '@components/common/ErrorBoundary';
import { router } from '@routes/routes';
import { AuthProvider } from './contexts/AuthProvider';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ConfigProvider locale={viVN}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ConfigProvider>
    </ErrorBoundary>
  );
};

export default App;
