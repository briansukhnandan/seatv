import { useEffect, useMemo, useState } from "react";
import Api from "api/Api";

/**
 * A general hook to interact with the Api class to avoid calling
 * it within components and instead use as a hook.
 * 
 * Optionally can pass in a callback to update your state or
 * whatever with the results of an api call upon mount to prevent
 * multiple fetches.
 */
export default function useApi(apiCallback?: (api: Api) => any | Promise<any>) {
  const api = useMemo(() => new Api(), []);
  const [ data, setData ] = useState(null);

  useEffect(() => {
    if (apiCallback) {
      apiCallback(api).then((data: any) => {
        setData(data);
      });
    }
    // eslint-disable-next-line
  }, []);

  return { api, data };
}