<script lang="ts">
	export let initialCount = 0;
	export let maxCount: any;

	console.log($$props, $$restProps);

	let count = initialCount;

	function increment() {
		if (count === maxCount) return;
		count += 1;
	}
</script>

<button on:click={increment}>Clicks {count}</button>

<style>
	button {
		padding: 15px 20px;
	}
</style>
