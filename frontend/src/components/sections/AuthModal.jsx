import React from 'react';
import Login from '../auth/Login';
import Register from '../auth/Register';

const AuthModal = ({ authMode, onClose, onSwitchMode }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>

        {authMode === 'login' ? (
          <Login onClose={onClose} onSwitchToRegister={() => onSwitchMode('register')} />
        ) : (
          <Register onClose={onClose} onSwitchToLogin={() => onSwitchMode('login')} />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
