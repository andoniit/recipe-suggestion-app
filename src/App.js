import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import useTypingEffect from './useTypingEffect';
import { marked } from 'marked';





const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingRecipe, setLoadingRecipe] = useState(false);

  const addIngredient = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  const removeIngredient = (ingredientToRemove) => {
    setIngredients(ingredients.filter(ingredient => ingredient !== ingredientToRemove));
  };

  const getRecipe = async () => {
    try {
      if (ingredients.length === 0) {
        throw new Error('Please add at least one ingredient');
      }

      setLoading(true);
      setLoadingRecipe(true);
      setError('');
      
      const response = await axios.post('http://localhost:5001/api/recipes', { ingredients });
      setRecipe(response.data.recipe);
    } catch (error) {
      console.error('Error fetching recipe:', error.message);
      setError('Error fetching recipe. Please check your ingredients and try again.');
      setRecipe('');
    } finally {
      setLoading(false);
      setLoadingRecipe(false);
    }
  };
  



  return (
    <div className="app">
      <header>
        <h1>Recipe Suggestion App</h1>
      </header>
      <main>
        <div className="container">
          <div className="left-column">
            <div className="input-section">
              <IngredientInput onSubmit={addIngredient} />
              <button 
                onClick={getRecipe} 
                className="get-recipe-button"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Get Recipe'}
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {ingredients.length > 0 && (
              <div className="ingredients-list">
                <h2>Ingredients:</h2>
                <ul>
                  {ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient}
                      <button 
                        onClick={() => removeIngredient(ingredient)}
                        className="remove-button"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="right-column">
            {loadingRecipe ? (
              <p className="loading-message">Loading recipe...</p>
            ) : recipe ? (
              <RecipeDisplay recipe={recipe} />
            ) : (
              !loading && <p className="no-recipe-message">Enter Ingredients To Get the Recipe </p>
            )}
            
          </div>
        </div>
      </main>
      <footer>
        <p>© ANDON</p>
      </footer>
    </div>
  );
};





const IngredientInput = ({ onSubmit }) => {
  const [ingredient, setIngredient] = useState('');

  const handleInputChange = (e) => {
    setIngredient(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ingredient.trim() !== '') {
      onSubmit(ingredient.trim());
      setIngredient('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ingredient-form">
      <input
        type="text"
        placeholder="Add ingredient..."
        value={ingredient}
        onChange={handleInputChange}
        className="input"
      />
      <button type="submit" className="add-button">Add</button>
    </form>
  );
};

const RecipeDisplay = ({ recipe }) => {
  const typedRecipe = useTypingEffect(marked(recipe), 20); 

  return (
    <div className="recipe-display">
      <h2>Recipe:</h2>
      <pre dangerouslySetInnerHTML={{ __html: typedRecipe }} /> {/* Use <pre> to preserve formatting */}
    </div>
  );
};


export default App;