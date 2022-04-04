import { useState } from "react";
import { CircularProgress } from "@material-ui/core";
import "./quiz.css";
import "../../components/Question/Question.js";
import Question from "../../components/Question/Question";
const handleShuffle = (options) => {
  return options.sort(() => Math.random() - 0.5);
};

const Quiz = ({ name, questions, setScore, score, setQuestions }) => {
  const [currQues, setCurrQues] = useState(0);
  const options = questions
    ? handleShuffle([
        questions[currQues]?.correct_answer,
        ...questions[currQues]?.incorrect_answers,
      ])
    : [];
  console.log("options", options);
  console.log("questions", questions);
  return (
    <div className={"quiz"}>
      <span className="subtitle">Welcome to the quiz- {name}</span>
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
            options={options}
            correct={questions[currQues]?.correct_answer}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
          />
        </>
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
    </div>
  );
};

export default Quiz;
