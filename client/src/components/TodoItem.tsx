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
        <li>
            {todo.title}
            <button
                type="button"
                onClick={() => handleModeChange(todo)}
                disabled={editMode}
            >
                Edit
            </button>
            <button type="button" onClick={() => handleRemoveTodo(todo._id)}>
                Remove
            </button>
        </li>
    );
};

export default TodoItem;
