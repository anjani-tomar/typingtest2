
import React, { useEffect, useState } from 'react';
import { alphabet } from '../assets';
import ProgressBar from './ProgressBar';
import TryAgainPopup from './TryAgainPopup';
import './style.css';

const Hero = () => {

    const passages = [
        `He was born in the Shivneri Fort in Maharashtra probably on 19 February 1630. He is named after a local goddess, Shivai Devi. Shivaji is one of the revered historical 
        figures of Maharashtra. He created an independent and sovereign state in the Maharashtra region.`,

        `It is a passionate game of India played with a bat and a ball. There are two teams the cricket, each of them having 11 players. It is played for a very common aim of getting
         maximum scores and number of runs by both teams. The team wins and gets a higher score at the end of the match.`,

        `India rewrote history a piece of which they had first scripted 28 years ago in June 1983. Mahendra Singh Dhoni thus joined Kapil Dev as a Cup winning captain and led from
         the front at the Bankhead Stadium, Mumbai on a muggy Saturday night battling back pains and aching lets as India eased to a six wicket victory over Sri Lanka with 10 balls to spare.`,

        `Football is known to be the world's most popular game. It is not only played between two different nations from around the world but also in our localities. It is also one
         of the most loved games. One speciality about the game is the enthusiasm of the players and viewers and the element of suspense that keeps everyone on the edge
          of their seats till the end of the game.`,
          
        `Animals play an essential role in human life and planet earth. Ever since an early time, humans have been using animals for their benefit. Earlier, they came in use for
         transportation purposes. Further, they also come in use for food, hunting and protection.`,
    ];
    const [passageIndex, setPassageIndex] = useState(0);
    const [start, setStart] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [words, setWords] = useState(0);
    const [chars, setChars] = useState(0);
    const [showTryAgainPopup, setShowTryAgainPopup] = useState(false);
    const [typedChars, setTypedChars] = useState([]);

    const countWords = (input) => {
        const wordsArray = input.trim().split(/\s+/);
        return wordsArray.filter(word => word !== "").length;
    };

    const countCharacters = (input) => {
        return input.replace(/\s/g, "").length;
    };

    const handleInputChange = (e) => {
        const { value } = e.target;
        setUserInput(value);
        setWords(countWords(value));
        setChars(countCharacters(value));
        const typed = value.split('');
        setTypedChars(typed);
    };

    const calculateAccuracy = () => {
        if (!passages[passageIndex] || !userInput) return 0;
        let correctCharacters = 0;
        for (let i = 0; i < userInput.length; i++) {
            if (userInput[i] === passages[passageIndex][i]) {
                correctCharacters++;
            }
        }
        return Math.round((correctCharacters / passages[passageIndex].length) * 100);
    };

    const startBtn = () => {
        setStart(true);
    };

    const getRandomPassage = () => {
        const randomIndex = Math.floor(Math.random() * passages.length);
        setPassageIndex(randomIndex);
    };

    const handleTryAgain = () => {
        getRandomPassage();
        setShowTryAgainPopup(false);
        setUserInput("");
        setTypedChars([]);
    };

    useEffect(() => {
        getRandomPassage();
    }, // eslint-disable-next-line
    []);

    return (
        <section className="">
            <div className="text-center lg:ml-52 lg:mr-52 rounded-sm md:ml-24 sm:ml-4 sm:mr-4 md:mr-24 mt-12 sm:mt-5 text-black bg-white sm:p-8 p-14">
                <img src={alphabet} alt="" className="absolute top-0 left-0 -z-10 w-[100%] h-[100%] object-cover" />
                <p>TYPING SPEED TEST</p>
                <h1 className="lg:text-6xl sm:text-4xl md:text-5xl font-bold"> Test your typing skills</h1>
                <div className="flex text-center justify-evenly mt-10 mb-7">
                    <ProgressBar
                        startCountdown={start}
                        onCountdownEnd={() => setShowTryAgainPopup(true)}
                    />

                    <div>
                        <div className="text-4xl mb-1 rounded-2xl h-20 w-20 font-bold bg-white text-black sm:p-2 lg:p-4">{words}</div>
                        <div>Words/min</div>
                    </div>
                    <div>
                        <div className="text-4xl mb-1 rounded-2xl h-20 w-20 font-bold bg-white text-black sm:p-2 lg:p-4">{chars}</div>
                        <div>Char/min</div>
                    </div>
                    <div>
                        <div className="text-4xl mb-1 rounded-2xl h-20 w-20 font-bold bg-white text-black sm:p-2 lg:p-4">{calculateAccuracy()}</div>
                        <div>% Accuracy</div>
                    </div>
                </div>
                <button
                    onClick={startBtn}
                    className="bg-gradient-to-r from-yellow-300 via-orange-500 to-pink-500 p-4 mr-16 rounded-md text-white font-bold w-32 transition ease-in-out
                                delay-150 hover:-translate-y-1 hover:scale-110  duration-150 "
                >
                    Start
                </button>

                <div className="text-center text-2xl rounded-2xl lg:mt-20 sm:mt-5 text-black bg-gray-100 shadow-2xl shadow-zinc-300 sm:p-8 lg:p-16 overflow-hidden">
                    <div className="text-left">
                        {passages[passageIndex].split('').map((char, index) => (
                            <span key={index} className={typedChars[index] === char ? 'text-correct' : 'text-incorrect'}>
                                {char}
                            </span>
                        ))}
                    </div>
                    <input
                        className="text-center lg:w-[100%] rounded-2xl lg:mt-12 sm:mt-5 text-black bg-gray-100 shadow-2xl shadow-zinc-300 sm:p-8 lg:p-16 overflow-hidden outline-transparent"
                        type="text"
                        value={userInput}
                        onChange={handleInputChange}
                        placeholder="Start typing..."
                        onClick={startBtn}
                        disabled={showTryAgainPopup}
                    />
                </div>
            </div>
            {showTryAgainPopup && <TryAgainPopup onTryAgain={handleTryAgain} />}
        </section>
    );
};

export default Hero;
