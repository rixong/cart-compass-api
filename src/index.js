const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const listRouter = require('./routers/list');
const masterItemRouter = require('./routers/masterItems');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(listRouter);
app.use(masterItemRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

