let baseURL = `https://2024-03-06.currency-api.pages.dev/v1/currencies` ;

let Allselects = document.querySelectorAll(".convertor select");
let btn = document.querySelector("form button"); 
let fromcurr = document.getElementById("from_curr");
let tocurr = document.getElementById("to_curr");
function upadateflag(element){
    let newsrc = `https://flagsapi.com/${countryList[element.value]}/shiny/64.png`
    element.parentElement.querySelector("img").src = newsrc ;
}

for (let select of Allselects) {
    for (let codes in countryList) { // Assuming countryList is an object, for...in is fine here.
        if (select.name == "From_currency" && codes == "USD") {
            select.innerHTML += `<option value="${codes}" selected>${codes}</option>`;
        } else if (select.name == "To_currency" && codes == "INR") {
            select.innerHTML += `<option value="${codes}" selected>${codes}</option>`;
        }
        else {
            select.innerHTML += `<option value="${codes}">${codes}</option>`;
        }
    }
    select.addEventListener("change", (evnt) => {
        
        upadateflag(evnt.target);
    })
}


btn.addEventListener("click", async (evt)=>{
    evt.preventDefault(); 
    let amount = document.querySelector(".amount input");
    val = amount.value; 
    if(val == " " || val <1) {
        val = 1; 
        amount.value = 1; 
    }
    
    let fromcode = fromcurr.value.toLowerCase() ;
    let tocode = tocurr.value.toLowerCase();
    
    let curr_URL = `${baseURL}/${fromcode}.json`
    
    let promise = await fetch(curr_URL); 
    let data = await promise.json() ;
    console.log(data);
    

    const rate = data[`${fromcode}`][`${tocode}`]; 
    
    // console.log("the rate is" , rate);

    converted_rate = rate*val ; 
    // console.log(converted_rate);

    console.log(`${val} ${fromcurr.value} = ${converted_rate} ${tocurr.value}`);
    let resultmsg = document.body.querySelector('.result_msg') ; 
    resultmsg.innerText = `${val} ${fromcurr.value} = ${converted_rate} ${tocurr.value}`;


})