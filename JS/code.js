document.getElementById("login").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    // Check if username and password match the expected values
    if (username === "shawn" && password === "1234") {
      // Redirect to the next page (replace 'next_page.html' with your desired URL)
      window.location.href = "./User/userhome.html";
    } else {
      alert("Incorrect username or password. Please try again.");
    }
  });