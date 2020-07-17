const defaultHeaders = {
  "Content-Type": "application/json",
};

const defaultFileHeaders = {
  "Content-Type": "multipart/form-data",
};

export const headers = {
  headers: localStorage.getItem("Token")
    ? {
        ...defaultHeaders,
        Authorization: `${localStorage.getItem("Token")}`,
      }
    : defaultHeaders,
};

export const fileHeaders = {
  headers: localStorage.getItem("Token")
    ? {
        ...defaultFileHeaders,
        Authorization: `${localStorage.getItem("Token")}`,
      }
    : defaultFileHeaders,
};

export const url = {
  "base-url": "https://pbp-backend.herokuapp.com",
};
