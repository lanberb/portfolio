import type { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  condition: boolean;
  redirectTo: string;
}

export const RouterRouteGuard: FC<PropsWithChildren<Props>> = ({ condition, redirectTo, children }) => {
  if (condition) {
    return <Navigate to={redirectTo} />;
  }
  return children;
};
