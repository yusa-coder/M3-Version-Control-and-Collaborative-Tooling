import { Temporal } from "@js-temporal/polyfill";

export interface Student {
  readonly id: string;
  name: string;
  enrollmentDate: Temporal.Instant;
  gpa?: number;
}

export function isStudent(value: unknown): value is Student {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    typeof (value as any).id === "string" &&
    typeof (value as any).name === "string"
  );
}

export function parseStudent(raw: unknown): Student {
  if (typeof raw !== "object" || raw === null) {
    throw new TypeError("Invalid student object");
  }

  const obj = raw as any;

  if (typeof obj.id !== "string") throw new TypeError("Invalid id")
    ;
  if (typeof obj.name !== "string") throw new TypeError("Invalid name");

  return {
    id: obj.id,
    name: obj.name,
    enrollmentDate: Temporal.Now.instant(),
  };
}