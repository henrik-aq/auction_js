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

function addBid(auctionID){
    
    let bidAmount = document.getElementById("bid-field").value;
    let JSON = {"Summa": bidAmount, "AuktionID": auctionID};
    postBid(auctionID, JSON);

}

function addAuction(){

    let title = "En tavla 1";
    let content = "En jättefin tavla av en konstnär";
    let start = "2018-01-01T02:00:00"
    let end = "2019-01-01T02:00:00"
    let price = 1000;

    let JSON = {"Titel": title, "Beskrivning": content, "StartDatum": start, "SlutDatum": end, "Gruppkod": 100, "Utropspris": price};

    postAuction(JSON);
} 