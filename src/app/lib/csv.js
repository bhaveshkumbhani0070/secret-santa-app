import Papa from "papaparse";

export function parseEmployeeCSV(csvData) {
  const parsed = Papa.parse(csvData.trim(), {
    header: true,
    skipEmptyLines: true,
  });
  return parsed.data.map((row) => ({
    name: row["Employee_Name"],
    email: row["Employee_EmailID"],
  }));
}

// Parse assignment CSV (previous year)
export function parseAssignmentCSV(csvData) {
  const parsed = Papa.parse(csvData.trim(), {
    header: true,
    skipEmptyLines: true,
  });
  return parsed.data.map((row) => ({
    santa: { name: row["Employee_Name"], email: row["Employee_EmailID"] },
    child: {
      name: row["Secret_Child_Name"],
      email: row["Secret_Child_EmailID"],
    },
  }));
}

// Generate the output CSV
export function generateAssignmentCSV(assignments) {
  const data = assignments.map((a) => ({
    Employee_Name: a.santa.name,
    Employee_EmailID: a.santa.email,
    Secret_Child_Name: a.child.name,
    Secret_Child_EmailID: a.child.email,
  }));
  return Papa.unparse(data);
}
