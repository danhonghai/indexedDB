import React ,{useState}from 'react'
import HooksUseMemoChildren from './HooksUseMemoChildren' //引入子组件
export default function HooksUseMemo() {
    const [addMoney, setAddMoney] = useState(0)
    const [expendMonery, setexpendMonery] = useState(0)
    return (
        <div>
            <button onClick={()=>{setAddMoney(addMoney+1)}} >挣钱</button>
            <button onClick={()=>{setexpendMonery(expendMonery-1)}}>消费</button>
            {/* 对子组件进行传参 */}
            <HooksUseMemoChildren addMoney={addMoney} >{expendMonery}</HooksUseMemoChildren> 
        </div>
    )
}
