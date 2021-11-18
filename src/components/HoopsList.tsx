import React from "react";
import { Card, Container, Row } from "react-bootstrap";

interface Props {
  hoops: any[];
}

const HoopsList = React.memo((props: Props) => {
  return (
    <Container style={{ maxHeight: "100%", overflowY: "auto" }}>
      {props.hoops.map((hoop) => {
        const { name, location, images } = hoop.data();
        return (
          <Row key={hoop.id} className="mb-3">
            <Card>
              <Card.Img
                variant="top"
                src={images[0].url}
                style={{
                  paddingTop: "0.7rem",
                  maxHeight: "15rem",
                  objectFit: "contain",
                }}
              />
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{location}</Card.Text>
              </Card.Body>
            </Card>
          </Row>
        );
      })}
    </Container>
  );
});

export default HoopsList;
