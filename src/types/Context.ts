import { App } from "../App";
import { $GameObject } from "../$GameObject";
import { $Node } from "src/$Node";

export type Context<T> = {
  events: Record<string, Function[] | Function>;
  scene?: $GameObject;
  data: Record<string, unknown>;
} & T;

export type GlovalContext<T> = {
  events: Record<string, Function[] | Function>;
  lastNodes: Set<string>;
  nodes: Record<string, $Node>;
  app?: App;
  data: Record<string, unknown>;
} & T;
