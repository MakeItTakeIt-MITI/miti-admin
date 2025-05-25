import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function AuthorizedRoutes({ children }: Props) {
  return <>{children}</>;
}
