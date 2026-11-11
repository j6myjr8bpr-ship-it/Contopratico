const byId = (id) => document.getElementById(id);
const number = (id) => Number.parseFloat(byId(id).value);
const euro = (value) => new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(value);
const valid = (...values) => values.every(Number.isFinite) && values.every(v => v >= 0);

byId("tripButton").addEventListener("click", () => {
  const km = number("distance"), consumption = number("consumption"), price = number("fuelPrice"), people = number("people");
  if (!valid(km, consumption, price, people) || people < 1 || !Number.isInteger(people) || consumption <= 0) {
    byId("tripResult").textContent = "Controlla i dati: inserisci valori validi e almeno un passeggero.";
    return;
  }
  const litres = km * consumption / 100;
  const total = litres * price;
  byId("tripResult").textContent = `Carburante: ${litres.toFixed(2)} L · Totale: ${euro(total)} · A persona: ${euro(total / people)}`;
});

byId("discountButton").addEventListener("click", () => {
  const price = number("originalPrice"), pct = number("discount");
  if (!valid(price, pct) || pct > 100) {
    byId("discountResult").textContent = "Inserisci un prezzo positivo e uno sconto tra 0 e 100%.";
    return;
  }
  const saving = price * pct / 100;
  byId("discountResult").textContent = `Risparmi ${euro(saving)} · Prezzo finale: ${euro(price - saving)}`;
});

byId("splitButton").addEventListener("click", () => {
  const total = number("totalBill"), people = number("billPeople");
  if (!valid(total, people) || people < 1 || !Number.isInteger(people)) {
    byId("splitResult").textContent = "Inserisci un importo valido e un numero intero di persone maggiore di zero.";
    return;
  }
  byId("splitResult").textContent = `Ognuno paga ${euro(total / people)} (${people} persone).`;
});

byId("year").textContent = new Date().getFullYear();
