const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const listRouter = require('./routers/list');
const masterItemRouter = require('./routers/masterItems');

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(listRouter);
app.use(masterItemRouter);

app.listen(3000, () => {
  console.log('Server running!');
});

