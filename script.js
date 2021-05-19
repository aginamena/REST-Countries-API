const list_of_countries = document.querySelector("#list-of-countries");
const number_of_countries_displayed = document.querySelector("#number-of-countries-displayed");
const dropdown_items = document.querySelectorAll(".dropdown-item");
const search_icon = document.querySelector("#search-icon");
const clicked_country = document.querySelector("#clicked-country");
const go_back = document.querySelector("#go-back-button");
const clicked_country_details = document.querySelector("#clicked-country-details");
const clicked_country_img = document.querySelector("#clicked-country-img");
const switch_toggle = document.querySelector(".switch-toggle");
const top_styling = document.querySelectorAll(".top-styling");
const main = document.querySelector("#main");
const countryInfo = document.querySelector("#countryInfo");
var background_color = "lightgray";
var blackOrWhite = "black";
var isclicked = true;


function loadCountries(url){
  list_of_countries.textContent = "";
  clicked_country_details.textContent = "";
  list_of_countries.style = "display:grid";
  clicked_country.style = "display:none;";

  fetch(url)
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
  let i = 0;

  for(; i<12 && i<window.listOfCountries.length; i++){
    let parentElement = document.createElement("div");
    parentElement.setAttribute("class", "country");
    let flag = document.createElement("img");
    flag.style = "width:100%; height:200px;";
    flag.setAttribute("src", window.listOfCountries[i].flag);

    let stats = document.createElement("div");
    stats.setAttribute("class", "stats");
    stats.style = "padding-left:30px; padding-bottom:30px;background:white;";

    let nameOfcountry = document.createElement("h4");
    nameOfcountry.style = "padding-top:20px; margin-bottom:20px;";
    nameOfcountry.textContent = window.listOfCountries[i].name;

    let population = document.createElement("div");
    population.innerHTML = "<b>population:</b>"+ " " + window.listOfCountries[i].population;

    let region = document.createElement("div");
    region.innerHTML = "<b>Region:</b>" + " " + window.listOfCountries[i].region;

    let capital = document.createElement("div");
    capital.innerHTML = "<b>Capital:</b>" + " " + window.listOfCountries[i].capital;

    let button = document.createElement("button");
    button.setAttribute("class", "view-details");
    button.style.cssText = "padding: 5px 15px; background: lightblue; border: 0; margin-top: 20px;";
    button.textContent = "View Details";

    stats.appendChild(nameOfcountry);
    stats.appendChild(population);
    stats.appendChild(region);
    stats.appendChild(capital);
    stats.appendChild(button);

    parentElement.appendChild(flag);
    parentElement.appendChild(stats);

    list_of_countries.appendChild(parentElement);
  }
  if(i == 1){
    number_of_countries_displayed.textContent = "displaying "+ i +
    " out of "+window.listOfCountries.length + " country";
  }else{
    number_of_countries_displayed.textContent = "displaying "+ i +
    " out of "+window.listOfCountries.length + " countries";
  }
}

dropdown_items.forEach(dropdown_item =>{
  dropdown_item.addEventListener("click", ()=>{
    let url = "https://restcountries.eu/rest/v2/region/"+dropdown_item.textContent;
    loadCountries(url);
  })
});

search_icon.addEventListener("click", ()=>{
  let input_text = document.querySelector("#input-search-box").value;

  if(input_text.length > 0){
    let url = "https://restcountries.eu/rest/v2/name/"+input_text;
    loadCountries(url);
  }
});

list_of_countries.addEventListener("click", event =>{


  let clickedEvent = event.target;
  countryInfo.textContent = "";
  if(clickedEvent.getAttribute("class") === "view-details"){
    let clickedCountry = clickedEvent.parentElement.parentElement;
    for(let i = 0; i<list_of_countries.children.length; i++){
      if(list_of_countries.children[i] === clickedCountry){
        // remove any existing element that was there before
        clicked_country_details.textContent = "";
        // we perfrom deep comparison of the same type and value
        list_of_countries.style = "display:none;";
        clicked_country.style = "display:block";

        let country = window.listOfCountries[i];

        let heading = document.createElement("h3");
        heading.textContent = country.name;
        heading.style = "margin-bottom:40px;";



        let image = document.createElement("img");
        image.setAttribute("src", country.flag);
        image.setAttribute("id", "clicked-country-img");

        let statsContainer = document.createElement("div");
        statsContainer.style.cssText = "display:grid; grid-template-columns: 1fr 1fr;"
        + "grid-column-gap : 30px";

        let stats1 = document.createElement("div");
        stats1.innerHTML = "<b>Native Name: </b>" + country.nativeName + "<br>"
        + "<b>Population: </b>" + country.population + "<br>" +
        "<b>Region: </b>" + country.region + "<br>" +
        "<b>Sub Region : </b>" + country.subregion + "<br>" +
        "<b>Capital: </b>" + country.capital;

        let currencies = country.currencies;
        let currencyResult = "";
        for(let j = 0; j<currencies.length; j++){
          if(j + 1 == currencies.length) currencyResult += currencies[j].name;
          else currencyResult += currencies[j].name + ", ";
        }

        let languages = country.languages;
        let languageResult = "";
        for(let j = 0; j<languages.length; j++){
          if(j + 1 == languages.length)languageResult += languages[j].name;
          else languageResult += languages[j].name + ", ";
        }

        let stats2 = document.createElement("div");
        stats2.innerHTML = "<b>Top Level Domain: </b>" + country.topLevelDomain[0] + "<br>"+
        "<b>Currencies: </b>" + currencyResult + "<br>" +
        "<b>Languages: </b>" + languageResult;

        statsContainer.appendChild(stats1);
        statsContainer.appendChild(stats2);



        let borderCountries = country.borders;
        let listOfBorderCountries = document.createElement("div");
        if(borderCountries.length == 0){
          listOfBorderCountries.textContent = "None";
        }else{

          for(let j = 0; j<borderCountries.length; j++){
            let button = document.createElement("button");
            button.setAttribute("onclick", "display_clicked_border_country(event)")
            button.textContent = borderCountries[j];
            button.style = "padding : 5px 15px; margin-left:5px; background:lightgray;";
            listOfBorderCountries.appendChild(button);
          }
        }

        let borders = document.createElement("div");
        borders.innerHTML = "<b>Border countries : </b>" + listOfBorderCountries.innerHTML;
        borders.style = "margin-top:30px;";

        countryInfo.appendChild(heading);
        countryInfo.appendChild(statsContainer);
        countryInfo.appendChild(borders);
        clicked_country_details.appendChild(image);
        clicked_country_details.appendChild(countryInfo);
        return;
      }
    }
  }
});

go_back.addEventListener("click", ()=>{
  list_of_countries.style = "display:grid;";
  clicked_country.style = "display:none";
});

function display_clicked_border_country(event){
  let url = "https://restcountries.eu/rest/v2/alpha?codes="+event.target.textContent;
  loadCountries(url);
}
loadCountries("https://restcountries.eu/rest/v2/all");
