"use client";
import { useState } from "react";
import { deleteTodo, toggleTodo } from "@/app/actions/todo.actions";
import { todosType } from "@/app/types/todo.types";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

interface TodoProps {
  todo: todosType;
  setTextNote: Dispatch<SetStateAction<string>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setIdNote: Dispatch<SetStateAction<string>>;
}

export default function TodoItem({
  todo,
  setTextNote,
  setIsEdit,
  setIdNote,
}: TodoProps) {
  const { text, id } = todo;

  const [actionDone, setActionDone] = useState<boolean>(true);

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id);
    toast("Note has been deleted 🚨", {
      action: {
        label: "close",
        onClick: () => console.log("Undo"),
      },
    });
  };

  const handleSelectEdit = (id: string, text: string) => {
    setTextNote(text);
    setIsEdit(true);
    setIdNote(id);
  };

  const handleToggleTodo = async (id: string) => {
    await toggleTodo(id);
    setActionDone(!actionDone);
    if (actionDone) toast("Note complete 😶‍🌫️");
    if (!actionDone) toast("Note no complete 😀");
  };

  return (
    <div className="w-full  min-h-[100px]">
      <div className="text-right mr-0 ml-auto max-w-[120px] flex justify-between">
        <Button
          onClick={() => handleSelectEdit(id, text)}
          className="p-0 bg-transparent text-green-900 h-8 hover:bg-transparent hover:text-green-900 cursor-pointer"
          type="submit"
        >
          Edit
        </Button>
        <p>.</p>
        <Button
          onClick={() => handleToggleTodo(id)}
          className="p-0 bg-transparent text-blue-900 h-8 hover:bg-transparent hover:text-blue-900 cursor-pointer"
          type="submit"
        >
          {todo.done ? "Undo" : "Done"}
        </Button>
        <p>.</p>
        <Button
          onClick={() => handleDeleteTodo(id)}
          className="p-0 bg-transparent text-red-900 h-8 hover:bg-transparent hover:text-red-900 cursor-pointer"
          type="submit"
        >
          Delete
        </Button>
      </div>
      <div
        className={`border p-4 rounded-md mb-3 ${todo.done ? "bg-green-100 border-green-500 text-green-500" : "bg-orange-100 border-orange-500 text-orange-500"} `}
      >
        <p>{text}</p>
      </div>
    </div>
  );
}
