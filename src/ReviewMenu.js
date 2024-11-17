import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
const deckURL = process.env.REACT_APP_URL+'/decks';

function ReviewMenu(){
    const {deckId} = useParams()
    const [cards,setCards] = useState([{front: "Bộ thẻ này không có thẻ", back: "Hãy thêm thẻ để có thể ôn tập"}])
    const [cardIndex, setCardIndex] = useState(0)
    const [card,setCard]=useState(cards[0])
    const [isFlipped,setFlipped] = useState(false)
    const flip = useCallback(() => {
        setFlipped(flipped => !flipped)
    },[]);
    const nextCard = useCallback(() => {
        setCardIndex(index => index===cards.length-1?0:index+1)
        setCard(cards[cardIndex])
    },[cardIndex, cards])
    useEffect(() => {
        axios.get(deckURL+"/"+deckId+"/cards")
            .then(res => {
                console.log(res.data)
                if(res.data.length!==0){
                    setCards(res.data)
                    setCard(res.data[0])
                }
            })
            .catch(err => console.log(err))
    }, [deckId]);
    useEffect(() => {
        const handleKeyPress = event => {
            if(event.key===" ") flip()
            if(event.key==="Enter"){
                setFlipped(false)
                nextCard()
            }
        };
        window.addEventListener("keydown",handleKeyPress)
        return () => window.removeEventListener("keydown",handleKeyPress)
    },[flip, nextCard])
    return <div id="ReviewMenu" className="w-4/5 h-4/5 p-6 flex flex-col gap-3">
        <div className="flip-card grow bg-transparent">
            <div className={"flip-card-inner w-full h-full relative"+(isFlipped?" is-flipped":"")}>
                <div className="flip-card-front rounded-lg w-full h-full p-3 flex items-center justify-center absolute
                text-2xl">
                    <p>{card.front}</p>
                </div>
                <div className="flip-card-back rounded-lg w-full h-full p-3 flex items-center justify-center absolute
                text-2xl">
                    <p>{card.back}</p>
                </div>
            </div>
        </div>
        <button className="bg-white w-full px-2 py-1 border border-gray-300 text-center rounded-lg" onClick={flip}>Lật</button>
        <button className="bg-white w-full px-2 py-1 border border-gray-300 text-center rounded-lg" onClick={nextCard}>Tiếp theo</button>
        <a href="/">
            <button className="bg-white w-full px-2 py-1 border border-gray-300 text-center rounded-lg">Kết thúc</button>
        </a>
    </div>
}

export default ReviewMenu;