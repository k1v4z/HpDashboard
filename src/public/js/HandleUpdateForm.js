document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.getElementById("employee-showInfo_update");
    const employeeInfo = document.querySelector(".employee-infor_update");
    const employeeTitle = document.querySelector(".employee-title_update");

    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            employeeInfo.style.display = "flex";
            employeeTitle.style.display = "block";
            employeeInfo.innerHTML = `
            <div class="employee-infor_left-update">
              <label for="HIRE_DATE_FOR_WORKING">Hire date for working:</label>
              <input type="date" id="HIRE_DATE_FOR_WORKING" name="HIRE_DATE_FOR_WORKING" required>
              
              <label for="WORKERS_COMP_CODE">Work comp code:</label>
              <input type="text" id="WORKERS_COMP_CODE" maxlength="10" name="WORKERS_COMP_CODE" required>
              
              <label for="TERMINATION_DATE">Termination day:</label>
              <input type="date" id="TERMINATION_DATE" name="TERMINATION_DATE">
              
              <label for="REHIRE_DATE_FOR_WORKING">Rehire date for working:</label>
              <input type="date" id="REHIRE_DATE_FOR_WORKING" name="REHIRE_DATE_FOR_WORKING">
              
              <label for="LAST_REVIEW_DATE">Last review date:</label>
              <input type="date" id="LAST_REVIEW_DATE" name="LAST_REVIEW_DATE" required>
              
              <label for="employment-status">Employment status:</label>
              <select name="EMPLOYMENT_STATUS" id="employment-status">
                  <option value="Alive">Alive</option>
                  <option value="Quit">Quit</option>
              </select>
              <input type="text" name="EMPLOYMENT_CODE" value="<%= employment.EMPLOYMENT_CODE %>" style="display: none;">
          </div>
          <div class="employee-infor_right-update">
              <label for="PAY_RATE">Pay rate:</label>
              <input type="text" id="PAY_RATE" name="PAY_RATE" required>
              
              <label for="ID_PAY_RATE">Id Pay rate:</label>
              <input type="number" id="ID_PAY_RATE" max="7" name="ID_PAY_RATE" required>
              
              <label for="VACATION_DAYS">Vacation day:</label>
              <input type="number" id="VACATION_DAYS" name="VACATION_DAYS" required>
              
              <label for="PAID_TO_DATE">Paid to date:</label>
              <input type="number" id="PAID_TO_DATE" max="99" name="PAID_TO_DATE" required>
              
              <label for="PAID_LAST_YEAR">Paid last year:</label>
              <input type="number" id="PAID_LAST_YEAR" max="99" name="PAID_LAST_YEAR" required>
              
              <label for="NUMBER_DAY_REQUIREMENT">Number day requirement:</label>
              <input type="number" id="NUMBER_DAY_REQUIREMENT" name="NUMBER_DAY_REQUIREMENT" required>
          </div>
            `;
            fetch(`http://localhost:4080/api/v1/employment-data`)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('HIRE_DATE_FOR_WORKING').value = data.employment.HIRE_DATE_FOR_WORKING || '';
                    document.getElementById('WORKERS_COMP_CODE').value = data.employment.WORKERS_COMP_CODE || '';
                    document.getElementById('TERMINATION_DATE').value = data.employment.TERMINATION_DATE || '';
                    document.getElementById('REHIRE_DATE_FOR_WORKING').value = data.employment.REHIRE_DATE_FOR_WORKING || '';
                    document.getElementById('LAST_REVIEW_DATE').value = data.employment.LAST_REVIEW_DATE || '';

                    document.getElementById('PAY_RATE').value = data.employment['Pay Rate'] || '';
                    document.getElementById('ID_PAY_RATE').value = data.employment['Pay Rates_idPay Rates'] || '';
                    document.getElementById('VACATION_DAYS').value = data.employment['Vacation Days'] || '';
                    document.getElementById('PAID_TO_DATE').value = data.employment['Paid To Date'] || '';
                    document.getElementById('PAID_LAST_YEAR').value = data.employment['Paid Last Year'] || '';
                    document.getElementById('NUMBER_DAY_REQUIREMENT').value = data.employment.NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH || '';

                    const employmentStatusSelect = document.getElementById('employment-status');
                    Array.from(employmentStatusSelect.options).forEach(option => {
                        if (option.value === data.employment.EMPLOYMENT_STATUS.trim()) {
                            option.selected = true;
                        }
                    });
                })
                .catch(error => {
                    console.error('Failed to fetch data:', error);
                });
        } else {
            employeeInfo.innerHTML = ``;
            employeeInfo.style.display = "none";
            employeeTitle.style.display = "none";
        }
    });
});

