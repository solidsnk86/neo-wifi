let returnObj = {};

onmessage = async (event) => {
  returnObj = event.data;
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const response = await fetch("https://192.168.0.254/data/info.json?id=info");
  const data = await response.json();
  const { mode, username, is2G, devInfo, devVer, countryId } = data;
  returnObj = { mode, username, is2G, devInfo, devVer, countryId };
  postMessage(returnObj);
};
