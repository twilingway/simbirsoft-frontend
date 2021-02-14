import { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
const queryString = require('query-string');

export interface IObjectKeys {
  [key: string]: string | number | undefined | object;
}
export interface IQuery extends IObjectKeys {
  //leaguesList?: object;
  //teamsList?: object;
  // name?: string;
  // leagueCode?: string;
  // search?: string;
  // year?: string;
  // page?: string;
  // row?: string;
  // startDate?: string;
  // endDate?: string;
}

export const useQuery = () => {
  const history = useHistory();
  const [query, setQuery] = useState<IQuery>(
    queryString.parse(window.location.search)
  );
  const [ready, setReady] = useState(false);

  const pushTo = useCallback(
    (url: string, params: IQuery = query) => {
      history.push({
        pathname: url,
        search: `?${queryString.stringify(params)}`,
      });
    },
    [history, query]
  );

  const deleteQueryParam = useCallback((key: string) => {
    setQuery((elem) => {
      const tempQuery: IQuery = { ...elem };
      delete tempQuery[key];
      return { ...tempQuery };
    });
  }, []);

  const setQueryParam = useCallback(
    (key: string, value: []) => {
      console.log('query :>> ', query);
      let newElem: IQuery = { ...query };
      console.log('elem :>> ', newElem);
      //newElem[key] = {};

      value.forEach((p: any) => {
        if (p.filterValue) {
          newElem = { ...newElem, [p.field]: p.filterValue };
          console.log('newElem :>> ', newElem);
        } else if (newElem.hasOwnProperty(p.field)) {
          console.log('p :>> ', p);
          console.log('delete :>> ', p.field);
          console.log('delete :>> ', newElem[p.field]);
          delete newElem[p.field];
          console.log('AfterDElete :>> ', newElem);
        }
      });
      console.log('AfterDElete2 :>> ', newElem);
      setQuery((elemPre) => {
        return { ...newElem };
      });
    },
    [query]
  );

  const clearQueryParam = useCallback((key: string) => {
    const tempQuery: IQuery = {};
    setQuery({ ...tempQuery });
  }, []);

  useEffect(() => {
    // console.log('queryFOrm :>> ', query);
    console.log(' window.location :>> ', window.location.pathname);
    setReady(true);
    pushTo(window.location.pathname);
  }, [pushTo]);

  return { setQueryParam, deleteQueryParam, query, ready, clearQueryParam };
};
