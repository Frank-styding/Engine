import { App } from "../App";
import { $Node } from "src/$Node";
import { $Scene } from "src/$Scene";

export type Context<T> = {
  events: Record<string, Function[] | Function>;
  data: Record<string, unknown>;
} & T;

export type GlovalContext<T> = {
  events: Record<string, Function[] | Function>;
  lastNodes: Set<string>;
  nodes: Record<string, $Node>;
  app?: App;
  scene?: $Scene;
  data: Record<string, unknown>;
} & T;
