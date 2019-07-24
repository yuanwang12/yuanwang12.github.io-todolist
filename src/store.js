import { createStore } from 'redux';

// 初始化store state状态数据
const initialState = {
    todolist:[
      {value: 'reducer初始值', state: false, isEdit: false}
    ],
    pending: 1, //正在进行
    finished: 0, //已完成
 }

// 定义action类型
const ADD = "ADD";
const DELETE = "DELETE";
const UPDATE = "UPDATE";
const CHANGE_STATE = "CHANGE_STATE";
const COMPING = "COMPING";
const FINISHED = "FINISHED";
const EDITABLE = "EDITABLE";
// 创建reducer函数
const educationReducer = (state = initialState, action)=> {
    switch(action.type){
        case ADD: {
            return {
                ...state, // 解构下当前state,保持state最新
                todolist: [...state.todolist, ...action.payload]
            }
        }
        case DELETE: {
            return {
                ...state, // 解构下当前state,保持state最新
                todolist: [...state.todolist.slice(0, action.payload), ...state.todolist.slice(action.payload + 1)]
            }
        }
        case UPDATE: {
            return {
                ...state, // 解构下当前state,保持state最新
                todolist: [...action.payload]
            }
        }
        case CHANGE_STATE: {
            return {
                ...state, // 解构下当前state,保持state最新
                todolist: [...state.todolist.map((item, index) => {
                    if(index === action.payload){
                        item.state = !item.state;
                    }
                    return item;
                })]
            }
        }
        case COMPING: {
            return {
                ...state, // 解构下当前state,保持state最新
                pending: action.payload > 0 ? action.payload : 0
            }
        }
        case FINISHED: {
            return {
                ...state, // 解构下当前state,保持state最新
                finished: action.payload > 0 ? action.payload : 0
            }
        }
        case EDITABLE: {
            return {
                ...state, // 解构下当前state,保持state最新
                todolist: [...state.todolist.map((item, index) =>{
                    if(index === action.payload[0]){
                        item.isEdit = action.payload[1];
                        item.value = action.payload[2]
                    }
                    return item;
                })]
            }
        }

        default:
            return state;
    }
}

// 基于reducer创建store存储空间 
let store = createStore(educationReducer);

export default store;


