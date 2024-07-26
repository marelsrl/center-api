import { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';

import Table from "../components/Table";

function PriceList() {

    let [tableData, setTableData] = useState([]);
    useEffect(() => {
        document.querySelector(".carousel-control-prev-icon").style.backgroundColor = 'black';
        document.querySelector(".carousel-control-next-icon").style.backgroundColor = 'black';

        document.querySelector(".carousel-control-prev-icon").style.padding = '25px';
        document.querySelector(".carousel-control-next-icon").style.padding = '25px';
        window.api.retriveLatestPrice().then(response => {
            console.log(JSON.parse(response))
            setTableData(JSON.parse(response))
            console.log(JSON.parse(response))
        })
    }, [])


    return (

            <Carousel  interval={10000000000}   style={{overflow:"scroll", height: "100vh", width: "100vw",paddingTop :"12vh" }} >
                {
                    tableData.map(x => {
                        return (
                            <Carousel.Item style={{ height: "100%", width: "100%"}}>
                                <center >
                                    <h1 className="bg-blue-100" style={{fontWeight:700,fontSize:"2rem",textAlign:"center",padding:"1vh"}}>{x.key.price_date}</h1>
                                </center>
                                <Table data={x.key.lista}/>
                            </Carousel.Item>
                        )
                    })
                }

            </Carousel>
    )
}

export default PriceList;