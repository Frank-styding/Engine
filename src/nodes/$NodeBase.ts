import { generateUUID } from "src/util/generateUUID";
import { init } from "./methods/init";
import { ContextController } from "../contextController/ContextController";

export class $NodeBase<T extends {} = {}> {
  static readonly type: string = "NodeBase";

  readonly id = generateUUID();
  type: string = $NodeBase.type;
  parent?: $NodeBase;
  children: $NodeBase[] = [];
  context: ContextController<T> = new ContextController();

  //*
  isInit: boolean = false;
  isReady: boolean = false;
  wasUpdated: boolean = true;
  isStatic: boolean = false;
  isRoot: boolean = false;
  treeIdx: number = 0;
  //*

  constructor(public readonly name: string) {}

  // #region
  init() {}
  initEvents() {}

  protected _init() {
    this.init();
    this.initEvents();
  }

  static _init(node: $NodeBase) {
    node._init();
  }

  ready() {}
  protected _ready() {
    this.ready();
  }

  static _ready(node: $NodeBase) {
    node._ready();
  }

  update(t: number) {}
  protected _update(t: number) {
    this.update(t);
  }

  static _update(node: $NodeBase, t: number) {
    node._update(t);
  }

  reverseInit() {}
  protected _reverseInit() {
    this.reverseInit();
  }

  static _reverseInit(node: $NodeBase) {
    node._reverseInit();
  }

  protected _childsUpdated() {}

  static _childsUpdated(node: $NodeBase) {
    node._childsUpdated();
  }

  //#endregion

  addChild(children: $NodeBase | $NodeBase[]) {
    if (!Array.isArray(children)) children = [children];
    for (let child of children) {
      child.parent = this;
      this.children.push(child);
      if (this.isInit) {
        init(child);
      }
    }
  }

  remove() {
    if (!this.parent) return;
    const children = this.parent.children;
    children.splice(children.indexOf(this), 1);
    this.parent = undefined;
  }

  findChild(path: string) {
    const indices = path.split("/");
    let idx = 0;
    let obj: $NodeBase = this;

    while (idx < indices.length) {
      let prev = obj;
      for (let node of obj.children) {
        if (node.name == indices[idx]) {
          obj = node;
          idx++;
        }
      }
      if (prev.id == obj.id) {
        break;
      }
    }

    if (obj.name != indices[idx][-1]) {
      return undefined;
    }
    return obj;
  }
}
