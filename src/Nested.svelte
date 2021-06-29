<!-- 组件内发布，组件外订阅-->
<script>
    //引入dispatcher
    import {createEventDispatcher} from "svelte";
    //创建实例，emit事件
    const dispatch = createEventDispatcher();
    //点击下边按钮的时候触发事件
    function sayHello(){
        //前边实现message监听方法
        dispatch('message', {
            text: 'Hello!'
        });
    }

    //属性的程接
    export let c;

</script>

<p>This is another paragraph.{c}</p>
<button on:click={sayHello}>
    Click to say hello
</button>

    