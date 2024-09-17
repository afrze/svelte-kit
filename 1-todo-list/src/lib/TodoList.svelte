<script lang="ts">
  import Button from "./Button.svelte";

	export let todos: any = [];
</script>

<ul>
	{#each todos as { id, title }, index (id)}
		{@const number = index + 1}
		<li>{number}- {title}</li>
	{/each}
</ul>

<form>
	<input />
	<Button>Add Todo</Button>
</form>
