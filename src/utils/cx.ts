export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassDictionary
  | ClassArray;

export interface ClassDictionary {
  [id: string]: boolean | null | undefined;
}

export type ClassArray = Array<ClassValue>;

export function cx(...classes: ClassValue[]): string {
  const result: string[] = [];

  for (const c of classes) {
    if (!c) continue;

    if (typeof c === "string" || typeof c === "number") {
      result.push(String(c));
    } else if (Array.isArray(c)) {
      const inner = cx(...c);
      if (inner) result.push(inner);
    } else if (typeof c === "object") {
      for (const [key, value] of Object.entries(c)) {
        if (value) result.push(key);
      }
    }
  }

  return result.join(" ");
}
