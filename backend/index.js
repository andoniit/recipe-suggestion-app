const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/recipes', async (req, res) => {
  const ingredients = req.body.ingredients;

  if (!ingredients || ingredients.length === 0) {
    return res.status(400).send('No ingredients provided');
  }

  try {
    console.log('Received ingredients:', ingredients);

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-turbo',
        messages: [
          { role: 'system', content: `Give me a detailed recipe using the following ingredients: ${ingredients.join(', ')}` }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ADD_UR_KEY_HERE` //Add your Opean Ai API Key here 
        }
      }
    );

    console.log('OpenAI response:', response.data);

    const recipeText = response.data.choices[0].message.content;

    res.json({ recipe: recipeText });
  } catch (error) {
    console.error('Error fetching recipes:', error.response ? error.response.data : error.message);
    res.status(500).send('Error fetching recipes');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});