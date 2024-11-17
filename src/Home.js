import {useEffect, useState} from "react";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";

const userUrl = process.env.REACT_APP_URL+"/users"
function Deck({deck}){
    function toReview(){

    }
    return <div className="w-full p-2 border-[#8ECAE6] border-2 rounded-lg flex flex-col">
        <div className="flex">
            <p className="text-lg font-semibold">{deck.name}</p>
            <div className="grow"></div>
            <a href={"deck/"+deck._id}>
                <AiFillEdit className="text-2xl text-center h-[28px]"/>
            </a>
        </div>
        <div className="flex justify-center">
            <a href={"/review/"+deck._id}>REVIEW</a>
        </div>
    </div>
}
function DeckMenu(){
    const userId = sessionStorage.getItem("userId")
    const [decks,setDecks] = useState([])
    useEffect(() => {
        console.log("haha")
        axios.get(userUrl+"/"+userId+"/decks")
            .then(res => setDecks(res.data))
            .catch(err => console.log(err))
    }, [userId]);
    return <div className="w-4/5 bg-white p-5 rounded-xl flex flex-col gap-2">
        {decks.map(deck => <Deck key={deck._id} deck={deck}/>)}
        <div className="w-full p-2 border-dashed border-black border-[1.5px] rounded-lg">
            <p className="w-full text-center font-light">Create a new deck</p>
        </div>
    </div>
}
function Home(){
    return <>
        {sessionStorage.getItem("userId")===null?<div></div>:<DeckMenu />}

    </>
}
export default Home;