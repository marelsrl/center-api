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
        datasets: [],
        hoverOffset: 4
    });

    useEffect(() => {
        let categories = {};
        const most3Categories = "";

        for (let session of sessionsState) {

            for (let item of session.currentCart.items) {

                const category = item.category;
                if (Object.keys(categories).includes(category)) {
                    categories[category]++;
                } else {
                    categories[category] = 1;
                }

            }
        }
        
        const colors = ["red","green","yellow"]
        // definire il grafico
        switch (Object.keys(categories).length) {
            case 1:
                let oneKey = Object.keys(categories)[0];
                let oneVal = Object.values(categories)[0];
                setChartData({
                    labels:[oneKey],
                    datasets: [
                        {
                            label: oneKey,
                            data: [oneVal],
                            backgroundColor:[colors[0]]
                        }
                    ],
                    hoverOffset: 4
                });
                break
            case 2:
                break;
            case 3:
                break;
            default:
                break;

        }

        setReady(true)
    }, []);


    return (
        <main className="w-screen h-[80vh] absolute bottom-0">
            {
                ready && <Doughnut data={chartData} />
            }
        </main>
    );
}

export default Stats;