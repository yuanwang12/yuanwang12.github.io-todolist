import React, { Component } from 'react'
import { connect } from 'react-redux';
import './Todolist.css';

class Todolist extends Component {
    constructor(props){
        super(props);
        this.state={
            text: props.value,
            index: props.index
        };
        this.classArr = [];
    }
    // 删除
    handlerDelete = ()=>{
        this.props.DELETE(this.props.index);
        // 计算进心中的数据
        let count = this.props.pending - 1;
        this.props.COMPING(count);
    }
    // 修改
    handlerEdit = ()=>{
        console.log('修改');
        this.props.EDITABLE([this.props.index, true, this.props.value]);
        console.log(this.props);
    }
    // 完成
    handlerFinished = (e)=>{
        console.log('完成');
        this.props.EDITABLE([this.props.index, false, this.state.text]);
        console.log(this.myInput);
    }
    handlerSelect = (e)=>{
        this.props.CHANGE_STATE(this.props.index);
        if(this.props.todolist[this.props.index].state){
            // this.classArr.push(finishedbg);
             // 计算进心中的数据
            let pcount = this.props.pending - 1;
            this.props.COMPING(pcount);
            // 计算已完成的数据
            let fcount = this.props.finished + 1;
            this.props.FINISHED(fcount);
        }else{
             // 计算进心中的数据
             let pcount = this.props.pending + 1;
             this.props.COMPING(pcount);
             // 计算已完成的数据
             let fcount = this.props.finished - 1;
             this.props.FINISHED(fcount);
        }
    }
    changeValue = (e)=>{
        this.setState({
            text: e.target.value
        })
    }
    render() {
        console.log(this.props.value)
        return (
            <div>
                <ol>
                    <input type="checkbox" className={this.classArr.join(" ")} defaultValue={this.props.value} onClick={this.handlerSelect}/>
                    {
                        this.props.todolist[this.state.index].isEdit === true ? <input type="text" value={this.state.text} onChange={this.changeValue}/> : <span>{this.state.text}</span>
                    }
                    
                    <a href="##" onClick={this.handlerDelete}>删除</a>
                    {
                        this.props.todolist[this.state.index].isEdit === true ? 
                        <a href="##" onClick={this.handlerFinished}>完成</a> : <a href="##" onClick={this.handlerEdit}>修改</a>
                    }
                </ol>
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
        DELETE: (arg)=> dispatch({type: 'DELETE', payload: arg}),
        CHANGE_STATE: arg=> dispatch({type: 'CHANGE_STATE', payload: arg}),
        COMPING: arg=> dispatch({type: 'COMPING', payload: arg}),
        FINISHED: arg=> dispatch({type: 'FINISHED', payload: arg}),
        EDITABLE: arg=> dispatch({type: 'EDITABLE', payload: arg}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todolist);