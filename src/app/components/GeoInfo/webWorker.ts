let count = 0;

onmessage = (event) => {
  count = event.data || 0;
  setInterval(() => {
    count += 1;
    postMessage(count);
  }, 1000);
};
