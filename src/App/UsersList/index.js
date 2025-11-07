import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, TableHeader, TableRow, TableData } from "./styled";
import { editUser } from "../api";

function UsersList({ users }) {
  const [edit, setEdit] = useState({ id: null, field: "", value: "" });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, updated }) => editUser(id, updated),
    onSuccess: (data) => {
      queryClient.setQueryData(["users"], (old) =>
        old.map((user) => (user.id === data.id ? data : user))
      );
      setEdit({ id: null, field: "", value: "" });
    },
  });

  const saveEdit = () => {
    if (!edit.value.trim()) return;
    mutation.mutate({ id: edit.id, updated: { [edit.field]: edit.value } });
  };

  const renderCell = (user, field) => {
    const isEditing = edit.id === user.id && edit.field === field;
    if (!isEditing)
      return (
        <span
          onClick={() => setEdit({ id: user.id, field, value: user[field] })}
        >
          {user[field]}
        </span>
      );

    if (field === "gender" || field === "status") {
      const options =
        field === "gender" ? ["male", "female"] : ["active", "inactive"];
      return (
        <select
          value={edit.value}
          onChange={({ target }) =>
            setEdit((prev) => ({ ...prev, value: target.value }))
          }
          onBlur={saveEdit}
          autoFocus
        >
          {options.map((optionValue) => (
            <option key={optionValue}>{optionValue}</option>
          ))}
        </select>
      );
    }

    return (
      <input
        value={edit.value}
        onChange={({ target }) =>
          setEdit((prev) => ({ ...prev, value: target.value }))
        }
        onBlur={saveEdit}
        onKeyDown={(event) => event.key === "Enter" && saveEdit()}
        autoFocus
      />
    );
  };

  return (
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
            {["name", "email", "gender", "status"].map((fieldName) => (
              <TableData key={fieldName}>
                {renderCell(user, fieldName)}
              </TableData>
            ))}
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}

export default UsersList;
