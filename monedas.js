const arregloMonedas = [];
const api = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

export const cargarMonedas = async () => {
    const resp = await
    fetch (api)
    const data = await resp.json()

    data.forEach(element => {       
        arregloMonedas.push(element);
    });
    const enJSON = JSON.stringify(arregloMonedas);
    localStorage.setItem("arregloMonedas", enJSON);
}