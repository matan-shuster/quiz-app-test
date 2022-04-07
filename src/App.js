import "./App.css";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Quiz from "./Pages/Quiz/Quiz";
import Result from "./Pages/Result/Result";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);
  const updateQuestions = (questions) => {
    setQuestions(questions);
  };

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=11&category=${category}&difficulty=${difficulty}&type=multiple`
    );

    setQuestions(data.results);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Switch>
          <Route exact path="/">
            <Home
              name={name}
              setName={setName}
              fetchQuestions={fetchQuestions}
            />
          </Route>
          <Route exact path="/quiz">
            {questions && (
              <Quiz
                name={name}
                questions={questions}
                setScore={setScore}
                score={score}
                setQuestions={updateQuestions}
              />
            )}
          </Route>
          <Route exact path="/result">
            <Result name={name} score={score} />
          </Route>
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
