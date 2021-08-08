import React ,{useMemo}from 'react'

export default function HooksUseMemoChildren({addMoney,children}) {
    //我们需要在子组件改变addMoney的值
    const changeAddMoney = (args)=>{
        console.log(`父组件传过来的addMoney：${args}`)
        //下面我要更换addMoney 的值
        return args + 1;
    }
    //---------------------关键代码start------------------------------
    const childAddMoney = useMemo(()=>changeAddMoney(addMoney),[addMoney])
    //---------------------关键代码end------------------------------
    return (
        <div>
            {/* childAddMoney为子组件接收到父组件的addMoney之后执行changeAddMoney来改变其值 */}
            <p>这是子组件修改过的打工钱：{childAddMoney}</p>
            {/* children 是子组件标签中传回的值*/}
            <p>这个是消费的钱：{children}</p> 
        </div>
    )
}
