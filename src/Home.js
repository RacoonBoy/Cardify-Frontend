import {useEffect, useState} from "react";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const userUrl = process.env.REACT_APP_URL+"/users"
const deckUrl = process.env.REACT_APP_URL+"/decks"
function Deck({deck}){
    return <div className="w-full p-2 border-[#8ECAE6] border-2 rounded-lg flex flex-col">
        <div className="flex">
            <p className="text-lg font-semibold">{deck.name}</p>
            <div className="grow"></div>
            <a href={"deck/"+deck._id}>
                <AiFillEdit className="text-2xl text-center h-[28px]"/>
            </a>
        </div>
        <div className="flex justify-center">
            <a href={"/review/"+deck._id}>ÔN TẬP</a>
        </div>
    </div>
}
function DeckMenu(){
    const userId = sessionStorage.getItem("userId")
    const navigate = useNavigate()
    const [decks,setDecks] = useState([])
    const [isAdding, setAdding] = useState(false)
    useEffect(() => {
        axios.get(userUrl+"/"+userId+"/decks")
            .then(res => setDecks(res.data))
            .catch(err => console.log(err))
    }, [userId]);
    return <div className="w-4/5 bg-white p-5 rounded-xl flex flex-col gap-2">
        {decks.map(deck => <Deck key={deck._id} deck={deck}/>)}
        <div onClick={() => setAdding(true)}
             className="w-full p-2 border-dashed border-black border-[1.5px] rounded-lg hover:border-solid hover:cursor-pointer">
            {isAdding
                ?<form onSubmit={event => {
                    event.preventDefault()
                    const formData = event.target
                    axios.post(deckUrl,{
                        name: formData.deckName.value,
                        userId: userId
                    })
                        .then(res => {
                            navigate("/deck/"+res.data)
                        })
                        .catch(err => console.log(err))
                }} className="flex justify-center gap-2">
                    <label className="flex items-center">Tên của bộ thẻ:</label>
                    <input id="front" className="min-w-0 px-2 py-1 border border-gray-300 hover:bg-gray-100 focus:bg-gray-100
                    focus:border-gray-500 focus:ring-1 focus:ring-gray-500 rounded-lg" name="deckName" required/>
                    <button className="login-button min-w-min px-2 py-1 font-semibold rounded-lg">Thêm</button>
                </form>
                :<p className="w-full text-center font-light">Thêm bộ thẻ mới</p>}
        </div>
    </div>
}
function Home(){
    return <>
        {sessionStorage.getItem("userId")===null?<div></div>:<DeckMenu />}

    </>
}
export default Home;