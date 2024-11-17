import axios from 'axios';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

function Card({card,deleteCard}){
    return <div className="flex gap-x-2 m-0 p-0 items-stretch">
        <div className="w-[calc((100%-20px)/2)] px-2 py-1 bg-gray-100 rounded-lg">
            <p className="text-center break-all">{card.front}</p>
        </div>
        <span className="grow flex items-center">:</span>
        <div className="w-[calc((100%-20px)/2)] px-2 py-1 bg-gray-100 rounded-lg">
            <p className="text-center break-all">{card.back}</p>
        </div>
        <div className="flex items-center">
            <AiFillDelete className="text-xl text-center cursor-pointer" onClick={() => deleteCard(card._id)}/>
        </div>
    </div>
}
function CardMenu(){
    const {deckId} = useParams()
    const deckURL = process.env.REACT_APP_URL+'/decks/'+deckId
    const [cards,setCards] = useState([])
    const [deck, setDeck] =useState({name:""})
    useEffect(() => {
        axios.get(deckURL)
            .then(res => setDeck(res.data))
            .catch(err => console.log(err))
        axios.get(deckURL+"/cards")
            .then(res => setCards(res.data))
            .catch(err => console.log(err))
    }, [deckURL]);
    function addCard(formData){
        console.log(formData)
        axios.post(deckURL, {
            front:formData.front.value,
            back:formData.back.value})
            .then(res => {
                console.log(res)
                setCards([...cards,res.data])
            })
            .catch(err => console.log(err))
    }
    function deleteCard(cardId){
        axios.delete(deckURL+"/"+cardId)
            .then(() => console.log("Deleted "+cardId))
            .catch(err => console.log(err))
        setCards(cards.filter(card => card._id!==cardId))
        console.log(cardId)
    }
    function handleEnterFront(e){
        if(e.key==='Enter'){
            e.preventDefault()
            document.getElementById("back").focus()
        }
    }
    function handleEnterBack(e){
        if(e.key==='Enter'){
            e.preventDefault()
            addCard(e.target.form)
            e.target.form.front.value=''
            e.target.form.back.value=''
            document.getElementById("front").focus()
        }
    }
    return (
        <div id="cardMenu" className="bg-white mx-5 w-full lg:w-2/3 p-6 rounded-lg flex flex-col gap-3">
            <div className="flex justify-center gap-2">
                <p className="text-center text-2xl font-bold">{deck.name}</p>
            </div>
            {cards.map(card => <Card key={card._id} card={card} deleteCard={deleteCard}/>)}
            <form onSubmit={event => {
                event.preventDefault()
                addCard(event.target)
            }} className="flex flex-col gap-3">
                <div>
                    <div className="flex gap-x-2">
                        <label className="grow w-10">Mặt trước</label>
                        <span> </span>
                        <label className="grow w-10">Mặt sau</label>
                    </div>
                    <div className="flex gap-x-2 items-center">
                        <textarea id="front" className="grow min-w-0 px-2 py-1 border border-gray-300 hover:bg-gray-100 focus:bg-gray-100
                    focus:border-gray-500 focus:ring-1 focus:ring-gray-500 rounded-lg" name="front" placeholder="VD: Apple"
                               onKeyDown={handleEnterFront} required/>
                        <span className="">:</span>
                        <textarea id="back" className="grow min-w-0 px-2 py-1 border border-gray-300 hover:bg-gray-100 focus:bg-gray-100
                    focus:border-gray-500 focus:ring-1 focus:ring-gray-500 rounded-lg" name="back" placeholder="VD: Quả táo"
                               onKeyDown={handleEnterBack} required/>
                    </div>
                </div>
                <button className="w-full px-2 py-1 mt-2 border border-gray-300 text-center rounded-lg" type="submit">Thêm Thẻ</button>
            </form>
            <a href={"/review/"+deckId}>
                <button className="w-full px-2 py-1 border border-gray-300 text-center rounded-lg">Ôn tập</button>
            </a>
            <a href="/">
                <button className="w-full px-2 py-1 border border-gray-300 text-center rounded-lg">Quay lại</button>
            </a>
        </div>
    )
}

export default CardMenu;