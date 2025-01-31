
export interface OptionType {
    id: number;
    description: string;
    is_correct: boolean;
}

export interface QuestionType {
    id: number;
    description: string;
    options: OptionType[];
    difficulty?: 'easy' | 'medium' | 'hard';
}

export interface QuizDataType {
    id: string;
    title: string;
    questions: QuestionType[];
}