// Footer.js
import React, { useState } from "react";

const quotes = [
  "Age is just a number.",
  "As with wine, life gets better with age.",
  "Growing old is inevitable, but growing up is optional.",
  "I’ve got 99 problems, but age ain’t one.",
  "Not just a year older — a year better!",
  "Old enough to retire; young enough to enjoy it.",
  "One gets more from years of experience than books.",
  "Respect old age; it’s your future!",
  "The older the fiddle, the sweeter the tune.",
  "The only thing that comes to you without effort is old age.",
  "There’s no age limit on life.",
  "These are the golden years!",
  "Wherever life takes you, go with all your heart.",
  "You’re never too old for anything.",
  "You’re only as old as you feel.",
];

const Footer = () => {
  const [randomQuote, setRandomQuote] = useState(getRandomQuote());

  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

  const handleRandomQuoteClick = () => {
    setRandomQuote(getRandomQuote());
  };

  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p className="text-lg">{randomQuote}</p>
      <button
        className="mt-2 px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:border-blue-300"
        onClick={handleRandomQuoteClick}
      >
        Get Another Quote
      </button>
    </footer>
  );
};

export default Footer;
