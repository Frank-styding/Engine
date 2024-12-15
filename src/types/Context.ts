import { App } from "../App";
import { $GameObject } from "../components/$GameObject";

export type Context<T> = {
  events: Record<string, Function[]>;
  root?: $GameObject;
  data: Record<string, unknown>;
} & T;
export type GlovalContext<T> = {
  events: Record<string, Function[]>;
  app?: App;
  data: Record<string, unknown>;
} & T;
