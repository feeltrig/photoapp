import { createContext, useContext, useState } from 'react';

// MAIN STATE OBJECT
export const appState = {
  fullUserName: null,
  userName: null,
  email: null,
  mobile: null,
  password: null,
};

// APP CREATE CONTEXT
export const appContext = createContext({});

export const ContextProvider = ({ children }) => {
  const [mainappstate, setmainappstate] = useState(appState);

  return (
    <appContext.Provider value={{ mainappstate, setmainappstate }}>
      {children}
    </appContext.Provider>
  );
};

// USE CONTEXT FUNCTION
export function useMainApp() {
  return useContext(appContext);
}
