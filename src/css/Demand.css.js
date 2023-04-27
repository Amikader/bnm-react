import React from 'react'
import { makeStyles } from '@mui/styles'

export const styles = makeStyles({
    dmnd:{
        display: 'grid',
        width: '98%',
        margin: '1em',
        backgroundColor: '#efefef',
    },
    tab:{
        width: '99%',
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        fontSize: '0.8em',
        backgroundColor: 'white',
    },
    thead:{
        height: '40px',
    },
    tr:{
        border: '1px solid grey',
    },
    trtd:{
        "&:hover":{
            zindex: '1',
            scale: '1.005',
            boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        },
        height: 40,
    },
    thtd:{
        borderBottom: '1px solid #ddd',
    },
    dmheaders:{
        display: 'flex',
        width: 218,
        border: '1px solid #00000042',
        padding: 5,
        borderRadius: '0.2em',
        backgroundColor: 'white',
    },
    listfocus:{
        width: '120px',
        padding: 5,
        borderRight: 'none',
        borderBottom: '2px solid #475585',
        cursor: 'pointer',
    },
    listnonfocus:{
        width: '120px',
        padding: 5,
        borderRight: 'none',
        opacity: 0.3,
        cursor: 'pointer',
    },
    approuver:{
        border: '1px solid green',
        padding: '4px 5px',
        borderRadius: '0.5em',
    },
    app:{
        border: '1px solid green',
        padding: '4px 5px',
        borderRadius: '0.5em',
    },
    rejeter:{
        border: '1px solid red',
        padding: '4px 5px',
        borderRadius: '0.5em',
        '&:hover':{
            backgroundColor: 'red',
            '&:hover svg':{
                color: 'white'
            }
        },
        '&:focus':{
            backgroundColor: 'red',
            '&:focus svg':{
                color: 'white'
            }
        }
    },
    rej:{
        border: '1px solid red',
        padding: '4px 5px',
        borderRadius: '0.5em',
    },
    filter: {
        margin: 5,
        padding: 2,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 100,
    },
    butt: {
        width: '30%',
        display: 'flex',
        justifyContent: 'space-evenly',
    },
    filBut:{
        width: '30%',
        padding: 5,
        borderRadius: 5,
        border: 'none',
        backgroundColor: 'white'
    },
    filCont:{
        position: 'absolute',
        top: 137,
        padding: 10,
        borderRadius: 10,
        zIndex: 2,
        backgroundColor: 'white',
        boxShadow: 'rgb(80 104 129) 0px 8px 24px',
        minWidth: 200,
        transform: 'translate(-333px,10px)'
    },
    x:{
        float: 'right',
        border: 'none',
        backgroundColor: '#112468',
        color: 'white',
        height: 15,
        width: 11,
    },
    pagination:{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        margin: 5,
        paddingRight: 10,
    },
    np:{
        margin: 5,
        width: 20,
        height: 20,
        borderRadius: '50%',
        backgroundColor: '#ebe7e7',
        padding: 2,
    },
    // npb:{
    //     width: 20,
    //     height: 20,
    //     borderRadius: '50%',
    //     border: 'none',
    //     cursor: 'pointer',
    //     backgroundColor: '#ebe7e7',
    // },
    pages:{
        display: 'flex',
        listStyle: 'none',
        padding: 3,
        alignItems: 'center',
        marginRight: 10,
    },
    page:{
        width: 20,
        height: 20,
        margin: 5,
        borderRadius: '50%',
        border: '3px solid #ebe7e7',
        padding: 2,
        Color: '#ebe7e7',
        "&:hover":{
            backgroundColor: '#414d78',
            color: 'white',
        },
        margin: '0 3px',
        cursor: 'pointer'
    },
    active:{
        color:'white',
        width:20,
        height: 20,
        margin: 5,
        borderRadius: '50%',
        backgroundColor: '#414d78',
        padding: 2,
    },
    adddm:{
        position: 'absolute',
        right: '3%',
        width: 50,
        backgroundColor: '#457280',
        color: 'white',
        outline: 'none',
        border: 'none',
        padding: 3,
        borderRadius: 10,
        '&:hover':{
            color: '#414d77',
            backgroundColor: '#fff',
            boxShadow: 'rgb(80 104 129) 0px 8px 24px',
            transition: 'transition: color 2s, background 2s',
        }
    },
    myd: {
        width: '80%',
        backgroundColor: 'transparent',
        outline: 'none',
        border: 'none',
        fontSize: '25px',
        color: '#857f7f',
    }

})