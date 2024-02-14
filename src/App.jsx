
import React, { useState } from "react";
import "./index.css";
import List from "./components/TaskList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import Tag from "./components/TagInput";
import TagSelect from "./components/TagSelect/TagSelect";

export default function App() {
  const [toDo, setToDo] = useState({
    enterAList: "",
    isChecked: false,
    priority: "LOW",
    tag: []
  });
  const [toDos, setToDos] = useState([]);



  function changing(event) {
    const { name, value, type, checked } = event.target;
    setToDo((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function keyDown(event) {
    if (event.keyCode === 13) {
      toggle();
    }
  }

  function toggle() {
    if (toDo.enterAList !== "") {
      setToDos((prevData) => [
        { text: toDo.enterAList, isChecked: false, priority: toDo.priority, tag: toDo.tag },
        ...prevData,
      ]);


      setToDo({ enterAList: "", isChecked: false, priority: "LOW", tag: [] });
    }
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

  // const [isTag, setIsTag] = useState(false)

  // function tagFunction(tag) {
  //   setIsTag(tag)
  // }





  return (
    <DndProvider backend={HTML5Backend}>
      <div className="main">
        {/* <div className={isTag && "background-blurred"}> */}
        <div >
          <h1 className="heading">TODO APPLICATION</h1>
          <span>
            <input
              className="inp"
              type="text"
              placeholder="Enter a list"
              onKeyDown={keyDown}
              onChange={changing}
              name="enterAList"
              value={toDo.enterAList}
            />
            <select onChange={changing} name="priority" value={toDo.priority} className="select">
              <option className="first">HIGH</option>
              <option className="second-option">MEDIUM</option>
              <option className="third-option">LOW</option>
            </select>


            <button className="btn" onClick={toggle}>
              +ADD
            </button>
          </span>

        </div>
        {/* <Tag toDo={toDo} funct={tagFunction} setToDo={setToDo} />
         */}

        <TagSelect setToDo={setToDos} toDo={toDo} />
        {/* <Tag toDo={toDo} funct={tagFunction} setToDo={(neww) => {
          setToDo((prev) => {
            const newTodos = prev.tag.push(neww)
            return newTodos
          })
        }} /> */}

        <div >
          {/* <div className={isTag && "background-blurred"}> */}
          {toDos.map((data, i) => (
            <List
              key={i}
              index={i}
              data={data}
              toDos={toDos}
              setToDos={setToDos}
              toggleCheckbox={() => toggleCheckbox(i)}

            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}




