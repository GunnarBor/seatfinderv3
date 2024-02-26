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

// Function to display search results for users
function displaySearchResults(results) {
    console.log('Results received:', results);

    const resultsDiv = document.getElementById('searchResults');
    if (Array.isArray(results) && results.length > 0) {
        results.forEach(function (user) {
            const p = document.createElement('p');
            // Assuming the order of columns in the database query result
            p.textContent = `Username: ${user[1]} | Password: ${user[2]} | Email: ${user[3]} | Admin: ${user[5] ? 'Yes' : 'No'} | Degree: ${user[6] || 'N/A'}`;
            resultsDiv.appendChild(p);
        });
    } else {
        resultsDiv.innerHTML = '<p>No results found</p>';
    }
}