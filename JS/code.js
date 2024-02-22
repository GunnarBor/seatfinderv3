document.getElementById("login").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    // Check if username and password match the expected values
    if (username === "shawn" && password === "1234") {
      // Redirect to the next page (replace 'next_page.html' with your desired URL)
      window.location.href = "./User/userhome.html";}

    else if (username === "root" && password === "root") {
        // Redirect to the next page (replace 'next_page.html' with your desired URL)
        window.location.href = "./Admin/adminhome.html";} 

    else {
      alert("Incorrect username or password. Please try again.");}});


document.getElementById("findClass").addEventListener("click", function() {
    var content = document.getElementById("classes");

    if (content.style.display === "none") {
        content.style.display = "block";}

    else {
        content.style.display = "none";}});










