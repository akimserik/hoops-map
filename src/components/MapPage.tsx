import { useContext, useState, useEffect, useCallback } from "react";

import { YMaps, Map, Placemark } from "react-yandex-maps";

import FormNewHoop from "./NewHoop";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";

import HoopsList from "./HoopsList";

import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface Props {}

const MapPage = (props: Props) => {
  const { auth, db } = useContext(Context);
  const [user] = useAuthState(auth);
  const [hoopsData, setHoopsData] = useState<any[]>([]);
  const [coords, setCoords] = useState([]);
  const [mode, setMode] = useState("list");

  const loadHoops = useCallback(async () => {
    const hoopsSnapshot = await getDocs(collection(db, "hoops"));
    setHoopsData(hoopsSnapshot.docs);
  }, [db]);

  useEffect(() => {
    loadHoops();
  }, [loadHoops]);

  const addNewHoop = async (newValue: {
    hoopName: string;
    hoopLocation: string;
    hoopImagesURLs: any[];
  }) => {
    try {
      const newHoopObj = {
        name: newValue.hoopName,
        location: newValue.hoopLocation.split(",").map((el) => parseFloat(el)),
        images: newValue.hoopImagesURLs,
        createdBy: user.email,
        createdAt: serverTimestamp(),
      };
      const docRef = await addDoc(collection(db, "hoops"), newHoopObj);
      console.log("Document written with ID: ", docRef.id);
      loadHoops();
      setMode("list");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const onMapClick = (e: any) => {
    e.preventDefault();
    setCoords(e.get("coords"));
  };

  return (
    <Container fluid className="h-100">
      <Row className="h-100" style={{ maxHeight: "100%" }}>
        <Col style={{ padding: "1rem", maxHeight: "100%", overflowY: "auto" }}>
          {mode === "list" ? (
            <HoopsList hoops={hoopsData} />
          ) : (
            <FormNewHoop
              addNewHoop={addNewHoop}
              coords={coords}
              backToList={() => {
                setMode("list");
              }}
            />
          )}
        </Col>
        <Col lg={9} style={{ padding: "1rem", position: "relative" }}>
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
              {hoopsData.map((hoop) => {
                const { name, location } = hoop.data();

                return (
                  <Placemark
                    key={hoop.id}
                    modules={[
                      "geoObject.addon.balloon",
                      "geoObject.addon.hint",
                    ]}
                    defaultGeometry={location}
                    properties={{
                      balloonContent: name,
                    }}
                  />
                );
              })}
            </Map>
          </YMaps>
          <OverlayTrigger
            overlay={
              <Tooltip>
                {user ? "Добавить новую площадку" : "Авторизуйтесь"}
              </Tooltip>
            }
          >
            <Button
              variant={user ? "primary" : "secondary"}
              style={{ position: "absolute", top: 40, left: 45 }}
              onClick={() => user && setMode("new")}
            >
              Добавить площадку
            </Button>
          </OverlayTrigger>
        </Col>
      </Row>
    </Container>
  );
};

export default MapPage;
