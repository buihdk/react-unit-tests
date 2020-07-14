import { useContext } from 'react';
import { __RouterContext } from 'react-router';

const MISSING_ROUTER_ERROR = new Error(
  'useRouter may only be called within a <Router /> context.',
);

const useRouter = (routerContext = __RouterContext) => {
  const router = useContext(routerContext);
  if (!router) {
    throw MISSING_ROUTER_ERROR;
  }
  return router;
};

export default useRouter;
