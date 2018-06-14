// All the createElement - appends and stuff for creating bid forms och auction forms are here
// I also do some sorting and date comparing here when the funcions are called.

// Function for presenting and sorting bids in descending order within bid modal
async function buildBid(id){

    // The first while-loop removes all the child elements (if present) of the parent div so that
    // the bids dont just adds up when the user press the "Se och lägg till bud"-button more than once
    let element = document.getElementById("modal-text-bid");
    let formElement = document.getElementById("modal-form");
    
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    // Create all the elements and sort the bids from big to small
    let data = await getAllBids(id);
    let sortData = data.sort(function (a, b) {return b.Summa - a.Summa;});

    for(i in sortData){
        let el = document.createElement('P');
        el.setAttribute('id', 'bid-text');
        let text = document.createTextNode(sortData[i].Summa);
        el.appendChild(text);
        document.getElementById('modal-text-bid').appendChild(el);
    }


    // While a child of formElement exists - delete them.
    while (formElement.firstChild) {
        formElement.removeChild(formElement.firstChild);
    }

        // Create bid input form
        let div = document.createElement('SPAN');
        div.setAttribute('class', 'form-group');
    
        let label = document.createElement('LABEL');
        let labelText = document.createTextNode('Ditt bud: ');
        label.setAttribute('for', 'bid-field');
        label.appendChild(labelText);
            
        let input = document.createElement('INPUT');
        input.setAttribute('type', 'text');
        input.setAttribute('class', 'form-control');
        input.setAttribute('id', 'bid-field');
        input.setAttribute('name', 'Summa');
    
        let button = document.createElement('BUTTON');
        let buttonText = document.createTextNode('Skicka bud');
        button.appendChild(buttonText);
        button.setAttribute('type', 'submit');
        button.setAttribute('class', 'btn btn-default');
        button.setAttribute('onclick', 'addBid('+ id +')');

        let parentDiv = document.getElementById('modal-form').appendChild(div);
    
        parentDiv.appendChild(label);
        parentDiv.appendChild(input);
        parentDiv.appendChild(button);

}

// Function for presenting auctions. Accepts api data and the position (i) in the loop
async function buildAuction(data, i){

    let todayDateBuild = new Date();
    let todayMilliBuild = Date.parse(todayDateBuild);
    let startMilliBuild = Date.parse(data[i].StartDatum);
    let endMilliBuild = Date.parse(data[i].SlutDatum);

    let div = document.createElement('DIV');
    div.setAttribute('class', 'thumbnail text-center');

    let title = document.createElement('H3');
    let titleText = document.createTextNode(data[i].Titel);
    title.appendChild(titleText);

    let content = document.createElement('P');
    let contentText = document.createTextNode(data[i].Beskrivning);
    content.appendChild(contentText);

    let startDate = document.createElement('P');
    let startDateText = document.createTextNode(data[i].StartDatum);
    startDate.appendChild(startDateText);
            
    let endDate = document.createElement('P');
    let endDateText = document.createTextNode(data[i].SlutDatum);
    endDate.appendChild(endDateText);

    let startPrice = document.createElement('H4');
    let startPriceText = document.createTextNode(data[i].Utropspris);
    startPrice.appendChild(startPriceText);
        
    let button = document.createElement('BUTTON');
    let buttonText = document.createTextNode('Se och lägg bud');
    button.appendChild(buttonText);
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'btn btn-primary btn-block');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#bid-modal');
    button.setAttribute('onclick', 'buildBid(' + data[i].AuktionID + ');');
    
    let parent = document.getElementById('auction-row').appendChild(div);
            
    parent.appendChild(title);
    parent.appendChild(content);
    parent.appendChild(document.createElement('HR'));
    parent.appendChild(startDate);
    parent.appendChild(endDate);
    parent.appendChild(startPrice);
    parent.appendChild(document.createElement('HR'));

    // This tests if auction is current - if true it adds the bid-button.
    // Else it adds text with the highest 
    if (todayMilliBuild > startMilliBuild && todayMilliBuild < endMilliBuild){
        parent.appendChild(button);
        }
    else {
        let bidData = await getAllBids(data[i].AuktionID);
        let highestBidSort = bidData.sort(function (a, b) {return b.Summa - a.Summa;});
        let textNode = document.createElement('P');
        let text = document.createTextNode('Det vinnande budet var på summan ' + highestBidSort[0].Summa);
        textNode.appendChild(text);
        parent.appendChild(textNode);
    };

}
