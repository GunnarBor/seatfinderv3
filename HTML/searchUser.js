document.addEventListener('DOMContentLoaded', function () {
    // Attach an event listener to the form submission
    document.getElementById('searchUser').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the form from submitting normally

        // Clear previous results
        document.getElementById('searchResults').innerHTML = '';

        // Get the search input
        const searchTerm = document.querySelector('#searchUser input[type="text"]').value;

        // Placeholder for search logic - replace this with actual search logic
        searchUserDatabase(searchTerm); // Implement this function based on your application
    });
});

// Placeholder for a function that searches your database or data structure
// Function to perform AJAX request to Flask backend for user search
function searchUserDatabase(query) {
    fetch(`/searchUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: query,
        }),
    })
        .then(response => response.json())
        .then(data => {
            // Display the results
            console.log('Data received from server:', data);
            displaySearchResults(data);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('searchResults').innerHTML = '<p>Error fetching results</p>';
        });
}


// Function to display search results for users in a table
function displaySearchResults(results) {
    console.log('Results received:', results);

    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (Array.isArray(results) && results.length > 0) {
        const table = document.createElement('table');

        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['Username', 'Password', 'Email', 'Admin', 'Degree', 'Action'].forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');
        results.forEach(user => {
            const row = document.createElement('tr');
            [1, 2, 3, 5, 6].forEach(index => {
                const cell = document.createElement('td');

                // Check if the value is 1 or 0 and display accordingly
                if (index === 5) {
                    cell.textContent = user[index] === 1 ? 'YES' : 'NO';
                } else {
                    cell.textContent = user[index] !== null ? user[index] : 'N/A';
                }

                row.appendChild(cell);
            });

            // Create a button for the "Action" column
            const actionCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => handleDeleteUser(user[0])); // Assuming user ID is at index 0
            actionCell.appendChild(deleteButton);
            row.appendChild(actionCell);

            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        resultsDiv.appendChild(table);
    } else {
        resultsDiv.innerHTML = '<p>No results found</p>';
    }
}

function handleDeleteUser(userId) {
    fetch(`/deleteUser/${userId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Implement any additional logic or UI updates after successful deletion
    })
    .catch(error => {
        console.error('Error:', error);
        // Implement error handling or display an error message
    });
}