import React from "react";
import "./PopupModal.css";

const PopupModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>

        {children}
      </div>
    </div>
  );
};

export default PopupModal;
