"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateGrade = calculateGrade;
function calculateGrade(item) {
    switch (item.kind) {
        case "quiz":
            if (item.totalQuestions === 0)
                return 0;
            return Math.round((item.correctAnswers / item.totalQuestions) * 100);
        case "lab":
            return Math.round(item.functionalityScore * 0.7 + item.codeQualityScore * 0.3);
    }
    const _exhaustive = item;
    throw new Error(`Unhandled item: ${JSON.stringify(_exhaustive)}`);
}
