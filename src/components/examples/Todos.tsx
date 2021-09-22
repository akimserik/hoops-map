import React from "react";
import Todo from "./todo";
import TodoItem from "./TodoItem";
import classes from "./Todos.module.css";

interface Props {
  items: Todo[];
  onDeleteTodo: (id: string) => void;
}

const Todos = (props: Props) => {
  return (
    <ul className={classes.todos}>
      {props.items.map((item) => (
        <TodoItem
          key={item.id}
          text={item.text}
          onDeleteTodo={() => props.onDeleteTodo(item.id)}
        ></TodoItem>
      ))}
    </ul>
  );
};

export default Todos;
