import React, { useEffect, useState } from "react";
import "../../../assets/styles/challenge.css";
import QuestionSection from "./QuestionSection/QuestionSection";
import ScoreSection from "./ScoreSection/ScoreSection";
import { decode } from "html-entities";
import { useMediaQuery } from "react-responsive";


const Challenge = ({ fullpageState }) => {
    const challengeTitle = "CodeMaster Challenge";
    const [canRequest, setCanRequest] = useState(true);
    const fpIndex = fullpageState.origin && fullpageState.origin.index;
    const fpDestination = fullpageState.direction;
    // STATES
    const [firstTime, setfirstTime] = useState(false);
    const [startCount, setStartCount] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [finishStarted, setfinishStarted] = useState(false);

    // QUESTIONS
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showPercentage, setShowPercentage] = useState(false);
    const [percentage, setPercentage] = useState([]);
    const [correctAnswer, setUserAnsweredCorrectly] = useState(null);
    const [correctAnswerString, setCorrectAnswerString] = useState('');
    const [progressWidth, setProgressWidth] = useState([]);
    const [answerPercentages, setAnswerPercentages] = useState({});

    // SCORE
    const [score, setScore] = useState(0);

    // STATE API
    const [state, setState] = useState(false);
    //  

    const animateCont =
        fpDestination === "down" && fpIndex === 2
            ? "animate__fadeInUp animate__delay-3s"
            : fpDestination === "down" && fpIndex === 3
                ? "animate__fadeOutUpBig animate__slower "
                : "";
    const animateContUp =
        fpDestination === "up" && fpIndex === 3
            ? "animate__fadeOutDown"
            : fpDestination === "up" && fpIndex === 4
                ? "animate__fadeInDown animate__delay-1s"
                : "";


    const handleAnswer = (answer) => {
        if (!canRequest) {
            return;
        }
        setCanRequest(false)
        const correctAnswer = questions[currentQuestionIndex].correct_answer;
        const isCorrect = answer === correctAnswer;
        setUserAnsweredCorrectly(isCorrect);
        setCorrectAnswerString(correctAnswer);

        fetch("https://adorable-red-tweed-jacket.cyclic.app/api/trivia", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                answer: answer,
            }),
        })
            .then(async (response) => {
                response.text()
                await fetchAnswerPercentages()
                if (isCorrect) {
                    setScore(prevScore => prevScore + 1);
                }

                let section = document.querySelector(".section__challenge");

                section.classList.remove("section__challenge--animation-enter");
                setTimeout(() => {
                    section.classList.add("section__challenge--animation-exit");
                }, 2000);
                setTimeout(() => {
                    setUserAnsweredCorrectly(null);
                    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                    setCanRequest(true)
                    section.classList.remove("section__challenge--animation-exit");
                    setProgressWidth([]);
                    setShowPercentage(false);
                }, 3000);
            })
            .catch((error) => console.error("Error: ", error));



    };

    useEffect(() => {
        if (showPercentage) {
            const timer = setTimeout(() => {
                setProgressWidth(percentage.map(p => Math.floor(p)));
            }, 15);
            return () => clearTimeout(timer);
        }
    }, [percentage, showPercentage]);

    if ((fullpageState.destination && fullpageState.destination.index === 3 && fullpageState.direction === "down" && !firstTime) || (fullpageState.destination && fullpageState.destination.index === 3 && fullpageState.direction === "up" && !firstTime)) {
        setStartCount(true);
        setfirstTime(true);
    }

    const fetchAnswerPercentages = async () => {
        try {
            const allAnswers = questions[currentQuestionIndex].allAnswers;
            const response = await fetch("https://adorable-red-tweed-jacket.cyclic.app/api/percentage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    answers: allAnswers,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const answers = await response.json();
            const percentagesResponse = Object.values(answers);
            setPercentage(percentagesResponse);
            setShowPercentage(true);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        if (startCount) {
            setTimeout(() => {
                setHasStarted(true);
                setIsAnimating(true);

                setIsAnimating(false);
                setTimeout(() => {
                    setfinishStarted(true);
                }, 1000);
            }, 5000);
        }
    }, [startCount]);

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=9&category=18&type=multiple")
            .then((response) => response.json())
            .then((data) => {
                const updatedQuestions = data.results.map(question => {
                    const allAnswers = [...question.incorrect_answers, question.correct_answer];
                    for (let i = allAnswers.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
                    }
                    return { ...question, allAnswers };
                });
                setQuestions(updatedQuestions);
            })
            .catch((error) => console.log("Error: ", error));
    }, []);

    const breakpoint = useMediaQuery({ query: "(max-width: 992px)" });

    return (
        <main className="challenge_section">
            <section className={`container__challenges ${breakpoint ? '' : 'animate__animated'} ${animateCont} ${animateContUp}`} style={{ '--animate-delay': '0.1s' }}>
                    <div className={`challenge__content`}>
                        {questions.length > 0 && currentQuestionIndex < questions.length ? (
                            <QuestionSection currentQuestionIndex={currentQuestionIndex} questions={questions} handleAnswer={handleAnswer} showPercentage={showPercentage} correctAnswerString={correctAnswerString} progressWidth={progressWidth} />
                        ) : (
                            <ScoreSection score={score} questions={questions} />
                        )}
                    </div>
                </section>
        </main>
    );
};

export default Challenge;