import axios from "axios";

function useInterceptors() {
  axios.interceptors.response.use(undefined, (err) => {
    if (err.response.status === 401) {
      window.location = "/login";
    }

    return Promise.reject(err);
  });
}

export default useInterceptors;
