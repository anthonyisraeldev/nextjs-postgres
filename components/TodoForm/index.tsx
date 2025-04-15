"use client";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { todosType } from "@/app/types/todo.types";
import TodoItem from "../TodoItem";
import { addTodo, editTodo } from "@/app/actions/todo.actions";

interface TodosProps {
  todos: todosType[];
}

export default function TodoForm({ todos }: TodosProps) {
  const [textNote, setTextNote] = useState<string>("");
  const [idNote, setIdNote] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const formSchema = z.object({
    note: z.string().min(6, {
      message: "Note must be at least 6 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
    },
  });
  const { reset, setValue } = form;

  useEffect(() => {
    setValue("note", textNote);
  }, [textNote, setValue]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const id = uuid();
    if (isEdit) {
      await editTodo(idNote, values.note);
      toast("Note has been edited ✏️", {
        action: {
          label: "Close",
          onClick: () => console.log("Undo"),
        },
      });
      setIsEdit(false);
    } else {
      await addTodo(id, values.note);
      toast("Note has been created ✅", {
        action: {
          label: "Close",
          onClick: () => console.log("Undo"),
        },
      });
    }
    reset();
  };

  return (
    <div className="container mx-auto">
      <div className="w-full max-w-[600px] mx-auto mt-32 px-[15px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mb-6  items-end flex justify-center"
          >
            <div className="w-10/12">
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="font-mono text-4xl mb-2">
                      Note
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Description..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="absolute bottom-[-30px]" />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-2/12">
              {isEdit ? (
                <Button
                  className="rounded-full h-10 ml-4 cursor-pointer"
                  type="submit"
                >
                  Edit
                </Button>
              ) : (
                <Button
                  className="rounded-full h-10 ml-4 cursor-pointer"
                  type="submit"
                >
                  +
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>

      <div className="px-[15px] mt-16 flex gap-4 flex-wrap justify-center xl:justify-start w-full max-w-[600px] mx-auto">
        {todos.map((todo, index) => {
          return (
            <TodoItem
              key={index}
              todo={todo}
              setTextNote={setTextNote}
              setIsEdit={setIsEdit}
              setIdNote={setIdNote}
            />
          );
        })}
      </div>
    </div>
  );
}
