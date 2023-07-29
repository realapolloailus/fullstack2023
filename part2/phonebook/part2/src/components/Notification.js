import React from 'react'

const Notification = ({notif}) =>{
    if(notif===null){
        return null
    }

    return(
        <div className={notif.type}> {notif.text} </div>
    )
}

export default Notification