import { useContext } from "react";
import { GlobalContext } from "../serices/GlobalContext";
import { Link } from "react-router-dom";


// components
import SessionBlock from "../components/SessionBlock";

function Sessions() {
    let sessionsState = useContext(GlobalContext).sessionsState;

    return (
        <div className='flex items-center justify-around flex-wrap pt-20'>

            <Link to="/" className="absolute left-5 top-5">indietro</Link>
            {
                sessionsState?.length > 0 &&
                sessionsState?.map((x,i) => x?.doc?.is_active && <SessionBlock key={i} data={x.doc} />)
            }

        </div>
    );
}

export default Sessions;