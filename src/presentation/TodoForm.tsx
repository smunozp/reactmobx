import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import * as todo from "../repositories/firestore/todos";
function TodoForm() {
  const [value, setValue] = useState("");
  const createTodo = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const item = {
      description: value,
      done: false,
    };
    await todo.create(item)
    setValue("");
  };
  return (
    <form onSubmit={createTodo}>
      <TextField
        style={{ width: "100%" }}
        id="outlined-basic"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        label="Add Todo"
        variant="outlined"
      />
    </form>
  );
}
export default TodoForm;