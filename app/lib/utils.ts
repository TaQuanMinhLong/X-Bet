export const objectKeys = <T extends {}, K = keyof T>(object: T) => Object.keys(object) as Array<K>;
