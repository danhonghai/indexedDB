//函数式声明快捷键 rfc
import React ,{useState,createContext}from 'react';
import HooksChildren from './HooksChildren';
//------关键代码------
export const CountContext = createContext();  //在这里使用导出是为了在子组件解析数据使用
export default function HooksUseContext() {
    const [count, setCount] = useState(0)
    return (
        <div>
            <h1>React Hooks 写法</h1>
            <p>你已经射击了{count}次！</p>
            <button onClick={()=>{setCount(count+1)}}>射击</button>
            
            {/* createContext关键代码 这段代码的意思就是将count变量允许跨越层级使用 与redux 类似 */}
            <CountContext.Provider value={count}>
                {/* 需要注意的是将需要用到context的组件放入 CountContext 标签内部*/}
                <HooksChildren/>
            </CountContext.Provider>
        </div>
    )
}
