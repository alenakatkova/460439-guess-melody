/**
 * Загрузка данных с сервера
 */

const SERVER_URL = `https://es.dump.academy/guess-melody/questions`;

export default class Loader {
  static loadData() {
    return fetch(SERVER_URL).then((response) => response.json());
  }
}
