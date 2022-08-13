import { React, useState } from "react";
import { Form, Segment } from "semantic-ui-react";

const SearchBar = (props) => {
  const [term, setTerm] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    props.onTermSubmit(term);
  };

  const onInputChange = (e) => {
    setTerm(e.target.value);
  };

  return (
    <Segment>
      <Form onSubmit={onFormSubmit}>
        <Form.Input
          label="Location"
          type="text"
          placeholder="Enter a city/state/school name"
          value={term}
          onChange={onInputChange}
        />
      </Form>
    </Segment>
  );
};

export default SearchBar;
