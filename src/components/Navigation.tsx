import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUsers, FaCog, FaFileAlt, FaShoppingCart } from 'react-icons/fa';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import './Navigation.css';

interface NavigationProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Navigation = ({ isOpen, toggleSidebar }: NavigationProps) => {
  return (
    <nav className={`navigation ${isOpen ? 'open' : ''}`}>
      <div className="navigation-header">
        <div className="navigation-header-content">
          <h3>AK Kamal Photography</h3>
        </div>
      </div>
      <div className="navigation-items">
        {isOpen && (
          <>
            <Link to="/calendar" className="navigation-item">
              <FaCalendarAlt />
              <span>Calendar</span>
            </Link>
            <Link to="/customers" className="navigation-item">
              <FaUsers />
              <span>Customers</span>
            </Link>
            <Link to="/services" className="navigation-item">
              <FaCog />
              <span>Services</span>
            </Link>
            <Link to="/deliverables" className="navigation-item">
              <FaFileAlt />
              <span>Deliverables</span>
            </Link>
            <Link to="/orders" className="navigation-item">
              <FaShoppingCart />
              <span>Orders</span>
            </Link>
          </>
        )}
        {!isOpen && (
          <>
            <Link to="/calendar" className="navigation-item">
              <FaCalendarAlt />
            </Link>
            <Link to="/customers" className="navigation-item">
              <FaUsers />
            </Link>
            <Link to="/services" className="navigation-item">
              <FaCog />
            </Link>
            <Link to="/deliverables" className="navigation-item">
              <FaFileAlt />
            </Link>
            <Link to="/orders" className="navigation-item">
              <FaShoppingCart />
            </Link>
          </>
        )}

      </div>
      <div className="navigation-footer">
        <button onClick={toggleSidebar} className="toggle-button">
          <ChevronDoubleRightIcon className="toggle-icon" />
        </button>
        <button onClick={toggleSidebar} className="toggle-button">
          <ChevronDoubleRightIcon className="toggle-icon" />
        </button>
      </div>
    </nav>
  );
};

export default Navigation;