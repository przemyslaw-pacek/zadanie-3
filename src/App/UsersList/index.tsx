import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, TableHeader, TableRow, TableData } from "./styled";
import { editUser } from "../api";
import { User } from "../types";

interface UsersListProps {
  users: User[];
}

interface EditState {
  id: number | null;
  field: keyof User | "";
  value: string;
}

function UsersList({ users }: UsersListProps) {
  const [edit, setEdit] = useState<EditState>({
    id: null,
    field: "",
    value: "",
  });
  const queryClient = useQueryClient();

  const mutation = useMutation<
    User,
    Error,
    { id: number | null; updated: Partial<User> }
  >({
    mutationFn: ({ id, updated }) => editUser(id as number, updated),
    onSuccess: (data) => {
      queryClient.setQueryData<User[]>(["users"], (old = []) =>
        old.map((user) => (user.id === data.id ? data : user))
      );
      setEdit({ id: null, field: "", value: "" });
    },
  });

  const saveEdit = () => {
    if (!edit.value.trim()) return;
    mutation.mutate({ id: edit.id, updated: { [edit.field]: edit.value } });
  };

  const renderCell = (user: User, field: keyof User) => {
    const isEditing = edit.id === user.id && edit.field === field;
    if (!isEditing) return String(user[field]);

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
          onClick={(event) => event.stopPropagation()}
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
        onClick={(event) => event.stopPropagation()}
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

            {(["name", "email", "gender", "status"] as (keyof User)[]).map(
              (fieldName) => (
                <TableData
                  key={fieldName}
                  onClick={() =>
                    setEdit({
                      id: user.id,
                      field: fieldName,
                      value: String(user[fieldName]),
                    })
                  }
                >
                  {renderCell(user, fieldName)}
                </TableData>
              )
            )}
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}

export default UsersList;
