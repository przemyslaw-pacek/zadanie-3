import { Table, TableData, TableHeader, TableRow } from "./styled";

function UsersList({ users, filteredUsers }) {
  return (
    <>
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
            {filteredUsers.map((user) => (
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
  );
}

export default UsersList;
