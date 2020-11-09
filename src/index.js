const express = require('express');

require('./db/mongoose');

// const path = require('path');

const app = express();

app.listen(3000, () => {
  console.log('Server running!');
});

