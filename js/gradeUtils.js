// gradeUtils.js
// Grade Utility Module
// Pure, reusable functions for computing and filtering grade data.
// None of these functions touch the DOM - they only take data in and return data out.

const QUIZ_WEIGHT = 0.25;
const LAB_WEIGHT = 0.35;
const EXAM_WEIGHT = 0.4;

/**
 * Returns the numeric weighted final grade for a single student.
 * Quiz = 25%, Laboratory = 35%, Prelim Exam = 40%.
 */
export function calculateFinalGrade(student) {
  const { quiz, lab, exam } = student; // object destructuring
  return quiz * QUIZ_WEIGHT + lab * LAB_WEIGHT + exam * EXAM_WEIGHT;
}

/**
 * Classifies a numeric grade into an academic status label.
 */
export function getAcademicStatus(grade) {
  if (grade >= 90) {
    return "Excellent";
  } else if (grade >= 75) {
    return "Passed";
  } else if (grade >= 70) {
    return "Needs Improvement";
  } else {
    return "Failed";
  }
}

/**
 * Returns a switch(true)-based performance remark for a numeric grade.
 */
export function getPerformanceRemark(grade) {
  switch (true) {
    case grade >= 90:
      return "Outstanding";
    case grade >= 85:
      return "Very Good";
    case grade >= 80:
      return "Good";
    case grade >= 75:
      return "Satisfactory";
    default:
      return "Unsatisfactory";
  }
}

/**
 * Returns students whose name contains the query (case-insensitive).
 */
export function searchStudents(students, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery === "") {
    return students;
  }
  return students.filter((student) =>
    student.name.toLowerCase().includes(normalizedQuery)
  );
}

/**
 * Returns all students when block is "All"; otherwise only students
 * belonging to the selected block.
 */
export function filterStudentsByBlock(students, block) {
  if (block === "All") {
    return students;
  }
  return students.filter((student) => student.block === block);
}

/**
 * Returns all students when status is "All"; otherwise only students
 * whose computed academic status matches the selected status.
 */
export function filterStudentsByStatus(students, status) {
  if (status === "All") {
    return students;
  }
  return students.filter(
    (student) => getAcademicStatus(calculateFinalGrade(student)) === status
  );
}

/**
 * Returns the numeric average of the computed final grades.
 * Returns 0 for an empty array.
 */
export function calculateClassAverage(students) {
  if (students.length === 0) {
    return 0;
  }
  const total = students.reduce(
    (sum, student) => sum + calculateFinalGrade(student),
    0
  );
  return total / students.length;
}

/**
 * Returns the count of students with a final grade of 75 or higher.
 */
export function countPassingStudents(students) {
  return students.reduce((count, student) => {
    return calculateFinalGrade(student) >= 75 ? count + 1 : count;
  }, 0);
}

/**
 * Returns the student object with the highest computed final grade.
 * Returns null for an empty array.
 */
export function getTopStudent(students) {
  if (students.length === 0) {
    return null;
  }
  return students.reduce((topStudent, currentStudent) => {
    return calculateFinalGrade(currentStudent) > calculateFinalGrade(topStudent)
      ? currentStudent
      : topStudent;
  }, students[0]);
}
