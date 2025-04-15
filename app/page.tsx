import { getTodos } from "./actions/todo.actions";
import TodoForm from "@/components/TodoForm";

export default async function Home() {
  const todos = await getTodos();

  return (
    <div className="container mx-auto">
      <div className="w-full max-w-[600px] mx-auto mt-32 px-[15px]">
        <TodoForm todos={todos} />
      </div>
    </div>
  );
}
