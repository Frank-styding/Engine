import { App } from "../App";
import { $GameObject } from "../$GameObject";

export type Context<T> = {
  events: Record<string, Function[] | Function>;
  root?: $GameObject;
  data: Record<string, unknown>;
} & T;

export type GlovalContext<T> = {
  events: Record<string, Function[] | Function>;
  lastNodes: Set<string>;
  app?: App;
  data: Record<string, unknown>;
} & T;
