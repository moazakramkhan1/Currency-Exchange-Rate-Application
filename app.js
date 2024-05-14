let baseURL =  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"; 

const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("button");
let fromCurrency = document.querySelector("#from");
let toCurrency = document.querySelector("#to");
let message = document.querySelector(".msg");
const input = document.querySelector(".amount input");

for(let country of dropdowns)
{
    for(let currency in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText = currency;
        newOption.value = currency;
         if(country.id === "from" && currency === "USD")
         {
            newOption.selected = "selected";
         }
         else if(country.id === "to" && currency === "PKR"){
            newOption.selected = "selected";
         }
         country.append(newOption);
    }
      country.addEventListener("change",(evnt)=>{
           updateFlag(evnt.target);
      });  
}

const updateFlag = (element)=>{
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let NewSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let image = element.parentElement.querySelector("img");
    image.src = NewSrc;
};

button.addEventListener("click", (evnt)=>{
    evnt.preventDefault();
    updatePage();
});

const updatePage = async ()=>{
    let amount = document.querySelector(".amount input");
    let value = amount.value;
    if(value === "" || value < 1)
    {
        amount.value = "1";
    }
    value = amount.value;
    let url = `${baseURL}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let CurrentRate = data[toCurrency.value.toLowerCase()];
    let finalResult = CurrentRate * value;
    message.innerText = `${value} ${fromCurrency.value} = ${finalResult.toFixed(2)} ${toCurrency.value}`;
   
}
window.addEventListener("load", ()=>{
    updatePage();
})

input.addEventListener("input", ()=>{
    updatePage();
})

