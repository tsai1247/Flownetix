function getExchangeRate (from: string, to: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const url = `https://api.exchangerate-api.com/v4/latest/${from}`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const rate = data.rates[to];
        if (rate) {
          resolve(rate);
        } else {
          reject(new Error('Exchange rate not found'));
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function getCurrencyList (): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const url = `https://api.exchangerate-api.com/v4/latest/USD`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const currencies = Object.keys(data.rates).sort();
        resolve(currencies);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export default {
  getExchangeRate,
  getCurrencyList,
};
