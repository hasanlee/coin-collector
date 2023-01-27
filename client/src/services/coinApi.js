import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

async function getAllCoins(query) {
  const client = applyCaseMiddleware(axios.create());
  try {
    const response = await client.get(
      process.env.REACT_APP_API_URL + "/allcoins?query=" + query
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getAllCoinTypes(query) {
  const client = applyCaseMiddleware(axios.create());
  try {
    const response = await client.get(
      process.env.REACT_APP_API_URL + "/types?query=" + query
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
export { getAllCoins, getAllCoinTypes };
