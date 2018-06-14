//Check if auction is current and then present data using buildAuction()-function.
window.onload = async function createCurrentAuctions(){
    
    let data = await getAllAuctions();
    let todayDate = new Date();
    let todayMilli = Date.parse(todayDate);

    for(i in data){

        let startMilli = Date.parse(data[i].StartDatum);
        let endMilli = Date.parse(data[i].SlutDatum);
        
        if(todayMilli > startMilli && todayMilli < endMilli){
            buildAuction(data, i);
        }
    }
}

//Sort by price
async function sortByPrice(){

    let element = document.getElementById("auction-row");
    
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    let data = await getAllAuctions();
    let sortedByPrice = data.sort((a,b)=>a.Utropspris > b.Utropspris);

    for(i in sortedByPrice){
        buildAuction(sortedByPrice, i);
    }
}

//Sort by date
async function sortByDate(){

    let element = document.getElementById("auction-row");

    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    let data = await getAllAuctions();
    let sortedByDate = data.sort((a,b)=>a.SlutDatum > b.SlutDatum);
    
    for(i in sortedByDate){
        buildAuction(sortedByDate, i);
    }
}

// Adds bid
function addBid(auctionID){
    
    let bidAmount = document.getElementById("bid-field").value;
    let JSON = {"Summa": bidAmount, "AuktionID": auctionID};
    postBid(auctionID, JSON);

}

//Adds an auction
function addAuction(){

    let title = document.getElementById("auction-title").value;
    let content = document.getElementById("auction-content").value;
    let start = document.getElementById("auction-start").value;
    let end = document.getElementById("auction-end").value;
    let price = document.getElementById("auction-price").value;

    let JSON = {"Titel": title, "Beskrivning": content, "StartDatum": start, "SlutDatum": end, "Gruppkod": 100, "Utropspris": price};

    postAuction(JSON);
} 

// This takes a search value (string) and compares it to the title and content
// and if present - builds an auction. 
async function Search(){

    let searchStr = document.getElementById("search-text").value;
    let dataSearch = await getAllAuctions();
    
    let element = document.getElementById("auction-row");

    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    for(i in dataSearch){
        let title = dataSearch[i].Titel;
        let content = dataSearch[i].Beskrivning;
        
        if(title.includes(searchStr) || content.includes(searchStr)){
            buildAuction(dataSearch, i);
        }
    }

}

