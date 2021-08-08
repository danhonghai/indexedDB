import React, { Component } from 'react';

export default class OriginChildren extends Component {
  constructor(props){
    super()
  }
  render() {
    return (
      <div> 
        <h1>我是子组件</h1>    
        <p>我是父组件传过来的射击次数{this.props.count}</p>
      </div>
    );
  }
}
