
import {Context} from "hono";


// get all controller
export const getController = <T> (getFunction: (id:number)=> Promise<T | undefined>)=>async (c:Context)=>{
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const item = await getFunction(id);
    if (!item) return c.text("Not Found", 404);
    return c.json(item);
}
// create controller
export const createController = <T> (createFunction: (data:T)=> Promise<string>)=>async (c:Context)=>{
    try{
        const data = await c.req.json();
        const result = await createFunction(data);
        console.log(data)
        return c.text(result, 201);
    }catch(error:any){
        return c.json({ error: error?.message }, 400);
    }
}
// update controller

export const updateController = <T>( getFunction: (id: number) => Promise<T | undefined>,updateFunction: (id: number, data: T) => Promise<T | undefined>) => async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    let data: T;
    try {
        data = await c.req.json();
    } catch (error) {
        return c.text("Invalid JSON", 400);
    }

    try {
        const result = await getFunction(id);
        if (!result) return c.text("Not Found", 404);

        const updatedResult = await updateFunction(id, data);
        if (!updatedResult) return c.text("Update Failed", 400);

        return c.json(updatedResult, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete controller
export const deleteController = <T>( getFunction: (id: number) => Promise<T | undefined>,deleteFunction: (id: number) => Promise<boolean>) => async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const result = await getFunction(id);
        if (result === undefined) return c.text("Entity not found", 404);

        const deleted = await deleteFunction(id);
        if (!deleted) return c.text("Entity not deleted", 500);

        return c.json({ message: "Entity deleted successfully" }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};


// Controller to get all entities
export const getAllController = <T>(getFunction: () => Promise<T[]>) => async (c: Context) => {
    try {
        const entities = await getFunction();
        if (entities === undefined) {
            return c.text("Entities not found", 404);
        }
        return c.json(entities);
    } catch (error) {
        console.error("Error fetching entities:", error);
        return c.text("Internal Server Error", 500);
}
}