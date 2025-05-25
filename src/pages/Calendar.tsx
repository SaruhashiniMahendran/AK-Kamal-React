import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './style/calendar.css';
import Popup from '../components/Popup';
import WarningPopup from '../components/WarningPopup';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'react-phone-number-input';

const CalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [showWarning, setShowWarning] = useState(false);

  const handlePhoneChange = (value: string | undefined) => {
    setPhoneNumber(value || '');
  };

  const validatePhoneNumber = (number: string): boolean => {
    if (!number) {
      setPhoneError('Phone number is required');
      return false;
    }
    
    const isValid = isValidPhoneNumber(number);
    if (!isValid) {
      setPhoneError('Please enter a valid phone number');
      return false;
    }

    setPhoneError('');
    return true;
  };

  const handleVerify = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      return;
    }

    // Simulating API response (replace with actual API call)
    const mockResponse = {
      isAdmin: phoneNumber.endsWith('766831826') // Using a simple mock condition
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
            <PhoneInput
              defaultCountry="LK"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="Enter phone number"
              className="phone-input-field"
              countrySelectProps={{
                showFlags: true,
                countries: ['LK', 'IN', 'US', 'GB'],
                searchable: true,
                placeholder: 'Select country'
              }}
              international
              displayInitialValueAsLocalNumber
            />
            {phoneError && (
              <div className="phone-error">{phoneError}</div>
            )}
          </div>
          <div className="popup-buttons">
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleVerify}>Verify</button>
          </div>
        </div>
      </Popup>

      <WarningPopup
        isOpen={showWarning}
        onClose={() => setShowWarning(false)}
        onConfirm={() => {
          setShowWarning(false);
          setShowPopup(false);
        }}
      />
    </div>
  );
};

export default CalendarPage;
