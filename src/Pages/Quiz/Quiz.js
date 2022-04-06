import { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import "./quiz.css";
import "../../components/Question/Question.js";
import Question from "../../components/Question/Question";

const Quiz = ({ name, questions, setScore, score, setQuestions }) => {
  const [currQues, setCurrQues] = useState(0);
  const [counter, setCounter] = useState(60);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  useEffect(() => {
    setCounter(60);
  }, [currQues]);

  console.log("questions", questions);
  return (
    <div className={"quiz"}>
      <span className="subtitle">Welcome to the quiz- {name}</span>
      <span className="subtitle">
        You have {counter} seconds to answer the questions{" "}
      </span>
      {questions ? (
        <>
          <div className={"quizInfo"}>
            <span>{questions[currQues].category}</span>
            <span>Score: {score}</span>
          </div>
          <Question
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            correct={questions[currQues]?.correct_answer}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
          />
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Quiz;
