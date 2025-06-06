"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db/drizzle";
import { todo } from "../db/schema";
import { eq, not, desc } from "drizzle-orm";

export const getTodos = async () => {
  const data = await db.select().from(todo).orderBy(desc(todo.createdAt));
  return data;
};

export const addTodo = async (id: string, text: string) => {
  await db.insert(todo).values({
    id: id,
    text: text,
  });
  revalidatePath("/");
};

export const deleteTodo = async (id: string) => {
  await db.delete(todo).where(eq(todo.id, id));
  revalidatePath("/");
};

export const editTodo = async (id: string, text: string) => {
  await db
    .update(todo)
    .set({
      text: text,
    })
    .where(eq(todo.id, id));
  revalidatePath("/");
};

export const toggleTodo = async (id: string) => {
  await db
    .update(todo)
    .set({
      done: not(todo.done),
    })
    .where(eq(todo.id, id));
  revalidatePath("/");
};
