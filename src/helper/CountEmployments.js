const Employee = require("../model/payroll/Employees");
const Employment = require("../model/human/Employment");

let num_Employees = 0;
let num_Employments = 0;

(async () => {
  try {
    const result = await getCounts();
    num_Employees = result.num_Employees;
    num_Employments = result.num_Employments;
  } catch (error) {
    console.error('Error counting:', error);
  }
})();

async function getCounts() {
  try {
    const num_Employees = await Employee.count();
    const num_Employments = await Employment.count();
    return { num_Employees, num_Employments };
  } catch (error) {
    console.error('Error counting:', error);
    throw error; 
  }
}

console.log(num_Employments)

module.exports = { num_Employees, num_Employments };