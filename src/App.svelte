<script>
	//export可以加，也可以不加
	let name = 'World';
	export let a = 4;
	export let b = 5;
	export let porridge={
		temperature:32
	};
	export const items = [{ message: "Foo",id:"0" }, { message: "Bar" ,id:1}];//id作为key
	//关于请求
	let promise = getRandomNumber();
	async function getRandomNumber(){
		/* fetch是默认支持的呀 */
		const res = await fetch(
		`https://api.imjad.cn/hitokoto/?charset=utf-8&length=50&encode=json`
		);
		const text = await res.text();
		if (res.ok) {
			return JSON.parse(text);
		} else {
			throw new Error(text);
		}
	}
	//html内容
	let html = `<h3 style="color: #eee">Hello Wold</h3>`

	let count = 0;
	function handleClick(event){
		count += 1;
	}



	
</script>
<section>
	<!-- 模板语言单括号来表示 -->
	<h1 class="hello">Hello {name}!</h1>
	<!-- 表达式 -->
	<p>{a} + {b} = {a + b}.</p>
	<!-- 条件渲染 #开头 :中间 标签结尾 -->
	{#if porridge.temperature > 28}
		<p>太热了</p>
	{:else if 12 > porridge.temperature}
		<p>太冷了</p>
	{:else}
		<p>刚刚好</p>
	{/if}
	<!-- 列表渲染 -->
	<ul> 
		{#each items as item,index (item.id)}
			<li> {index}-{item.message}</li>
		{/each}
	</ul>
	<!-- 关于请求 -->
	{#await promise}
		<p>正在等待接口响应...</p>
	{:then value}
		<p>获取到数据： {value.hitokoto}</p>
	{:catch error}
		<p>获取失败: {error.message}</p>
	{/await}

	<!-- 请求的时候可以忽略catch -->
	<!-- {#await promise then value}
		<p>获取数据： {value}</p>
	{/await} -->

	<!-- html展示 -->
	{@html html}
	<!-- console.log,并且代码到这里会暂停 -->
	<!-- {@debug html} -->

	<!-- 事件指令:这部分看着像是vue和react的结合 -->
	<button on:click={handleClick}>
		数量: {count}
	</button>
	<!-- 箭头函数 -->
	<button on:click="{() => count += 1}">
		count: {count}
	</button>



</section>
<style>
.hello {
    color: red;
}
</style>

