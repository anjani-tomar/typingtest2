import React, { useState } from 'react';

const TypingChallenge = () => {
    const [passage, setPassage] = useState(
        `Football is known to be the world's most popular game. It is not only played between two different nations from around the world but also in our localities. It is also one of the
        most loved games.  `,
        
    );
                
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(false);
  const [endTime, setEndTime] = useState(true);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setUserInput(value);
    if (!startTime) {
      setStartTime(Date.now());
    }
    if (value === passage) {
      setEndTime(Date.now());
    }
  };

  const calculateWPM = () => {
    if (!startTime || !endTime) return 0;
    const timeDiffInSeconds = (endTime - startTime) / 1000;
    const words = userInput.split(" ").length;
    const wpm = Math.round((words / timeDiffInSeconds) * 60);
    return wpm;
  };

  const calculateAccuracy = () => {
    if (!passage || !userInput) return 0;
    let correctCharacters = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === passage[i]) {
        correctCharacters++;
      }
    }
    return Math.round((correctCharacters / passage.length) * 100);
  };

  return (
    <div>
      <p>{passage}</p>
      <input
        className='text-center rounded-2xl lg:mt-28 sm:mt-5 text-black bg-gray-100 shadow-2xl shadow-zinc-300 sm:p-8 lg:p-16 overflow-hidden outline-transparent'
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Start typing..."
      />
      
      <p>Words per minute: {calculateWPM()}</p>
      <p>Accuracy: {calculateAccuracy()}%</p>
    </div>
  );
};

export default TypingChallenge;
