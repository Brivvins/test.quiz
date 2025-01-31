import React from 'react';
import { Button } from "@/components/ui/button";
import { Trophy, Play, Clock } from "lucide-react";

interface StartScreenProps {
    onStartQuiz: () => void;
    quizTitle: string;
    totalQuestions: number;
}

export default function StartScreen({ 
    onStartQuiz, 
    quizTitle, 
    totalQuestions 
}: StartScreenProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
            <div className="bg-white shadow-xl rounded-xl p-8 text-center max-w-md w-full">
                <Trophy className="mx-auto text-yellow-500 mb-4" size={64} />
                <h1 className="text-2xl font-bold mb-4 text-gray-800">{quizTitle}</h1>
                
                <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-center space-x-2">
                        <Clock className="text-blue-500" size={24} />
                        <span>Total Questions: {totalQuestions}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                        <Play className="text-green-500" size={24} />
                        <span>Test Your Knowledge!</span>
                    </div>
                </div>
                
                <Button 
                    onClick={onStartQuiz} 
                    className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                    Start Quiz
                </Button>
            </div>
        </div>
    );
}