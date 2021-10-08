import { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface Props {
  addNewHoop: Function;
  coords: Number[];
}

const FormNewHoops = (props: Props) => {
  const [hoopName, setHoopName] = useState("");
  const [hoopLocation, setHoopLocation] = useState("");

  const onAddClick = (e: any) => {
    e.preventDefault();
    props.addNewHoop({ hoopName, hoopLocation });
  };

  useEffect(() => {
    if (props.coords.length > 0) setHoopLocation(props.coords.join(","));
  }, [props.coords]);

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formGroupTitle">
        <Form.Label>Название или адрес</Form.Label>
        <Form.Control
          type="text"
          placeholder="Название или адрес"
          value={hoopName}
          onChange={(e) => setHoopName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupCoordinates">
        <Form.Label>Координаты</Form.Label>
        <Form.Control
          type="text"
          placeholder="[43.227411, 76.941055]"
          value={hoopLocation}
          onChange={(e) => setHoopLocation(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={onAddClick}>
        Добавить
      </Button>
    </Form>
  );
};

export default FormNewHoops;
