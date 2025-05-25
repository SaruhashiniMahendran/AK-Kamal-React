import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './style/calendar.css';
import Popup from '../components/Popup';
import WarningPopup from '../components/WarningPopup';

const CalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const handleVerify = () => {
    // Simulating API response (replace with actual API call)
    const mockResponse = {
      isAdmin: phoneNumber.endsWith('999') // Using a simple mock condition
    };

    if (mockResponse.isAdmin) {
      setShowWarning(true);
    } else {
      setShowPopup(false);
    }
  };

  const handleCancel = () => {
    navigate('/', {
      state: { sidebarOpen: true }
    });
  };

  return (
    <div className="calendar-container">
      <h2>Calendar</h2>
      {!showPopup && <Calendar className="react-calendar" />}
      
      <Popup isOpen={showPopup} onClose={handleCancel}>
        <div className="phone-verification-popup">
          <h3>Phone Verification Required</h3>
          <div className="phone-input">
            <input
              type="tel"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="popup-buttons">
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleVerify}>Verify</button>
          </div>
        </div>
      </Popup>

      <WarningPopup
        isOpen={showWarning}
        onClose={() => {
          setShowWarning(false);
        }}
        onConfirm={() => {
          setShowWarning(false);
          setShowPopup(false);
        }}
      />
    </div>
  );
};

export default CalendarPage;
