import { $Node } from "./$Node";
import { $Scene } from "./$Scene";
import { Context, GlovalContext } from "./types/Context";
import { ID } from "./types/ID";
import { generateUUID } from "./utils/generateUUID";
export class $GameObject<T extends {} = {}> {
  static Type: string = "GameObject";

  public name: string;
  public type: string;
  public parent?: $GameObject;
  public children: $GameObject[];
  public id: ID;

  public isStatic: boolean;
  public isRootObject: boolean;

  public wasInitialized: boolean;
  public isReady: boolean;
  public wasUpdated: boolean;

  public context: Context<T>;
  public parentContext?: Context<T>;
  public glovalContext: GlovalContext<T>;

  public treeIdx: number;

  constructor(name: string) {
    this.type = $GameObject.Type;
    this.name = name;
    this.id = generateUUID();
    this.children = [];
    this.isStatic = false;
    this.isRootObject = false;
    this.isReady = false;
    this.wasInitialized = false;
    this.wasUpdated = true;
    this.treeIdx = 0;
    this.context = { events: {}, data: {} } as Context<T>;
    this.glovalContext = {
      events: {},
      data: {},
      nodes: {},
    } as GlovalContext<T>;
  }

  protected _init() {
    this.init();
  }
  protected _ready() {
    this.ready();
  }
  protected _update(t: number) {
    this.update(t);
  }
  protected _initEvents() {
    this.initEvents();
  }
  protected _invInit() {
    this.invInit();
  }

  protected _childsUpdated(t: number) {}

  invInit() {} // called from the top to end
  init() {}
  ready() {}
  update(t: number) {
    this.wasUpdated = false;
  }
  initEvents() {}
  draw(ctx: CanvasRenderingContext2D) {}

  addChild(children: $GameObject[] | $GameObject) {
    if (!Array.isArray(children)) {
      children = [children];
    }
    for (let i = 0; i < children.length; i++) {
      children[i].parent = this;
      children[i].glovalContext = this.glovalContext;
      if (!children[i].isRootObject) {
        children[i].context = this.context;
      }
    }
    this.children.push(...children);
    if (!this.wasInitialized) return;
    for (let i = 0; i < children.length; i++) {
      $GameObject.init(children[i]);
    }
  }

  remove() {
    if (!this.parent) return;
    this.parent.children = this.parent.children.filter(
      (child) => child.id != this.id
    );
    this.parent = undefined;
  }

  static init(object: $GameObject) {
    const list = [object];
    let idx = 0;
    while (idx < list.length) {
      const obj = list[idx] as $GameObject;
      obj.glovalContext = object.glovalContext;
      idx++;
      obj._invInit();
      if (!obj.isRootObject && obj.children.length > 0 && !obj.wasInitialized) {
        obj.context = object.context;
        for (let i = 0; i < obj.children.length; i++) {
          obj.children[i].treeIdx = obj.treeIdx + 1;
          list.push(obj.children[i]);
        }
      }
    }
    list.reverse();
    for (let i = 0; i < list.length; i++) {
      const obj = list[i] as $GameObject;
      if (!obj.isRootObject || (obj.isRootObject && obj.id == object.id)) {
        obj._init();
        obj._initEvents();
        obj.wasInitialized = true;
      } else {
        obj.parentContext = object.context;
        this.init(obj);
      }
    }
    for (let i = 0; i < list.length; i++) {
      const obj = list[i] as $GameObject;
      obj.glovalContext["nodes"][obj.id] = obj as $Node;
      if (!obj.isReady) {
        obj._ready();
        obj.isReady = true;
      }
    }
  }

  static update(t: number, object: $GameObject) {
    const list = [object];
    const updatedObjects = [];
    while (list.length > 0) {
      const obj = list.shift() as $GameObject;
      if (!obj.isStatic && obj.wasUpdated) {
        updatedObjects.unshift(obj);
      }
      list.push(...obj.children);
    }
    const memory = new Set();
    for (let i = 0; i < updatedObjects.length; i++) {
      const obj = updatedObjects[i] as $GameObject;
      let parent: $GameObject | undefined = obj;
      if (!memory.has(obj)) {
        memory.add(parent);
        parent._update(t);
        if (parent instanceof $Scene) {
          for (let camera of parent.parents) {
            memory.add(camera);
            parent._update(t);
          }
        }
        parent = parent.parent;
      }
      while (parent != undefined) {
        if (memory.has(parent)) {
          break;
        }
        memory.add(parent);
        parent._update(t);
        parent._childsUpdated(t);
        if (parent instanceof $Scene) {
          for (let camera of parent.parents) {
            memory.add(camera);
            parent._update(t);
          }
        }
        parent = parent.parent;
      }
    }
  }
}
