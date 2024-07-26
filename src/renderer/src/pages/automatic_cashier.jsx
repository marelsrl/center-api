import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";

function AutomaticCashier() {
    let [isInRefill, setIsInRefill] = useState(false);
    let [isInWithdraw, setIsInWithdraw] = useState(false);
    let [amount, setAmount] = useState(null);

    function refill() {

        if (isInRefill) {
            setIsInRefill(false);

            window.api.refillStop().then(response => {
                console.log(response)
            })
        } else {
            setIsInRefill(true);

            window.api.refillStart().then(response => {
                console.log(response)
            })
        }



    }

    function withdraw() {
        setIsInWithdraw(true)
        window.api.whitdraw(amount * 100).then(res => {
            console.log(res)
        }).finally(()=>{
            setIsInWithdraw(false)
        })
    }

    return (
        <main className="h-screen w-screen flex items-center justify-center">
            <section className="border border-black w-3/6 h-3/6 flex items-center justify-center">
                <div className="border-r-black border-r w-full h-full flex flex-col items-center justify-center">
                    <Button className="mb-8" disabled={isInRefill || isInWithdraw} onClick={withdraw}>Whitdraw</Button>
                    <Input value={amount} onChange={e => setAmount(e.target.value)} type="number" />
                </div>
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <Button disabled={isInWithdraw} onClick={refill}>{isInRefill ? "STOP" : "REFILL"}</Button>
                </div>
            </section>

        </main>
    );
}


export default AutomaticCashier;