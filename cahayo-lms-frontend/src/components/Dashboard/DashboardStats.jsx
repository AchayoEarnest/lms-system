import React from 'react';

const DashboardStats = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    {stats.map((stat, idx) => (
      <div key={idx} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="text-3xl mb-2">{stat.icon}</div>
        <p className="text-gray-600 text-sm">{stat.label}</p>
        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
      </div>
    ))}
  </div>
);

export default DashboardStats;