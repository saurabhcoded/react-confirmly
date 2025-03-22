export function isFunction(input: unknown): input is Function {
  return typeof input === "function";
}

export function genUID(length: number = 8): string {
  return `_${Math.random()
    .toString(36)
    .substring(2, 2 + length)}`;
}

export function isArray(input: unknown): boolean {
  return Array.isArray(input);
}

export const Literals = Object.freeze({
  ok: "Ok",
  cancel: "Cancel",
  confirm: "Confirm",
  alert: "Alert",
  info: "Info",
});
