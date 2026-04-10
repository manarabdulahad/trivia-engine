CSI 3150: Final Project - Trivia Quiz Game
Name: Manar Abdulahad

Live Site: https://trivia-engine-nu.vercel.app 

Project Overview
This is my final project for CSI 3150. I built a trivia game that uses an API to get questions. The goal was to make a game that is fun to play but also challenging because of a timer. I used React to build it and handled all the styling with regular CSS.

Main Features
Quiz Settings: You can choose a category (like Sports or Film) and difficulty before starting. This data comes from the Open Trivia DB API.

15-Second Timer: I used setInterval to create a countdown. If you don't answer in time, it moves to the next question and you don't get points.

Random Answers: I used the Fisher-Yates shuffle algorithm to make sure the correct answer isn't always in the same spot.

Scoreboard: I used localStorage so that the top 5 scores stay saved on the computer even if you refresh the page.

Animations: I added a "Shake" effect if you get a question wrong and a "Green Flash" if you get it right. There is also a sound effect for correct answers.

How I Built It
React Hooks: I used useState for things like the score and timer, and useEffect to fetch the questions from the API and handle the timer cleanup.

Components:

App.js: Controls which screen you see (Start, Quiz, or Results).

StartScreen.js: Shows the options and the high scores.

Quiz.js: This is where the main game happens (API, Timer, and Shuffling).

Results.js: Shows your final score and saves it to the list.

