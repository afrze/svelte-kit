<svelte:options immutable={true} />

<script lang="ts">
  import Button from "./Button.svelte";
  import { createEventDispatcher } from "svelte";

  export let todos: any = [];
	
  const dispatch = createEventDispatcher();
	
  function handleAddTodo() {
		const isNotCancelled = dispatch(
			"addtodo",
      {
				title: inputText,
      },
      { cancelable: true }
    );
    if (isNotCancelled) {
			inputText = "";
    }
  }
	
  function handleRemoveTodo(id: any) {
		dispatch("removetodo", {
			id,
    });
  }
	
  function handleToggleTodo(id: any, value: any) {
		dispatch("toggletodo", { id, value });
  }
	
  export function clearInput() {
		inputText = "";
  }
	
	export function focusInput() {
		input.focus();
	}
	// export const readOnly = 'test'
	let inputText = "";
	let input: any; 
</script>

<div class="todo-list-wrapper">
  <ul>
    {#each todos as { id, title, completed } (id)}
      <li>
        <label>
          <input
            type="checkbox"
            checked={completed}
            on:input={(e) => {
              e.currentTarget.checked = completed;
              handleToggleTodo(id, !completed);
            }}
          />
          {title}
        </label>
        <button on:click={() => handleRemoveTodo(id)}>Remove</button>
      </li>
    {/each}
  </ul>
  <form class="add-todo-form" on:submit|preventDefault={handleAddTodo}>
    <input bind:this={input} bind:value={inputText} />
    <Button type="submit" disabled={!inputText}>Add</Button>
  </form>
</div>
