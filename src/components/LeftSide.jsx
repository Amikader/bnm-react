import { Avatar } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDays, faCodePullRequest, faHomeUser, faTools, faUserCheck, faXmarksLines } from "@fortawesome/free-solid-svg-icons"
import { ExitToAppOutlined } from "@mui/icons-material"
import { NavLink } from "react-router-dom"
import origin from '../imgs/BNM-1.png'
import { useContext } from "react"
import AuthContext from "../context/AuthContext"

const useStyle = makeStyles({
    headers: {
        display: "grid",
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    head:{
        display: "flex",
        alignItems: "center",
    },
    sp:{
        margin: 3
    },
    logo:{
        borderBottom: '1px solid',
        borderBottomLeftRadius: 25,
    },
    actCont:{
        padding: 5,
        width: '250%',
        display: 'flex',
        borderRadius: 10,
        '&:has(.active)':{
            backgroundColor: '#ffffff21',
        }
    }
})
const LeftSide = ()=>{
    const {auth} = useContext(AuthContext)
    const classes = useStyle()
    return(
        <>
        <div className={classes.logo}>
            <img src={origin} alt="BNM Original Icon" style={{width: 143, height: 72,}} />
        </div>
        <div className={classes.headers}>
            <div className={classes.head}>
            <   div className={classes.actCont}>
                    <FontAwesomeIcon icon={faHomeUser} /><span className={classes.sp}>
                    <NavLink to='/'>Acceuil</NavLink>
                    </span>
                </div>
            </div>
            <div className={classes.head}>
                <div className={classes.actCont}>
                    <FontAwesomeIcon icon={faCodePullRequest} /><span className={classes.sp}>
                        <NavLink to='/demande'>Demandes</NavLink>
                    </span>
                </div>
            </div>
            <div className={classes.head}>
                <div className={classes.actCont}>
                    <FontAwesomeIcon icon={faCalendarDays} /><span className={classes.sp}>
                    <NavLink to='/calendar'>Calenderier</NavLink></span>
                </div>
            </div>
            <div className={classes.head}>
                <div className={classes.actCont}>
                    <FontAwesomeIcon icon={faUserCheck} /><span className={classes.sp}>
                    <NavLink to='/approuver'>Approuver</NavLink></span>
                </div>
            </div>
            <div className={classes.head}>
                <div className={classes.actCont}>
                    <FontAwesomeIcon icon={faXmarksLines} /><span className={classes.sp}>
                    <NavLink to='/rejeter'>Rejeter</NavLink></span>
                </div>
            </div>
            <div className={classes.head}>
                <div className={classes.actCont}>
                    <FontAwesomeIcon icon={faTools} /><span className={classes.sp}>Reglage</span>
                </div>
            </div>
            {auth?.super === true ? (
                <div className={classes.head}>
                    <span className={classes.sp}><a href='http://127.0.0.1:800/admin'>Admin</a></span>
                </div>
            ) :null}
        </div>
        </>
    )
}
export default LeftSide