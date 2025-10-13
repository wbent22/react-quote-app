import React, {useState, useEffect} from 'react' 
import './randomQuote.css'
import x_icon from '../Assets/icons8-x-logo-50.png'
import quote_icon from '../Assets/icons8-again-50.png'

const RandomQuote = () => {
    
    const [quotes, setQuotes] = useState([]);

    const [quote, setQuote] = useState({
            text: "Early to bed and early to rise makes a man healthy wealthy and wise",
            author: "Benjamin Franklin",
        });

        // Load multiple quotes once when the component mounts
    useEffect(() => {
            async function loadQuotes() {
            try {
                // Example API that returns many quotes
                const response = await fetch("https://dummyjson.com/quotes");
                const data = await response.json();
                setQuotes(data.quotes); // data is an array of quotes
            } catch (err) {
                console.error("Failed to fetch quotes:", err);
            }
        }

        loadQuotes();
    }, []);

        // Pick a random quote from the array
    const random = () => {
        if (quotes.length === 0) return; // avoid errors if not loaded yet
        const select = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote({
        text: select.quote,
        author: select.author || "Unknown",
        });
    };

    const twitter = () =>
{
    window.open(`https://x.com/compose/post?text=${quote.text} - ${quote.author}`)
}
    return (  
        <div className='container'>
            <div className="quote-container">
            <div className='quote'>"{quote.text}"</div>
                            <div className='line'></div>

            <div>
                <div className="bottom">
                    <div className="author">-{quote.author}</div>
                </div>
            </div>
            </div>
            <div className="icons">
                <img src={quote_icon} onClick={random} alt="new quote button" />
                <img src={x_icon} onClick={()=>twitter()} alt="x icon" />
            </div>
        </div>
    )
}

export default RandomQuote