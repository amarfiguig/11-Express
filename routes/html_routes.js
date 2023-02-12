var path = require("path");

module.exports = function(app) {
    // HTML GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases the user is shown an HTML page of content
    // ---------------------------------------------------------------------------
  
    app.get("/", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
  
    app.get("/notes", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });



  //   //add css route here
    app.get("/assets/css/styles.css", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/assets/css/styles.css"))
    })


  
  //   // If no matching route is found default to home
    app.get("/assets/js/index.js", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/assets/js/index.js"));
    });
  };