import LeftSide from "./LeftSide"
import NavBar from "./NavBar"
import Content from "./Content"
import Demandes from "./Demandes"
import { Outlet } from "react-router-dom"

const UserDashboard = ()=>{
    return(
        <div className="dashboard">
            <div className="dash-left">
                <LeftSide />
            </div>
            <div className="dash-bar-cont">
                <NavBar />
                <Outlet />
            </div>
        </div>
    )
}
export default UserDashboard