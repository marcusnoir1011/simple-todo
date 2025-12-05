import { type Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  editMode: boolean;
  handleModeChange: (todo: Todo) => void;
  handleRemoveTodo: (id: string) => void;
}

const TodoItem = ({
  todo,
  editMode,
  handleModeChange,
  handleRemoveTodo,
}: TodoItemProps) => {
  return (
    <li className="flex items-center gap-2 mb-2">
      <p className="font-semibold">{todo.title}</p>
      <button
        type="button"
        onClick={() => handleModeChange(todo)}
        disabled={editMode}
        className="border py-1 px-2 font-semibold"
      >
        Edit
      </button>
      <button
        type="button"
        onClick={() => handleRemoveTodo(todo._id)}
        className="border ml-2 py-1 px-2 font-semibold text-red-600"
      >
        Remove
      </button>
    </li>
  );
};

export default TodoItem;
