import React from "react";
import TagSelect from "../TagSelect/TagSelect";

const TodoInput = (props) => {


    const [toDo, setToDo] = React.useState({
        todoText: "",
        isChecked: false,
        priority: "LOW",
        tags: []
    });


    const [tagValue, setTagValue] = React.useState();

    const resetInput = () => {
        setToDo({ todoText: "", isChecked: false, priority: "LOW", tag: [] });
    }

    const onSubmit = () => {
        props.addTodo({ ...toDo, tags: tagValue ? tagValue : [] })
        resetInput()
    }

    function onTextChange(event) {
        const { name, value, type, checked } = event.target;
        setToDo((prevState) => ({
            ...prevState,
            todoText: value,
        }));
    }

    function onPriorityChange(event) {
        const { name, value, type, checked } = event.target;
        setToDo((prevState) => ({
            ...prevState,
            priority: value,
        }));
    }

    function onTagSelection(newTags) {
        setToDo((prevState) => ({
            ...prevState,
            tags: newTags,
        }));
    }

    function keyDown(event) {
        if (event.keyCode === 13) {
            onSubmit();
        }
    }

    return (
        <div >
            <h1 className="heading">TODO APPLICATION</h1>
            <span>
                <input
                    className="inp"
                    type=""
                    placeholder="Enter a list"
                    onKeyDown={keyDown}
                    onChange={onTextChange}
                    name="todoText"
                    value={toDo.todoText}
                />
                <select onChange={onPriorityChange} name="priority" value={toDo.priority} className="select">
                    <option className="first">HIGH</option>
                    <option className="second-option">MEDIUM</option>
                    <option className="third-option">LOW</option>
                </select>
                <TagSelect onTagSelection={onTagSelection} toDo={toDo} tagOptions={props.tagOptions} setTagOptions={props.setTagOptions}
                    value={tagValue} setValue={setTagValue} />

                <button className="btn" onClick={onSubmit}>
                    +ADD
                </button>
            </span>
        </div>
    )
}

export default TodoInput;