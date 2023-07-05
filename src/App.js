import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/Assets/helper/_font.scss'
import CampForm from './pages/CampForm'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';
import Payment from './pages/Payment';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<CampForm />} />
        <Route path='/payment' element={<Payment />} />
      </Routes>

    </QueryClientProvider>
  )
}

export default App