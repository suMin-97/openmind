import { useCallback, useState } from "react";
import { apiAxios } from "../constants/constants";

/*
 * url: String
 * method: 'GET', 'POST', 'PATCH', 'PUT', 'DELETE'
 */
const useRequest = ({ url, method }) => {
  // state를 분리해야 각 상태별 사이드이펙트가 발동함
  const [data, setData] = useState(null); // request후 data 상태 관리
  const [error, setError] = useState(null); // request 후 error 상태 관리 - status, message ...
  const [isLoading, setIsLoading] = useState(false); // request 비동기 호출 관련 loading 상태 관리
  const [status, setStatus] = useState(null);

  const request = useCallback(
    (body) => {
      let apiUrl = url + "/"; // 슬래시를 넣어야지만 호출되는 api가 있다..?
      let apiBody = body;
      // method가 GET이고 body데이터가 존재하는 경우, body를 query로 변경해서 호출
      // url query parsing을 위해 URLSearchParams를 이용
      if (method === "GET" && body) {
        apiBody = null;
        const searchParam = new URLSearchParams(body);
        apiUrl = apiUrl + "?" + searchParam.toString();
      }
      setIsLoading(true); // 호출 전 loading 상태 - true
      return apiAxios
        .request({
          url: apiUrl,
          method,
          data: apiBody,
        })
        .then((response) => {
          setData(response.data);
          setStatus(response.status);
        })
        .catch((error) => {
          setError(error);
          setStatus(error.response.status);
        })
        .finally(() => {
          setIsLoading(false); // 호출 후 loading 상태 - false
        });
    },
    [url, method] // useCallback DependencyList
  );
  return { data, error, isLoading, status, request: (body) => request(body) };
};

export default useRequest;
