// CORE
import { useEffect, useState } from "react";

// CUSTOM
import { createTodo, deleteTodo, getTodo, updateTodo } from "../services/todo";
import { type Todo } from "../types/todo";
import TodoItem from "./TodoItem";

const TodoList = () => {
    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);

    useEffect(() => {
        const fetchedTodos = async () => {
            try {
                const data = await getTodo();
                setTodoList(data);
            } catch (err) {
                console.error("Failed to fetch Todo data: ", err);
            }
        };
        fetchedTodos();
    }, [refresh]);

    const refreshing = () => {
        setRefresh(!refresh);
    };

    const handleRemoveTodo = async (id: string) => {
        try {
            await deleteTodo(id);
            refreshing();
        } catch (err) {
            console.error("Failed to delete todo: ", err);
        }
    };

    const handleModeChange = (todo: Todo) => {
        setEditMode(true);
        setNewTodo(todo.title);
        setEditId(todo._id);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newTodo.trim().length === 0) {
            return;
        }

        if (editMode) {
            if (editId) {
                try {
                    await updateTodo(editId, newTodo);
                    setEditMode(false);
                    setEditId(null);
                } catch (err) {
                    console.error("Failed to update todo: ", err);
                }
            }
        } else if (editMode === false) {
            try {
                await createTodo(newTodo);
            } catch (err) {
                console.error("Failed to create todo: ", err);
            }
        }
    };

    return (
        <>
            <div>
                <h1></h1>

                <form onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder={
                            editMode ? "Update your todo..." : "Add new todo..."
                        }
                    />
                    <button type="submit">{editMode ? "Update" : "Add"}</button>
                </form>

                <ul>
                    {todoList.map((todo) => (
                        <TodoItem
                            todo={todo}
                            editMode={editMode}
                            handleModeChange={handleModeChange}
                            handleRemoveTodo={handleRemoveTodo}
                        />
                    ))}
                </ul>
            </div>
        </>
    );
};

export default TodoList;
