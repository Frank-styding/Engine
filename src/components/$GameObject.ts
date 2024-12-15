import { Context, GlovalContext } from "../types/Context";
import { GameObjectType } from "../types/GameObjectType";
import { ID } from "../types/ID";
import { generateUUID } from "../utils/generateUUID";

export class $GameObject<T extends {} = {}> {
  static Type: GameObjectType = "GameObject";
  static objects: Record<string, $GameObject> = {};

  public name: string;
  public type: GameObjectType;
  public parent?: $GameObject;
  public children: $GameObject[];
  public id: ID;

  public isStatic: boolean;
  public isRootObject: boolean;

  public isInitialized: boolean;
  public isReady: boolean;
  public isUpdated: boolean;

  public context: Context<T>;
  public glovalContext: GlovalContext<T>;

  public treeIdx: number;

  constructor(name: string, type?: GameObjectType) {
    this.type = type || $GameObject.Type;
    this.name = name;
    this.id = generateUUID();
    this.children = [];
    this.isStatic = false;
    this.isRootObject = false;
    this.isReady = false;
    this.isInitialized = false;
    this.isUpdated = false;
    this.treeIdx = 0;
    this.context = { events: {}, data: {} } as Context<T>;
    this.glovalContext = { events: {}, data: {} } as GlovalContext<T>;
    $GameObject.objects[this.id] = this;
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

  invInit() {} // called from the top to end
  init() {}
  ready() {}
  update(t: number) {}
  initEvents() {}

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
    if (this.isInitialized) {
      for (let i = 0; i < children.length; i++) {
        $GameObject.init(children[i]);
      }
    }
  }

  remove() {
    if (this.parent) {
      this.parent.children = this.parent.children.filter(
        (child) => child.id != this.id
      );
      this.parent = undefined;
    }
  }

  static init(object: $GameObject) {
    const list = [object];
    let idx = 0;
    while (idx < list.length) {
      const obj = list[idx] as $GameObject;
      obj.glovalContext = object.glovalContext;
      idx++;
      obj._invInit();
      if (!obj.isRootObject && obj.children.length > 0 && !obj.isInitialized) {
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
        obj.isInitialized = true;
      } else {
        this.init(obj);
      }
    }
    for (let i = 0; i < list.length; i++) {
      const obj = list[i] as $GameObject;
      if (!obj.isReady) {
        obj._ready();
        obj.isReady = true;
      }
    }
  }

  static update(t: number, object: $GameObject) {
    const list = [object];
    while (list.length > 0) {
      const obj = list.shift() as $GameObject;
      if (!obj.isStatic && !obj.isUpdated) {
        obj._update(t);
        list.push(...obj.children);
      }
    }
  }
}
