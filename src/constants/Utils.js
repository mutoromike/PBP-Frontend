const defaultHeaders = {
  "Content-Type": "application/json",
};

export const headers = {
  headers: localStorage.getItem("Token")
    ? {
        ...defaultHeaders,
        Authorization: `${localStorage.getItem("token")}`,
      }
    : defaultHeaders,
};

export const url = {
  "base-url": "http://127.0.0.1:5000",
};
