import React from 'react';
import { Button } from "@/components/ui/button";
import { Trophy, Repeat, Clock } from "lucide-react";

interface ResultScreenProps {
    score: number;
    totalQuestions: number;
    timeSpent: number;
    achievements: Array<{name: string, icon: string}>;
    onRestart: () => void;
}

export default function ResultScreen({ 
    score, 
    totalQuestions, 
    timeSpent, 
    achievements,
    onRestart 
}: ResultScreenProps) {
    const passPercentage = (score / (totalQuestions * 4)) * 100;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
            <div className="bg-white shadow-xl rounded-xl p-8 text-center max-w-md w-full">
                <Trophy className="mx-auto text-yellow-500 mb-4" size={64} />
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Quiz Completed!</h1>
                
                <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                        <span>Total Score:</span>
                        <span className="font-bold">{score}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Pass Percentage:</span>
                        <span className="font-bold">{passPercentage.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <Clock className="text-blue-500" size={24} />
                        <span>Time Spent: {timeSpent}s</span>
                    </div>
                    
                    <div className="pt-4">
                        <h3 className="text-lg font-semibold mb-2">Achievements</h3>
                        <div className="flex justify-center space-x-2">
                            {achievements.map((achievement, index) => (
                                <div 
                                    key={index} 
                                    className="flex flex-col items-center"
                                >
                                    <span className="text-3xl">{achievement.icon}</span>
                                    <span className="text-xs">{achievement.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                <Button 
                    onClick={onRestart} 
                    className="w-full bg-green-600 hover:bg-green-700 transition-colors"
                >
                    <Repeat className="mr-2" size={20} /> Restart Quiz
                </Button>
            </div>
        </div>
    );
}