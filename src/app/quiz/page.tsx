"use client";
import { useEffect, useState, useMemo } from "react";
import { fetchQuizData } from "@/lib/api";
import Question from "./Question";
import StartScreen from "./StartScreen";
import ResultScreen from "./ResultScreen";
import { Progress } from "@/components/ui/progress";
import { QuizDataType, QuestionType, OptionType } from "@/types/quiz";
import { 
    calculateScore, 
    generateAchievements 
} from "@/lib/quiz-utils";
import { CgSpinner } from "react-icons/cg";

export default function Quiz() {
      // Stores fetched quiz data and handles loading states
      const [quizData, setQuizData] = useState<QuizDataType | null>(null);
      const [questions, setQuestions] = useState<QuestionType[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState("");
  
      // Manages quiz flow and user interaction
      const [quizStarted, setQuizStarted] = useState(false);
      const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
      const [selectedAnswer, setSelectedAnswer] = useState<OptionType | null>(null);
      const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  
      // Tracks user score and completion status
      const [score, setScore] = useState(0);
      const [timeSpent, setTimeSpent] = useState(0);
      const [quizFinished, setQuizFinished] = useState(false);
  

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (quizStarted && !quizFinished) {
            timer = setInterval(() => {
                setTimeSpent(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [quizStarted, quizFinished]);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchQuizData();
                if (data) {
                    setQuizData(data);
                    setQuestions(data.questions);
                } else {
                    setError("Failed to load quiz");
                }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setError("An error occurred while fetching quiz data");
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    const handleAnswer = () => {
        if (!selectedAnswer || questions.length === 0) return;

        const currentQuestion = questions[currentQuestionIndex];
        
        // Calculate score with difficulty bonus
        const points = calculateScore(selectedAnswer, currentQuestion);
        setScore(prev => prev + points);

        setAnsweredQuestions(prev => [...prev, currentQuestion.id]);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(null);
        } else {
            setQuizFinished(true);
        }
    };

    const progressPercentage = useMemo(() => {
        if (questions.length === 0) return 0;
        return ((currentQuestionIndex + 1) / questions.length) * 100;
    }, [currentQuestionIndex, questions]);

    // Achievements generation after quiz completion
    const achievements = useMemo(() => {
        if (quizFinished && questions.length > 0) {
            return generateAchievements(score, questions.length);
        }
        return [];
    }, [quizFinished, score, questions]);

    if (loading) return <div className='flex justify-center items-center min-h-screen'><CgSpinner className="text-7xl"/></div>;
    if (error) return <div className="text-lg text-red-600">Error: {error}</div>;
    if (!quizData) return null;

    if (!quizStarted) {
        return (
            <StartScreen 
                onStartQuiz={() => setQuizStarted(true)}
                quizTitle={quizData.title}
                totalQuestions={questions.length}
            />
        );
    }

    if (quizFinished) {
        return (
            <ResultScreen 
                score={score}
                totalQuestions={questions.length}
                timeSpent={timeSpent}
                achievements={achievements}
                onRestart={() => {
                    setQuizStarted(false);
                    setQuizFinished(false);
                    setCurrentQuestionIndex(0);
                    setScore(0);
                    setTimeSpent(0);
                }}
            />
        );
    }

    return (
        <div className=" flex flex-col justify-center items-center min-h-screen max-w-2xl mx-auto p-4">
            
            <div className="mb-4">
                <Progress value={progressPercentage} className="w-full h-2" />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                    <span>Time: {timeSpent}s</span>
                </div>
            </div>

            <Question
                question={questions[currentQuestionIndex]}
                selectedAnswer={selectedAnswer}
                onSelectAnswer={setSelectedAnswer}
                onSubmitAnswer={handleAnswer}
                isAnswered={answeredQuestions.includes(questions[currentQuestionIndex].id)}
            />
        </div>
    );
}