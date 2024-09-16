// ./components/BarChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import { useState, useEffect, useContext } from "react";


import { GlobalContext } from "../services/GlobalContext";


const BarChart = () => {
    
    const days = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];

    // const labels = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];
    let data = {
        labels: days,
        datasets: [
            {
                label: "carrelli",
                backgroundColor: ["red","green","orange","blue","pruple","pink","yellow"],
                borderColor: "black",
                data: [0, 0, 0, 0, 0, 0, 0],
            }
        ],
    }
    

    let [sessionsState, _] = useContext(GlobalContext).sessionsState;
    let [chartData, setChartData] = useState(data);
    let [show,setShow] = useState(false);





    function init() {

        let counter = {
            "Lunedì": 0,
            "Martedì": 0,
            "Mercoledì": 0,
            "Giovedì": 0,
            "Venerdì": 0,
            "Sabato": 0,
            "Domenica": 0
        }
        let tmp = {...chartData};

        for (let session of sessionsState) {
            console.error(session)

            for (let cart of session.carts) {
                const gd = new Date(cart.created_at_date).getDay()
                const day = gd == 0 ? 7 : gd - 1;
                counter[days[day]]++;
                tmp.datasets[0].data[day] = tmp.datasets[0].data[day]+1;
            }

        }

        setChartData(tmp);

    }

    useEffect(() => {
        setShow(true);
        init()
    }, [])


    return (
       show && <Bar className="p-7" data={chartData} />
    );
};
export default BarChart;