import { Typography } from "@material-tailwind/react";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../services/GlobalContext";


function Prices() {
    let [sessionsState, _] = useContext(GlobalContext).sessionsState;
    let [tot, setTot] = useState(0);
    let [middle, setMiddle] = useState(0);

    function init() {
        let localTot = 0;
        let len = 0;
        for (let session of sessionsState) {

            for (let cart of session.carts) {
                len++;
                for (let item of cart.items) {
                    localTot+=item["calculated_price"];
                }
            }

        }
        setTot(localTot.toFixed(2));
        setMiddle((localTot / len).toFixed(2));
    }

    useEffect(() => {
        init();
    }, [])
    return (
        <>
            <Typography className="text-6xl">{tot}€</Typography>
            <Typography className="text-6xl">{middle}€</Typography>
        </>
    );
}


export default Prices;