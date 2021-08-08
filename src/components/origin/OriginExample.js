import React, { Component } from 'react';
import OriginChildren from './OriginChildren';  //父组件引入自组件OriginChildren

export default class OriginExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }
    componentDidMount(){
        //组件挂载完成
        console.log(`组件挂载完成=>你射击了${this.state.count}次！`)
    }
    componentDidUpdate(){
        //组件更新完成
        console.log(`组件更新完成=>你射击了${this.state.count}次！`)
    }
    
    //射击事件
    ShootClick = () => {
        this.setState({
            count:this.state.count+1
        })
    }
    render() {
        return (
            <div>
                <h1>我是父组件</h1>
                <h2>原始类继承component写法</h2>
                <p>你已经射击了{this.state.count}次！</p>
                <button onClick={this.ShootClick}>射击</button>

                <hr color="red"></hr>
                {/* 将射击次数传值到子组件 */}
                <OriginChildren count={this.state.count}></OriginChildren>
            </div>
        );
    }
}
