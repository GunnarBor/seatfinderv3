document.addEventListener('DOMContentLoaded', function() {
    // Attach an event listener to the form submission
    document.getElementById('search').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the form from submitting normally

        // Clear previous results
        document.getElementById('searchResults').innerHTML = '';

        // Get the search input
        const searchTerm = document.querySelector('#search input[type="text"]').value;

        // Placeholder for search logic - replace this with actual search logic
        const results = searchDatabase(searchTerm); // Implement this function based on your application

        // Display the results
        displaySearchResults(results);
    });
});

// Placeholder for a function that searches your database or data structure
// Function to perform AJAX request to Flask backend
function searchDatabase(query) {
    fetch(`/search?query=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
        // Display the results
        displaySearchResults(data);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('searchResults').innerHTML = '<p>Error fetching results</p>';
    });
}


// Function to display search results
// function displaySearchResults(results) {
//     console.log('Results received:', results); // Add this line for debugging

//     const resultsDiv = document.getElementById('searchResults');
//     resultsDiv.innerHTML = '';
    
//     if (Array.isArray(results) && results.length > 0) {
//         results.forEach(function(result) {
//             const p = document.createElement('p');
//             // Assuming index 1 is the class_name and index 4 is the seats available
//             p.textContent = `Class: ${result[1]}, Seats Available: ${result[4]}`;
//             resultsDiv.appendChild(p);
//         });
//     } else {
//         resultsDiv.innerHTML = '<p>No results found</p>';
//     }
// }


// Function to display search results and add a 'Get Notified' button next to each result
function displaySearchResults(results) {
    console.log('Results received:', results); // For debugging

    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '';

    if (Array.isArray(results) && results.length > 0) {
        results.forEach(function(result) {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('result');

            // Create paragraph for class info, using indices as per your data structure
            const p = document.createElement('p');
            p.textContent = `Class: ${result[1]}, Seats Available: ${result[4]}`;

            // Create 'Get Notified' button
            const notifyButton = document.createElement('button');
            notifyButton.textContent = 'Get Notified';
            notifyButton.classList.add('notifyButton');
            // Use result[1] for class name in the notification
            notifyButton.addEventListener('click', () => notifyUser(result[1], result[4]));

            // Append paragraph and button to resultDiv
            resultDiv.appendChild(p);
            resultDiv.appendChild(notifyButton);

            // Append resultDiv to the results container
            resultsDiv.appendChild(resultDiv);
        });
    } else {
        resultsDiv.innerHTML = '<p>No results found</p>';
    }
}

// Function to request permission and show the notification, using the class name and seats available
// function notifyUser(className, seatsAvailable) {
//     // Check if the browser supports notifications
//     if (!("Notification" in window)) {
//         alert("This browser does not support desktop notification");
//     } else if (Notification.permission === "granted") {
//         // If permission was already granted
//         console.log("test");
//         showNotification(className, seatsAvailable);
//     } else if (Notification.permission !== "denied") {
//         // Request permission
//         Notification.requestPermission().then(permission => {
//             if (permission === "granted") {
//                 showNotification(className, seatsAvailable);
//             } else {
//                 alert("Notification permission was denied.");
//             }
//         });
//     }
// }

// function showNotification(className, seatsAvailable) {
//     new Notification(`Notification for ${className}`, {
//         body: `${className} has ${seatsAvailable} seats available.`,
//         // Optional: icon: '/path/to/icon.png'
//     });
// }

function notifyUser(className, seatsAvailable) {
    // Display the modal
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    const modalText = document.getElementById("modalText");

    modalText.textContent = `You have signed up to receive open seat notifications!`;
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Also close the modal if the user clicks anywhere outside of it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


