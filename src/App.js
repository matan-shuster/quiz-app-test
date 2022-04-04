import './App.css';
import axios from 'axios';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './Pages/Home/Home';
import Quiz from "./Pages/Quiz/Quiz";
import Result from "./Pages/Result/Result";
import {useState} from "react";
function App() {
    const[name, setName] = useState('');
    const[questions,setQuestions] = useState();
    const[score,setScore] = useState(0);

    const fetchQuestions = async(category = "", difficulty = "") => {
        const { data } = await axios.get(
            `https://opentdb.com/api.php?amount=10${
                category && `&category=${category}`
            }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
        );

        console.log("abcd",data);
        console.log("abcdef",data.results);
        setQuestions(data.results);
    };
  return (
      <BrowserRouter>
      <div className="App" style={{backgroundImage:"url(./a.png"}}>
      <Header/>
          <Switch>
        <Route exact path="/">
            <Home
                name ={name}
                setName={setName}
                fetchQuestions={fetchQuestions}
            />
        </Route>
        <Route exact path="/quiz">
            {questions&&<Quiz
                name={name}
                questions={questions}
                setScore={setScore}
                score={score}
                setQuestions={setQuestions}
            />}
        </Route>
        <Route exact path="/result" >
            <Result/>
        </Route>
          </Switch>

      </div>
          <Footer/>
      </BrowserRouter>

);
}

export default App;
