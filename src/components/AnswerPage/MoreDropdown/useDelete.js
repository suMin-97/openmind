import { useCallback, useState } from "react";
import { apiAxios } from "../../../constants/constants";

const useDelete = ({ url }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const request = useCallback(() => {
    let apiUrl = url + "/";
    setIsLoading(true);
    return apiAxios
      .request({
        url: apiUrl,
        method: "DELETE",
      })
      .then((response) => setData(response))
      .catch((error) => setError(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);
  return { data, error, isLoading, request };
};

export default useDelete;
