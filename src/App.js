import React,{ Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Todolist from './component/Todolist';

class App extends Component {
  constructor(props){
    super();
    this.state = {};
  }

  componentDidMount(){ 
    //组件挂载时候，注册keypress事件
    document.addEventListener('keypress',this.handleEnterKey)
  }
  componentWillUmount(){
    //组件卸载时候，注销keypress事件
    document.removeEventListener("keypress",this.handleEenterKey)
  }

  handlerAdd=(e)=>{
    if(e.nativeEvent.keyCode === 13){ //e.nativeEvent获取原生的事件对像
      let newTodolist = [{value: e.target.value, state: false}];
      this.props.ADD(newTodolist);
      // 计算进心中的数据
      let count = this.props.pending + 1;
      this.props.COMPING(count);
    }
    console.log(this.props)
  }
  render() {
    return (
      <div>
        <div className="App">
          <header className="header">
            <label htmlFor="title">ToDoList</label>
            <input type="text" id="title" name="title" placeholder="添加ToDo" required="required" autoComplete="off" onKeyPress={this.handlerAdd}></input>
          </header>

          <section className="todolistContent">
            <h2>
              正在进行
              <span className="pending">{`(${this.props.pending})`}</span>
            </h2>
            {
              this.props.todolist.map((item, index)=>{
                return <Todolist key={index} index={index} value={item.value} state={item.state} isEdit={item.isEdit}/>
              })
            }
            <h2>
              已经完成
              <span className="finished">{`(${this.props.finished})`}</span>
            </h2>
          </section>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (store, thisProps)=>{
  return {
      todolist: store.todolist,
      pending: store.pending,
      finished: store.finished
  }
}
let mapDispatchToProps = (dispatch, thisProps)=>{
  return {
      ADD: (arg)=> dispatch({type: 'ADD', payload: arg}),
      COMPING: arg=> dispatch({type: 'COMPING', payload: arg})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

