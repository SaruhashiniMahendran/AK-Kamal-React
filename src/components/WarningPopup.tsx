import React from 'react';
import { motion } from 'framer-motion';

interface WarningPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const WarningPopup: React.FC<WarningPopupProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="popup-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="warning-popup-content"
      >
        <div className="warning-message">
          <h3>You can't perform any activities here; this section only displays the calendar view.</h3>
          <div className="warning-buttons">
            <button onClick={onClose}>Cancel</button>
            <button onClick={onConfirm}>OK</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WarningPopup;
