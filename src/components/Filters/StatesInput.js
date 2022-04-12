import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import APIConfig from "../../helpers/api/config";

function StatesInput(props) {
  const { value, handleChange } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    axios(APIConfig("get", "/get_active_states")).then((response) => {
      if (response.status === 200) {
        setData(response.data);
      }
    });
  }, []);

  return (
    <Form.Group controlId="state">
      <Form.Select
        name="state"
        value={value}
        onChange={handleChange}
        className="ts-input"
      >
        <option value="">State</option>
        {data.map(({ state }) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}

export default StatesInput;
