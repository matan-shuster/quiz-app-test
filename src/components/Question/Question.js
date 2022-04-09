import { Button, Popover, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Question.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import party from "party-js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Question = ({
  currQues,
  setCurrQues,
  questions,
  correct,
  setScore,
  score,
  setQuestions,
  counter,
  setCounter,
}) => {
  /*
  Set audio to play when correct and incorrect answer
  monday logo confetti
   */
  let correctAudio = new Audio("correct.mp3");
  let incorrectAudio = new Audio("incorrect.mp3");
  const playCorrect = () => {
    correctAudio.play();
  };
  const playIncorrect = () => {
    incorrectAudio.play();
  };
  party.resolvableShapes["monday"] = `<img src="monday.png"/>`;

  const [usedFriend, setUsedFriend] = useState(false);
  const [friend, setFriend] = useState("");
  const [isHidden, setIsHidden] = useState([]);
  const [open, setOpen] = useState(false);
  const [usedTimer, setUsedTimer] = useState(false);
  const [skip, setSkip] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [error, setError] = useState("");
  const [options, setOptions] = useState([]);
  const history = useHistory();

  /*
  Handle open and close for dialog prompt for friend
   */
  const handleOpenDialog = () => {
    callFriend();
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
/*
  function to call friend. 25% he will provide the correct answer
 */
  const callFriend = () => {
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
    setUsedFriend(true);
  };

  /*
  function to hide options when using 50/50
   */
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

  /*
  function to move to next question
   */
  const skipQuestion = () => {
    handleNext()
    setSkip(true);
  };
  /*
  function to reset the timer
   */
  const resetTimer = () => {
    setCounter(60);
    setUsedTimer(true);
  };

  /*
  function to shuffle the answer options based on random number
   */
  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

/*
function to shuffle the answer options everytime the current question changes
 */
  useEffect(() => {
    if (questions) {
      const options = handleShuffle([
        questions[currQues]?.correct_answer,
        ...questions[currQues]?.incorrect_answers,
      ]);
      setOptions(options);
    }
  }, [currQues]);

  /*
  function to handle the selection of an answer and add the relevant CSS
   */
  const handleSelect = (i) => {
    if (selected === i && selected === correct) {
      return "select";
    } else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  /*
  function to check if the answer is correct or not
   */
  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) {
      playCorrect();
      setScore(score + 300 * counter),
        party.confetti(document.body, {
          shapes: ["monday"],
          count: party.variation.range(0, 100),
          size: party.variation.range(0.6, 1.4),
        });
      setError("");
    } else {
      playIncorrect();
    }
  };

  /*
  function to handle the next question and reset the selected answer
   */
  const handleNext = () => {
    if (currQues >= questions.length - 1) {
      party.confetti(document.body, {
        shapes: ["monday"],
        count: 200,
        size: party.variation.range(0.6, 1.4),
      });
      history.push("/result");
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected(-1);
    } else setError("Please select an option first");
  };

  /*
  function to Quit and go back to home page
   */
  const handleQuit = () => {
    setCurrQues(0);
    setQuestions();
  };

  /*
  function to check if the timer is 0 and if it is then move to next question
   */
  useEffect(() => {
    if (counter == 0) {
      setSelected(-1);
      setCurrQues(currQues + 1);
    }
  }, [counter]);

  /*
  replace html entities with correct string
   */
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
            options.map((option) => (
              <button
                className={`singleOption  ${
                  selected !== -1 ? handleSelect(option) : ""
                }`}
                key={option}
                onClick={() => handleCheck(option)}
                disabled={
                  selected !== -1 ||
                  isHidden.find((hOption) => hOption === option)
                }
              >
                {entitiesHtml(option)}
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
            {currQues >= questions.length - 1 ? "Submit" : "Next Question"}
          </Button>
        </div>
      </div>
      <div className={"helpers"}>
        <Button
          variant="contained"
          color="default"
          size="large"
          style={{ width: 185 }}
          onClick={() => handleOpenDialog()}
          disabled={usedFriend}
        >
          Call a friend
        </Button>
        <Dialog
          open={open}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Bestie"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {friend}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>close</Button>
          </DialogActions>
        </Dialog>
        <Button
          variant="contained"
          color="default"
          size="large"
          style={{ width: 185 }}
          onClick={hiddenHandler}
          disabled={isHidden.length !== 0}
        >
          50/50
        </Button>
        <Button
          variant="contained"
          color="default"
          size="large"
          style={{ width: 185 }}
          onClick={skipQuestion}
          disabled={skip}
        >
          Skip Question
        </Button>
        <Button
          variant="contained"
          color="default"
          size="large"
          style={{ width: 185 }}
          onClick={resetTimer}
          disabled={usedTimer}
        >
          reset timer
        </Button>
      </div>
    </div>
  );
};

export default Question;
