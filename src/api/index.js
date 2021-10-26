const APIURL = `https://joyful-nodes-shop.herokuapp.com/api/`;

export const callApi = async () => {
  try {
    const options = {
      method: method ? method.toUpperCase() : "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    };
    if (token) options.headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`${APIURL}${url}`, options);
    const result = await response.json();
    if (result.error) {
      throw (result.error);
    }
    return result;
  }
  catch (error) {
    console.log(error);
  }
}