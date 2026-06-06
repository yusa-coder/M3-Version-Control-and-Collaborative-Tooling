"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.describeCourse = describeCourse;
function describeCourse(status) {
    switch (status.status) {
        case "DRAFT":
            return `Draft — created by ${status.createdBy} at ${status.createdAt}`;
        case "PUBLISHED":
            return `Published — syllabus: ${status.syllabus}`;
        case "ACTIVE":
            return `Active with ${status.enrolledCount} students since ${status.startDate}`;
        case "ARCHIVED":
            return `Archived — final enrollment: ${status.finalEnrollmentCount}`;
        case "CANCELLED":
            return `Cancelled: ${status.reason}`;
    }
    const _exhaustive = status;
    throw new Error(`Unhandled course status: ${JSON.stringify(_exhaustive)}`);
}
