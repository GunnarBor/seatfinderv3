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
function displaySearchResults(results) {
    const resultsDiv = document.getElementById('searchResults');
    if (results.length > 0) {
        results.forEach(function(result) {
            const p = document.createElement('p');
            p.textContent = result;
            resultsDiv.appendChild(p);
        });
    } else {
        resultsDiv.innerHTML = '<p>No results found</p>';
    }
}
