import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./api";
import { Header } from "./styled";
import Search from "./Search";
import UsersList from "./UsersList";

function App() {
  const [filteredUsers, setFilteredUsers] = useState([]);

  const {
    isLoading,
    error,
    data: users,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    retry: true,
  });

  return (
    <>
      {isLoading ? (
        <Header>
          <p>Ładowanie...</p>
          <p>Pobieranie danych z serwera.</p>
        </Header>
      ) : error ? (
        <Header $error>
          <p>Coś poszło nie tak.</p>
          <p>Brak połączenia z serwerem.</p>
          <p>Spróbuj ponownie!</p>
        </Header>
      ) : (
        <>
          <Header>Lista użytkowników</Header>
          <Search users={users} onFiltered={setFilteredUsers} />
          {filteredUsers.length === 0 ? (
            <Header $error>Brak wyników</Header>
          ) : (
            <UsersList users={filteredUsers} />
          )}
        </>
      )}
    </>
  );
}

export default App;
