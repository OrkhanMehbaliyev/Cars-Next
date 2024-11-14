import React from "react";

const Spinner = () => {
  return (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>

      <p className="mt-4 text-gray-600">Loading vehicles...</p>
    </div>
  );
};

export default Spinner;
