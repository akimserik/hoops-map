import { useEffect, memo } from "react";
import { load } from "@2gis/mapgl";

interface Props {}

const MapWrapper = memo(
  () => {
    return (
      <div id="map-container" style={{ width: "100%", height: "100%" }}></div>
    );
  },
  () => true
);

const Map2gis = (props: Props) => {
  useEffect(() => {
    let map: any;
    load().then((mapglAPI) => {
      // container — id of the div element in your html
      map = new mapglAPI.Map("map-container", {
        center: [55.31878, 25.23584],
        zoom: 13,
        // key: "Your API access key",
      });
    });

    // Destroy the map on unmounted
    return () => map && map.destroy();
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <MapWrapper />
    </div>
  );
};

export default Map2gis;
