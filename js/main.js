// main.js
// Main / Controller Module
// Wires together data, grade utilities, display functions, and the UI controls.

import { students } from "./students.js";
import {
  searchStudents,
  filterStudentsByBlock,
  filterStudentsByStatus
} from "./gradeUtils.js";
import { displayStudents, displaySummary, displayMessage } from "./display.js";

const searchInput = document.getElementById("searchInput");
const blockFilter = document.getElementById("blockFilter");
const statusFilter = document.getElementById("statusFilter");
const applyBtn = document.getElementById("applyBtn");
const resetBtn = document.getElementById("resetBtn");

/**
 * Reads the three controls, applies search + block filter + status filter
 * together, then renders the matching records and updates the summary.
 */
function applyFilters() {
  const query = searchInput.value;
  const block = blockFilter.value;
  const status = statusFilter.value;

  let result = searchStudents(students, query);
  result = filterStudentsByBlock(result, block);
  result = filterStudentsByStatus(result, status);

  displayStudents(result);
  displaySummary(result);
}

/**
 * Clears every control back to its initial state and restores the
 * full, unfiltered dataset.
 */
function resetFilters() {
  searchInput.value = "";
  blockFilter.value = "All";
  statusFilter.value = "All";

  displayMessage("");
  displayStudents(students);
  displaySummary(students);
}

function initDashboard() {
  displayStudents(students);
  displaySummary(students);

  applyBtn.addEventListener("click", applyFilters);
  resetBtn.addEventListener("click", resetFilters);

  // Live search as the user types; Apply Filters still works independently.
  searchInput.addEventListener("keyup", applyFilters);
  searchInput.addEventListener("input", applyFilters);

  // Optional live updates on filter change; Apply Filters still re-computes correctly.
  blockFilter.addEventListener("change", applyFilters);
  statusFilter.addEventListener("change", applyFilters);
}

document.addEventListener("DOMContentLoaded", initDashboard);
