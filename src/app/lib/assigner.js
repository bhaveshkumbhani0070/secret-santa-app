// // src/lib/assigner.js

// // The SecretSantaAssigner class handles the assignment logic.
// export class SecretSantaAssigner {
//   constructor(employees, prevAssignments = []) {
//     this.employees = [...employees];
//     this.prevAssignments = prevAssignments;
//     this.attempts = 100; // Number of attempts to get valid assignments
//   }

//   // Retrieve the child assigned to a given Santa from the previous year
//   getPreviousChild(santa) {
//     const prev = this.prevAssignments.find(
//       (a) => a.santa.email === santa.email
//     );
//     return prev?.child.email;
//   }

//   // The main function to assign secret children
//   assign() {
//     for (let i = 0; i < this.attempts; i++) {
//       const shuffled = this.shuffle([...this.employees]);
//       const result = [];

//       let valid = true;
//       for (let j = 0; j < this.employees.length; j++) {
//         const santa = this.employees[j];
//         const child = shuffled[j];

//         if (
//           santa.email === child.email ||
//           this.getPreviousChild(santa) === child.email
//         ) {
//           valid = false;
//           break;
//         }

//         result.push({ santa, child });
//       }

//       if (valid) return result;
//     }

//     throw new Error("Unable to generate valid Secret Santa assignments");
//   }

//   // Shuffle the employees list to assign randomly
//   shuffle(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   }
// }

export class SecretSantaAssigner {
  constructor(employees, previousAssignments = []) {
    this.employees = employees;
    this.previousMap = this.buildPreviousMap(previousAssignments);
    this.maxAttempts = 1000;
  }

  // Convert previous assignments into a map for quick lookup
  buildPreviousMap(previousAssignments) {
    const map = new Map();
    for (const assignment of previousAssignments) {
      const santaEmail = assignment.santa?.email;
      const childEmail = assignment.child?.email;
      if (santaEmail && childEmail) {
        map.set(santaEmail, childEmail);
      }
    }
    return map;
  }

  // Main method to assign Secret Santa pairings
  assign() {
    const total = this.employees.length;
    for (let attempt = 0; attempt < this.maxAttempts; attempt++) {
      const shuffled = this.shuffle([...this.employees]);
      const assignments = [];
      const usedEmails = new Set();
      let isValid = true;

      for (const santa of this.employees) {
        const possibleChildren = shuffled.filter((child) => {
          return (
            child.email !== santa.email &&
            this.previousMap.get(santa.email) !== child.email &&
            !usedEmails.has(child.email)
          );
        });

        if (possibleChildren.length === 0) {
          isValid = false;
          break;
        }

        const child =
          possibleChildren[Math.floor(Math.random() * possibleChildren.length)];
        usedEmails.add(child.email);
        assignments.push({ santa, child });
      }

      if (isValid && assignments.length === total) {
        return assignments;
      }
    }

    throw new Error(
      "Unable to generate valid Secret Santa assignments after many attempts."
    );
  }

  // Shuffle using Fisher-Yates algorithm
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
