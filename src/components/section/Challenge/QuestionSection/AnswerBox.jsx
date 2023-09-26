import "../../../../assets/styles/challenge.css";
import { decode } from "html-entities";

const AnswerBox = ({ answer, i, showPercentage, handleAnswer, correctAnswerString, progressWidth }) => (
    <div className={`box pr${i + 1} ${showPercentage ? (answer === correctAnswerString ? 'correct' : 'incorrect') : ''}`} onClick={() => !showPercentage && handleAnswer(answer)}>
        {showPercentage ? (
            <>
                <div className="progress-bar-container">
                    <div className={`progress-bar prP${i}`} style={{ width: `${progressWidth[i]}%` }} />
                    <div className="progress-text">{progressWidth[i]}%</div>
                </div>
            </>
        ) : (
            decode(answer)
        )}
    </div>
);

export default AnswerBox;