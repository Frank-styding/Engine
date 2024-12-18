import { GlovalContext } from "./types/Context";

const eventTag = "event_";
const eventsTag = "events_";
export function CallEvent(
  context: GlovalContext<{}>,
  name: string,
  ...args: any[]
) {
  const func = context["events"][eventTag + name];
  if (func) {
    return (func as Function)(...args);
  }
}

export function RegisterEvent(
  context: GlovalContext<{}>,
  name: string,
  callback: Function
) {
  if (context["events"][eventTag + name] != undefined) return;
  context["events"][eventTag + name] = callback;
}

export function callEvents(
  context: GlovalContext<{}>,
  name: string,
  ...args: any[]
) {
  (context["events"][eventsTag + name] as Function[]).map((func) =>
    func(...args)
  );
}

export function RegisterEvents(
  context: GlovalContext<{}>,
  name: string,
  callback: Function
) {
  context["events"][eventsTag + name] ||= [];
  (context["events"][eventsTag + name] as Function[]).push(callback);
}
