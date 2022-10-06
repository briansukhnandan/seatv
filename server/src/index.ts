import express from 'express';
import dotenv from 'dotenv';
import { testAPI } from './api/trakt';

const router = express();
const port = 3002;

// Root route
router.get('/', (req, res) => {
  res.send("Why are you here?");
});

router.get('/test', async (req, res) => {
  await testAPI();
});


// Listen on port 3002.
router.listen(port, () => {
  console.log(`server running : http://localhost:${port}`);
});