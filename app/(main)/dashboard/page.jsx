'use client'; // This tells Next.js this is a Client Component

import React from 'react';
import FeatureAssistant from './_components/FeatureAssistant';
import Feedback from './_components/Feedback';
import History from './_components/History';

export default function Dashboard() {
  return (
    <div>
      <FeatureAssistant />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-20'>
        <History />
        <Feedback />
      </div>
    </div>
  );
}

// export default Dashboard
    
// "use client";

// import React, { useState } from 'react';
// import FeatureAssistant from './_components/FeatureAssistant';
// import History from './_components/History';
// import Feedback from './_components/Feedback';
// import { Button } from "@/components/ui/button";
// // import { Card } from "@/components/ui/card";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// export default function Dashboard() {
//   return (
//     <div className="min-h-screen bg-background p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Main Feature Assistant Section */}
//         <div className="mb-8">
//           <FeatureAssistant />
//         </div>

//         {/* Dashboard Content Tabs */}
//         <div className="mt-10">
//           <Tabs defaultValue="overview" className="w-full">
//             <TabsList className="grid w-full grid-cols-3">
//               <TabsTrigger value="overview">Overview</TabsTrigger>
//               <TabsTrigger value="history">Previous Lectures</TabsTrigger>
//               <TabsTrigger value="feedback">Feedback & Notes</TabsTrigger>
//             </TabsList>
            
//             <TabsContent value="overview" className="space-y-6 mt-6">
//               <div className="grid gap-6 md:grid-cols-2">
//                 <Card className="p-6">
//                   <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
//                   <History />
//                 </Card>
//                 <Card className="p-6">
//                   <h3 className="text-lg font-semibold mb-4">Latest Feedback</h3>
//                   <Feedback />
//                 </Card>
//               </div>
//             </TabsContent>
            
//             <TabsContent value="history" className="mt-6">
//               <Card className="p-6">
//                 <History />
//               </Card>
//             </TabsContent>
            
//             <TabsContent value="feedback" className="mt-6">
//               <Card className="p-6">
//                 <Feedback />
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// }