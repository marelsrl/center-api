const TEMPLATE = [
    "record_type__STYP",
    "row__NUM_RIGA",
    "entry_type__TIPO",
    "scale_ticket_id__BNNR",
    "product_group_number__WGNR",
    "plu_department_number__PNAB",
    "scale_id__WANR",
    "single_value_in_cents__UMSA", // singolo pachetto
    "ticket_type__BNKD",
    "scale_id__WANR_HEAD",
    "constant__PTYP",
    "special_offer_id__AKNR",
    "fiscal_code_IVA__MWNR",
    "package_value_in_cents__UMSA_HEAD", // PACKEGE VALUE
    "cancellation_status__STST",
    "cancellation_status__STST_HEAD",
    "discount_value_in_cents__RAPO", // DISCOUNT
    "product_weigth_in_grams__MENG", // WEIGTH
    "costumer_id__KDNR",
    "plu__PLNR", // PLU REFERENCE
    "special_price__SPRE",
    "item_department_only_in_STYP_records_equals_2__ABNR",
    "scale_department_id__ABNR_HEAD",
    "operator_id_only_in_STYP_records_equals_2__BEDN",
    "operator_id__BENU_HEAD", // OPERATOR ID
    "unit_price__PREI", // UNIT PRICE
    "quantity__POST", // QUANTITY
    "product_number_unused__ARNR",
    "opened_ticket_at_date_time__ZEIS",
    "issued_ticket_at_date_time__ZEIE",
    "batch_identifier__HIDE",
    "catalogued_ean__EAN_POS",
    "ean_foot_unused__EAN_FOOT",
    "items_count__TOTAL_ITEMS",
    "raty_unused__RATY",
    "flag_acq__FLAG_ACQ",
    "items_count_in_bag__POS_HEAD",
    "item_description__TESTO1", // DESCRIZIONE
    "entry_id__ID", // ID
    "flag_acq_trc__FLAG_ACQ_TRC",
    "history__STORICO",
    "vart__VART",
    "ean_plu_vstore__EAN_PLU_VSTORE",
    "modifyed_price__PREZZO_MODIFICATO",
    "tare__TARA",
    "store_id__PDV"
];
/*
Tipologia di record
1 = Testata
2 / 16 = Voce
10000 = Chiusura
*/

// Tipo movimento (S = Sacchetto, T = Single Ticket o Prezzatura)
export default function SqlToJson(obj) {
    let finalList = [];

    for (let el of obj) {
        let tmp = {};
        TEMPLATE.forEach(chiave => {
            let splitted = chiave.split("__");
            // let real = splitted[0];
            let old = splitted[1];
            let valoreOld = el[old];
            tmp[chiave] = valoreOld;
        });
        finalList.push(tmp);
    }

    if(finalList.length < 3) return {status:"errore",message:"data lenght must be at least 3"};
  
    if(finalList[0]["record_type__STYP"] != 1) return {status:"errore",message:"missing apertura"};
    if(finalList.at(-1)["record_type__STYP"] != 10000) return {status:"errore",message:"missing chiusura"};
    const target = finalList.splice(1,finalList.length -2);
    

    
    let peso = 0;

    const result = target.map(x=>{
        peso += x.product_weigth_in_grams__MENG
        return {
            single_value_in_cents__UMSA:x.single_value_in_cents__UMSA,
            discount_value_in_cents__RAPO:x.discount_value_in_cents__RAPO,
            product_weigth_in_grams__MENG:x.product_weigth_in_grams__MENG,
            operator_id_only_in_STYP_records_equals_2__BEDN:x.operator_id_only_in_STYP_records_equals_2__BEDN,
            unit_price__PREI:x.unit_price__PREI,
            quantity__POST:x.quantity__POST,
            item_description__TESTO1:x.item_description__TESTO1.trim(),
            entry_id__ID:x.entry_id__ID
        }
    })

    return {
        total_price_in_currency:finalList[1].package_value_in_cents__UMSA_HEAD/100,
        total_weigth_in_kg:peso/1000,
        bulk:finalList[1].entry_type__TIPO == "S",
        data:result
    };
}