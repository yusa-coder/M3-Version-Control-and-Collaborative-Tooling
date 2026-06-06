import { Temporal } from "@js-temporal/polyfill";

import { Student, isStudent, parseStudent } from "./models/student.model";
import { Course, CourseStatus, describeCourse } from "./models/course.model";
import { EnrollmentRecord, EnrollmentStatus, describeEnrollment } from "./models/enrollment.model";
import { AssessmentItem, calculateGrade } from "./models/assessment.model";
import { ApiResponse, renderResponse } from "./models/api-response.model";

console.log("══════════════════════════════════════");
console.log("  SESSION 1 — Type Safety & Models");
console.log("══════════════════════════════════════\n");

// ─── Student ─────────────────────────────────────────────

const student: Student = {
  id: "STU-001",
  name: "Hana Tadesse",
  enrollmentDate: Temporal.Now.instant(),
};

console.log("GPA:", student.gpa?.toFixed(2) ?? "Not yet graded");

// ─── Course + EnrollmentRecord ───────────────────────────

const course: Course = {
  id: "CSE-101",
  title: "Introduction to Computer Science",
  capacity: 30,
  startDate: Temporal.PlainDate.from("2025-09-01"),
};

const enrollmentRecord: EnrollmentRecord = {
  studentId: student.id,
  courseCode: course.id,
  enrolledAt: Temporal.Now.instant(),
};

console.log(`Enrolled ${student.name} in ${course.title}`);
console.log(`Enrolled at: ${enrollmentRecord.enrolledAt.toString()}`);

// ─── Type Guards ─────────────────────────────────────────

function processStudent(raw: unknown): void {
  if (isStudent(raw)) {
    console.log(`Student ${raw.name} — GPA: ${raw.gpa?.toFixed(2) ?? "N/A"}`);
  } else {
    console.error("Invalid student data");
  }
}

processStudent({ id: "STU-001", name: "Hana", gpa: 3.7 });
processStudent(42);

const parsed = parseStudent({ id: "STU-002", name: "Yared Alemu" });
console.log("Parsed student:", parsed.name);

// ─── Assessment ──────────────────────────────────────────

const quiz: AssessmentItem = {
  id: "QUIZ-001",
  kind: "quiz",
  title: "SQL Basics",
  correctAnswers: 8,
  totalQuestions: 10,
};

const lab: AssessmentItem = {
  id: "LAB-001",
  kind: "lab",
  title: "REST API Project",
  functionalityScore: 85,
  codeQualityScore: 90,
};

console.log(`Quiz grade: ${calculateGrade(quiz)}%`);
console.log(`Lab grade: ${calculateGrade(lab)}%`);

// ─── Enrollment Lifecycle ────────────────────────────────

const pending: EnrollmentStatus = {
  status: "PENDING",
  requestedAt: Temporal.Now.instant(),
  studentId: "STU-001",
  courseId: "CRS-101",
};

const active: EnrollmentStatus = {
  status: "ACTIVE",
  startDate: Temporal.PlainDate.from("2026-09-01"),
  currentGrade: 78,
};

const completed: EnrollmentStatus = {
  status: "COMPLETED",
  finalGrade: 91,
  completedAt: Temporal.Now.instant(),
};

console.log(describeEnrollment(pending));
console.log(describeEnrollment(active));
console.log(describeEnrollment(completed));

// ─── Course Lifecycle ────────────────────────────────────

const webDev: CourseStatus = {
  status: "ACTIVE",
  enrolledCount: 28,
  startDate: Temporal.PlainDate.from("2026-09-01"),
};

const draft: CourseStatus = {
  status: "DRAFT",
  createdBy: "Admin",
  createdAt: Temporal.Now.instant(),
};

console.log(describeCourse(webDev));
console.log(describeCourse(draft));

// ─── API Response Generic ────────────────────────────────

const studentRes: ApiResponse<Student> = {
  status: "success",
  data: {
    id: "STU-001",
    name: "Dawit Bekele",
    enrollmentDate: Temporal.Now.instant(),
    gpa: 3.4,
  },
  fetchedAt: Temporal.Now.instant(),
};

const courseListRes: ApiResponse<Course[]> = {
  status: "success",
  data: [
    {
      id: "CRS-101",
      title: "Web Development Fundamentals",
      capacity: 30,
      startDate: Temporal.PlainDate.from("2026-09-01"),
    },
  ],
  fetchedAt: Temporal.Now.instant(),
};

const loadingRes: ApiResponse<Student> = { status: "loading" };
const errorRes: ApiResponse<Student> = {
  status: "error",
  message: "Not found",
  statusCode: 404,
};

console.log(renderResponse(studentRes, (s) => `${s.name} GPA: ${s.gpa ?? "N/A"}`));

console.log(
  renderResponse(courseListRes, (courses) =>
    courses.map((c) => c.title).join(", ")
  )
);

console.log(renderResponse(loadingRes, () => ""));
console.log(renderResponse(errorRes, () => ""));

// ─── Temporal ───────────────────────────────────────────

const approvedAt = Temporal.Now.instant();

console.log(`\nApproved at (UTC): ${approvedAt}`);

const addisTime = approvedAt.toZonedDateTimeISO("Africa/Addis_Ababa");
const londonTime = approvedAt.toZonedDateTimeISO("Europe/London");

console.log(`Addis:  ${addisTime.toPlainTime()}`);
console.log(`London: ${londonTime.toPlainTime()}`);

const courseStart = Temporal.PlainDate.from("2026-09-01");
const today = Temporal.Now.plainDateISO();

const daysUntilStart = today.until(courseStart).total({ unit: "days" });
console.log(`${Math.floor(daysUntilStart)} days until course starts`);

const deadline = Temporal.PlainDate.from("2026-12-15");
const remaining = today.until(deadline);

console.log(`${Math.floor(remaining.total({ unit: "days" }))} days until assignment is due`);