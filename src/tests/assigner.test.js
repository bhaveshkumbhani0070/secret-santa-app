const { SecretSantaAssigner } = require("../src/lib/assigner");

const employees = [
  { name: "Alice", email: "alice@example.com" },
  { name: "Bob", email: "bob@example.com" },
  { name: "Charlie", email: "charlie@example.com" },
];

test("assigns unique children", () => {
  const assigner = new SecretSantaAssigner(employees);
  const result = assigner.assign();

  expect(result).toHaveLength(employees.length);
  const childEmails = new Set(result.map((a) => a.child.email));
  expect(childEmails.size).toBe(employees.length);
  for (const a of result) {
    expect(a.santa.email).not.toBe(a.child.email);
  }
});
