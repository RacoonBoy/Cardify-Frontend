import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
const userURL = process.env.REACT_APP_URL+"/users"
function LoginMenu(){
    const navigate= useNavigate()
    const [loginText,setText] = useState("Đăng nhập")
    function login(formData){
        setText("Đang đăng nhập ...")
        axios.post(userURL+"/login/"+formData.username.value, {
            password: formData.password.value
        })
            .then(res => {
                setText("Đăng nhập")
                sessionStorage.setItem("userId", res.data.id)
                navigate("/")
            })
            .catch(err => {
                setText("Đăng nhập")
                if(err.status===401) console.log(err.response.data)
                else console.log(err)
            })
    }
    return <>
        <div className="bg-white w-full py-3 px-5 flex content-evenly">
            <a href="/" className="logo text-3xl">CARDIFY</a>
        </div>
        <div className="grow flex items-center justify-center">
            <div className="bg-white w-2/3 max-w-md p-6 rounded-lg flex flex-col gap-3">
                <form onSubmit={event => {
                    event.preventDefault()
                    login(event.target)
                }} className="flex flex-col gap-3">
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
                    <button id="login-button" className="w-full px-2 py-1 mt-2 border border-gray-300 text-center rounded-lg" type="submit">{loginText}</button>
                </form>
                <p className="mt-5 text-sm text-center font-light">
                    Nếu bạn chưa có tài khoản, hãy đăng kí tại <a href="/signup" className="font-normal text-blue-700 underline">đây</a>
                </p>
            </div>
        </div>
    </>
}
export default LoginMenu;