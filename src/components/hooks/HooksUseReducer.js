import React, { useReducer } from 'react'

export default function HooksUseReducer() {
    const [count, dispatch] = useReducer((state, actionType) => {
        switch (actionType) {
            case "expense":
                return state - 1000
            case "work":
                return state + 100000
            default:
                break
        }
    }, 0)
    return (
        <div style={{margin:"100px 0"}}>
            <p>你的银行卡余额还有：{count} 元！</p>
            <button onClick={()=>{dispatch("expense")}}>消费</button>
            <button onClick={()=>{dispatch("work")}}>挣钱</button>
        </div>
    )
}
