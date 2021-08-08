import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//css 
const routeCssObj = { 
    display: "flex", 
    justifyContent: "space-around", 
    listStyleType: "none", 
    margin: "10% auto" ,
}
const redBgc = { backgroundColor: "#F34725" ,color:"white"}
const blueBgc = { backgroundColor: "#25D0F3" ,color:"white"}


//声明两个组件
function Red() {
    //Red组件内生命周期函数
    useEffect(()=>{
        console.log("我们一起进入了Red组件！！！！！")
        return ()=>{
            console.log("我们离开了Red组件------------------")
        }
    })
    return <h1 style={redBgc}>Red组件</h1>
}
function Blue() {
    //Blue组件内生命周期函数
    useEffect(()=>{
        console.log("我们一起进入了Blue组件！！！！！")
        return ()=>{
            console.log("我们离开了Blue组件------------------")
        }
    })
    return <h1 style={blueBgc}>Blue组件</h1>
}
export default function HooksExample() {
    // const [count, setCount] = useState(0); //count 射击次数初始值为0
    // const [bulletCount, setBulletCount] = useState(20); //count 子弹初始值为100
    //声明两个组件当作路由组件
    const [routeObj] = useState([
        {
            path: "/red",
            name: "Red组件",
            component: Red
        },
        {
            path: "/blue",
            name: "Blue组件",
            component: Blue
        }
    ])
    //射击事件
    // const ActionClick = () => {
    //     setCount(count + 1);
    //     setBulletCount(bulletCount - 1)
    // }
    // //使用useEffect函数代替生命周期函数
    // useEffect(() => {
    //     console.log(`useEffect=>你射击了${count}次！`)
    // })
    return (
        <div>
            {/* <h1>React Hooks 写法</h1>
            <p>你已经射击了{count}次！</p>
            {
                bulletCount === 0 ? (
                    <p style={{ color: "red" }} >你已经弹尽粮绝了！</p>
                ) : (
                    <p style={{ color: "greenyellow" }} >还有{bulletCount}发子弹！</p>
                )
            }
            <button onClick={bulletCount > 0 ? ActionClick : alert("你没子弹了！")}>射击</button> */}

            {/* 路由配置,需要学习react路由相关的前置知识 */}

            <Router>
                <ul style={routeCssObj}>
                    {
                        routeObj.map((item, index) => {
                            return <li key={index}><Link to={item.path}>{item.name}</Link></li>
                        })
                    }
                </ul>
                {
                    routeObj.map((item, index) => {
                        return <Route  key={index} path={item.path} component={item.component}></Route>
                    })
                }
            </Router>

        </div>
    )

}

