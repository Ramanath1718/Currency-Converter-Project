let base_URL="https://v6.exchangerate-api.com/v6/ddd3a50e868ca0e4c3b45143/latest/INR";
let dropdown=document.querySelectorAll("select");
let fromSelect=document.querySelector(".from1 select");
let toSelect=document.querySelector(".to1 select");
let btns=document.querySelector(".btn");
let msg=document.querySelector(".msg");

for (let sel of dropdown){
    for(country in countryList){
    let countrycode=countryList[country];
    let option=document.createElement("option");
    option.innerHTML=country;
    option.value=countrycode;

    if(sel.name==="from" && country==="USD"){
        option.selected="selected";
    }
    else if(sel.name==="to" && country==="INR"){
        option.selected="selected";
    }
    sel.appendChild(option);
}
}

async function converter(){
    let amount=document.querySelector("input");
    let fromCurr=fromSelect.value;
    let toCurr=toSelect.value;
    if(amount.value>0){
        let response=await fetch(base_URL);
        let data=await response.json();
        let fromExchageRate=data.conversion_rates[fromCurr];
        let toExchangeRate=data.conversion_rates[toCurr];
        let convertedAmount=(amount.value * toExchangeRate)/fromExchageRate;
        msg.innerText=`${amount.value}${fromCurr}=${convertedAmount}${toCurr}`;

    }else{
        amount.value=1;
    }
}
btns.addEventListener("click",()=>{
    converter();
});
window.addEventListener("load",converter);
