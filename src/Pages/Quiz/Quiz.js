import {useEffect,useState} from "react";

const Quiz = (name,questions,setScore,score,setQuestions) => {
    const[options,setOptions] = useState();
    const[currQues,setCurrQues] = useState(0);
    useEffect(()=> {
        console.log(questions);
    },[questions]);
    const handleShuffle = (option) => {
        return option.sort(() => Math.random() - 0.5);
    }
    return <div> Quiz</div>;
};

export default Quiz;