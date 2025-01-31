import React from 'react';

interface OptionType {
    id: number;
    description: string;
    is_correct: boolean;
}

interface QuestionProps {
    question: {
        id: number;
        description: string;
        options: OptionType[];
    };
    selectedAnswer: OptionType | null;
    onSelectAnswer: (option: OptionType) => void;
    onSubmitAnswer: () => void;
    isAnswered: boolean;
}

export default function Question({ 
    question, 
    selectedAnswer, 
    onSelectAnswer, 
    onSubmitAnswer,
    isAnswered 
}: QuestionProps) {
    return (
        <div className='bg-slate-300 shadow-md p-10 rounded-md'>
            <h2 className="text-lg font-bold mb-4">{question.description}</h2>
            <div className="space-y-2">
                {question.options.map((option) => (
                    <div 
                        key={option.id} 
                        className="flex items-center"
                    >
                        <input
                            type="radio"
                            id={`option-${option.id}`}
                            name="quiz-option"
                            value={option.id}
                            checked={selectedAnswer?.id === option.id}
                            onChange={() => onSelectAnswer(option)}
                            disabled={isAnswered}
                            className="mr-2"
                        />
                        <label 
                            htmlFor={`option-${option.id}`}
                            className={`flex-grow p-2 rounded ${
                                isAnswered 
                                    ? (option.is_correct 
                                        ? 'bg-green-100' 
                                        : selectedAnswer?.id === option.id 
                                            ? 'bg-red-100' 
                                            : '')
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            {option.description}
                        </label>
                    </div>
                ))}
            </div>
            <button 
                onClick={onSubmitAnswer}
                disabled={!selectedAnswer || isAnswered}
                className="mt-4 w-full p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
                Submit Answer
            </button>
        </div>
    );
}