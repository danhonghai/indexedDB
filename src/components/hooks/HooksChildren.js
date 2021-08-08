import React ,{useContext}from 'react'
import {CountContext} from "./HooksUseContext"  
export default function HooksChildren() {
    const count = useContext(CountContext)
    return (
        <div>
         <h1>我是函数式子组件</h1>
         <h2>我是父组件传过来的射击次数{count}</h2>
        </div>
    )
}
