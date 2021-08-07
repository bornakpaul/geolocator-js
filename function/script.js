const button = document.querySelector("button");

button.addEventListener("click", ()=> {
    if(navigator.geolocation){
        //! When browser supports
        button.innerText = "Checking Permission";
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        button.innerText = "Browser not supported";
    }
})

function onSuccess(position){
    button.innerText = "Fetching location...";
    let {latitude, longitude} = position.coords;
    //
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=b10f6f0859244adfb8d3fa6bb2db50bd`)
    .then(response => response.json()).then(result => {
        let allDetails = result.results[0].components;
        let {county, postcode, country} = allDetails;
        button.innerText = `${country}, ${county}, ${postcode}`;
        console.table(allDetails);
    }).catch(()=> {
        button.innerText = "Something went wrong";
    })

    
}

function onError(error){
    if(error.code == 1){
        button.innerText = "You denied the request";
    }
    else if(error.code == 2){
        button.innerText = "location not available";
    }
    else{
        button.innerText = "Something went wrong";
    }
    button.setAttribute("disabled", "true");
}