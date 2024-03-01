import React, { useState } from "react";
import './styles.css';


const App =() => {
  const [todoList, setTodoList] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoStatus, setTodoStatus] = useState("未着手");
  const [todoDetail, setTodoDetail] = useState("");
  const [editTodoId, setEditTodoId] = useState("");
  const [filterStatus, setFilterStatus] = useState("全て")

  const [isTodo, setIsTodo] = useState(false);

  const [deleteMessage, setDeleteMessage] = useState("")

  const getNextId = () => {
    const nextId = Math.max(...todoList.map((todo) => todo.id))
    return nextId !== -Infinity ? nextId : 0;
  }

  const onClickAdd = () => {
    if (todoTitle === "") {
      setIsTodo(true)
    } else {
      setIsTodo(false)

      const newTodo = {
        id: getNextId() + 1,
        title: todoTitle,
        status: todoStatus,
        detail: todoDetail,
        createdAt: new Date(),
        updatedAt: ""
      };
  
      setTodoList([...todoList, newTodo]);
      setTodoTitle("");
      setTodoStatus("未着手");
      setTodoDetail("");

      setDeleteMessage("")
      setIsTodo(false)
    }
  }

  const onClickEdit = (id) => {
    setEditTodoId(id)

    const editTodo = todoList.find((todo) => (
      todo.id === id
    ))
    setTodoTitle(editTodo.title)
    setTodoStatus(editTodo.status)
    setTodoDetail(editTodo.detail)

    setIsTodo(false)
  }

  const onEditSave = () => {
    if (todoTitle === "") {
      setIsTodo(true)
    } else {
      setIsTodo(false)
      const updateTodo = todoList.map((todo) => {
        if(todo.id === editTodoId) {
          return {
            ...todo,
            title: todoTitle,
            status: todoStatus,
            detail: todoDetail,
            updatedAt: new Date(),
          }
        }
        return todo
      })
      setTodoList(updateTodo);
      setEditTodoId(null);
      setTodoTitle("");
      setTodoStatus("未着手");
      setTodoDetail("");

      setDeleteMessage("")
      setIsTodo(false)
    }
  }

  const onClickBack = () => {
    setEditTodoId(null);
    setTodoTitle("");
    setTodoStatus("未着手");
    setTodoDetail("");

    setDeleteMessage("")
    setIsTodo(false)
  }

  const onClickDelete = (id) => {
    if(editTodoId && editTodoId === id) {
      setDeleteMessage("編集中のTODOは削除できません")
      return
    } 
    const newTodo = todoList.filter((todo) => (
      todo.id !== id
    ))
    setTodoList(newTodo)
    setDeleteMessage("")
  }

  const filterTodoList = () => {
    if(filterStatus === "全て"){
      return todoList
    } else {
      return todoList.filter((todo) => todo.status === filterStatus)
    }
  }


  return (
    <>
      <div className="all"> 
        <div className="head">
          <h1 className="todo-app">TODO APP</h1>
          {isTodo && <p style={{color: "red", textAlign: "center"}}>TODOを入力してください</p>}
        </div>
        <div className="input-area">
          <div className="input-wrapper">
            <input className="input"
              placeholder="TODOを入力"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
            />
            <select 
              className="select"
              value={todoStatus}
              onChange={(e) => setTodoStatus(e.target.value)}
            >
              <option value="未着手">未着手</option>
              <option value="進行中">進行中</option>
              <option value="完了">完了</option>
            </select>
          </div>
          <div className="tandb-wrapper">
            <textarea className="textarea"
              placeholder="詳細を入力"
              value={todoDetail}
              onChange={(e) => setTodoDetail(e.target.value)}
            />
            <button 
              className="add-button"
              onClick={editTodoId ? onEditSave : onClickAdd}
            >{editTodoId? "更新" : "追加"}</button>
            {editTodoId && 
              <button
                className="back-button" 
                onClick={onClickBack}>戻る</button>}
          </div>
          {deleteMessage && <p style={{ color: "red", textAlign: "center" }}>{deleteMessage}</p>}
        </div>
            
        <div className="todo-list">
          <h2 className="todo-sammary">TODO一覧</h2>
          <div className="filter">
            <select 
              className="filter-select"
              value={filterStatus}
              onChange={(e) => (setFilterStatus(e.target.value))}
            >
              <option value="全て">全て</option>
              <option value="未着手">未着手</option>
              <option value="進行中">進行中</option>
              <option value="完了">完了</option>
            </select>
          </div>
          <div>
            {filterTodoList().map((todo) => (
              <div 
                key={todo.id} 
                className="todo"
                style={{ backgroundColor: todo.status === "完了" && "#EEE" }}
              >
                <div>
                  <p>ID: {todo.id} </p>
                  <p>タイトル: {todo.title} </p>
                  <p>状態: {todo.status} </p>
                  <p>詳細: {todo.detail} </p>
                  <p>作成日: {todo.createdAt.toLocaleString()} </p>
                  <p>更新日: {todo.updatedAt? todo.updatedAt.toLocaleString() : "-"} </p>
                  <div className="eandd-button">
                    <button
                      className="edit-button"
                      onClick={() => (onClickEdit(todo.id))}>{editTodoId && editTodoId === todo.id ? "編集中" : "編集" }</button>
                    <button 
                      className="delete-button"
                      onClick={() => (onClickDelete(todo.id))}>削除</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
