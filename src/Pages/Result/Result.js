import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Result.css";

const Result = ({ name, score }) => {
  const results = JSON.parse(localStorage.getItem("results") || "[]");

  results.push({ score, name });

  localStorage.setItem("results", JSON.stringify(results));

  const history = useHistory();
  useEffect(() => {
    if (!name) {
      history.push("/");
    }
  }, [name, history]);

  return (
    <div className="result">
      <span className="title">Final Score : {score}</span>
      {results.map((result, index) => (
        <div key={index}>
          <span>{result.name}</span>
          <span>{result.score}</span>
        </div>
      ))}
      <Button
        variant="contained"
        color="secondary"
        size="large"
        style={{ alignSelf: "center", marginTop: 20 }}
        href="/"
      >
        Go to homepage
      </Button>
    </div>
  );
};

export default Result;
