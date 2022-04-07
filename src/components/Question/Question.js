import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Question.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import party from "party-js";
const Question = ({
  currQues,
  setCurrQues,
  questions,
  correct,
  setScore,
  score,
  setQuestions,
  counter,
}) => {
  const [usedFriend, setUsedFriend] = useState(false);
  const [friend, setFriend] = useState("call a friend");
  const [isHidden, setIsHidden] = useState([]);

  const hiddenHandler = () => {
    const hiddenOptions = [];

    for (let i = 0; i < questions.length; i++) {
      if (hiddenOptions.length === 2) {
        break;
      }

      if (options[i] === questions[currQues].correct_answer) {
        continue;
      }

      hiddenOptions.push(options[i]);
    }

    setIsHidden(hiddenOptions);
  };

  const callFriend = () => {
    setUsedFriend(true);
    const random = Math.floor(Math.random() * 100);
    if (random < 25) {
      setFriend(
        "I think the answer might be " +
          entitiesHtml(questions[currQues].correct_answer)
      );
    } else {
      setFriend(
        "I think the answer might be " +
          entitiesHtml(
            questions[currQues].incorrect_answers[Math.floor(Math.random() * 3)]
          )
      );
    }
  };

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };
  party.resolvableShapes["monday"] = `<img src="monday.png"/>`;

  const [selected, setSelected] = useState(-1);
  const [error, setError] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (questions) {
      const options = handleShuffle([
        questions[currQues]?.correct_answer,
        ...questions[currQues]?.incorrect_answers,
      ]);
      setOptions(options);
    }
  }, [currQues]);

  const history = useHistory();

  const handleSelect = (i) => {
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct)
      setScore(score + 300 * counter),
        party.confetti(document.body, {
          shapes: ["monday"],
          count: party.variation.range(0, 100),
          size: party.variation.range(0.6, 1.4),
        });

    setError("");
  };

  const handleNext = () => {
    if (currQues > 8) {
      history.push("/result");
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected(-1);
    } else setError("Please select an option first");
  };

  const handleQuit = () => {
    setCurrQues(0);
    setQuestions();
  };

  useEffect(() => {
    if (counter == 0) {
      setSelected(-1);
      setCurrQues(currQues + 1);
    }
  }, [counter]);

  const entitiesHtml = (string) => {
    return String(string)
      .replace(/&amp;/g, "&")
      .replace(/&gt;/g, ">")
      .replace(/&lt;/g, "<")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&#x27;/g, "'")
      .replace(/&#x2F;/g, "/")
      .replace(/&Eacute;/g, "É")
      .replace(/&#960;/g, "Ω")
      .replace(/&eacute;/g, "é");
  };

  return (
    <div className="question">
      <h1>Question {currQues + 1} :</h1>
      <div className="singleQuestion">
        <h2>{entitiesHtml(questions[currQues].question)}</h2>
        <div className="options">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {options &&
            options.map((i) => (
              <button
                className={`singleOption  ${
                  selected !== -1 ? handleSelect(i) : ""
                }`}
                key={option}
                onClick={() => handleCheck(option)}
                disabled={
                  selected !== -1 ||
                  isHidden.find((hOption) => hOption === option)
                }
              >
                {entitiesHtml(i)}
              </button>
            ))}
        </div>
        <div className="controls">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            href="/"
            onClick={handleQuit}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
            disabled={selected === -1}
          >
            {currQues >= 9 ? "Submit" : "Next Question"}
          </Button>
        </div>
      </div>
      <div className={"helpers"}>
        <Button
          variant="contained"
          color="default"
          size="large"
          style={{ width: 185 }}
          onClick={() => callFriend()}
          // disabled={usedFriend}
        >
          {friend}
        </Button>
        <Button
          variant="contained"
          color="default"
          size="large"
          style={{ width: 185 }}
          onClick={hiddenHandler}
        >
          50/50
        </Button>
      </div>
    </div>
  );
};

export default Question;
