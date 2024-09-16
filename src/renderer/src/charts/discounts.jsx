import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../services/GlobalContext";


const promoDecoder = ["sconto diretto", "x per y"];


export default function Discounts() {
    let [sessionsState, _] = useContext(GlobalContext).sessionsState;
    let [discounts, setDiscounts] = useState([]);
    function extractDiscount(x) {
        let data = [...x];


        let alreadyFound = [];
        const result = [];

        for (let block of data) {

            for (let cart of block.carts) {
                for (let item of cart.items) {
                    if (item?.promo_type != undefined && item?.promo_type != null && item?.promo_type != "") {
                        const coeff = Number(item?.promo_type) -1 ;
                        const promoName = promoDecoder[coeff];

                        if (alreadyFound.includes(coeff)) {

                            result[result.findIndex(x => x.name == promoName)].count++;
                        } else {
                            console.error("--")
                            result.push({
                                name: promoName,
                                count: 1
                            });
                            alreadyFound.push(coeff);

                        }
                    }
                }
            }

        }
        return result;
    }

    useEffect(() => {
        let res = extractDiscount(sessionsState);
   
        setDiscounts(res.sort((a,b)=>b.count-a.count).slice(0,3));
    }, [sessionsState]);

    return (
        <div className="w-full h-full flex items-center justify-around flex-col">
            <div className="h-6/6 flex items-start justify-center flex-col">
                {
                    discounts.map((discount, index) => {
                        return (
                            <>
                                <p className="font-bold text-4xl mb-3" ><span className="text-5xl mr-5">{index + 1}°</span>{discount.name} : <span className="text-green-500">{discount.count}</span></p>
                            </>
                        )
                    })
                }
            </div>
        </div>
    );
}