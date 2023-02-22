import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navigate, Route, Routes } from 'react-router-dom';
import FullLayout from './layouts/FullLayout';
import Invoices from './pages/Invoices';
import InvoiceDetail from './pages/InvoiceDetail';
import { ROUTES } from './constants';
import { AppProvider } from './providers/AppProvider';

const App = () => {
  return (
    <AppProvider>
      <FullLayout>
        <BrowserRouter>
          <Routes>
            <Route path={ROUTES.INVOICES.INDEX} element={<Invoices />} />
            <Route path={ROUTES.INVOICES.DETAIL} element={<InvoiceDetail />} />

            <Route path="*" element={<Navigate to={ROUTES.INVOICES.INDEX} />} />
          </Routes>
        </BrowserRouter>
      </FullLayout>
    </AppProvider>
  );
};

export default App;