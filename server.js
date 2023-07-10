import express from 'express';

const app = express();
const port = 5454;

app.listen(port, () => {
  console.log(`Server has started on port: ${port}`);
})