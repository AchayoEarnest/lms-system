import React from "react";

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
    <div className="text-3xl mb-2">{icon}</div>
    <p className="text-gray-600 text-sm">{label}</p>
    <p className="text-3xl font-bold text-gray-900">{value}</p>
  </div>
);

export default StatCard;
