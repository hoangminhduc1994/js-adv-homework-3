const fetchDataWithTimeout = async (url, timeout) => {
  const fetchDataPromise = fetch(url);
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Yêu cầu đã mất quá nhiều thời gian"));
    }, timeout);
  });

  try {
    const response = await Promise.race([fetchDataPromise, timeoutPromise]);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

let URL = `https://jsonplaceholder.typicode.com/posts/1`;
const TIMEOUT_DURATION = 5000;
fetchDataWithTimeout(URL, TIMEOUT_DURATION)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Lỗi:", error.message);
  });

