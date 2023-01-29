import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

//Auth
async function singIn(data) {
  const client = applyCaseMiddleware(axios.create());
  try {
    const response = await client.post(
      process.env.REACT_APP_API_URL + "/auth/login",
      data
    );
    console.error(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function singUp(data) {
  const client = applyCaseMiddleware(axios.create());
  try {
    const response = await client.post(
      process.env.REACT_APP_API_URL + "/auth/register",
      data
    );
    console.error(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
export { singIn, singUp };
