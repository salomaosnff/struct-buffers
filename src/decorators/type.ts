export function DefineType(subTypeKeys: string[]): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata("struct:typeKeys", subTypeKeys, target);
  };
}
