import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { MainLayout, AuthLayout, AdminLayout } from './layouts/index.js';
import { RequireAuth, RequireWallet, RequireVerified, RequireAdmin } from './middleware/index.js';
import { HomePage } from './features/home/pages/HomePage.jsx';
import { RegisterPage } from './features/auth/pages/RegisterPage.jsx';
import { LoginPage } from './features/auth/pages/LoginPage.jsx';
import { VerifyEmailPage } from './features/auth/pages/VerifyEmailPage.jsx';
import { ConnectWalletPage } from './features/auth/pages/ConnectWalletPage.jsx';
import { ProfilePage } from './features/account/pages/ProfilePage.jsx';
import { BrowseServicesPage } from './features/services/pages/BrowseServicesPage.jsx';
import { ServiceDetailPage } from './features/services/pages/ServiceDetailPage.jsx';
import { CreateServicePage } from './features/services/pages/CreateServicePage.jsx';
import { MyRequestsPage } from './features/requests/pages/MyRequestsPage.jsx';
import { IncomingRequestsPage } from './features/requests/pages/IncomingRequestsPage.jsx';
import { AdminDashboardPage } from './features/admin/pages/AdminDashboardPage.jsx';
import { DisputePage } from './features/admin/pages/DisputePage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'services', element: <BrowseServicesPage /> },
      { path: 'services/create', element: <RequireAuth><RequireWallet><RequireVerified><CreateServicePage /></RequireVerified></RequireWallet></RequireAuth> },
      { path: 'services/:id', element: <ServiceDetailPage /> },
      { path: 'requests', element: <RequireAuth><RequireWallet><MyRequestsPage /></RequireWallet></RequireAuth> },
      { path: 'requests/incoming', element: <RequireAuth><RequireWallet><IncomingRequestsPage /></RequireWallet></RequireAuth> },
      { path: 'profile', element: <RequireAuth><RequireWallet><ProfilePage /></RequireWallet></RequireAuth> },
      {
        path: 'admin',
        element: <RequireAuth><RequireWallet><RequireAdmin><AdminLayout /></RequireAdmin></RequireWallet></RequireAuth>,
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: 'disputes', element: <DisputePage /> },
        ],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: 'register', element: <RegisterPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'verify-email', element: <VerifyEmailPage /> },
      { path: 'connect-wallet', element: <ConnectWalletPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
