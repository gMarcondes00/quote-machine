import React,{useState, useEffect} from "react";
import axios from 'axios';
import COLORS from './Color.js'
import './App.scss';


function App () {
    const [quote, setQuote] = useState([]);
    const [author, setAuthor] = useState([]);
    const [objArray, setObjArray] = useState(null)
    const [color, setColor] = useState('#282c34');
    

    useEffect(()=>{
        axios.get("https://type.fit/api/quotes")
            .then(res =>{
                setObjArray(res.data);
            })
            .catch(err => {
                console.log(err);
            })
            
    }, [])
    
    const handleClick = () => {
        let randomNum = Math.floor(Math.random() * objArray.length);
        setAuthor(objArray[randomNum].author);
        setQuote(objArray[randomNum].text);
        
        let randomColor = Math.floor(Math.random() * COLORS.length);
        setColor(COLORS[randomColor]);
    }
    

    return(
        <div className = "App">
            <header className="App-header" style={{backgroundColor: color}}>
                <div id="quote-box" className="container">
                    <h1 id="text" style={{color: color}}>{quote}</h1>
                    <p id="author" style={{color: color}}>{author}</p>
                    <a style={{color: color}} id="tweet-quote"  href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} - ${author}`)} target="_blank" rel="noreferrer"> Tweet </a>
                    <button id="new-quote" className="btn btn-primary" type="button" onClick={handleClick} style={{backgroundColor: color}}>new Quote</button>
                </div>
            </header>
        </div>
    )
}

export default App;