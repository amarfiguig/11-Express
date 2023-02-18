// Require the express router module
const router = require('express').Router();

// Import the routes defined in the notesRoutes.js file
const notesRoutes = require('../apiRoutes/notesRoutes');

// Register the notesRoutes middleware with the router, so that all requests to /api/notes will be handled by this route
router.use(notesRoutes);

// Export the router object so that it can be used by the rest of the application
module.exports = router;
