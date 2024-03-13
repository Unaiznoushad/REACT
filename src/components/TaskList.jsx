import React from "react";
import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
export default function TaskList({ data, index, toggleCheckbox, toDos, setToDos, tagValueFunction, setToDoDetailsCheck, clickState, details, toDoDetailsCheck, clickedIndexFunction }) {
  // console.log(tagValueFunction, "tagValueFunction")

  const isDraggable = !data.isChecked;
  const [clicked, setClicked] = useState(false)

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "list",
      item: { index },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [isDraggable]
  )


  const [, drop] = useDrop({
    accept: "list",
    hover: (item) => {
      const draggedIndex = item.index;
      if (draggedIndex !== index && !data.isChecked) {
        const updatedToDos = [...toDos];
        const draggedItem = updatedToDos[draggedIndex]
        updatedToDos.splice(draggedIndex, 1)
        updatedToDos.splice(index, 0, draggedItem)
        setToDos(updatedToDos)
      }
    },
  })

  const opacity = isDragging ? 0.5 : 1;


  let svgContent
  if (!data.isChecked) {
    switch (data.priority) {
      case "HIGH":
        svgContent = (<svg onClick={toggleCheckbox} className="svg-image" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
        </svg>)
        break
      case "MEDIUM":
        svgContent = <svg onClick={toggleCheckbox} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="orange" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
        </svg>
        break

      default:
        svgContent = <svg onClick={toggleCheckbox} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="blue" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
        </svg>
        break

    }

  }
  if (data.isChecked) {
    switch (data.priority) {
      case "HIGH":
        svgContent = <svg onClick={toggleCheckbox} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-check" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
          <path d="M9 12l2 2l4 -4" />
        </svg>
        break
      case "MEDIUM":
        svgContent = <svg onClick={toggleCheckbox} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-check" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="orange" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
          <path d="M9 12l2 2l4 -4" />
        </svg>
        break

      default:
        svgContent = <svg onClick={toggleCheckbox} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-check" width="20" height="" viewBox="0 0 24 24" stroke-width="1.5" stroke="blue" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
          <path d="M9 12l2 2l4 -4" />
        </svg>
        break

    }

  }
  function listItemsToggled(index) {
    // setToDoDetailsCheck(!toDoDetailsCheck)
    // if (!clicked) {
    setClicked(!clicked)
    clickState(!clicked)
    clickedIndexFunction(index)
    // details(true)
    // console.log(setToDoDetailsCheck, "setToDoDetailsCheck")
    // data.tags.map((eachTag)=>)

    // }
  }


  return (
    <div ref={(node) => isDraggable && drag(drop(node))} style={{ opacity }}>
      <div onClick={() => listItemsToggled(index)} className={clicked ? "list-item-clicked" : "list-item"}>

        <div className="text-and-checkbox-container">
          {svgContent}
          <input
            className="checkbox"
            type="checkbox"
            name="isChecked"
            checked={data.isChecked}
            onChange={() => toggleCheckbox(index)}
          />
          {data.isChecked ? <s>{data.text}</s> : data.text}

        </div>
        <div className="tag-rendering-container">
          {data.tags.map((_tag) => (<span className="tag">{_tag.label}</span>))}
        </div>





        <hr />
      </div>
    </div >
  )
};
