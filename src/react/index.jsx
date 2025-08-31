import { useState, useEffect, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { getUsers, getAccounts, getCreditCards } from '../client/api/index.js';

// function ErrorFallback({ error, resetErrorBoundary }) {
//   return (
//     <div role="alert">
//       <p>Something went wrong:</p>
//       <pre style={{ color: 'red' }}>{error.message}</pre>
//       <button onClick={resetErrorBoundary}>Try again</button>
//     </div>
//   );
// }

const Hello = () => {
  const [users, setUsers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [creditCards, setCreditCards] = useState([]);

  useEffect(() => {
    getUsers().then(users => {
      setUsers(users);
    });
    getAccounts().then(accounts => {
      setAccounts(accounts);
    });
    getCreditCards().then(creditCards => {
      setCreditCards(creditCards);
    });
  }, []);

  console.log(users, accounts, creditCards);

  return (
    <div>
      <h1>Hello {users.length}</h1>
      <h1>Hello {accounts.length}</h1>
      <h1>Hello {creditCards.length}</h1>
    </div>
  );
};

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <StrictMode>
    <Hello />
  </StrictMode>,
);
