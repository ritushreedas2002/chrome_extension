const DialogBox = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div className="bg-white p-5 rounded-lg shadow-lg w-[450px]">
          <button className="mb-3 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600" onClick={onClose}>Close</button>
          <div>{children}</div>
        </div>
      </div>
    );
  };

  export default DialogBox;