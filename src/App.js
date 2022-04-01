import './App.css';
import { BrowserRouter} from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Home from './components/Home/Home.js';
import Quiz from './components/Quiz/Quiz.js';
import Result from './components/Result/Result.js';
function App() {
  return (
      <BrowserRouter>
      <div className="App" style={{backgroundImage:"url(./a.png"}}>
      <Header/>
          <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/quiz" component={Quiz}/>
        <Route exact path="/result" component={Result}/>
              </Switch>
          <Footer/>
      </div>
      </BrowserRouter>

);
};

export default App;
