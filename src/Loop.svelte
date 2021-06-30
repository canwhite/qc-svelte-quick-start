<script>
    export let count;
</script>

<div>
    {#if count > 0}
        <p>我是循环显示的内容{count} </p>
        <!-- self指的时组件本身 -->
        <svelte:self count = {count -1} />
    {:else}
        <p>lift-off!</p>
    {/if}
</div>