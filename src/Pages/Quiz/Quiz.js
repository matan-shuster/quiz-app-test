import { useState } from "react";

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
  return <div> Quiz</div>;
};

export default Quiz;
