function SessionBlock({data}) {
   
    return (
       <div className="w-[300px] h-[300px] shadow-xl flex items-center justify-center flex-col">
            <h1 className="mb-10 text-3xl">{data.cashier_number}</h1>
            {
                data.is_active?
                <p className="text-green-500">Online ✅</p>:
                <p className="text-gray-300">Offile 🚫</p>
            }
       </div>
    );
}


export default SessionBlock;