import { useEffect, useState, useRef } from "react";
import { CircularProgress, Button } from "@material-ui/core";
import "./quiz.css";
import "../../components/Question/Question.js";
import Question from "../../components/Question/Question";
import { LinearProgressBar } from "monday-ui-react-core";
import "monday-ui-react-core/dist/main.css";
import question from "../../components/Question/Question";
const Quiz = ({ name, questions, setScore, score, setQuestions }) => {
  const [currQues, setCurrQues] = useState(0);
  const [counter, setCounter] = useState(60);

  const timerRef = useRef();

  useEffect(() => {
    if (counter > 0) {
      timerRef.current = setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [counter]);

  useEffect(() => {
    setCounter(60);
  }, [currQues]);

  return (
    <div className={"quiz"}>
      <span className="subtitle">Welcome to the quiz- {name}</span>
      {questions ? (
        <>
          <div className={"quizInfo"}>
            <span>{questions[currQues].category}</span>
            <span>Score: {score}</span>
          </div>
          <LinearProgressBar
            className={"progress-bar"}
            barStyle="negative"
            size="large"
            max={60}
            value={counter}
          />

          <Question
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            correct={questions[currQues]?.correct_answer}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
            counter={counter}
          />
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Quiz;
