export const getUsers = async () => {
  const response = await fetch("/users");
  return response.json();
};

export const getAccounts = async () => {
  const response = await fetch("/accounts");
  return response.json();
};

export const getCreditCards = async () => {
  const response = await fetch("/creditCards");
  return response.json();
};
