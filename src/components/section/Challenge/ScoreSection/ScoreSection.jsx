import "../../../../assets/styles/challenge.css";

const ScoreSection = ({ score, questions }) => (
    <div >
        <h1>{`Your Result:`}</h1>
        <p className="score">{score}</p>
        <p className="scoretext text__desc">{`You answered correctly to ${score} out of ${questions.length} questions.`}</p>
        <section className="shared_wrapper">
            <article className="article--shared">
                <a className="btn__style--shared btn--tweet" target="_blank" rel="noopener noreferrer"><i className="shared--icon fa-brands fa-twitter"></i>Tweet</a>
                <a className="btn__style--shared btn--face" target="_blank" rel="noopener noreferrer"><i className="shared--icon fa-brands fa-facebook"></i>Shared</a>
            </article>

        </section>
    </div >
);

export default ScoreSection;