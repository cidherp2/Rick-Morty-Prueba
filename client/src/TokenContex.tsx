import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface JwtContextType {
  jwt: string | null;
  setJwt: (jwt: string | null) => void;
  parsedJwt: any | null;
}

const JwtContext = createContext<JwtContextType | undefined>(undefined);

export const useJwt = (): JwtContextType => {
  const context = useContext(JwtContext);
  if (!context) {
    throw new Error('useJwt must be used within a JwtProvider');
  }
  return context;
};

const parseJwt = (token: string | null): any | null => {
  if (!token) {
    return null;
  }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(c => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

interface JwtProviderProps {
  children: ReactNode;
}

export const JwtProvider: React.FC<JwtProviderProps> = ({ children }) => {
  const [jwt, setJwt] = useState<string | null>(localStorage.getItem('token'));
  const [parsedJwt, setParsedJwt] = useState<any | null>(parseJwt(jwt));

  useEffect(() => {
    setParsedJwt(parseJwt(jwt));
  }, [jwt]);

  return (
    <JwtContext.Provider value={{ jwt, setJwt, parsedJwt }}>
      {children}
    </JwtContext.Provider>
  );
};
