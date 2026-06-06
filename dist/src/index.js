"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const polyfill_1 = require("@js-temporal/polyfill");
const student_model_1 = require("./models/student.model");
const course_model_1 = require("./models/course.model");
const enrollment_model_1 = require("./models/enrollment.model");
const assessment_model_1 = require("./models/assessment.model");
const api_response_model_1 = require("./models/api-response.model");
console.log("══════════════════════════════════════");
console.log("  SESSION 1 — Type Safety & Models");
console.log("══════════════════════════════════════\n");
// ─── Student ─────────────────────────────────────────────
const student = {
    id: "STU-001",
    name: "Hana Tadesse",
    enrollmentDate: polyfill_1.Temporal.Now.instant(),
};
console.log("GPA:", student.gpa?.toFixed(2) ?? "Not yet graded");
// ─── Course + EnrollmentRecord ───────────────────────────
const course = {
    id: "CSE-101",
    title: "Introduction to Computer Science",
    capacity: 30,
    startDate: polyfill_1.Temporal.PlainDate.from("2025-09-01"),
};
const enrollmentRecord = {
    studentId: student.id,
    courseCode: course.id,
    enrolledAt: polyfill_1.Temporal.Now.instant(),
};
console.log(`Enrolled ${student.name} in ${course.title}`);
console.log(`Enrolled at: ${enrollmentRecord.enrolledAt.toString()}`);
// ─── Type Guards ─────────────────────────────────────────
function processStudent(raw) {
    if ((0, student_model_1.isStudent)(raw)) {
        console.log(`Student ${raw.name} — GPA: ${raw.gpa?.toFixed(2) ?? "N/A"}`);
    }
    else {
        console.error("Invalid student data");
    }
}
processStudent({ id: "STU-001", name: "Hana", gpa: 3.7 });
processStudent(42);
const parsed = (0, student_model_1.parseStudent)({ id: "STU-002", name: "Yared Alemu" });
console.log("Parsed student:", parsed.name);
// ─── Assessment ──────────────────────────────────────────
const quiz = {
    id: "QUIZ-001",
    kind: "quiz",
    title: "SQL Basics",
    correctAnswers: 8,
    totalQuestions: 10,
};
const lab = {
    id: "LAB-001",
    kind: "lab",
    title: "REST API Project",
    functionalityScore: 85,
    codeQualityScore: 90,
};
console.log(`Quiz grade: ${(0, assessment_model_1.calculateGrade)(quiz)}%`);
console.log(`Lab grade: ${(0, assessment_model_1.calculateGrade)(lab)}%`);
// ─── Enrollment Lifecycle ────────────────────────────────
const pending = {
    status: "PENDING",
    requestedAt: polyfill_1.Temporal.Now.instant(),
    studentId: "STU-001",
    courseId: "CRS-101",
};
const active = {
    status: "ACTIVE",
    startDate: polyfill_1.Temporal.PlainDate.from("2026-09-01"),
    currentGrade: 78,
};
const completed = {
    status: "COMPLETED",
    finalGrade: 91,
    completedAt: polyfill_1.Temporal.Now.instant(),
};
console.log((0, enrollment_model_1.describeEnrollment)(pending));
console.log((0, enrollment_model_1.describeEnrollment)(active));
console.log((0, enrollment_model_1.describeEnrollment)(completed));
// ─── Course Lifecycle ────────────────────────────────────
const webDev = {
    status: "ACTIVE",
    enrolledCount: 28,
    startDate: polyfill_1.Temporal.PlainDate.from("2026-09-01"),
};
const draft = {
    status: "DRAFT",
    createdBy: "Admin",
    createdAt: polyfill_1.Temporal.Now.instant(),
};
console.log((0, course_model_1.describeCourse)(webDev));
console.log((0, course_model_1.describeCourse)(draft));
// ─── API Response Generic ────────────────────────────────
const studentRes = {
    status: "success",
    data: {
        id: "STU-001",
        name: "Dawit Bekele",
        enrollmentDate: polyfill_1.Temporal.Now.instant(),
        gpa: 3.4,
    },
    fetchedAt: polyfill_1.Temporal.Now.instant(),
};
const courseListRes = {
    status: "success",
    data: [
        {
            id: "CRS-101",
            title: "Web Development Fundamentals",
            capacity: 30,
            startDate: polyfill_1.Temporal.PlainDate.from("2026-09-01"),
        },
    ],
    fetchedAt: polyfill_1.Temporal.Now.instant(),
};
const loadingRes = { status: "loading" };
const errorRes = {
    status: "error",
    message: "Not found",
    statusCode: 404,
};
console.log((0, api_response_model_1.renderResponse)(studentRes, (s) => `${s.name} GPA: ${s.gpa ?? "N/A"}`));
console.log((0, api_response_model_1.renderResponse)(courseListRes, (courses) => courses.map((c) => c.title).join(", ")));
console.log((0, api_response_model_1.renderResponse)(loadingRes, () => ""));
console.log((0, api_response_model_1.renderResponse)(errorRes, () => ""));
// ─── Temporal ───────────────────────────────────────────
const approvedAt = polyfill_1.Temporal.Now.instant();
console.log(`\nApproved at (UTC): ${approvedAt}`);
const addisTime = approvedAt.toZonedDateTimeISO("Africa/Addis_Ababa");
const londonTime = approvedAt.toZonedDateTimeISO("Europe/London");
console.log(`Addis:  ${addisTime.toPlainTime()}`);
console.log(`London: ${londonTime.toPlainTime()}`);
const courseStart = polyfill_1.Temporal.PlainDate.from("2026-09-01");
const today = polyfill_1.Temporal.Now.plainDateISO();
const daysUntilStart = today.until(courseStart).total({ unit: "days" });
console.log(`${Math.floor(daysUntilStart)} days until course starts`);
const deadline = polyfill_1.Temporal.PlainDate.from("2026-12-15");
const remaining = today.until(deadline);
console.log(`${Math.floor(remaining.total({ unit: "days" }))} days until assignment is due`);
