import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// components
import SessionBlock from "../components/SessionBlock";

function Sessions() {

    let [session, setSessions] = useState([]);

    useEffect(() => {
        window.api.retriveSessions().then(res => {
            setSessions(res);
        })
    }, [])

    return (
        <div className='flex items-center justify-around flex-wrap pt-20'>

            <Link to="/" className="absolute left-5 top-5">indietro</Link>
            {
                session.length &&
                session.map(x => <SessionBlock data={x} />)
            }

        </div>
    );
}

export default Sessions;