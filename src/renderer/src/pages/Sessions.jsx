import { useContext, useEffect } from "react";
import { GlobalContext } from "../serices/GlobalContext";


// components
import SessionBlock from "../components/SessionBlock";


function Sessions() {
    let [sessionsState,setSessionsState] = useContext(GlobalContext).sessionsState;
    // const dodiciOreMS = 43200000;

    useEffect(()=>{
    console.error(sessionsState)

    },[sessionsState])

    

    // Mon Jun 17 2024 15:15:43 GMT+0200 (Ora legale dell’Europa centrale)

    // Mon Jun 17 2024 02:00:00 GMT+0200 (Ora legale dell’Europa centrale)
    return (
        <div className='flex items-center justify-around flex-wrap pt-20'>

            {
                sessionsState?.length > 0 &&
                sessionsState?.map((x,i) => x?.is_active && <SessionBlock key={i} data={x} />)
            }

        </div>
    );
}

export default Sessions;