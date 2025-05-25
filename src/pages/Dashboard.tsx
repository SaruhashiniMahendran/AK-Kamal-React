import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/auth';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import CalendarPage from './Calendar';
import './style/dashboard.css';
import { FaBars, FaAngleLeft } from 'react-icons/fa';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (location.state?.sidebarOpen) {
      setIsSidebarOpen(true);
      setIsSidebarVisible(true);
    }
  }, [location]);

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isSidebarOpen) {
        const nav = document.querySelector('.navigation');
        if (nav && !nav.contains(event.target as Node)) {
          setIsSidebarOpen(false);
          setIsSidebarVisible(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Close sidebar when navigating away on mobile
  useEffect(() => {
    const handleRouteChange = () => {
      if (isMobile) {
        setIsSidebarOpen(false);
        setIsSidebarVisible(false);
      }
    };
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, [isMobile]);

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className={`dashboard-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Navigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <div className="nav-content">
          <button
            className="sidebar-toggle"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            style={{ display: isSidebarOpen ? 'none' : 'block' }}
          >
            <FaBars />
          </button>
          <button
            className="sidebar-toggle"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            style={{ display: isSidebarOpen ? 'block' : 'none' }}
          >  
                
          </button>
          <button
            id="logoutButton"
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <Routes>
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/" element={(
            <main className="dashboard-main">
              <div className="dashboard-header">
              </div>
              <div className="dashboard-content">
                <div className="welcome-container">
                  <div className="welcome-box">
                    <h2>Welcome to your Dashboard</h2>
                  </div>
                </div>
              </div>
            </main>
          )} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;