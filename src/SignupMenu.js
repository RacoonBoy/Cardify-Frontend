import axios from "axios";
import {useNavigate} from "react-router-dom";

const userURL = process.env.REACT_APP_URL+"/users"
function SignupMenu(){
    const navigate = useNavigate()
    function signup(formData){
        axios.post(userURL+"/signup",{
            displayName: formData.displayName.value,
            username: formData.username.value,
            password: formData.password.value
        })
            .then(res => {
                sessionStorage.setItem("userId",res.data.id)
                navigate("/")
            })
            .catch(err => console.log(err))
    }
    return <>
        <div className="bg-white w-full py-3 px-5 flex content-evenly">
            <a href="/" className="logo text-3xl">CARDIFY</a>
        </div>
        <div className="grow flex items-center justify-center">
            <div className="bg-white w-2/3 max-w-md p-6 rounded-lg flex flex-col gap-3">
                <form onSubmit={event => {
                    event.preventDefault()
                    signup(event.target)
                }} className="flex flex-col gap-3" >
                    <div>
                        <label htmlFor="displayName">Tên hiển thị</label>
                        <input className="w-full min-w-0 px-2 py-1 border border-gray-300 hover:bg-gray-100 focus:bg-gray-100
                    focus:border-gray-500 focus:ring-1 focus:ring-gray-500 rounded-lg" name="displayName" required/>
                    </div>
                    <div>
                        <label htmlFor="username">Tên đăng nhập</label>
                        <input className="w-full min-w-0 px-2 py-1 border border-gray-300 hover:bg-gray-100 focus:bg-gray-100
                    focus:border-gray-500 focus:ring-1 focus:ring-gray-500 rounded-lg" name="username" required/>
                    </div>
                    <div>
                        <label htmlFor="password">Mật khẩu</label>
                        <input className="w-full min-w-0 px-2 py-1 border border-gray-300 hover:bg-gray-100 focus:bg-gray-100
                    focus:border-gray-500 focus:ring-1 focus:ring-gray-500 rounded-lg" type="password" name="password" required/>
                    </div>
                    <button className="w-full px-2 py-1 mt-2 border border-gray-300 text-center rounded-lg" type="submit">Đăng Kí</button>
                </form>
            </div>
        </div>
    </>
}

export default SignupMenu