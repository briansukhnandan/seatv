import { SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import Api from "../api/Api";

export default function useApi(apiCallback?: (api: Api) => any | Promise<any>) {
  const api = useMemo(() => new Api(), []);
  const [ data, setData ] = useState<any>(null);

  useEffect(() => {
    if (apiCallback) {
      apiCallback(api).then((data: any) => {
        setData(data);
      });
    }  
  }, []);

  return { api, data };
}