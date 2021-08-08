import React ,{useRef,useEffect,useState}from 'react'

export default function HooksUseRef() {
    //声明一个存放DOM元素的常量
    // const inputDom = useRef(null)
    // const ShowInputText = ()=>{
    //     console.log(inputDom) //打印DOM节点
    //     inputDom.current.value = "点击后修改的"
    // }

    
    //---------------保存变量代码start-------------
    const [text, setText] = useState("初始化input文字");
    //声明一个空Ref
    const textDom = useRef();
    useEffect(() => {
        textDom.current = text;
        console.log(`textDom.current的值为：${textDom.current}`)
    })
    //---------------保存变量代码end-------------
    return (
        <div>
            {/* <input ref={inputDom} type="text" />
            <br/>
            <button onClick={ShowInputText}>获取inputDOM后改变其文字</button>    */}
            <br/>
            <br/>
            {/* 使用useRef 来保存变量 */}
            <input value={text} onChange={(e)=>{setText(e.target.value)}}></input>
        </div>
    )
}
