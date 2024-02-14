
import React, { useState } from "react";
import "./index.css";
import List from "./components/TaskList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TodoInput from "./components/TodoInput/TodoInput";
// import Tag from "./components/TagInput";


export default function App() {

  const [toDos, setToDos] = useState([]);

  const [tagOptions, setTagOptions] = useState([{ label: "Personal task", value: "personalTask" }, { label: "office task", value: "officeTask" }])


  const onNewTodoAdd = (newTodoData) => {
    setToDos((prevData) => [
      { text: newTodoData.todoText, isChecked: false, priority: newTodoData.priority, tags: newTodoData.tags },
      ...prevData,
    ]);
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

        {/* <Tag toDo={toDo} funct={tagFunction} setToDo={setToDo} />
         */}


        {/* <Tag toDo={toDo} funct={tagFunction} setToDo={(neww) => {
          setToDo((prev) => {
            const newTodos = prev.tag.push(neww)
            return newTodos
          })
        }} /> */}
        <TodoInput addTodo={onNewTodoAdd} tagOptions={tagOptions} setTagOptions={setTagOptions} />
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




