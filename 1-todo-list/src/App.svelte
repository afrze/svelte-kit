<script lang="ts">
  import TodoList from "./lib/TodoList.svelte";
  import { v4 as uuid } from "uuid";

  let todoList: any;

  let todos = [
    {
      id: uuid(),
      title: "Todo 1",
      completed: true,
    },
    {
      id: uuid(),
      title: "Todo 2",
      completed: false,
    },
    {
      id: uuid(),
      title: "Todo 3",
      completed: true,
    },
  ];

  function handleAddTodo(event: any) {
    event.preventDefault();
    setTimeout(() => {
      todos = [
        ...todos,
        {
          id: uuid(),
          title: event.detail.title,
          completed: false,
        },
      ];

      todoList.clearInput();
    }, 1000);
  }

  function handleRemoveTodo(event: any) {
    todos = todos.filter((t) => t.id !== event.detail.id);
  }

  function handleToggleTodo(event: any) {
    todos = todos.map((t) => {
      if (t.id === event.detail.id) {
        return { ...t, completed: event.detail.value };
      }
      return { ...t };
    });
  }
</script>

<!-- {todoList && todoList.readOnly} -->
<TodoList
  {todos}
  bind:this={todoList}
  on:addtodo={handleAddTodo}
  on:removetodo={handleRemoveTodo}
  on:toggletodo={handleToggleTodo}
/>

<button on:click={() => {
	todoList.focusInput()
}}>focus input</button>

<style>
</style>
