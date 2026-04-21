import React from 'react';
import { RouterProvider } from '@tanstack/react-router';
import ErrorBoundary from '@components/common/ErrorBoundary';
import { router } from '@routes/routes';
import { AuthProvider } from './contexts/AuthProvider';
import { ConfigProvider, App as AntApp } from 'antd';
import viVN from 'antd/locale/vi_VN';
import { notification } from 'antd';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ConfigProvider
        locale={viVN}
      >
        <AntApp>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </AntApp>
      </ConfigProvider>
    </ErrorBoundary>
  );
};

export default App;
