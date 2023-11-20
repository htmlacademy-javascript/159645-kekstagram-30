const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';
const ServerRoute = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  [HttpMethod.GET]: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  [HttpMethod.POST]: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const request = (route, errorText, method = HttpMethod.GET, body = null) =>
  fetch(`${SERVER_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((err) => {
      throw new Error(errorText ?? err.message);
    });

const loadPictures = async () => request(ServerRoute.GET_DATA, ErrorText.GET_DATA);

const sendPicture = async (body) => request(ServerRoute.SEND_DATA, ErrorText.SEND_DATA, HttpMethod.POST, body);

export { loadPictures, sendPicture };
