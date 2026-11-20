// import React from 'react'

// function Feedback() {
//     return (
//         <div>
//             <h2 className='font-bold text-xl'>Feedback</h2>
//              <h2 className='text-gray-400'>You don't have any Previous Interview Feedback</h2>
//             </div>
//     )
// }

// export default Feedback;

// "use client";

// import React, { useEffect, useState } from 'react';
// import { useConvex } from 'convex/react';
// import { useAuth } from '@/app/AuthProvider';
// import { api } from '@/convex/_generated/api';
// import { Card } from "@/components/ui/Card";
// import { Star, MessageSquare, Calendar, TrendingUp } from 'lucide-react';

// function Feedback() {
//     const convex = useConvex();
//     const { userData } = useAuth();
//     const [feedbackData, setFeedbackData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         userData && getFeedbackData();
//     }, [userData]);

//     const getFeedbackData = async () => {
//         try {
//             setLoading(true);
//             const result = await convex.query(api.DiscussionRoom.GetAllDiscussionRoom, {
//                 uid: userData?._id
//             });
            
//             // Filter rooms that have conversations (completed sessions)
//             const completedSessions = result?.filter(room => 
//                 room.conversation && room.conversation.length > 1
//             ) || [];
            
//             setFeedbackData(completedSessions);
//         } catch (error) {
//             console.error("Error fetching feedback data:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const generateSessionInsights = (conversation) => {
//         const userMessages = conversation.filter(msg => msg.role === 'user');
//         const assistantMessages = conversation.filter(msg => msg.role === 'assistant');
        
//         return {
//             totalMessages: conversation.length,
//             userMessages: userMessages.length,
//             assistantMessages: assistantMessages.length,
//             avgUserMessageLength: userMessages.reduce((acc, msg) => acc + msg.content.length, 0) / userMessages.length || 0,
//             engagement: userMessages.length > 5 ? 'High' : userMessages.length > 2 ? 'Medium' : 'Low'
//         };
//     };

//     const formatDate = (timestamp) => {
//         return new Date(timestamp).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         });
//     };

//     // if (loading) {
//     //     return (
//     //         <div className="flex items-center justify-center p-8">
//     //             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//     //             <span className="ml-2">Loading feedback...</span>
//     //         </div>
//     //     );
//     // }

//     return (
//         <div>
//             <h2 className='font-bold text-xl mb-4'>Session Feedback & Analytics</h2>
            
//             {feedbackData.length === 0 ? (
//                 <div className="text-center py-8">
//                     <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">No Feedback Available</h3>
//                     <p className="text-gray-500">Complete some sessions to see your feedback and analytics here.</p>
//                 </div>
//             ) : (
//                 <div className="grid gap-6">
//                     {feedbackData.map((session) => {
//                         const insights = generateSessionInsights(session.conversation);
                        
//                         return (
//                             <Card key={session._id} className="p-6">
//                                 <div className="flex items-start justify-between mb-4">
//                                     <div>
//                                         <h3 className="text-lg font-semibold mb-1">{session.expertType}</h3>
//                                         <p className="text-gray-600 mb-2">{session.topic}</p>
//                                         <div className="flex items-center gap-1 text-sm text-gray-500">
//                                             <Calendar className="h-4 w-4" />
//                                             <span>{formatDate(session._creationTime)}</span>
//                                         </div>
//                                     </div>
                                    
//                                     <div className={`px-3 py-1 rounded-full text-sm font-medium ${
//                                         insights.engagement === 'High' ? 'bg-green-100 text-green-800' :
//                                         insights.engagement === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
//                                         'bg-gray-100 text-gray-800'
//                                     }`}>
//                                         {insights.engagement} Engagement
//                                     </div>
//                                 </div>

//                                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
//                                     <div className="text-center p-3 bg-blue-50 rounded-lg">
//                                         <MessageSquare className="h-5 w-5 text-blue-600 mx-auto mb-1" />
//                                         <div className="text-2xl font-bold text-blue-600">{insights.totalMessages}</div>
//                                         <div className="text-xs text-gray-600">Total Messages</div>
//                                     </div>
                                    
//                                     <div className="text-center p-3 bg-green-50 rounded-lg">
//                                         <TrendingUp className="h-5 w-5 text-green-600 mx-auto mb-1" />
//                                         <div className="text-2xl font-bold text-green-600">{insights.userMessages}</div>
//                                         <div className="text-xs text-gray-600">Your Responses</div>
//                                     </div>
                                    
//                                     <div className="text-center p-3 bg-purple-50 rounded-lg">
//                                         <Star className="h-5 w-5 text-purple-600 mx-auto mb-1" />
//                                         <div className="text-2xl font-bold text-purple-600">{Math.round(insights.avgUserMessageLength)}</div>
//                                         <div className="text-xs text-gray-600">Avg Response Length</div>
//                                     </div>
                                    
//                                     <div className="text-center p-3 bg-orange-50 rounded-lg">
//                                         <MessageSquare className="h-5 w-5 text-orange-600 mx-auto mb-1" />
//                                         <div className="text-2xl font-bold text-orange-600">{insights.assistantMessages}</div>
//                                         <div className="text-xs text-gray-600">AI Responses</div>
//                                     </div>
//                                 </div>

//                                 <div className="border-t pt-4">
//                                     <h4 className="font-medium mb-2">Session Summary</h4>
//                                     <p className="text-sm text-gray-600">
//                                         You had a {insights.engagement.toLowerCase()} engagement session with {session.expertType} 
//                                         about "{session.topic}". The conversation included {insights.userMessages} of your responses 
//                                         with an average length of {Math.round(insights.avgUserMessageLength)} characters per message.
//                                     </p>
//                                 </div>
//                             </Card>
//                         );
//                     })}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Feedback;
    
"use client";

import React, { useEffect, useState } from 'react';
import { useConvex } from 'convex/react';
import { useAuth } from '@/app/AuthProvider';
import { api } from '@/convex/_generated/api';
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare, Calendar, TrendingUp, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';

function Feedback() {
    const convex = useConvex();
    const { userData } = useAuth();
    const [feedbackData, setFeedbackData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openSummary, setOpenSummary] = useState({}); // track toggles per session

    useEffect(() => {
        userData && getFeedbackData();
    }, [userData]);

    const getFeedbackData = async () => {
        try {
            setLoading(true);
            const result = await convex.query(api.DiscussionRoom.GetAllDiscussionRoom, {
                uid: userData?._id
            });
            
            const completedSessions = result?.filter(room => 
                room.conversation && room.conversation.length > 1
            ) || [];
            
            setFeedbackData(completedSessions);
        } catch (error) {
            console.error("Error fetching feedback data:", error);
        } finally {
            setLoading(false);
        }
    };

    const generateSessionInsights = (conversation) => {
        const userMessages = conversation.filter(msg => msg.role === 'user');
        const assistantMessages = conversation.filter(msg => msg.role === 'assistant');
        
        return {
            totalMessages: conversation.length,
            userMessages: userMessages.length,
            assistantMessages: assistantMessages.length,
            avgUserMessageLength: userMessages.reduce((acc, msg) => acc + msg.content.length, 0) / userMessages.length || 0,
            engagement: userMessages.length > 5 ? 'High' : userMessages.length > 2 ? 'Medium' : 'Low'
        };
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const deleteFeedback = async (sessionId) => {
        if (!confirm("Are you sure you want to delete this feedback?")) return;

        try {
            await convex.mutation(api.DiscussionRoom.DeleteDiscussionRoom, { id: sessionId });
            toast.success("Feedback deleted successfully");
            getFeedbackData(); // Refresh the feedback list
        } catch (error) {
            console.error("Error deleting feedback:", error);
            toast.error("Failed to delete feedback");
        }
    };

    const toggleSummary = (id) => {
        setOpenSummary(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div>
            <h2 className='font-bold text-xl mb-4'>Session Feedback & Analytics</h2>
            
            {feedbackData.length === 0 ? (
                <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Feedback Available</h3>
                    <p className="text-gray-500">Complete some sessions to see your feedback and analytics here.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {feedbackData.map((session) => {
                        const insights = generateSessionInsights(session.conversation);
                        
                        return (
                            <Card key={session._id} className="p-6 relative">
                                <button
                                    onClick={() => deleteFeedback(session._id)}
                                    className="absolute top-4 right-4 text-red-600 hover:text-red-800"
                                    title="Delete Feedback"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>

                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-1">{session.expertType}</h3>
                                        <p className="text-gray-600 mb-2">{session.topic}</p>
                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                            <Calendar className="h-4 w-4" />
                                            <span>{formatDate(session._creationTime)}</span>
                                        </div>
                                    </div>
                                    
                                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        insights.engagement === 'High' ? 'bg-green-100 text-green-800' :
                                        insights.engagement === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {insights.engagement} Engagement
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                                        <MessageSquare className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                                        <div className="text-2xl font-bold text-blue-600">{insights.totalMessages}</div>
                                        <div className="text-xs text-gray-600">Total Messages</div>
                                    </div>
                                    
                                    <div className="text-center p-3 bg-green-50 rounded-lg">
                                        <TrendingUp className="h-5 w-5 text-green-600 mx-auto mb-1" />
                                        <div className="text-2xl font-bold text-green-600">{insights.userMessages}</div>
                                        <div className="text-xs text-gray-600">Your Responses</div>
                                    </div>
                                    
                                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                                        <Star className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                                        <div className="text-2xl font-bold text-purple-600">{Math.round(insights.avgUserMessageLength)}</div>
                                        <div className="text-xs text-gray-600">Avg Response Length</div>
                                    </div>
                                    
                                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                                        <MessageSquare className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                                        <div className="text-2xl font-bold text-orange-600">{insights.assistantMessages}</div>
                                        <div className="text-xs text-gray-600">AI Responses</div>
                                    </div>
                                </div>

                                {/* Default analytics summary */}
                                <div className="border-t pt-4">
                                    <h4 className="font-medium mb-2">Session Summary</h4>
                                    <p className="text-sm text-gray-600">
                                        You had a {insights.engagement.toLowerCase()} engagement session with {session.expertType} 
                                        about "{session.topic}". The conversation included {insights.userMessages} of your responses 
                                        with an average length of {Math.round(insights.avgUserMessageLength)} characters per message.
                                    </p>
                                </div>

                                {/* ✅ AI-generated summary toggle */}
                                {session.summery && (
                                    <div className="border-t mt-4 pt-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium">AI Generated Summary</h4>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => toggleSummary(session._id)}
                                                className="flex items-center gap-1"
                                            >
                                                {openSummary[session._id] ? (
                                                    <>
                                                        Hide <ChevronUp className="w-4 h-4" />
                                                    </>
                                                ) : (
                                                    <>
                                                        Show <ChevronDown className="w-4 h-4" />
                                                    </>
                                                )}
                                            </Button>
                                        </div>

                                        {openSummary[session._id] && (
                                            <CardContent className="mt-3 text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                                                {typeof session.summery === "string"
                                                    ? session.summery
                                                    : JSON.stringify(session.summery, null, 2)}
                                            </CardContent>
                                        )}
                                    </div>
                                )}
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Feedback;

