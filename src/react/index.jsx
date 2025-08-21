import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { getUsers, getAccounts, getCreditCards } from "../client/api/index.js";

const Hello = () => {
  const [users, setUsers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [creditCards, setCreditCards] = useState([]);

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
    });
    getAccounts().then((accounts) => {
      setAccounts(accounts);
    });
    getCreditCards().then((creditCards) => {
      setCreditCards(creditCards);
    });
  }, []);

  return (
    <div>
      <h1>Hello {users.length}</h1>
      <h1>Hello {accounts.length}</h1>
      <h1>Hello {creditCards.length}</h1>
    </div>
  );
};

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(
  <StrictMode>
    <Hello />
  </StrictMode>
);
