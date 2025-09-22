// import React from "react";

// const AI_Performence = () => {
//   return (
//     <div>
//       <div className="space-y-6">
//         <div>
//           <h2 className="text-3xl font-bold text-foreground">AI Performance</h2>
//           <p className="text-muted-foreground">
//             Monitor AI outfit suggestions and performance metrics
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Suggestions Generated</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-primary">45,123</div>
//               <p className="text-sm text-muted-foreground">
//                 +23% from last month
//               </p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle>Success Rate</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-primary">87.5%</div>
//               <p className="text-sm text-muted-foreground">
//                 +2.1% from last month
//               </p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle>User Satisfaction</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-primary">4.6/5</div>
//               <p className="text-sm text-muted-foreground">
//                 Based on user feedback
//               </p>
//             </CardContent>
//           </Card>
//         </div>

//         <Card>
//           <CardHeader>
//             <CardTitle>Recent AI Logs</CardTitle>
//             <CardDescription>Latest AI suggestion activities</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {[1, 2, 3, 4].map((i) => (
//                 <div
//                   key={i}
//                   className="flex items-center justify-between p-3 border border-border rounded-lg"
//                 >
//                   <div className="flex items-center space-x-3">
//                     <Brain className="h-5 w-5 text-primary" />
//                     <div>
//                       <p className="font-medium">Outfit suggestion generated</p>
//                       <p className="text-sm text-muted-foreground">
//                         User: sarah@example.com • 2 minutes ago
//                       </p>
//                     </div>
//                   </div>
//                   <Badge variant="secondary">Success</Badge>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default AI_Performence;

import React from "react";
import { Brain } from "lucide-react";

const AI_Performence = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">AI Performance</h2>
        <p className="text-gray-500">
          Monitor AI outfit suggestions and performance metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white shadow rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-gray-800">
            Suggestions Generated
          </h3>
          <div className="mt-2 text-3xl font-bold text-indigo-600">45,123</div>
          <p className="text-sm text-green-600">+23% from last month</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-gray-800">Success Rate</h3>
          <div className="mt-2 text-3xl font-bold text-indigo-600">87.5%</div>
          <p className="text-sm text-green-600">+2.1% from last month</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-gray-800">
            User Satisfaction
          </h3>
          <div className="mt-2 text-3xl font-bold text-indigo-600">4.6/5</div>
          <p className="text-sm text-gray-500">Based on user feedback</p>
        </div>
      </div>

      {/* Recent AI Logs */}
      <div className="bg-white shadow rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-gray-800">Recent AI Logs</h3>
        <p className="text-sm text-gray-500 mb-4">
          Latest AI suggestion activities
        </p>

        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Brain className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="font-medium text-gray-800">
                    Outfit suggestion generated
                  </p>
                  <p className="text-sm text-gray-500">
                    User: sarah@example.com • 2 minutes ago
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                Success
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AI_Performence;
