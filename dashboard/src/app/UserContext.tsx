import * as React from 'react';

export const UserContext = React.createContext<any>(null);
export const useUser = () => React.useContext(UserContext); 