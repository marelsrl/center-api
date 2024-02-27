function SessionBlock({ data }) {



    return (
        <div className="w-[300px] h-[300px] shadow-xl flex items-center justify-center flex-col">
            {/* <h1 className="mb-10 text-3xl">{data._id}</h1> */}
            {
                data.active ?
                    <p className="text-green-500">Elabrando conto ✅</p> :
                    <p className="text-gray-300">Nessuna operazione 🚫</p>
            }
            {
                data.active &&
                <>
                    <p>{data.count} prodotti</p>
                    <p>peso {data.weight.toFixed(2)} kg</p>
                    <p>totale {data.total.toFixed(2)} €</p>
                </>
            }
        </div>
    );
}


export default SessionBlock;