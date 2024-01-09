import React from "react";
import { useDrag, useDrop } from "react-dnd";
export default function List({ data, index, toggleCheckbox, toDos, setToDos ,toggledOption}) {

const isDraggable = !data.isChecked;

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

return (
  <div ref={(node) => isDraggable && drag(drop(node))} style={ opacity }>
    <div className="list-item">
      <span>
        {data.isChecked ? <s>{data.text}</s> : data.text}
        <input
          type="checkbox"
          name="isChecked"
          checked={data.isChecked}
          onChange={() => toggleCheckbox(index)}
        />
      </span>
      <hr />
    </div>
  </div>
)};
