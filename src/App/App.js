import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./api";
import { Header } from "./styled";
import Search from "./Search";
import UsersList from "./UsersList";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchUser = searchParams.get("szukaj") || "";

  const {
    isLoading,
    error,
    data: users,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    retry: false,
  });

  const filteredUsers = users
    ? users.filter((user) => {
        const query = searchUser.toLowerCase();
        return (
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.gender.toLowerCase().includes(query) ||
          user.status.toLowerCase().includes(query) ||
          String(user.id).includes(query) // 👈 id też porównujemy jako string
        );
      })
    : [];

  function onSearchChange(value) {
    if (value) {
      setSearchParams({ szukaj: value });
    } else {
      setSearchParams({});
    }
  }

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
          <Search value={searchUser} onChange={onSearchChange} />
          <UsersList users={users} filteredUsers={filteredUsers} />
        </>
      )}
    </>
  );
}

export default App;
