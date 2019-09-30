import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal/Modal";
// import { Redirect } from "react-router-dom";
import DeckGL from "@deck.gl/react";
import { IconLayer } from "@deck.gl/layers";
import { StaticMap } from "react-map-gl";
import busData from "./muni";
import droneData from "./drones";
import busImg from "./bus.svg";
import droneImg from "./drone.svg";
import "./Map.scss";
import "./mapbox-gl.css";

const DRONE_UPDATE_MS = 300;
const moves = 300;
const bounds = {
  lattitudeMin: -122.53867,
  lattitudeMax: -122.36633,
  longitudeMin: 37.705764,
  longitudeMax: 37.836443
};
const maxDeltas = {
  lattitude:
    (Math.abs(bounds.lattitudeMin) - Math.abs(bounds.lattitudeMax)) / moves,
  longitude:
    (Math.abs(bounds.longitudeMin) - Math.abs(bounds.longitudeMax)) / moves
};

console.log(bounds, maxDeltas);

// Initial viewport settings
const initialViewState = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 45,
  bearing: 180
};

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 32, height: 32, mask: true }
};

export default function Map({ user }) {
  const [hovered, setHovered] = useState({});
  const [liveDroneData, setLiveDroneData] = useState(droneData);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      moveDronesAround();
    }, DRONE_UPDATE_MS);
    return () => {
      window.clearInterval(timer); // clear timeout on unmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function moveDronesAround() {
    const newDrones = liveDroneData.map(dronePosition => {
      const coordinates = dronePosition.coordinates;
      const lattitude = coordinates[0];
      const longitude = coordinates[1];
      const newLattitude =
        lattitude + sign() * (Math.random() * maxDeltas.lattitude);
      const newLongitude =
        longitude + sign() * (Math.random() * maxDeltas.longitude);
      return { ...dronePosition, coordinates: [newLattitude, newLongitude] };
    });
    setLiveDroneData(newDrones);
    function sign() {
      return Math.random() < 0.5 ? -1 : 1;
    }
  }

  function Tooltip() {
    // Hover tooltip for iconLayers (bus & drone)
    const { hoveredObject, pointerX, pointerY } = hovered;
    return hoveredObject ? (
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          pointerEvents: "none",
          left: pointerX,
          top: pointerY,
          backgroundColor: "rgba(255, 255, 255, 0.9",
          padding: 4,
          borderRadius: 3
        }}
      >
        <div>Name: {hoveredObject.name}</div>
        {hoveredObject.id && <div>Id: {hoveredObject.id}</div>}
        {hoveredObject.code && <div>Code: {hoveredObject.id}</div>}
      </div>
    ) : (
      <></>
    );
  }

  const busLayer = new IconLayer({
    id: "bus-layer",
    data: busData,
    pickable: true,
    iconMapping: ICON_MAPPING,
    getIcon: d => ({
      url: busImg,
      width: 128,
      height: 128,
      anchorY: 128
    }),
    sizeScale: 15,
    getPosition: d => d.coordinates,
    getSize: 1,
    getColor: d => [Math.sqrt(d.exits), 140, 0],
    onHover: info =>
      setHovered({
        hoveredObject: info.object,
        pointerX: info.x,
        pointerY: info.y
      }),
    onClick: info => {
      console.log("clicked:", info);
      const { code, coordinates, id, name } = info.object;
      setModalContent(
        <div>
          Code: {code}
          <br />
          Id: {id}
          <br />
          Name: {name}
          <br />
          Coordinates: {coordinates[0]} {coordinates[1]}
        </div>
      );
      setModalOpen(true);
    }
  });

  const droneLayer = new IconLayer({
    id: "icon-layer",
    data: liveDroneData,
    pickable: true,
    iconMapping: ICON_MAPPING,
    getIcon: d => ({
      url: droneImg,
      width: 128,
      height: 128,
      anchorY: 128
    }),
    sizeScale: 15,
    getPosition: d => d.coordinates,
    getSize: 5,
    getColor: d => [Math.sqrt(d.exits), 140, 0],
    onHover: info =>
      setHovered({
        hoveredObject: info.object,
        pointerX: info.x,
        pointerY: info.y
      }),
    onClick: info => {
      console.log("clicked:", info);
      const { name, coordinates } = info.object;
      setModalContent(
        <div>
          <h3>DRONE!</h3>
          Name: {name}
          <br />
          Coordinates: {coordinates[0]} {coordinates[1]}
        </div>
      );
      setModalOpen(true);
    }
  });

  const layers = [busLayer, droneLayer];
  return (
    <>
      {/* {!user.name && <Redirect to="/login" />} */}
      <div id="map-page">
        <DeckGL
          initialViewState={initialViewState}
          controller={true}
          layers={layers}
        >
          <StaticMap
            mapboxApiAccessToken={
              "pk.eyJ1Ijoic2NvdHRlNTEwIiwiYSI6ImNrMTVkbmFvbj" +
              "B0dHEzbXRjNDFzMWVmbzkifQ.-9BFMk1pHhJD_z6HthzU0g"
            }
          />
          <Tooltip></Tooltip>
        </DeckGL>
        <Modal
          isOpen={modalOpen}
          setIsOpen={setModalOpen}
          children={modalContent}
        />
      </div>
    </>
  );
}
