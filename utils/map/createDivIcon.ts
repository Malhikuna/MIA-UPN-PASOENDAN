import React from "react";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";

export const createDivIcon = (html: React.ReactNode, size: [number, number], anchor: [number, number], popupAnchor: [number, number]) =>
  L.divIcon({
    html: ReactDOMServer.renderToString(html),
    iconSize: size,
    iconAnchor: anchor,
    popupAnchor,
  });