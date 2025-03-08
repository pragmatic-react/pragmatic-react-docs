const BASE_URL = "http://localhost:3000";

// todo : https 요청에 대한 Request, Response type

const get = async (url) => {
  const response = await fetch(`${BASE_URL}/${url}`);
  const data = await response.json();

  return data;
};

const post = async (url, bodyData) => {
  const response = await fetch(`${BASE_URL}/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });

  const data = await response.json();

  return data;
};

const https = {
  get,
  post,
};

export default https;
