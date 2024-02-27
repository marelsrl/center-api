import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


// components
import SessionBlock from "../components/SessionBlock";

function Sessions({cartState}) {

    let [session, setSessions] = useState([]);

    
    useEffect(() => {
        console.log(cartState)
        window.api.retriveSessions().then(res => {
            setSessions(res);
        })
    }, [])

    return (
        <div className='flex items-center justify-around flex-wrap pt-20'>

            <Link to="/" className="absolute left-5 top-5">indietro</Link>
            {
                cartState.length > 0 &&
                cartState.map((x,i) => <SessionBlock key={i} data={x} />)
            }

        </div>
    );
}

export default Sessions;