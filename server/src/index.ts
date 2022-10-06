import express from 'express';

const app = express();
const port = 3002;

// Root route
app.get('/', (req, res) => {
  res.send("Why are you here?");
});

// Listen on port 3002.
app.listen(port, () => {
  console.log(`server running : http://localhost:${port}`);
});