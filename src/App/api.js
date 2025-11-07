const url_api = "https://gorest.co.in/public/v2/users";

const token =
  "f41868580b670213df3f2f2ea90673259682be3e9f8ef5d079b27290d2e1b1d6";

export const getUsers = () =>
  fetch(url_api).then((response) => response.json());

export const editUser = (id, editData) =>
  fetch(`${url_api}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(editData),
  }).then((response) => response.json());
