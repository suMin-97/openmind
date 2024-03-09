import { useCallback, useState } from "react";
import { apiAxios } from "../constants/constants";

const useRequestWithoutSlash = ({ url, method }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const request = useCallback(
    (body) => {
      let apiUrl = url;
      let apiBody = body;

      if (method === "GET" && body) {
        apiBody = null;
        const searchParam = new URLSearchParams(body);
        apiUrl = apiUrl + "?" + searchParam.toString();
      }
      setIsLoading(true);
      return apiAxios
        .request({
          url: apiUrl,
          method,
          data: apiBody,
        })
        .then((response) => setData(response.data))
        .catch((error) => setError(error))
        .finally(() => {
          setIsLoading(false);
        });
    },
    [url, method]
  );
  return { data, error, isLoading, request: (body) => request(body) };
};

export default useRequestWithoutSlash;
