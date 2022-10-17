// Generated by https://quicktype.io

export interface IDirections {
  routes: Route[];
  waypoints: Waypoint[];
  code: string;
  uuid: string;
}

export interface Route {
  country_crossed: boolean;
  weight_name: string;
  weight: number;
  duration: number;
  distance: number;
  legs: Leg[];
  geometry: Geometry;
}

export interface Geometry {
  coordinates: Array<number[]>;
  type: GeometryType;
}

export enum GeometryType {
  LineString = "LineString",
}

export interface Leg {
  via_waypoints: any[];
  admins: Admin[];
  weight: number;
  duration: number;
  steps: Step[];
  distance: number;
  summary: string;
}

export interface Admin {
  iso_3166_1_alpha3: ISO3166_1_Alpha3;
  iso_3166_1: ISO3166_1;
}

export enum ISO3166_1 {
  Co = "CO",
}

export enum ISO3166_1_Alpha3 {
  Col = "COL",
}

export interface Step {
  intersections: Intersection[];
  maneuver: Maneuver;
  name: string;
  duration: number;
  distance: number;
  driving_side: DrivingSide;
  weight: number;
  mode: Mode;
  geometry: Geometry;
  destinations?: string;
  ref?: string;
  rotary_name?: string;
}

export enum DrivingSide {
  Left = "left",
  Right = "right",
  SharpLeft = "sharp left",
  SharpRight = "sharp right",
  SlightLeft = "slight left",
  SlightRight = "slight right",
  Straight = "straight",
}

export interface Intersection {
  bearings: number[];
  entry: boolean[];
  mapbox_streets_v8?: MapboxStreetsV8;
  is_urban?: boolean;
  admin_index: number;
  out?: number;
  geometry_index: number;
  location: number[];
  in?: number;
  duration?: number;
  turn_weight?: number;
  turn_duration?: number;
  weight?: number;
  traffic_signal?: boolean;
  classes?: ClassElement[];
  toll_collection?: TollCollection;
  railway_crossing?: boolean;
  lanes?: Lane[];
}

export enum ClassElement {
  Toll = "toll",
  Tunnel = "tunnel",
}

export interface Lane {
  indications: DrivingSide[];
  valid: boolean;
  active: boolean;
  valid_indication?: DrivingSide;
}

export interface MapboxStreetsV8 {
  class: MapboxStreetsV8Class;
}

export enum MapboxStreetsV8Class {
  Primary = "primary",
  PrimaryLink = "primary_link",
  Roundabout = "roundabout",
  Secondary = "secondary",
  SecondaryLink = "secondary_link",
  Street = "street",
  Tertiary = "tertiary",
  TertiaryLink = "tertiary_link",
  Trunk = "trunk",
  TrunkLink = "trunk_link",
}

export interface TollCollection {
  name?: string;
  type: TollCollectionType;
}

export enum TollCollectionType {
  TollBooth = "toll_booth",
}

export interface Maneuver {
  type: string;
  instruction: string;
  bearing_after: number;
  bearing_before: number;
  location: number[];
  modifier?: DrivingSide;
  exit?: number;
}

export enum Mode {
  Driving = "driving",
}

export interface Waypoint {
  distance: number;
  name: string;
  location: number[];
}