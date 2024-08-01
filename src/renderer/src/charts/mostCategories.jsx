import { Doughnut } from "react-chartjs-2";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../services/GlobalContext";

const colors = ["green", "blue", "orange"];


export default function MostCategories() {
    let categories = {};
    const INITIAL_DATA = {
        labels: [],
        datasets: [{
            label: "quantità",
            data: [],
            backgroundColor: []
        }],
        hoverOffset: 4
    }

    let [sessionsState, _] = useContext(GlobalContext).sessionsState;
    let [show, setShow] = useState(false)

    let [chartData, setChartData] = useState({ ...INITIAL_DATA });

    function init() {

        for (let session of sessionsState) {

            for (let cart of session.carts) {
                for (let item of cart.items) {
                    const category = item.category;
                    const aleradyInCats = Object.keys(categories).includes(category); // il prodotto è retgistrato
                    const newAndCatsLessThan3 = !Object.keys(categories).includes(category) && Object.keys(categories).length <= 3 // il prodotto è nuovo è categories ancora non è pieno 

                    // controlla che non vada in overflow di 3
                    if (aleradyInCats || newAndCatsLessThan3) {

                        if (Object.keys(categories).includes(category)) {
                            categories[category]++;
                        } else {
                            categories[category] = 1;
                        }
                    }

                }
            }

        }

    }

    function buildChart(n = 1) {
        for (let i = 0; i < n; i++) {
            let oneKey = Object.keys(categories)[i];
            let oneVal = Object.values(categories)[i];
            let cp = { ...chartData };
            cp.labels.push(oneKey);

            cp.datasets[0].data.push(oneVal);
            cp.datasets[0].backgroundColor.push(colors[i])
            setChartData(cp)
        }

    }

    function reset() {
        setChartData({ ...INITIAL_DATA });
    }

    useEffect(() => {


        // costruzione dei dati per il grafico
        init()

        // render grafico del grafico
        buildChart(3);


    }, [sessionsState]);

    useEffect(() => {
        setShow(true);

        return () => {
            reset();
        }
    }, [])

    return (
        show && <Doughnut className="p-10" data={chartData} />
    );
}