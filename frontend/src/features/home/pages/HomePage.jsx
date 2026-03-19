import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Home / dashboard: Quick Actions (Browse, Create Service, My Requests, Profile).
 */
export function HomePage() {
  return (
    <div>
      <h1>One Hand</h1>
      <nav>
        <Link to="/services">Browse Services</Link>
        <Link to="/services/create">Create Service</Link>
        <Link to="/requests">My Requests</Link>
        <Link to="/profile">Profile</Link>
      </nav>
    </div>
  );
}
