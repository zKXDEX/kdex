import AnswerBox from './AnswerBox';
import "../../../../assets/styles/challenge.css";

const QuestionSection = ({ currentQuestionIndex, questions, handleAnswer, showPercentage, correctAnswerString, progressWidth }) => (
    <section className={`section__challenge section__challenge--animation-enter section_pr${currentQuestionIndex + 1}`} style={{ '--animate-delay': '0.8s' }} key={currentQuestionIndex} >
        <header className="question__index">
            <p className="text__desc">
                <span className="question-text">{`Question ${currentQuestionIndex + 1}`}</span>
                <span className="question-textdesc"> of {questions.length}</span>
            </p>
        </header>
        <div className="section--title">
            <h1 className="font-60" dangerouslySetInnerHTML={{ __html: `${questions[currentQuestionIndex].question}` }}></h1>
        </div>
        <div className="section--answers">
            <div className="content--answers">
                {questions[currentQuestionIndex].allAnswers.map((answer, i) => (
                    <AnswerBox key={`answer-${currentQuestionIndex}-${i}`} answer={answer} i={i} showPercentage={showPercentage} handleAnswer={handleAnswer} correctAnswerString={correctAnswerString} progressWidth={progressWidth} />
                ))}
            </div>
        </div>
    </section>
);

export default QuestionSection;