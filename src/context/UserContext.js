import React, { createContext, useContext } from "react";
import { useQuery } from "@apollo/client/react";
import { ME_QUERY } from "../graphql/queries/getUser";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { data, loading, error } = useQuery(ME_QUERY);

  return (
    <UserContext.Provider value={{ user: data?.me, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
