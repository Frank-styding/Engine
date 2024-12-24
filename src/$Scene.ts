import { $Node } from "./$Node";

export class $Scene extends $Node {
  cameras: $Node[];
  constructor(name: string) {
    super(name);
    this.cameras = [];
  }

  protected _init() {
    super.init();
    this.glovalContext.scene = this;
  }

  findNode(path: string) {
    const indices = path.split("/");
    let idx = 0;
    let obj: $Node = this;

    while (idx < indices.length) {
      let prev = obj;
      for (let i = 0; i < obj.children.length; i++) {
        if (obj.children[i].name == indices[idx]) {
          obj = obj.children[i];
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
