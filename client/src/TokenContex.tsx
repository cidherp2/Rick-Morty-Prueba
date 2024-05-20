import React, { createContext, useContext, useState, ReactNode } from 'react';

interface JwtContextType {
  jwt: string | null;
  setJwt: (jwt: string | null) => void;
}

const JwtContext = createContext<JwtContextType | undefined>(undefined);

export const useJwt = (): JwtContextType => {
  const context = useContext(JwtContext);
  if (!context) {
    throw new Error('useJwt must be used within a JwtProvider');
  }
  return context;
};

interface JwtProviderProps {
  children: ReactNode;
}

export const JwtProvider: React.FC<JwtProviderProps> = ({ children }) => {
  const [jwt, setJwt] = useState<string | null>(localStorage.getItem('token'));

  return (
    <JwtContext.Provider value={{ jwt, setJwt }}>
      {children}
    </JwtContext.Provider>
  );
};
