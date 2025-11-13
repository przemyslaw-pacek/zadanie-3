import { useSearchParams } from "react-router-dom";
import { Input, Wrapper } from "./styled";
import { useEffect } from "react";

function Search({ users, onFiltered }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchUser = searchParams.get("szukaj") || "";

  function onChange(value) {
    if (value) setSearchParams({ szukaj: value });
    else setSearchParams({});
  }

  useEffect(() => {
    const filtered = users
      ? users.filter((user) => {
          const query = (searchUser || "").toLowerCase();
          return (
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.gender.toLowerCase().includes(query) ||
            String(user.id).includes(query)
          );
        })
      : [];
    onFiltered(filtered);
  }, [searchUser, users, onFiltered]);

  return (
    <Wrapper>
      <Input
        placeholder="Wyszukaj użytkownika..."
        value={searchUser}
        onChange={({ target }) => onChange(target.value)}
      />
    </Wrapper>
  );
}
export default Search;
