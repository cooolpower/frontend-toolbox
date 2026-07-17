export interface ConvertOptions {
  rootName: string;
  useTypeAlias: boolean;
  makeOptional: boolean;
}

export function convertJsonToTs(jsonStr: string, options: ConvertOptions): string {
  if (!jsonStr.trim()) {
    return "";
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonStr);
  } catch (err) {
    throw new Error("Invalid JSON format. Please check your syntax.");
  }

  const generatedInterfaces: string[] = [];
  const processedObjects = new Map<string, string>();

  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function getType(value: unknown, keyName: string): string {
    if (value === null) return "null";
    if (typeof value === "string") return "string";
    if (typeof value === "number") return "number";
    if (typeof value === "boolean") return "boolean";

    if (Array.isArray(value)) {
      if (value.length === 0) return "unknown[]";
      const itemTypes = Array.from(new Set(value.map((item) => getType(item, keyName))));
      const unionType = itemTypes.join(" | ");
      return unionType.includes(" | ") ? `(${unionType})[]` : `${unionType}[]`;
    }

    if (typeof value === "object") {
      const typeName = capitalize(keyName);
      buildInterface(value as Record<string, unknown>, typeName);
      return typeName;
    }

    return "unknown";
  }

  function buildInterface(obj: Record<string, unknown>, name: string): void {
    const signature = JSON.stringify(Object.keys(obj).sort());
    if (processedObjects.has(signature)) {
      return;
    }
    processedObjects.set(signature, name);

    const properties = Object.entries(obj).map(([key, value]) => {
      const propType = getType(value, key);
      const isOptional = options.makeOptional ? "?" : "";
      return `  ${key}${isOptional}: ${propType};`;
    });

    const header = options.useTypeAlias
      ? `export type ${name} = {`
      : `export interface ${name} {`;
    const footer = options.useTypeAlias ? "};" : "}";

    const generated = [header, ...properties, footer].join("\n");
    generatedInterfaces.push(generated);
  }

  if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
    buildInterface(parsed as Record<string, unknown>, options.rootName || "RootInterface");
  } else if (Array.isArray(parsed)) {
    if (parsed.length > 0 && typeof parsed[0] === "object") {
      buildInterface(parsed[0] as Record<string, unknown>, options.rootName || "RootInterface");
    } else {
      return options.useTypeAlias
        ? `export type ${options.rootName || "RootInterface"} = ${getType(parsed, "RootInterface")};`
        : `// Array of primitive type\nexport type ${options.rootName || "RootInterface"} = ${getType(parsed, "RootInterface")};`;
    }
  } else {
    return options.useTypeAlias
      ? `export type ${options.rootName || "RootInterface"} = ${typeof parsed};`
      : `// Primitive type root\nexport type ${options.rootName || "RootInterface"} = ${typeof parsed};`;
  }

  // Reverse list to output nested interfaces first or root last (here, we reverse so root is usually at the bottom, or keep order)
  return generatedInterfaces.join("\n\n");
}
