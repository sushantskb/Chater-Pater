/* eslint-disable react/prop-types */


const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-gray-800 text-white p-6 rounded-lg z-10 w-full sm:w-1/3 mx-2 sm:mx-0">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl font-bold"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
