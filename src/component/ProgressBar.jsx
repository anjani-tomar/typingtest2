import React, { useEffect, useState } from 'react';

const ProgressBar = ({ startCountdown, onCountdownEnd }) => {
    const [seconds, setSeconds] = useState(60);

    useEffect(() => {
        let interval;
        if (startCountdown) {
            interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(prevSeconds => prevSeconds - 1);
                } else {
                    clearInterval(interval);
                    if (onCountdownEnd) {
                        onCountdownEnd();
                    }
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, // eslint-disable-next-line
    [startCountdown, seconds]);

    const calculateProgress = (current, total) => {
        return (1 - current / total) * 100;
    };

    return (
        <div className="">
            <div className="progess-group bg-white rounded-full flex justify-center items-center p-4 relative overflow-hidden ">
                <div className="circular-progress w-[105px] h-[105px] border rounded-full flex justify-center items-center relative">
                    <div className="absolute w-full h-full">
                        <div
                            className={`progress-bar absolute w-full h-full rounded-full `}
                            style={{
                                backgroundImage: `conic-gradient(orange ${calculateProgress(seconds, 60)}%, #fff ${calculateProgress(seconds, 60)}%)`
                            }}
                        ></div>
                    </div>
                    <div className="bg-white rounded-full h-24 w-24 text-center absolute">
                        <div className="p-4">
                            <span className="course-value text-3xl font-bold text-black">{seconds}</span>
                            <br />
                            <span className="text text-md text-black transform -translate-x-1/2 -translate-y-1/2">
                                Seconds
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
