// display.js
// Display Module
// Responsible only for rendering data into the DOM. No data processing happens here.

import {
  calculateFinalGrade,
  getAcademicStatus,
  getPerformanceRemark,
  calculateClassAverage,
  countPassingStudents,
  getTopStudent
} from "./gradeUtils.js";

/**
 * Renders one student-card per supplied student inside #studentList.
 */
export function displayStudents(students) {
  const studentList = document.getElementById("studentList");
  studentList.innerHTML = "";

  if (students.length === 0) {
    displayMessage("No students found");
    return;
  }

  displayMessage("");

  students.forEach((student) => {
    const { id, name, block, quiz, lab, exam } = student; // object destructuring

    const finalGrade = calculateFinalGrade(student);
    const status = getAcademicStatus(finalGrade);
    const remark = getPerformanceRemark(finalGrade);

    const card = document.createElement("article");
    card.className = "student-card";
    card.dataset.id = id;

    const statusClass = status.toLowerCase().replace(/\s+/g, "-");

    card.innerHTML = `
      <header class="student-card__header">
        <h3 class="student-card__name">${name}</h3>
        <span class="student-card__block">${block}</span>
      </header>
      <dl class="student-card__scores">
        <div><dt>Quiz</dt><dd>${quiz}</dd></div>
        <div><dt>Lab</dt><dd>${lab}</dd></div>
        <div><dt>Exam</dt><dd>${exam}</dd></div>
      </dl>
      <div class="student-card__footer">
        <span class="student-card__grade">${finalGrade.toFixed(2)}</span>
        <span class="student-card__status status--${statusClass}">${status}</span>
      </div>
      <p class="student-card__remark">${remark}</p>
    `;

    studentList.appendChild(card);
  });
}

/**
 * Updates the class average, passing count, total displayed count,
 * and top-student name based on the currently displayed result set.
 */
export function displaySummary(students) {
  const classAverageEl = document.getElementById("classAverage");
  const passingCountEl = document.getElementById("passingCount");
  const displayedCountEl = document.getElementById("displayedCount");
  const topStudentEl = document.getElementById("topStudent");

  const average = calculateClassAverage(students);
  const passingCount = countPassingStudents(students);
  const topStudent = getTopStudent(students);

  classAverageEl.textContent = average.toFixed(2);
  passingCountEl.textContent = passingCount;
  displayedCountEl.textContent = students.length;
  topStudentEl.textContent = topStudent
    ? `${topStudent.name} (${calculateFinalGrade(topStudent).toFixed(2)})`
    : "—";
}

/**
 * Shows a message in the required message area. Passing an empty
 * string clears the area.
 */
export function displayMessage(message) {
  const messageArea = document.getElementById("messageArea");
  messageArea.textContent = message;
}
