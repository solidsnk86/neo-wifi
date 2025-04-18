onmessage = async (event) => {
  let response = event.data;
  response = await fetch("https://192.168.0.254/data/info.json?id=info");
  const data = await response.json();
  const { mode, username, is2G, devInfo, devVer, countryId } = data;
  const returnObj = { mode, username, is2G, devInfo, devVer, countryId };
  postMessage(returnObj);
};
