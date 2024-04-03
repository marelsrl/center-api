
const TEMPLATE = [
    "record_type__STYP",
    "row__NUM_RIGA",
    "entry_type__TIPO",
    "scale_ticket_id__BNNR",
    "product_group_number__WGNR",
    "plu_department_number__PNAB",
    "scale_id__WANR",
    "single_value_in_cents__UMSA", // singolo pacchetto
    "ticket_type__BNKD",
    "scale_id__WANR_HEAD",
    "constant__PTYP",
    "special_offer_id__AKNR",
    "fiscal_code_IVA__MWNR",
    "package_value_in_cents__UMSA_HEAD", // PACKAGE VALUE
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
    "catalogued_ean__EAN_POS", // PRODUCT EAN
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

// 2 01 901  N

// Tipo movimento (S = Sacchetto, T = Single Ticket o Prezzatura)
export function SqlToJson(obj) {
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

    // ! if(finalList.length < 3) return { status: "errore", message: "data lenght must be at least 3" };

    // ! if(finalList[0]["record_type__STYP"] != 1) return {status:"errore",message:"missing apertura"};
    // ! if(finalList.at(-1)["record_type__STYP"] != 10000) return {status:"errore",message:"missing chiusura"};
    // const target = finalList.splice(1,finalList.length -2);

    const target = [...finalList];



    let peso = 0;

    const result = target.map(x => {
        peso += x.product_weigth_in_grams__MENG
        return {
            single_value_in_cents__UMSA: x.single_value_in_cents__UMSA,
            discount_value_in_cents__RAPO: x.discount_value_in_cents__RAPO,
            product_weigth_in_grams__MENG: x.product_weigth_in_grams__MENG,
            operator_id_only_in_STYP_records_equals_2__BEDN: x.operator_id_only_in_STYP_records_equals_2__BEDN,
            unit_price__PREI: x.unit_price__PREI,
            quantity__POST: x.quantity__POST,
            item_description__TESTO1: x.item_description__TESTO1.trim(),
            entry_id__ID: x.entry_id__ID,
            catalogued_ean__EAN_POS: x.catalogued_ean__EAN_POS,
            plu__PLNR: x.plu__PLNR,
            scale_ticket_id__BNNR: x.scale_ticket_id__BNNR,
            row__NUM_RIGA: x.row__NUM_RIGA,
            issued_ticket_at_date_time__ZEIE: x.issued_ticket_at_date_time__ZEIE,
            item_description__TESTO1: x.item_description__TESTO1,
            plu_department_number__PNAB: x.plu_department_number__PNAB
        }
    })

    return {
        total_price_in_currency: finalList[1].package_value_in_cents__UMSA_HEAD / 100,
        total_weigth_in_kg: peso / 1000,
        bulk: finalList[1].entry_type__TIPO == "S",
        data: result
    };
}


export async function buildSQL(prices) {
    let head = `INSERT [dbo].[PLU] (
        [REP],
        [PLU],
        [WALO],
        [GTIN],
        [PREZZO],
        [EAN],
        [GG1],
        [GG2],
        [TARA_OBBLIGATORIA],
        [TARA],
        [FLAG_TRC],
        [STILE],
        [IVA],
        [VAR_PV],
        [TIPO_ART],
        [FLAG_VAR],
        [STATUS],
        [DATA_APP],
        [TESTO_ARTICOLO],
        [DIM_TESTO1],
        [TESTO1],
        [DIM_TESTO2],
        [TESTO2],
        [DIM_TESTO3],
        [TESTO3],
        [DIM_TESTO4],
        [TESTO4],
        [DIM_TESTO5],
        [TESTO5],
        [DIM_TESTO6],
        [TESTO6],
        [DIM_TESTO7],
        [TESTO7],
        [DIM_TESTO8],
        [TESTO8],
        [DIM_TESTO9],
        [TESTO9],
        [DIM_TESTO10],
        [TESTO10],
        [DATA_MOV],
        [TESTO_GEN1],
        [TESTO_GEN2],
        [TESTO_GEN3],
        [TESTO_GEN4],
        [IMG1],
        [IMG2],
        [IMG3],
        [LOGO1],
        [LOGO2],
        [LOGO3],
        [CAMPO_TESTO1],
        [CAMPO_TESTO2],
        [CAMPO_TESTO3],
        [CAMPO_TESTO4],
        [CAMPO_TESTO5],
        [CAMPO_TESTO6],
        [CAMPO_TESTO7],
        [CAMPO_TESTO8],
        [CAMPO_TESTO9],
        [CAMPO_TESTO10],
        [PARAMETRO_ETICHETTA],
        [GRUPPO],
        [TIPO_CODICE],
        [PIDE],
        [SGEW_0],
        [STOL_0],
        [SPGS_0],
        [SGEW_1],
        [STOL_1],
        [SPGS_1],
        [SGEW_2],
        [STOL_2],
        [SPGS_2],
        [SGEW_3],
        [STOL_3],
        [SPGS_3],
        [SGEW_4],
        [STOL_4],
        [SPGS_4],
        [OFFERTA],
        [PREZZO_OFFERTA],
        [INIZIO_OFFERTA],
        [FINE_OFFERTA],
        [TIPO_PROMO],
        [PERC_SCONTO],
        [VAL_SCONTO],
        [DES_SCONTO],
        [PDV]
)
VALUES`



    let f = []


    prices = prices.filter(x => x.sell_type == 2);
    for (let i = 0; i < prices.length; i++) {

        let x = prices[i];
        if (x.plu == null) continue;

        f.push(`${head}(1,${x.plu},1,N'',${x.calculated_price},N'${x.upc}',0,0,0,0,0,0,1,0,1,1,0,CAST(N'2024-02-07T00:00:00.000' AS DateTime),N'${x.product_name}',5,N'${x.product_name}',0,
N'',0,N'',0,N'',0,N'',0,N'',0,N'',0,N'',0,N'',0,N'',NULL,0,0,0,0,NULL,NULL,
NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,N'07022024',N'07022024',0,0,0,N'',0)`);

    }


    return f

}

export const HEAD = `INSERT [dbo].[PLU] (
    [REP],
    [PLU],
    [WALO],
    [GTIN],
    [PREZZO],
    [EAN],
    [GG1],
    [GG2],
    [TARA_OBBLIGATORIA],
    [TARA],
    [FLAG_TRC],
    [STILE],
    [IVA],
    [VAR_PV],
    [TIPO_ART],
    [FLAG_VAR],
    [STATUS],
    [DATA_APP],
    [TESTO_ARTICOLO],
    [DIM_TESTO1],
    [TESTO1],
    [DIM_TESTO2],
    [TESTO2],
    [DIM_TESTO3],
    [TESTO3],
    [DIM_TESTO4],
    [TESTO4],
    [DIM_TESTO5],
    [TESTO5],
    [DIM_TESTO6],
    [TESTO6],
    [DIM_TESTO7],
    [TESTO7],
    [DIM_TESTO8],
    [TESTO8],
    [DIM_TESTO9],
    [TESTO9],
    [DIM_TESTO10],
    [TESTO10],
    [DATA_MOV],
    [TESTO_GEN1],
    [TESTO_GEN2],
    [TESTO_GEN3],
    [TESTO_GEN4],
    [IMG1],
    [IMG2],
    [IMG3],
    [LOGO1],
    [LOGO2],
    [LOGO3],
    [CAMPO_TESTO1],
    [CAMPO_TESTO2],
    [CAMPO_TESTO3],
    [CAMPO_TESTO4],
    [CAMPO_TESTO5],
    [CAMPO_TESTO6],
    [CAMPO_TESTO7],
    [CAMPO_TESTO8],
    [CAMPO_TESTO9],
    [CAMPO_TESTO10],
    [PARAMETRO_ETICHETTA],
    [GRUPPO],
    [TIPO_CODICE],
    [PIDE],
    [SGEW_0],
    [STOL_0],
    [SPGS_0],
    [SGEW_1],
    [STOL_1],
    [SPGS_1],
    [SGEW_2],
    [STOL_2],
    [SPGS_2],
    [SGEW_3],
    [STOL_3],
    [SPGS_3],
    [SGEW_4],
    [STOL_4],
    [SPGS_4],
    [OFFERTA],
    [PREZZO_OFFERTA],
    [INIZIO_OFFERTA],
    [FINE_OFFERTA],
    [TIPO_PROMO],
    [PERC_SCONTO],
    [VAL_SCONTO],
    [DES_SCONTO],
    [PDV]
)
VALUES`
export function buildOneSQL(item) {

    return `INSERT [dbo].[PLU] (
        [REP],
        [PLU],
        [WALO],
        [GTIN],
        [PREZZO],
        [EAN],
        [GG1],
        [GG2],
        [TARA_OBBLIGATORIA],
        [TARA],
        [FLAG_TRC],
        [STILE],
        [IVA],
        [VAR_PV],
        [TIPO_ART],
        [FLAG_VAR],
        [STATUS],
        [DATA_APP],
        [TESTO_ARTICOLO],
        [DIM_TESTO1],
        [TESTO1],
        [DIM_TESTO2],
        [TESTO2],
        [DIM_TESTO3],
        [TESTO3],
        [DIM_TESTO4],
        [TESTO4],
        [DIM_TESTO5],
        [TESTO5],
        [DIM_TESTO6],
        [TESTO6],
        [DIM_TESTO7],
        [TESTO7],
        [DIM_TESTO8],
        [TESTO8],
        [DIM_TESTO9],
        [TESTO9],
        [DIM_TESTO10],
        [TESTO10],
        [DATA_MOV],
        [TESTO_GEN1],
        [TESTO_GEN2],
        [TESTO_GEN3],
        [TESTO_GEN4],
        [IMG1],
        [IMG2],
        [IMG3],
        [LOGO1],
        [LOGO2],
        [LOGO3],
        [CAMPO_TESTO1],
        [CAMPO_TESTO2],
        [CAMPO_TESTO3],
        [CAMPO_TESTO4],
        [CAMPO_TESTO5],
        [CAMPO_TESTO6],
        [CAMPO_TESTO7],
        [CAMPO_TESTO8],
        [CAMPO_TESTO9],
        [CAMPO_TESTO10],
        [PARAMETRO_ETICHETTA],
        [GRUPPO],
        [TIPO_CODICE],
        [PIDE],
        [SGEW_0],
        [STOL_0],
        [SPGS_0],
        [SGEW_1],
        [STOL_1],
        [SPGS_1],
        [SGEW_2],
        [STOL_2],
        [SPGS_2],
        [SGEW_3],
        [STOL_3],
        [SPGS_3],
        [SGEW_4],
        [STOL_4],
        [SPGS_4],
        [OFFERTA],
        [PREZZO_OFFERTA],
        [INIZIO_OFFERTA],
        [FINE_OFFERTA],
        [TIPO_PROMO],
        [PERC_SCONTO],
        [VAL_SCONTO],
        [DES_SCONTO],
        [PDV]
    )
    VALUES(1,${item.plu},1,N'',${item.calculated_price},N'${item.upc}',0,0,0,0,0,0,1,0,1,1,0,CAST(N'2024-02-07T00:00:00.000' AS DateTime),N'${item.product_name}',5,N'${item.product_name}',0,
N'',0,N'',0,N'',0,N'',0,N'',0,N'',0,N'',0,N'',0,N'',NULL,0,0,0,0,NULL,NULL,
NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,N'07022024',N'07022024',0,0,0,N'',0)`

}


