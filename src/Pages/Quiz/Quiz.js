import {useEffect,useState} from "react";

const Quiz = (name,questions,setScore,score,setQuestions) => {
    const[options,setOptions] = useState();
    const[currQues,setCurrQues] = useState(0);

    useEffect((questions)=> {
        console.log(questions);
        if(!questions) return;
        console.log("abcdsadfaf",questions);
        setOptions(questions
            && handleShuffle(
                [questions[currQues]?.correct_answer,
                    ...questions[currQues]?.incorrect_answers]));
    },[questions]);

    const handleShuffle = (option) => {
        return option.sort(() => Math.random() - 0.5);
    }
    return <div> Quiz</div>;
};

export default Quiz;