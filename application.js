const list_of_countries = document.querySelector("list-of-countries");
export default function loadCountries(url){
  fetch("https://restcountries.eu/rest/v2/all")
  .then(response => response.json())
  .then(jsonData =>{
    window.listOfCountries = jsonData;
    displayCountriesOnPage();
  })
  .catch(error =>{
    alert("An error occured. Please reload there page");
  });
}

function displayCountriesOnPage(){
  // for(let i = 0; i<12 && i<window.listOfCountries.length; i++)
}
