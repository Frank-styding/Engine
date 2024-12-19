import { $Node } from "./$Node";
import { callEvents } from "./Events";

export class $Root extends $Node {
  constructor(name: string) {
    super(name);
    this.context["root"] = this;
  }
  update(t: number): void {
    super.update(t);
    callEvents(this.glovalContext, "update");
  }
}
