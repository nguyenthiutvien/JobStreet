import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

const Map = ({ userAddress, companyAddress }) => {
  const userPosition = [userAddress.lat, userAddress.lng];
  const companyPosition = [companyAddress.lat, companyAddress.lng];

  return (
    <MapContainer
      center={userPosition}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
      />

      <Marker position={userPosition} />
      <Marker position={companyPosition} />
    </MapContainer>
  );
};

export default Map;
