import {Outlet} from "react-router-dom";
import NavBar from "./NavBar";
function Root(){

    return <>
        <NavBar/>
        <div className="grow flex items-center justify-center">
            <Outlet />
        </div>
    </>
}

export default Root;