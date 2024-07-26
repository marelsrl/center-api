import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../serices/GlobalContext";
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";


Chart.register(ArcElement, Tooltip, Legend);

function Stats() {


    let [sessionsState, setSessionsState] = useContext(GlobalContext).sessionsState;
    let [ready, setReady] = useState(false);
    let [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: "",
            data: [],
            backgroundColor: []
        }],
        hoverOffset: 4
    });

    useEffect(() => {
        let categories = {};

        for (let session of sessionsState) {

            for (let cart of session.carts) {
                for (let item of cart.items) {
                    const category = item.category;
                    const aleradyInCats = Object.keys(categories).includes(category); // il prodotto è retgistrato
                    const newAndCatsLessThan3 = !Object.keys(categories).includes(category) && Object.keys(categories).length <= 3 // il prodotto è nuovo è categories ancora non è pieno 

                    // controlla che non vada in overflow di 3
                    if(aleradyInCats || newAndCatsLessThan3){

                        if (Object.keys(categories).includes(category)) {
                            categories[category]++;
                        } else {
                            categories[category] = 1;
                        }
                    }
                 
                }
            }

        }

        function extractData(n = 1) {
            for (let i = 0; i < n; i++) {
                let oneKey = Object.keys(categories)[i];
                let oneVal = Object.values(categories)[i];
                let cp = { ...chartData };
                cp.labels.push(oneKey);
                cp.datasets[0].label = "prodotti";
                cp.datasets[0].data.push(oneVal);
                cp.datasets[0].backgroundColor.push(colors[i])
                setChartData(cp)
            }

        }

        const colors = ["red", "green", "orange"]
        // definire il grafico
        const numeroCategorie = Object.keys(categories).length // 1,2,3

        // crea il grafico in base al numero di categorie di prodotto individuate
        extractData(numeroCategorie);

        
        setReady(true)
    }, [sessionsState]);


    return (
        <main className="w-screen h-[80vh] absolute bottom-0">
            <div className="w-full h-full grid grid-cols-2 grid-rows-2 overflow-hidden">
                <div className="relative flex items-center justify-center hover:bg-gradient-to-t from-gray-100 to-white transition-all hover:scale-105">
                    {/* <span className="absolute translate-y-3">I PIU VENDUTI</span> */}
                    <span className="absolute font-bold bottom-3 right-3">I PIÙ VENDUTI</span>
                    {
                        ready && <Doughnut className="w-full h-full" data={chartData} />
                    }

                </div>
                <div className="flex items-center justify-center from-gray-400 to-gray-100 transition-all hover:scale-105">
                    <p>grafico 2</p>
                </div>
                <div className="flex items-center justify-center from-gray-400 to-gray-100 transition-all hover:scale-105">
                    <p>grafico 3</p>
                </div>
                <div className="flex items-center justify-center from-gray-400 to-gray-100 transition-all hover:scale-105">
                    <p>grafico 4</p>
                </div>

            </div>

        </main>
    );
}

export default Stats;