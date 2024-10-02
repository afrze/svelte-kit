<script lang="ts">
  import TodoList from "./lib/TodoList.svelte";
  import { v4 as uuid } from "uuid";
  import { tick, onMount } from "svelte";
  import { fly } from "svelte/transition";
  import fade from "./lib/transitions/fade";
  import longpress from "./lib/actions/longpress";
  import tippy from "./lib/actions/tippy";
  // import tippy from "tippy.js";
  // import "tippy.js/dist/tippy.css";

  let todoList: any;
  let showList = true;

  let todos: any = null;
  let error: any = null;
  let isLoading = false;
  let isAdding = false;
  let disabledItems: any[] = [];

  onMount(() => {
    loadTodos();
  });

  async function loadTodos() {
    isLoading = true;
    await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10").then(
      async (response) => {
        if (response.ok) {
          todos = await response.json();
        } else {
          error = "An error has occurred";
        }
      }
    );
    isLoading = false;
  }

  async function handleAddTodo(event: any) {
    event.preventDefault();
    isAdding = true;
    await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        title: event.detail.title,
        completed: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(async (response) => {
      if (response.ok) {
        const todo = await response.json();
        todos = [{ ...todo, id: uuid() }, ...todos];
        todoList.clearInput();
      } else {
        alert("An error has occurred.");
      }
    });
    isAdding = false;
    await tick();
    todoList.focusInput();
  }

  async function handleRemoveTodo(event: any) {
    const id = event.detail.id;
    if (disabledItems.includes(id)) return;
    disabledItems = [...disabledItems, id];
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        todos = todos.filter((t: any) => t.id !== event.detail.id);
      } else {
        alert("An error has occurred.");
      }
    });
    disabledItems = disabledItems.filter((itemId: any) => itemId !== id);
  }

  async function handleToggleTodo(event: any) {
    const id = event.detail.id;
    const value = event.detail.value;
    if (disabledItems.includes(id)) return;
    disabledItems = [...disabledItems, id];
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(async (response) => {
      if (response.ok) {
        const updatedTodo = await response.json();
        todos = todos.map((todo: any) => {
          if (todo.id === id) {
            return updatedTodo;
          }
          return { ...todo };
        });
      } else {
        alert("An error has occurred.");
      }
    });

    disabledItems = disabledItems.filter((itemId: any) => itemId !== id);
  }

  // Actions
  let showButton = true;
  let duration = 3000;

  // Tippy

  // let button: any;

  // onMount(() => {
  //   tippy(".tooltip", { content: "A demo tool tip" });
  //   tippy(button, { content: "Another One" });
  // });

  let content = "Hello";
</script>

<label>
  <input type="checkbox" bind:checked={showList} />
  Show/Hide list
</label>
{#if showList}
  <div
    transition:fade={{ duration: 1000 }}
    style="opacity:0.5 transform: rotate(90deg)"
    style:max-width="800px"
  >
    <TodoList
      {todos}
      {error}
      {isLoading}
      {disabledItems}
      disableAdding={isAdding}
      bind:this={todoList}
      on:addtodo={handleAddTodo}
      on:removetodo={handleRemoveTodo}
      on:toggletodo={handleToggleTodo}
      scrollOnAdd="top"
    >
      <!-- <svelte:fragment slot="title">{index + 1}- {todo.title}</svelte:fragment> -->
      <!-- {@const { id, completed, title } = todo} -->
      <!-- <Todo {todo} on:remove on:toggle /> -->
      <!-- <div>
        <input
          disabled={disabledItems.includes(id)}
          on:input={(event) => {
            event.currentTarget.checked = completed;
            handleToggleTodo(id, !completed);
          }}
          type="checkbox"
          checked={completed}
        />
        {title}
      </div> -->
    </TodoList>
  </div>
  {#if todos}
    <p>
      Number of todos: {#key todos.length}
        <span style:display="inline-block" in:fly|local={{ y: -10 }}>
          {todos.length}
        </span>
      {/key}
    </p>
  {/if}
{/if}

<h3>Actions: Longpress custom event</h3>

<label>
  <input type="range" bind:value={duration} max={4000} step={100} />{duration} ms
</label>

<label><input type="checkbox" bind:checked={showButton} />Show Button</label>

{#if showButton}
  <button
    use:longpress={{ duration }}
    on:longpress={() => {
      alert("Pressed long");
    }}>Button</button
  >
{/if}

<h3>Actions: Tippy</h3>

<!-- <button class="tooltip">Button</button>
<button class="tooltip" data-tippy-content="Other demo text">Button</button>

<button bind:this={button}>Button</button> -->

<input bind:value={content}>

<button
  use:tippy={{ content, placement: "right", theme: "light" }}
  >Button</button
>

<style>
</style>
