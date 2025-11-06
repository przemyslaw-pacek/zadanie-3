import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./api";
import { Header, Table, TableData, TableHeader, TableRow } from "./styled";

function App() {
  const {
    isLoading,
    error,
    data: users,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    retry: false,
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

          {users && (
            <Table>
              <thead>
                <TableRow $header>
                  <TableHeader>id</TableHeader>
                  <TableHeader>name</TableHeader>
                  <TableHeader>email</TableHeader>
                  <TableHeader>gender</TableHeader>
                  <TableHeader>status</TableHeader>
                </TableRow>
              </thead>

              <tbody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableData>{user.id}</TableData>
                    <TableData>{user.name}</TableData>
                    <TableData>{user.email}</TableData>
                    <TableData>{user.gender}</TableData>
                    <TableData>{user.status}</TableData>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </>
  );
}

export default App;
