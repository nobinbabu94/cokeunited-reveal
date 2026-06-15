import { Auth } from "aws-amplify";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://zidnshnhri7dpl3jbmfracivpy0lxrmo.lambda-url.us-east-1.on.aws";
export const lambdaPost = async (path, payload = {}) => {
  const session = await Auth.currentSession();
  const token = session.getIdToken().getJwtToken();

  const response = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response.json();
};

export const lambdaGet = async (path) => {
  const session = await Auth.currentSession();
  const token = session.getIdToken().getJwtToken();
  console.log(token, "token")

  const response = await fetch(`${BASE_URL}${path}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};