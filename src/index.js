const express = require('express');
const cors = require('cors');

require('./db/mongoose');

const userRouter = require('./routers/user');
const listRouter = require('./routers/list');
const masterItemRouter = require('./routers/masterItems');
const categoriesRouter = require('./routers/categories');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(listRouter);
app.use(masterItemRouter);
app.use(categoriesRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
