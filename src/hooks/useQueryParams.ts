import { useLocation } from 'react-router-dom';

export function useQueryParams(){
    const location = useLocation()

    const queryParams = location.search.substr(1).split('&').reduce( (qs : any, query) => {
        const chunks = query.split('=');
        const key : any = chunks[0];
        let value : any = decodeURIComponent(chunks[1] || '');
        let valueLower = value.trim().toLowerCase();
        if (valueLower === 'true' || value === 'false') {
          value = Boolean(value);
        } else if (!isNaN(Number(value))) {
          value = Number(value);
        }
        return (qs[key] = value, qs);
      }, {});

      return queryParams
}