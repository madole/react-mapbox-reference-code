import { Feature, featureCollection, FeatureCollection } from "@turf/helpers";

const DATA_URL = "https://opensky-network.org/api/states/all";

const AUSTRALIA_BOUNDING_BOX_QUERY =
  "?lamin=-45.1&lomin=110.0&lamax=-8.7&lomax=160.5";

const AUSTRALIA_AIR_TRAFFIC = DATA_URL + AUSTRALIA_BOUNDING_BOX_QUERY;

export interface Aircraft {
  icao24: string;
  callsign: string;
  origin_country: string;
  time_position: number;
  last_contact: number;
  longitude: number;
  latitude: number;
  baro_altitude: number;
  on_ground: boolean;
  velocity: number;
  true_track: number;
  geo_altitude: number;
  vertical_rate: boolean;
  sensors: number[];
  squawk: string;
  spi: boolean;
  position_source: number;
}

type AircraftRaw = [
  string,
  string,
  string,
  number,
  number,
  number,
  number,
  number,
  boolean,
  number,
  number,
  number,
  boolean,
  number[],
  string,
  boolean,
  number
];

export const fetchAirTraffic = () =>
  fetch(AUSTRALIA_AIR_TRAFFIC)
    .then((response) => response.json())
    .then((data) => {
      const { states } = data;
      const aircraft: Aircraft[] = states.map((state: AircraftRaw) => {
        const [
          icao24,
          callsign,
          origin_country,
          time_position,
          last_contact,
          longitude,
          latitude,
          baro_altitude,
          velocity,
          true_track,
          vertical_rate,
          geo_altitude,
          position_source,
        ] = state;
        return {
          icao24,
          callsign,
          origin_country,
          longitude,
          latitude,
          time_position,
          last_contact,
          baro_altitude,
          velocity,
          true_track,
          vertical_rate,
          geo_altitude,
          position_source,
        };
      });
      const geoJSONFeatures: Feature[] = aircraft.map((aircraft) => {
        const { longitude, latitude } = aircraft;
        return {
          type: "Feature",
          properties: {
            ...aircraft,
          },
          geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
        };
      });
      return featureCollection(geoJSONFeatures);
    });
