import { OptionType, QuestionType } from "@/types/quiz";

export function calculateScore(selectedAnswer: OptionType, question: QuestionType): number {
    const baseScore = selectedAnswer.is_correct ? 4 : -1;
    
    // Difficulty bonus
    const difficultyMultiplier = {
        'easy': 1,
        'medium': 1.5,
        'hard': 2
    };
    
    const difficultyBonus = difficultyMultiplier[question.difficulty || 'easy'];
    
    return Math.round(baseScore * difficultyBonus);
}

export function generateAchievements(score: number, totalQuestions: number) {
    const achievementTiers = [
        {
            name: "Quiz Novice",
            minScore: 0,
            icon: "🌱"
        },
        {
            name: "Knowledge Apprentice",
            minScore: totalQuestions * 2,
            icon: "🏆"
        },
        {
            name: "Master Quizzer",
            minScore: totalQuestions * 3,
            icon: "🌟"
        },
        {
            name: "Quiz Genius",
            minScore: totalQuestions * 4,
            icon: "💡"
        }
    ];

    return achievementTiers
        .filter(achievement => score >= achievement.minScore)
        .map(achievement => achievement);
}