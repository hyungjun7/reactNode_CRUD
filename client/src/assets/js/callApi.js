const callApi = async(path) => {
    const res = await fetch(path);
    const body = await res.json();
    return body;
}

export default callApi;