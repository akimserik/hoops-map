import { YMaps, Map, Placemark } from "react-yandex-maps";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface Props {}

const MapPage = (props: Props) => {
  return (
    <Container fluid style={{ height: "100%" }}>
      <Row style={{ height: "100%" }}>
        <Col style={{ height: "100%" }}>
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
            >
              <Placemark
                modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
                defaultGeometry={[43.227411, 76.941055]}
                properties={{
                  balloonContent: "цвет",
                  // hintContent: "цвет",
                }}
                balloonopen={() => {
                  console.log("click");
                }}
              />
            </Map>
          </YMaps>
        </Col>
      </Row>
    </Container>
  );
};

export default MapPage;
