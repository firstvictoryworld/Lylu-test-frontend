import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { IInvoice } from '../resources/interfaces';

interface IAppContext {
  invoices: IInvoice[];
  setInvoices: (value: IInvoice[]) => void;
  addInvoice: (invoice: IInvoice) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const AppContext = createContext<IAppContext>({
  invoices: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setInvoices: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addInvoice: () => {},
  darkMode: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDarkMode: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const addInvoice = (invoice: IInvoice) => {
    setInvoices([
      ...invoices,
      invoice
    ]);
  }

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark')
      setDarkMode(false);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        invoices,
        setInvoices,
        addInvoice,
        darkMode,
        setDarkMode
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppState = () => {
  return useContext(AppContext);
};