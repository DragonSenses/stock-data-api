import express from 'express';
import cors from 'cors';

const app = express();
const port = 5454;

// MIDDLEWARE
app.use(express.json());
app.use(cors());
// app.use(require('cors')());

// ROUTES

app.listen(port, () => {
  console.log(`Server has started on port: ${port}`);
})