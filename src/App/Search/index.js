import { Input, Wrapper } from "./styled";

function Search({ value, onChange }) {
  return (
    <Wrapper>
      <Input
        placeholder="Wyszukaj użytkownika..."
        value={value}
        onChange={({ target }) => onChange(target.value)}
      />
    </Wrapper>
  );
}
export default Search;
