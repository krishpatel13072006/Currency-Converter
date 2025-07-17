// const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


const countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
};

let from_curr = document.querySelector(".from select")
let to_curr = document.querySelector(".to select")
let Selects = document.querySelectorAll("select");
let btn = document.querySelector("#btn");
const msg = document.querySelector(".msg");

for (let select of Selects) {
    for (let codes in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = codes;
        newoption.value = codes;

        if (select.name == "from" && codes == "USD") {
            newoption.selected = "selected";
        } else if (select.name == "to" && codes == "INR") {
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change", (event) => {
        updateflag(event.target);
    })
}

const updateflag = (el) => {

    let currcode = el.value;
    console.log(currcode);

    let countryCode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = el.parentElement.querySelector("img");
    img.src = newSrc;

}

btn.addEventListener("click", async (e) => {
    e.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtvalue = amount.value;
    if (amtvalue === "" || amtvalue < 1) {
        // amtvalue=1;
        amount.value = 1;
    }


const URL = `${base_url}/${from_curr.value.toLowerCase()}.min.json`;///${toCurr.value.toLowerCase()}.json`;
let response = await fetch(URL);
let data = await response.json();
console.log(data);
let from = from_curr.value.toLowerCase();
console.log(from);
let to = to_curr.value.toLowerCase();
console.log(to);

let rate = data[from][to];

let finalAmount = amtvalue * rate;
msg.innerText = `${amtvalue} ${from_curr.value} = ${finalAmount} ${to_curr.value}`;
});

