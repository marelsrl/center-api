function SessionBlock({ data }) {


    console.log(data);

    // const currentCart = data?.currentCart;

    return (
        <div className="w-[300px] h-[300px] shadow-xl flex items-center justify-center flex-col">
            <h1 className="mb-10 text-3xl">{data.device}</h1>
            {
                data?.currentCart?.active ?
                    <p className="text-green-500">Elabrando conto ✅</p> :
                    <p className="text-gray-300">Nessuna operazione 🚫</p>
            }
            <br />
            {
                data?.currentCart?.active &&
                <>
                    <p>{data?.currentCart?.count} prodotti</p>
                    <p>peso {data?.currentCart?.weight?.toFixed(2)} kg</p>
                    <p>totale {data?.currentCart?.total?.toFixed(2)} €</p>
                </>
            }
        </div>
    );
}


export default SessionBlock;