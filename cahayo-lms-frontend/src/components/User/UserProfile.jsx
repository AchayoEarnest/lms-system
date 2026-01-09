import React from "react";
import { User, Mail, Phone } from "lucide-react";

const UserProfile = ({ user }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
        {user?.username?.[0]?.toUpperCase()}
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          {user?.first_name} {user?.last_name}
        </h2>
        <p className="text-gray-600">@{user?.username}</p>
      </div>
    </div>
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-gray-600">
        <Mail size={18} /> {user?.email}
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <Phone size={18} /> {user?.phone || "Not provided"}
      </div>
      <div className="text-gray-600 mt-4">
        <p className="text-sm text-gray-500 mb-1">Bio</p>
        <p>{user?.bio || "No bio added"}</p>
      </div>
    </div>
  </div>
);

export default UserProfile;
