import { Chart, ArcElement, Tooltip, Legend } from "chart.js";


// graphs
import MostCategories from "../charts/mostCategories";
import Prices from "../charts/Prices";

Chart.register(ArcElement, Tooltip, Legend);

const labelClass = "absolute font-bold top-3 right-3";

function Stats() {

    return (
        <main className="w-screen h-[80vh] absolute bottom-0">
            <div className="w-full h-full grid grid-cols-2 grid-rows-2 overflow-hidden">
                <div className="relative flex items-center justify-center hover:bg-gradient-to-t from-gray-100 to-white transition-all hover:scale-105">
                    {/* <span className="absolute translate-y-3">I PIU VENDUTI</span> */}
                    <span className={labelClass + " left-3"}>CATEGORIE PIU' VENDUTE</span>
                       <MostCategories className="p-10"  />
                </div>
                <div className="flex items-center justify-around from-gray-400 to-gray-100 transition-all hover:scale-105 relative">
                    <p className={labelClass + " top-3"}>PREZZO MEDIO</p>
                    <p className={labelClass + " left-3 top-3"}>TOTALE SPESO</p>
                    <Prices/>
                </div>
                <div className="flex items-center justify-center from-gray-400 to-gray-100 transition-all hover:scale-105">
                    <p>offerte più comprate</p>
                </div>
                <div className="flex items-center justify-center from-gray-400 to-gray-100 transition-all hover:scale-105">
                    <p>grafico 4</p>
                </div>

            </div>

        </main>
    );
}

export default Stats;