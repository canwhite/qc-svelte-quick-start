import { state } from "frer";

//sync
const count$ = state({
    name: "count",//key 
    initValue: 0,//init data
    producer(next,value,action){
        let num = value;
        console.log(num);
        switch(action.type){
            case "add":
                num ++ ;
                next(num);//send data
                break;
            case "sub":
                num--;
                next(num)
                break;
        }
    }
});

//async
const async_res$ = state({ 
    name:"async_res",
    initValue:"",
    producer(next,value,action){
        let params = action.payload;//params
        let request = action.request;//methods :return Promise 
        switch (action.type){
            case "async":
                request(params).then(res=>{
                    next(res);
                })
            break;
        }
    }
}) 
export {
    count$,
    async_res$,
}

