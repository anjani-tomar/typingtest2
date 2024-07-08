
import React from 'react';
import { turtle } from '../assets';

const TryAgainPopup = ({ onTryAgain }) => {
    const handleTryAgain = () => {
        window.location.reload(); 
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-50 p-11">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center ">
                <div className='flex p-10'>
                <div>
                    <img src={turtle} alt=""  className='w-[150px]'/>
                </div>
                <div>
                <p className="text-2xl font-bold mb-4">You Are a Turtle</p>
                <p className="text-xl font-bold mb-4">Time's up!</p>
                <p className="text-lg mb-8">Click below to try again.</p>
                </div>
               </div>
                <button className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 rounded-md text-white font-bold ">
                    <button onClick={handleTryAgain}>Try Again</button>
                    <button onClick={onTryAgain}></button>

                </button>
            </div>
        </div>
    );
};

export default TryAgainPopup;
