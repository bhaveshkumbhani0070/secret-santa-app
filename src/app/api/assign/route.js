import { NextRequest, NextResponse } from "next/server";
import {
  parseEmployeeCSV,
  parseAssignmentCSV,
  generateAssignmentCSV,
} from "@/app/lib/csv";
import { SecretSantaAssigner } from "@/app/lib/assigner";

export async function POST(req) {
  const formData = await req.formData();

  const currentFile = formData.get("current");
  const previousFile = formData.get("previous") || null;

  const currentCSV = await currentFile.text();
  const previousCSV = previousFile ? await previousFile.text() : "";

  try {
    const employees = parseEmployeeCSV(currentCSV);
    const prevAssignments = previousCSV ? parseAssignmentCSV(previousCSV) : [];

    const assigner = new SecretSantaAssigner(employees, prevAssignments);
    const assignments = assigner.assign();

    const csv = generateAssignmentCSV(assignments);
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="secret-santa-result.csv"',
      },
    });
  } catch (error) {
    return new NextResponse(error.message || "Assignment failed", {
      status: 500,
    });
  }
}
