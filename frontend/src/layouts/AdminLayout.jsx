import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * Layout for admin-only routes (dashboard, dispute resolution).
 */
export function AdminLayout() {
  return (
    <div>
      <header>Admin — One Hand</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
