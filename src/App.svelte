<script>

	import { onMount } from "svelte";
	import { fade } from 'svelte/transition';

	//引入组件
	import Nested from "./Nested.svelte"
	import {count$} from "./store-rx"
	import {dispatch} from "frer"
	let c = 0;
	 
	count$.subscribe(val=>{
		c = val;
	})

	function add(){
		dispatch("count",{
			type:"add"
		})
	}
	function sub(){
		dispatch("count",{
			type:"sub"
		})
	}

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

	//事件
	let count = 0;
	function handleClick(event){
		count += 1;
	}
	//事件修饰符
	function handleSubmit(){
		console.log("我点击了提交按钮");
	}

	//数据绑定
	let value = "";
	let getHelloWorldDom;//这个在下面绑定了，就是dom本身
	onMount(() => {
		console.log(getHelloWorldDom);
	});

	//动态样式
	let active  = true;

	//元素生命周期监听
	//可以往use:action上挂载数据，action就是下边的foo函数
	let bar = false;
	function foo(node) {
		// 已经在 dom 挂载
		console.log("挂载成功！");
		return {
			update(bar) {
				// 当 bar 更新的时候触发
				console.log(`bar 更新了`);
			},
			destroy() {
				// 已经在 dom 销毁
				console.log("销毁成功！");
			}
		};
	}
	//更新上述参数
	function handleUpdate() {
		bar = true;
	}
	//注意fade的引入
	let visible = false;


	//组件事件的外部触发,参数里边可以拿到event
	//然后从detail里拿到text
	function handleMessage(event){
		alert(event.detail.text)
	}



	
</script>
<section>

	<!-- sync -->
	<div>{c}</div>
	<button on:click={add}>add</button>
	<button on:click={sub}>sub</button>

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

	<!-- 事件修饰符 -->
	<form on:submit|preventDefault={handleSubmit}>
		<button
			type="submit"
		>
		submit</button>
	</form>
	<!-- 数据绑定 -->
	<input bind:value={value} />
	<p><textarea bind:value={value}></textarea></p>

	<!-- bind:this ref -->
	<div bind:this={getHelloWorldDom}>get dom</div>


	<!-- class -->
	<div class="com"> </div>
	<!-- 动态样式 -->
	<div style="margin-top:5px" class="{active ? 'active':"com"}"> </div>


	<!-- use:action 元素生命周期监听 -->
	<!-- <div use:foo >生命周期-1-3</div> -->
	<div use:foo={bar} />
	<button on:click={handleUpdate}>点击</button>

	<!-- transition:fn fn内部怎么操作可以参照文档 -->
	
	{#if visible}
		<div transition:fade="{{ duration: 2000 }}">
			flies in, fades out over two seconds
		</div>
	{/if}
	<p><button on:click={()=>{visible=true}}>transition</button></p>


	<!-- 组件，首字母大写 App内的css不影响组件样式 -->
	<!-- 事件的触发和响应，属性的绑定和程接 -->
	<p>This is a paragraph.</p>
	<Nested bind:c={c} on:message={handleMessage} />






</section>
<style>
.hello {
    color: red;
}
.active{
	width: 200px;
	height: 50px;
	background: green;
}
.com{
	width: 200px;
	height: 50px;
	background: purple;
}
p {
	color: purple;
	font-family: 'Comic Sans MS', cursive;
	font-size: 2em;
}

</style>

