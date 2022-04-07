import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Result.css";
import { setScore } from "../../App";
const Result = ({ name, score }) => {
  const results = JSON.parse(localStorage.getItem("results") || "[]");
  results.push({ score, name });

  localStorage.setItem("results", JSON.stringify(results));
  const top10 = results.sort((a, b) => b.score - a.score).slice(0, 10);
  const history = useHistory();
  useEffect(() => {
    if (!name) {
      history.push("/");
    }
  }, [name, history]);

  const clearStorage = () => {
    localStorage.clear();
  };

  const goToHome = () => {
    history.push("/");
    window.location.reload(false);
  };
  return (
    <div className="result">
      <span className="title">Final Score : {score}</span>
      <div className={"leaderboard"}>
        <span className="title">Leaderboard</span>
        <ol>
          {top10.map((result, index) => (
            <li key={index}>
              {result.name} : {result.score}
            </li>
          ))}
        </ol>
      </div>
      <span className="Buttons">
        <Button
          variant="contained"
          color="primary"
          style={{ alignSelf: "center", marginTop: 20, marginRight: 20 }}
          onClick={goToHome}
        >
          Play Again
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ alignSelf: "center", marginTop: 20 }}
          onClick={clearStorage}
        >
          Clear Results
        </Button>
      </span>
    </div>
  );
};

export default Result;
