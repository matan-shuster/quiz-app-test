import "./Home.css";
import { TextField, Button, MenuItem } from "@material-ui/core";
import Categories from "../../Data/categories.js";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Home = ({ name, setName, fetchQuestions }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category === "" || difficulty === "" || name === "") {
      setError(true);
      return;
    } else {
      setError(false);
      fetchQuestions(category, difficulty);
      history.push("/quiz");
    }
  };

  return (
    <div className="content">
      <div className="settings">
        <span style={{ fontSize: 30 }}>Quiz Settings</span>

        <div className="settings_select">
          {error && <ErrorMessage>Please fill all the fields</ErrorMessage>}
          <TextField
            style={{ marginBottom: 25 }}
            label={"Enter your name"}
            variant={"outlined"}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <TextField
            select
            label={"Select Category"}
            variant={"outlined"}
            style={{ marginBottom: 25 }}
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            {Categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label={"Select Difficulty"}
            variant={"outlined"}
            style={{ marginBottom: 25 }}
            onChange={(e) => setDifficulty(e.target.value)}
            value={difficulty}
          >
            <MenuItem value={"easy"}>Easy</MenuItem>
            <MenuItem value={"medium"}>Medium</MenuItem>
            <MenuItem value={"hard"}>Hard</MenuItem>
          </TextField>
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={handleSubmit}
          >
            Start Quiz
          </Button>
        </div>
      </div>
      <img src="quiz.jpg" className="banner" alt="quiz img" />
    </div>
  );
};

export default Home;
