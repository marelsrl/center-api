import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";


// graphs
import MostCategories from "../charts/mostCategories";
import Prices from "../charts/Prices";
import Discounts from "../charts/discounts";
import AffluenceDays from "../charts/affluenceDays";

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const labelClass = "absolute font-bold top-3 right-10";

function Stats() {

    return (
        <main className="w-screen h-[80vh] absolute bottom-0">
            <div className="w-full h-full grid grid-cols-2 grid-rows-2 overflow-hidden">
                <div className="relative flex items-center justify-center hover:bg-gradient-to-t from-gray-100 to-white transition-all hover:scale-105">
                    {/* <span className="absolute translate-y-3">I PIU VENDUTI</span> */}
                    <span className={labelClass + " left-10"}>CATEGORIE PIÙ VENDUTE</span>
                    <MostCategories className="p-10" />
                </div>
                <div className="flex items-center justify-around from-gray-100 to-white transition-all hover:scale-105 relative hover:bg-gradient-to-t">
                    <p className={labelClass + " top-3"}>SPESA  MEDIA</p>
                    <p className={labelClass + " left-5 top-3"}>TOTALE SPESO</p>
                    <Prices />
                </div>
                <div className="flex items-center justify-center from-gray-100 to-white relative transition-all hover:scale-105 hover:bg-gradient-to-t">
                <span className={labelClass + " left-10"}>SCONTI PIÙ APPREZZATI</span>
                    
                    <Discounts />
                </div>
                <div className="flex items-center justify-center from-gray-100 to-white transition-all hover:scale-105 relative hover:bg-gradient-to-t">
                    <span className={labelClass + " left-10"}>AFFLUENZA SETTIMANALE</span>
                    <AffluenceDays />
                </div>

            </div>

        </main>
    );
}

export default Stats;