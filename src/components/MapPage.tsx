import { useState } from "react";

import { YMaps, Map, Placemark } from "react-yandex-maps";

// import Map2gis from "./Map2gis";

import FormNewHoops from "./FormNewHoops";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

interface Props {}

const MapPage = (props: Props) => {
  const [hoops, setHoops] = useState([
    {
      id: 1,
      name: "Hoop1",
      location: [43.227411, 76.941055],
    },
    {
      id: 2,
      name: "Hoop2",
      location: [43.228415, 76.943061],
    },
  ]);

  const [coords, setCoords] = useState([]);

  const addNewHoop = (newValue: { hoopName: string; hoopLocation: string }) => {
    setHoops((prevState) => [
      ...prevState,
      {
        id: prevState.length + 1,
        name: newValue.hoopName,
        location: newValue.hoopLocation.split(",").map((el) => parseFloat(el)),
      },
    ]);
  };

  const onMapClick = (e: any) => {
    e.preventDefault();
    setCoords(e.get("coords"));
  };

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col className="mt-3">
          <FormNewHoops addNewHoop={addNewHoop} coords={coords} />
        </Col>
        <Col lg={8} style={{ padding: "2rem", position: "relative" }}>
          <YMaps>
            <Map
              width="100%"
              height="100%"
              defaultState={{
                center: [43.227411, 76.941055],
                zoom: 14,
                controls: ["zoomControl", "fullscreenControl"],
              }}
              modules={["control.ZoomControl", "control.FullscreenControl"]}
              onClick={onMapClick}
            >
              {hoops.map((hoop) => {
                return (
                  <Placemark
                    key={hoop.id}
                    modules={[
                      "geoObject.addon.balloon",
                      "geoObject.addon.hint",
                    ]}
                    defaultGeometry={hoop.location}
                    properties={{
                      balloonContent: hoop.name,
                    }}
                  />
                );
              })}
            </Map>
          </YMaps>
          <Button style={{ position: "absolute", top: 40, left: 45 }}>
            Добавить площадку
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default MapPage;
