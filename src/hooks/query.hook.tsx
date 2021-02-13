import { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
const queryString = require('query-string');

export interface IObjectKeys {
  [key: string]: string | number | undefined;
}
export interface IQuery extends IObjectKeys {
  search?: string;
  year?: string;
  page?: string;
  row?: string;
}

export const useQuery = () => {
  let history = useHistory();
  const [query, setQuery] = useState<IQuery>(
    queryString.parse(window.location.search)
  );
  const setQueryParam = (key: string, value: string) => {
    let tempQuery: IQuery = { ...query };
    tempQuery = { ...tempQuery, [key]: value };
    console.log('tempQuery :>> ', tempQuery);
    setQuery({ ...tempQuery });
  };

  const deleteQueryParam = (key: string) => {
    const tempQuery: IQuery = { ...query };
    delete tempQuery[key];
    setQuery({ ...tempQuery });
  };

  useEffect(() => {
    const pushTo = (url: string, params: IQuery = query) => {
      history.push({
        pathname: url,
        search: `?${queryString.stringify(params)}`,
      });
    };
    console.log('queryFOrm :>> ', query);
    pushTo('/leagues');
  }, [history, query]);

  return { setQueryParam, deleteQueryParam, query };
};
