import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import MailList from './components/MailList';
import './styles/styles.css';
function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <MailList />
      </Container>
    </>
  );
}

export default App;