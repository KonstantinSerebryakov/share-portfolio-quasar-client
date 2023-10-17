export async function deepCopy<T>(source: T): Promise<T> {
  if (Array.isArray(source)) {
    return Promise.all(
      Array.from(source, async (item) => await deepCopy(item))
    ) as Promise<T>;
  } else if (source instanceof Date) {
    return new Date(source.getTime()) as T;
  } else if (source instanceof RegExp) {
    return new RegExp(source) as T;
  } else if (source && typeof source === 'object') {
    const clonedObject = Object.create(null);
    const copyPromises = [];
    for (const [key, sourceValue] of Object.entries(source)) {
      if (source.hasOwnProperty(key)) {
        copyPromises.push(
          (async () => {
            clonedObject[key] = await deepCopy(sourceValue);
          })()
        );
      }
    }
    await Promise.all(copyPromises);
    return clonedObject;
  } else {
    return source as T;
  }
}
