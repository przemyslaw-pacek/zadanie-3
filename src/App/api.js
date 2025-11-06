export const getUsers = () =>
  fetch("https://gorest.co.in/public/v2/users").then((response) =>
    response.json()
  );
