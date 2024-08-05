"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateGradeAndPoint = void 0;
const calculateGradeAndPoint = (totalMarks) => {
    const result = {
        grade: 'NA',
        gradePoint: 0.0,
    };
    if (totalMarks >= 80 && totalMarks <= 100) {
        result.grade = 'A';
        result.gradePoint = 4.0;
    }
    else if (totalMarks >= 70) {
        result.grade = 'B';
        result.gradePoint = 3.5;
    }
    else if (totalMarks >= 60) {
        result.grade = 'C';
        result.gradePoint = 3.0;
    }
    else if (totalMarks >= 50) {
        result.grade = 'D';
        result.gradePoint = 2.0;
    }
    else {
        result.grade = 'F';
        result.gradePoint = 0.0;
    }
    return result;
};
exports.calculateGradeAndPoint = calculateGradeAndPoint;
