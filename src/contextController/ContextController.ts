import { App } from "../app/App";
import { $Scene } from "../nodes/$Scene";
import { $NodeBase } from "../nodes/$NodeBase";

type ContextData<T> = Record<string, any> & T;

type Context<T = {}> = {
  events: Record<string, Function>;
  multiEvents: Record<string, Function[]>;
  data: ContextData<T>;
};

type NodeData = {
  nodes: Record<string, $NodeBase>;
  updatedTransformNodes: Set<string>;
  scene: $Scene;
  app: App;
};

export class ContextController<T extends {} = {}> {
  private prevContext?: Context;

  private data: Context<T> = {
    events: {},
    multiEvents: {},
    data: {} as ContextData<T>,
  };

  private glovalData: Context<NodeData & T> = {
    events: {},
    multiEvents: {},
    data: { nodes: {}, updatedTransformNodes: new Set() } as ContextData<
      NodeData & T
    >,
  };

  callEvent(name: string, ...args: any[]) {
    const func = this.data.events[name];
    if (!func) return;
    return func(...args);
  }

  registerEvent(name: string, callback: Function) {
    if (!this.data.events[name]) return;
    this.data.events[name] = callback;
  }

  callMultiEvent(name: string, ...args: any[]) {
    this.data.multiEvents[name] ||= [];
    this.data.multiEvents[name].forEach((func) => func(...args));
  }

  registerMultiEvent(name: string, func: Function) {
    this.data.multiEvents[name] ||= [];
    this.data.multiEvents[name].push(func);
  }

  connectContext(node: $NodeBase) {
    node.context.data = this.data;
  }

  connectGlovalContext(node: $NodeBase) {
    node.context.glovalData = this.glovalData;
  }

  connectPrevContext(node: $NodeBase) {
    node.context.prevContext = this.data;
  }

  registerNode(node: $NodeBase) {
    this.glovalData.data.nodes[node.id] = node;
  }

  getNode(id: string): $NodeBase {
    return this.glovalData.data.nodes[id];
  }

  registerUpdatedTransform(node: $NodeBase) {
    this.glovalData.data.updatedTransformNodes.add(node.id);
  }

  getUpdatedTransforms() {
    return this.glovalData.data.updatedTransformNodes;
  }

  registerScene(scene: $Scene) {
    this.glovalData.data.scene = scene;
  }

  registerApp(app: App) {
    this.glovalData.data.app = app;
  }
}
