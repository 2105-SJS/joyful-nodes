export const callApi = async ({ url, method, token, body }) => {
    try {
        const options = {
            method: method ? method.toUpperCase() : "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        };
        if (token) options.headers["Authorization"] = `Bearer ${token}`;

        const result = await fetch(`api${url}`, options);
        if (result.error) {
            throw (result.error);
        }
        return result;
    }
    catch (error) {
        console.log(error);
    }
}