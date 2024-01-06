const fAmountE = document.querySelector(".amount");
const cAmountE = document.querySelector(".convertedAmount");
const fcurrencyE = document.querySelector(".fromCurrency");
const tocurrencyE = document.querySelector(".toCurrency");
const resultE = document.querySelector(".result");
const converterContainer = document.querySelector(".converter-container");

resultE.textContent = "Fetching Exchange Rates ...";
//Array to populate the select tages with these countries
const countries = [
  { code: "AED", name: "United Arab Emirates Dirham" },
  { code: "ARS", name: "Argentine Peso" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "BRL", name: "Brazilian Real" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CLP", name: "Chilean Peso" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "COP", name: "Colombian Peso" },
  { code: "CZX", name: "Czech Koruna" },
  { code: "DKK", name: "Danish Krone" },
  { code: "EGP", name: "Egyptian Pound" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound Sterling" },
  { code: "HKD", name: "Hong Kong Dollar" },
  { code: "HRK", name: "Croatian Kuna" },
  { code: "HUF", name: "Hungarian Forint" },
  { code: "IDR", name: "Indonesian Rupiah" },
  { code: "ILS", name: "Israeli New Shekel" },
  { code: "INR", name: "Indian Rupee" },
  { code: "ISK", name: "Icelandic Króna" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "KRW", name: "South Korean Won" },
  { code: "MXN", name: "Mexican Peso" },
  { code: "MYR", name: "Malaysian Ringgit" },
  { code: "NOK", name: "Norwegian Krone" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "PEN", name: "Peruvian Sol" },
  { code: "PHP", name: "Philippine Peso" },
  { code: "PLN", name: "Polish Złoty" },
  { code: "RON", name: "Romanian Leu" },
  { code: "RUB", name: "Russian Ruble" },
  { code: "SEK", name: "Swedish Krona" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "THB", name: "Thai Baht" },
  { code: "TRY", name: "Turkish Lira" },
  { code: "TWD", name: "Taiwan New Dollar" },
  { code: "UAH", name: "Ukrainian Hryvnia" },
  { code: "USD", name: "United States Dollar" },
  { code: "UYU", name: "Uruguayan Peso" },
  { code: "VND", name: "Vietnamese Dong" },
  { code: "ZAR", name: "South African Rand" },
];
countries.forEach((country) => {
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");
  option2.value = option1.value = country.code;

  option2.textContent =
    option1.textContent = `${country.code} (${country.name})`;
  fcurrencyE.appendChild(option1);
  tocurrencyE.appendChild(option2);
  //   setting default values of select tag
  fcurrencyE.value = "USD";
  tocurrencyE.value = "INR";
});

// function to get exchange rate using API

const gExchangeRate = async () => {
  const amount = parseFloat(fAmountE.value);
  const fcurrency = fcurrencyE.value;
  const toCurrency = tocurrencyE.value;
  resultE.textContent = "Fetching Exchange Rates ...";
  //Fetch data from API
  try{
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/e7a62226516629ef0813ee7f/latest/${fcurrency}`
    );
    const data = await response.json();
    const conversionRate = data.conversion_rates[toCurrency];
    const conversionAmount = (amount * conversionRate).toFixed(2);
    if (typeof conversionRate === "undefined") {
      resultE.textContent =
        "Exchange Rate data is not available for selected countries";
      conversionAmount = "";
    } else {
      cAmountE.value = conversionAmount;
      resultE.textContent = `${amount} ${fcurrency} = ${conversionAmount} ${toCurrency}`;
    }
  } catch (error) {
    converterContainer.innerHTML =
      "<h2>Error while fetching exchange rates!!!</h2>";
  }
};

fAmountE.addEventListener("input", gExchangeRate);
fcurrencyE.addEventListener("change", gExchangeRate);
tocurrencyE.addEventListener("change", gExchangeRate);
window.addEventListener("load", gExchangeRate);
