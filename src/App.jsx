
import React, { useState } from "react";
import "./index.css";
import TaskList from "./components/TaskList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TodoInput from "./components/TodoInput/TodoInput";
import justTodoLogo from "./images/Vector.svg"
import TaskEdit from "./components/TaskEdit";
import TaskDelete from "./components/TaskDelete";
import MySettings from "./components/MySettings";

export default function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = React.useState({
    todoText: "",
    isChecked: false,
    priority: "LOW",
    tags: []
  });
  // const [tagOptions, setTagOptions] = useState([{ label: "Personal task", value: "personalTask" }, { label: "office task", value: "officeTask" }])
  const [tagOptions, setTagOptions] = useState([])
  const [tagValue, setTagValue] = React.useState([]);

  const [toDoDetailsCheck, setToDoDetailsCheck] = useState()
  const [clickedIndex, setClickedIndex] = useState(null)
  const [settingsNameChange, setSettingsNameChange] = useState('Unaiz Noushad')


  function clickedIndexFunction(param) {
    setClickedIndex(param)
  }

  React.useEffect(() => {
    console.log(toDos)
  }, [toDos])
  function tagUpdation(newTodoData) {
    const newTags = newTodoData.tags
    if (Array.isArray(newTags) && newTags.length > 0) {
      const tagsToBeAddedToTagOptions = newTags.filter((_indTag) => {
        for (let i = 0; i < tagOptions.length; i++) {
          console.log("_inTag and tagOptio,", _indTag.value.toLowerCase(), tagOptions[i].value.toLowerCase())
          if (_indTag.value.toLowerCase() === tagOptions[i].value.toLowerCase()) {
            return false
          }
        }
        return true
      })
      setTagOptions((prevState) => [...tagsToBeAddedToTagOptions, ...prevState])
    }
  }

  const onNewTodoAdd = (newTodoData) => {
    setToDos((prevData) => [
      { text: newTodoData.todoText, isChecked: false, priority: newTodoData.priority, tags: newTodoData.tags },
      ...prevData,
    ])

    tagUpdation(newTodoData)
  }


  function toggleCheckbox(index) {
    setToDos((prevData) => {
      const updatedToDos = [...prevData];
      const toggledTodo = { ...updatedToDos[index] }

      toggledTodo.isChecked = !toggledTodo.isChecked;

      if (toggledTodo.isChecked) {
        updatedToDos.splice(index, 1);
        updatedToDos.push(toggledTodo);
      } else {
        updatedToDos.splice(index, 1)
        updatedToDos.unshift(toggledTodo)
      }

      return updatedToDos;
    });
  }


  function clickState(param) {
    setToDoDetailsCheck(param)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="main-container">
        <div className="first-section">
          <div className="just-todo-container">
            <img className="todo-logo" src={justTodoLogo} alt="" />
            <h4 className="just-todo-class">Just Todo</h4>
          </div>

          <div className="profile-container">
            <svg className="svgg" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#434343" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
            </svg>
            <h4 className="profile-name">{settingsNameChange}</h4>
          </div>

          <MySettings setSettingsNameChange={setSettingsNameChange} settingsNameChange={settingsNameChange} />
          <div className="first-section-tags-container">
            <h2 className="first-section-tags">Tags</h2>
            {tagOptions.map((taag) => <p className="tagAlignLeftClass">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-tag" width="15" height="15" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                <path d="M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3z" />
              </svg>{taag.label}</p>)}
          </div>

        </div>
        <div className="second-section">
          <TodoInput toDo={toDo} setToDo={setToDo}
            setTagValue={setTagValue} tagValue={tagValue}
            addTodo={onNewTodoAdd} tagOptions={tagOptions}
            setTagOptions={setTagOptions} />
          <div >
            <p className="todos-sub-heading">My Todos</p>
            {toDos.map((data, i) => (
              <TaskList
                key={i}
                index={i}
                data={data}
                toDos={toDos}
                setToDos={setToDos}
                toggleCheckbox={() => toggleCheckbox(i)}
                setToDoDetailsCheck={setToDoDetailsCheck}
                toDoDetailsCheck={toDoDetailsCheck}
                clickState={clickState}
                clickedIndexFunction={clickedIndexFunction}
              />
            ))}

          </div>
        </div>
        <div className="third-section individual-todo-details-section">

          {/* Change toDoDetailsCheck to toDoDetailsSelected */}
          {clickedIndex !== null ? <>
            <p className="todo-details">Todo Details</p>
            <p className="todo-details-text">{toDos[clickedIndex].text}</p>
            {toDos[clickedIndex].tags.map((_tag) => {
              return (
                <span className="todo-details-tag" key={_tag.value}>{_tag.label}</span>
              )
            })}

            <div>
              <TaskEdit toDo={toDo} tagUpdation={tagUpdation}
                tagOptions={tagOptions} setToDos={setToDos}
                toDos={toDos} clickedIndex={clickedIndex} />
              <TaskDelete toDos={toDos} clickedIndex={clickedIndex}
                setToDos={setToDos} setClickedIndex={setClickedIndex} />
            </div>
          </> : null}

        </div>
      </div>
    </DndProvider >
  );
}




