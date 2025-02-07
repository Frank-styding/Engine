import { $Node } from "./$Node";

export class $Scene extends $Node {
  protected _init(): void {
    super.init();
    this.context.registerScene(this);
  }
}
