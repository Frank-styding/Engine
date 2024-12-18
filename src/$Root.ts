import { $Node } from "./$Node";
import { CallEvent } from "./Events";

export class $Root extends $Node {
  constructor(name: string) {
    super(name);
    this.isRootObject = true;
    this.context["root"] = this;
  }
  update(t: number): void {
    super.update(t);
    CallEvent(this.glovalContext, "update");
  }
}
