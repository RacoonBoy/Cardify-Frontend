import {useEffect, useState} from "react";
import { AiFillSetting } from "react-icons/ai";
import axios from "axios";
const userURL = process.env.REACT_APP_URL+"/users"

function LoginButtons(){
    return <div className="flex gap-3">
        <a href="/login">
            <button className="login-button min-w-min px-2 py-1 font-semibold rounded-lg">Đăng nhập</button>
        </a>
        <a href="/signup">
            <button className="login-button min-w-min px-2 py-1 font-semibold rounded-lg">Đăng kí</button>
        </a>
    </div>
}
function NavBar(){
    const [user,setUser] = useState({})
    console.log(sessionStorage.getItem("userId"))
    function toggleDropdown(){
        const dropdown = document.getElementById("setting-dropdown")
        dropdown.classList.toggle("hidden")
    }
    function logout(){
        sessionStorage.removeItem("userId")
        window.location.reload()
    }
    useEffect(() => {
        if(sessionStorage.getItem("userId")){
            axios.get(userURL+"/id/"+sessionStorage.getItem("userId"))
                .then(res => setUser(res.data))
                .catch(err => console.log(err))
        }
    }, []);
    return <div className="bg-white w-full py-3 px-5 flex content-evenly">
        <a href="/" className="logo text-3xl">CARDIFY</a>
        <div className="grow"></div>
        {user?._id===undefined
            ?<LoginButtons />
            :<>
                <p className="h-full flex items-center text-xl">Xin chào, {user?.displayName}</p>
                <div className="relative">
                    <AiFillSetting  className="h-full ml-2 flex items-center text-xl duration-1000 hover:rotate-180 cursor-pointer"
                                    onClick={toggleDropdown}/>
                    <div className="absolute top-3/4 right-0 bg-white w-fit border-gray-500 shadow-md rounded-md">
                        <button id="setting-dropdown" className="hidden w-32 px-2 py-1 hover:bg-gray-200"
                        onClick={logout}>Đăng xuất</button>
                    </div>
                </div>
            </>}

    </div>
}
export default NavBar;