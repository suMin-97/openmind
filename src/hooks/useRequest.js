import { useCallback, useState } from "react";
import { apiAxios } from "../constants/constants";

/*
 * url: String
 * method: 'GET', 'POST', 'PATCH', 'PUT', 'DELETE'
 */
const useRequest = ({ url, method }) => {
  // state를 분리해야 각 상태별 사이드이펙트가 발동함
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const request = useCallback(
    (body) => {
      let apiUrl = url + "/"; // 슬래시를 넣어야지만 호출되는 api가 있다..?
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

export default useRequest;
