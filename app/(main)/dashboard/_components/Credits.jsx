// ProfileDialog.jsx

// import { useAuth } from '@/app/AuthProvider';
// import { useUser } from '@stackframe/stack';
// import Image from 'next/image';
// import React from 'react';

// function Credits() {
//   const { userData } = useAuth();
//   const user = useUser();

//   return (
//     <div>
//       <div>
//         <Image
//           src={user?.profileImageUrl || '/default-avatar.png'}
//           width={60}
//           height={60}
//           alt={`${user?.name || userData?.name || 'User'} profile picture`}
//         />
//       </div>
//     </div>
//   );
// }

// export default Credits;
import { useAuth } from '@/app/AuthProvider';
import { useUser } from '@stackframe/stack';
import Image from 'next/image';
import React, { useState } from 'react';

function Credits() {
  const { userData } = useAuth();
  const user = useUser();
  const [showInfo, setShowInfo] = useState(false);

  const displayName = user?.name || userData?.name || 'User';
  const email = user?.email || userData?.email || 'No email';
  const credits = 50000; // Added credits

  return (
    <div className="relative inline-block">
      {/* Profile Button */}
      <button
        onClick={() => setShowInfo(prev => !prev)}
        className="flex items-center space-x-3 focus:outline-none"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
          <Image
            src={user?.profileImageUrl || '/default-avatar.png'}
            width={48}
            height={48}
            alt={`${displayName} profile picture`}
            className="object-cover w-full h-full"
          />
        </div>
        <span className="font-medium text-gray-800">{displayName}</span>
      </button>

      {/* Dropdown Info */}
      {showInfo && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg border border-gray-200 rounded-lg p-4 z-50">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 mb-2">
              <Image
                src={user?.profileImageUrl || '/default-avatar.png'}
                width={64}
                height={64}
                alt={`${displayName} profile picture`}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{displayName}</h3>
            <p className="text-sm text-gray-500">{email}</p>
            <p className="text-sm text-gray-600 mt-1">Credits: {credits.toLocaleString()}</p>
            {userData?.role && (
              <p className="text-sm text-gray-600 mt-1">Role: {userData.role}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Credits;


