import React, { useState } from 'react';
import Layout from './components/Layout';
import RightPanel from './components/RightPanel';
import Dashboard from './components/Dashboard';
import FilesPage from './components/FilesPage';
import TransactionsPage from './components/TransactionsPage';
import EnrollmentPage from './components/EnrollmentPage';
import SettingsPage from './components/SettingsPage';
import LoginPage from './components/LoginPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('Dashboard');

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('Dashboard');
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <Layout
      rightPanel={<RightPanel />}
      activeTab={currentView}
      onNavigate={setCurrentView}
      onLogout={handleLogout}
    >
      {currentView === 'Dashboard' ? (
        <Dashboard />
      ) : currentView === 'Files' ? (
        <FilesPage />
      ) : currentView === 'Transactions' ? (
        <TransactionsPage />
      ) : currentView === 'Enrollment' ? (
        <EnrollmentPage />
      ) : currentView === 'Settings' ? (
        <SettingsPage />
      ) : (
        <div style={{ padding: '20px', color: 'var(--text-secondary)' }}>
          <h2>{currentView}</h2>
          <p>This page is coming soon.</p>
        </div>
      )}
    </Layout>
  );
};

export default App;
