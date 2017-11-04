/**
 * Загрузка данных с сервера
 */

const SERVER_URL = `https://es.dump.academy/guess-melody`;
const USER_NAME = `alenakolpakova460439`;

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`).then((response) => response.json());
  }

  static loadResults(name = USER_NAME) {
    return fetch(`${SERVER_URL}/stats/:${name}`).then((response) => {
      return response.json();
    });
  }

  static saveResults(data, name = USER_NAME) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/:${name}`, requestSettings);
  }
}
