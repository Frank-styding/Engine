import { MatrixState } from "./math/MatrixState";
import { VectorState } from "./math/VectorState";
import { ID } from "./types/ID";
import { generateUUID } from "./utils/generateUUID";

export namespace Engine {
  export class Box {
    public width: number = 0;
    public height: number = 0;
    constructor(public node: Node) {}
  }
  export class Transform {
    parentTransform: MatrixState = new MatrixState();
    model: MatrixState = new MatrixState();
    glovalTransform: MatrixState = new MatrixState();
    position: VectorState = new VectorState();
    projecion: MatrixState = new MatrixState();

    constructor(node: Node) {
      this.model.updateCallback = () => {
        node.glovalContext.data.updatedNodeTransforms.add(node.id);
        node.wasUpdated = true;
      };
      this.projecion.updateCallback = () => {
        node.glovalContext.data.updatedNodeTransforms.add(node.id);
        node.wasUpdated = true;
      };
      this.position.updateCallback = () => {
        this.model.setPosition(this.position);
      };
    }

    update() {
      if (!this.parentTransform.isUpdated || !this.model.isUpdated) {
        this.parentTransform.update();
        this.model.update();
        this.position.copy(this.model.getTranslation(), false);
        const m = this.parentTransform
          .clone()
          .mul(this.model)
          .mul(this.projecion);
        if (!this.glovalTransform.equal(m)) {
          this.glovalTransform.copy(m);
          return true;
        }
        return false;
      }
    }
  }
  export interface Context<T extends {}> {
    events: Record<string, Function[] | []>;
    data: Record<string, unknown> & T;
  }

  export interface GlovalContext<T extends {}> {
    events: Record<string, Function[] | []>;
    data: Record<string, unknown> & T;
    lastNodes: Set<string>;
    nodes: Record<string, NodeBase>;
    //! app?: App;
    //! root?: Root;
  }

  export class NodeBase<T extends {} = {}> {
    static readonly Type: string = "NodeBase";
    //*  node
    name: string;
    type: string;
    children: NodeBase[];
    parent?: NodeBase;
    id: ID;
    isStatic: boolean;
    isRoot: boolean;
    //* control attributes
    isInit: boolean;
    isReady: boolean;
    wasUpdated: boolean;
    //* context
    context!: Context<T>;
    glovalContext!: GlovalContext<T>;

    //* parent context to root nodes
    prevContext?: Context<T>;
    //* tree attributes
    treeIdx: number;
    constructor(name: string) {
      this.type = NodeBase.Type;
      this.name = name;
      this.id = generateUUID();
      this.children = [];
      this.isStatic = false;
      this.isRoot = false;
      this.isInit = false;
      this.isReady = false;
      this.wasUpdated = true;
      this.treeIdx = 0;
      this.glovalContext = {} as GlovalContext<T>;
      this.context = {} as Context<T>;
    }

    // #region
    //? methods
    init() {}
    protected _init() {
      this.init();
    }
    ready() {}
    protected _ready() {
      this.ready();
    }
    update(t: number) {
      this.wasUpdated = false;
    }
    protected _update(t: number) {
      this.update(t);
    }
    initEvents() {}
    protected _initEvents() {
      this.initEvents();
    }
    reverseInit() {}
    protected _reverseInit() {
      this.reverseInit();
    }

    protected _childsUpdated(t: number) {}
    // #endregion

    //? draw
    draw(ctx: CanvasRenderingContext2D) {}

    addChild(children: NodeBase[] | NodeBase) {
      if (!Array.isArray(children)) {
        children = [children];
      }
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        child.parent = this;
      }
      this.children.push(...children);

      if (!this.isInit) return;

      for (let i = 0; i < children.length; i++) {
        //! init node
        NodeBase.init(children[i]);
      }
    }

    remove() {
      if (!this.parent) return;
      this.parent.children = this.parent.children.filter(
        (child) => child.id != this.id
      );
      this.parent = undefined;
    }

    static init(_node: NodeBase) {
      const list: NodeBase[] = [_node]; // aux list to find in node tree
      let idx = 0;
      while (idx < list.length) {
        const node = list[idx];
        idx++;
        node.glovalContext = node.glovalContext;
        node._reverseInit();

        if (!node.isRoot && node.children.length > 0 && !node.isInit) {
          //* propagate context
          node.context = _node.context;

          //* update child tree idx
          for (let i = 0; i < node.children.length; i++) {
            node.children[i].treeIdx = node.treeIdx + 1;
            list.push(node.children[i]);
          }
        }
      }
      list.reverse();
      for (let i = 0; i < list.length; i++) {
        const node = list[i];
        if (!node.isRoot || (node.isRoot && node.id == _node.id)) {
          node._init();
          node._initEvents();
          node.isInit = true;
        } else {
          node.prevContext = _node.context;
          this.init(node);
        }
      }

      for (let i = 0; i < list.length; i++) {
        const node = list[i];
        node.glovalContext.nodes[node.id] = node;
        if (!node.isReady) {
          node._ready();
          node.isReady = true;
        }
      }
    }

    static update(t: number, _node: NodeBase) {
      type NodePath = { node: NodeBase; path: NodeBase[] };
      const list: NodePath[] = [{ node: _node, path: [] }];
      const updatedNodes: NodeBase[] = [];

      //? search nodes and register path
      while (list.length > 0) {
        const nodePath = list.shift() as NodePath;
        if (!nodePath.node.isStatic && nodePath.node.wasUpdated) {
          nodePath.node._update(t);
          updatedNodes.unshift(...nodePath.path);
        }
        for (let i = 0; i < nodePath.node.children.length; i++) {
          list.push({
            node: nodePath.node.children[i],
            path: [...nodePath.path, nodePath.node],
          });
        }
      }

      const nodes = Array.from(
        new Set(updatedNodes.sort((a, b) => a.treeIdx - b.treeIdx))
      );

      for (let i = 0; i < nodes.length; i++) {
        nodes[i]._update(t);
        nodes[i]._childsUpdated(t);
      }
    }
  }

  interface NodeContext {
    updatedNodeTransforms: Set<ID>;
  }

  export class Node extends NodeBase<NodeContext> {
    readonly Type: string = "Node";
    box: Box;
    children: Node[];
    layerIdx: number;
    transform: Transform;
    constructor(name: string) {
      super(name);
      this.type = Node.Type;
      this.transform = new Transform(this);
      this.box = new Box(this);
      this.children = [];
      this.layerIdx = 0;
      this.glovalContext.data.updatedNodeTransforms = new Set();
    }
    initLayout() {}
    draw(ctx: CanvasRenderingContext2D) {}

    protected _reverseInit(): void {
      this.reverseInit();
      for (let i = 0; i < this.children.length; i++) {
        this.children[i].transform.parentTransform =
          this.transform.glovalTransform;
      }
    }

    protected _ready(): void {
      this.initLayout();
      this.ready();
    }

    static updateTransform(_node: NodeBase<NodeContext>) {
      const updatedNodeTransforms =
        _node.glovalContext.data.updatedNodeTransforms;

      const baseNodes = Array.from(updatedNodeTransforms);
      for (let i = 0; i < baseNodes.length; i++) {
        const node = _node.glovalContext.nodes[baseNodes[i]] as Node;
        updatedNodeTransforms.delete(baseNodes[i]);
        if (node.transform.update()) {
          const list = [...node.children];
          while (list.length > 0) {
            const subNode = list.shift() as Node;
            if (subNode.transform.update()) {
              list.push(...subNode.children);
            }
          }
        }
      }
    }
  }

  export class CanvasArea extends Node {
    static readonly Type = "CanvasArea";
    canvas: HTMLCanvasElement;
    canvasCtx: CanvasRenderingContext2D;
    width: number;
    height: number;

    constructor(name: string) {
      super(name);
      this.type = CanvasArea.Type;
      this.isRoot = true;
      this.canvas = document.createElement("canvas");
      this.canvasCtx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
      this.width = 0;
      this.height = 0;
    }

    setSize(width: number, height: number) {
      this.width = width;
      this.height = height;
      this.canvas.width = width;
      this.canvas.height = height;
      return this;
    }
    protected _reverseInit(): void {
      this.reverseInit();
    }
    protected _childsUpdated(t: number): void {
      //! draw childs
    }

    static drawChilds(canvasArea: CanvasArea) {
      canvasArea.canvasCtx.clearRect(0, 0, canvasArea.width, canvasArea.height);
      canvasArea.draw(canvasArea.canvasCtx);
      canvasArea.canvasCtx.save();
      canvasArea.transform.projecion.applyToCanvasCtx(canvasArea.canvasCtx);
      const list = [...canvasArea.children];
      const drawList = [];
      while (list.length > 0) {
        const node = list.shift() as Node;
        if (!node.wasUpdated) continue;
        if (node instanceof CanvasArea) {
          const _canvasArea = node as CanvasArea;
          drawList.push(_canvasArea);
        } else {
          drawList.push(node);
          list.push(...node.children);
        }
      }

      drawList.sort((a, b) => a.layerIdx - b.layerIdx);

      for (let i = 0; i < drawList.length; i++) {
        const node = drawList[i];
        canvasArea.canvasCtx.save();
        node.transform.glovalTransform.applyToCanvasCtx(canvasArea.canvasCtx);
        if (node instanceof CanvasArea) {
          const _canvasArea = node as CanvasArea;
          canvasArea.canvasCtx.drawImage(_canvasArea.canvas, 0, 0);
        } else {
          node.draw(canvasArea.canvasCtx);
        }
      }
      canvasArea.canvasCtx.restore();
    }
  }
}
