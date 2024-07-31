import React from 'react';

const Sidebar = () => {
  return (
    <div className="flex flex-col pt-7 gap-5 w-full max-w-xs h-screen bg-white">
      <div className="flex items-center justify-center mx-5 px-2 py-1 rounded-lg bg-gray-100 gap-5 cursor-pointer">
        <p>Add</p>
      </div>
      <div className="flex items-center justify-center mx-5 px-2 py-1 rounded-lg bg-gray-100 gap-5 cursor-pointer">
        <p>Comment</p>
      </div>
    </div>
  );
};

export default Sidebar;
