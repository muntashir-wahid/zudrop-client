import axios, { AxiosError } from "axios";

class ApiError extends Error {
  status?: number;
  data?: unknown;

  constructor(message: string, status?: number, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? import.meta.env.VITE_BASE_URL,
  timeout: 30000,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const serverMessage =
      (error.response?.data as { message?: string })?.message ??
      error.message;

    return Promise.reject(
      new ApiError(
        serverMessage,
        error.response?.status,
        error.response?.data,
      ),
    );
  },
);

export default api;
