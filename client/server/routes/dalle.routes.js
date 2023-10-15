import express from 'express';
import { OpenAIApi } from 'openai';

const router = express.Router();
const openai = new OpenAIApi();

// Initialize OpenAI client and set API key
openai.apiKey = process.env.OPEN_API_KEY;

router.get('/', (req, res) => {
  res.json({ message: 'Hello from the DALL-E API route!' });
});

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b_64json'
    });

    const image = response.data.data[0].b64_json;

    res.json({ photo: image });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;
