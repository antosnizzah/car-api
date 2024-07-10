export const getEntity = async <T>(id: number, getFunction: (id: number) => Promise<T | undefined>) => {
    return await getFunction(id);
}