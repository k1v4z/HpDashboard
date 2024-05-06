function validName(input) {
    const inputValue = input.value
    //only character is accepted
    const formatName = inputValue.replace(/[^A-Za-z]/g, '');

    input.value = formatName
}

function validBirthDay(input) {
    const inputValue = input.value
    const date = new Date(inputValue).getUTCFullYear()
    const now = new Date().getUTCFullYear()

    //Only personal greater than 18 years old is accepted
    if(now - date < 18){
        alert('only personal greater than 18 years old is accepted')
        input.value = 'dd/mm/yy'
    }
}

function validSSN(input) {
    let inputValue = input.value;

    // Remove non-numeric characters using a regular expression
    let cleanedValue = inputValue.replace(/\D/g, '');

    // Insert hyphens at the appropriate positions
    let formattedValue = '';
    for (let i = 0; i < cleanedValue.length; i++) {
        if (i === 3 || i === 5) {
            formattedValue += '-';
        }
        formattedValue += cleanedValue[i];
    }

    formattedValue = formattedValue.substring(0, 11)
    // Update the input field with the formatted value
    input.value = formattedValue;
}

function validPhoneNumber(input){
    let inputValue = input.value

    let formatValue = inputValue.replace(/[^0-9]/g, "")

    let formattedValue = ''
    for (let i = 0; i < formatValue.length; i++) {
        if (i === 3 || i === 6) {
            formattedValue += '-';
        }
        formattedValue += formatValue[i];
    }

    formattedValue = formattedValue.substring(0,12)

    input.value = formattedValue
}

document.getElementById("DL_INPUT").addEventListener("input", function (event) {
    let inputValue = event.target.value;
    // Allow only "DL_" at the beginning
    if (!inputValue.startsWith("DL_")) {
        event.target.value = "DL_";
        return;
    }

    // Remove any non-digit characters
    let cleanedValue = inputValue.replace(/\D/g, '');

    // Limit to 6 digits after "DL_"
    cleanedValue = cleanedValue.substring(0, 6);

    // Update the input field with the cleaned value
    event.target.value = "DL_" + cleanedValue;
});

function validTerminationDay(input){
    const inputValue = input.value
    const terminationDay = new Date(inputValue)
    const HIRE_DATE = document.getElementById("HIRE_DATE").value
    const hireDay = new Date(HIRE_DATE)

    //1 day has 24 hours, 1 hour has 60 minutes, 1 minute has 60 seconds, 1 second = 1000 mls
    // => 86400000 = 24 * 60 * 60 * 1000
    //(terminationDay - hireDay) / 86400000 = number of day
    if ((terminationDay - hireDay) / 86400000 < 0){
        alert('Termination day must greater than hire day')
        input.value = 'dd/mm/yy'
        return
    }

    if ((terminationDay - hireDay) / 86400000 < 30){
        alert('Employee have to work at least 1 month')
        input.value = 'dd/mm/yy'
    }
}
