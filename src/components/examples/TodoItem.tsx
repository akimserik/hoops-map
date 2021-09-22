import React from "react";
import classes from "./TodoItem.module.css";

interface Props {
  text: string;
  onDeleteTodo: () => void;
}

const TodoItem = (props: Props) => {
  const onClickTodo = () => {
    props.onDeleteTodo();
  };

  return (
    <li className={classes.item} onClick={onClickTodo}>
      {props.text}
    </li>
  );
};

export default TodoItem;
