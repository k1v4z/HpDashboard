// document.querySelector('.personal-info').addEventListener('submit', function (event) {
//     event.preventDefault(); // Prevent the default form submission

//     const form = event.target;
//     const formData = new FormData(form);

//     fetch(form.action, {
//         method: 'POST',
//         body: formData
//     })
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
//                 alert(data.message);
//             } else {
//                 alert(data.message);
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('An error occurred!');
//         });
// });
