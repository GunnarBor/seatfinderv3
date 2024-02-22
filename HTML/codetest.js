document.getElementById("login").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        }),
    })
    .then(response => {
        if (response.ok) {
            // If you expect a redirect to be handled by the server
            window.location.href = response.url;
            // If you expect a JSON response with a success message
            // return response.json();
        } else {
            // If there's an error, you can handle it here
            return response.json().then(data => {
                throw new Error(data.error);
            });
        }
    })
    .then(data => {
        // Handle the response data if you expect a JSON success message
        console.log(data.message);
    })
    .catch(error => {
        // Handle any errors here
        console.error('Error during login:', error.message);
    });
});
