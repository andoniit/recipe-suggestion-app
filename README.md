
# Recipe Suggestion App

This is a recipe suggestion app that allows users to input ingredients and receive recipe suggestions. The app features a React frontend and a backend server running on Express.js that interacts with the OpenAI API to fetch recipe suggestions.

## Features

- **Ingredient Input:** Add and remove ingredients.
- **Recipe Display:** Display suggested recipes with a typing effect.
- **Responsive Design:** Mobile-friendly interface.

## Tech Stack

- **Frontend:** React, Axios
- **Backend:** Node.js, Express.js, OpenAI API
- **Styling:** CSS

## Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd recipe-suggestion-app
   ```

2. **Install frontend dependencies:**
   ```sh
   cd frontend
   npm install
   ```

3. **Install backend dependencies:**
   ```sh
   cd ../backend
   npm install
   ```

4. **Create a `.env` file in the backend directory:**
   ```env
   OPENAI_API_KEY=your_openai_api_key
   ```

## Running the App

1. **Start the backend server:**
   ```sh
   cd backend
   node index.js
   ```
   The backend server will run on `http://localhost:5001`.

2. **Start the frontend development server:**
   ```sh
   cd ../frontend
   npm start
   ```
   The frontend server will run on `http://localhost:3000`.

## Usage

1. Open the app in your browser at `http://localhost:3000`.
2. Add ingredients using the input field and the "Add" button.
3. Click the "Get Recipe" button to fetch a recipe suggestion.
4. Use the "Play" and "Pause" buttons to listen to the recipe.

## Project Structure

```
recipe-suggestion-app
├── backend
│   ├── node_modules
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── ...
├── frontend
│   ├── node_modules
│   ├── public
│   ├── src
│   │   ├── App.js
│   │   ├── App.css
│   │   └── ...
│   ├── .gitignore
│   ├── package.json
│   └── ...
└── README.md
```

## Contributing

Feel free to open issues or submit pull requests for improvements and bug fixes.

