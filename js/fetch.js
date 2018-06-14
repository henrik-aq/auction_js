// All the fetch-functions needed in this app are here!

async function fetchData(url){
    let promise = await fetch(url);
    let data = await promise.json();
    return data;
}

async function getAllBids(id){
    let data = await fetchData('http://nackowskis.azurewebsites.net/api/bud/100/'+ id);
    return data;
}

async function getAllAuctions(){
    let data = await fetchData('http://nackowskis.azurewebsites.net/api/auktion/100');
    return data;
}

async function postBid(id, data){
    fetch('http://nackowskis.azurewebsites.net/api/bud/100/'+ id,{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(function(data) {
      alert("Ditt bud är lagt");
      location.reload();
    });
  }

  async function postAuction(data){
    fetch('http://nackowskis.azurewebsites.net/api/Auktion/100/',{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(function(data) {
      alert("Din auktion är inlagd");
      location.reload();
    });
  }


