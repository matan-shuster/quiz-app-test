import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./Result.css";
import {useEffect, useState} from "react";
const Result = ({ name, score, setScore, setName, setQuestions}) => {

  let endMusic= new Audio("end.mp3");
  
  /*
  Get leaderboard from local storage.
  Add new score to leaderboard.
  Sort leaderboard top10 by score.
   */
    const [top10,setTop10] = useState([]);
  useEffect(() => {
      const results = JSON.parse(localStorage.getItem("results") || "[]");
      results.push({ score, name });
      localStorage.setItem("results", JSON.stringify(results));
      const sorted = results.sort((a, b) => b.score - a.score);
      setTop10(sorted.slice(0, 10));
  }, []);


    const clearStorage = () => {
        localStorage.clear();
        setTop10([]);
    };


    /*
    Reset parameters and go back to home page.
     */
  const history = useHistory();
  const goToHome = () => {
    history.push("/");
    setScore(0);
    setName("");
    setQuestions();
  };

  return (
    <div className="result">
      <span className="finalscore">Final Score : {score}</span>
      <span className={"leaderboard"}>
       <span className={"leaderboardTitle"}>Leaderboard</span>
        <ol>
          {top10.map((result, index) => (
            <li key={index}>
              {result.name} : {result.score}
            </li>
          ))}
        </ol>
      </span>
      <div className="Buttons">
        <Button
          variant="contained"
          color="primary"
          style={{ alignSelf: "center", marginTop: 20 }}
          onClick={goToHome}
        >
          Play Again
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ alignSelf: "center", marginTop: 20, marginLeft: 20 }}
          onClick={clearStorage}
        >
          Clear Results
        </Button>
      </div>
    </div>
  );
};

export default Result;
