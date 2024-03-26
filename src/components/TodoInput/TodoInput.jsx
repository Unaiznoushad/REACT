import React from "react";
import TagSelect from "../TagSelect/TagSelect";

const TodoInput = (props) => {
    const { setToDo, toDo } = props
    const resetInput = () => {
        setToDo({ todoText: "", isChecked: false, priority: "LOW", tags: [] });
        props.setTagValue([])
    }
    const onSubmit = () => {
        if (toDo.todoText) {
            props.addTodo({ ...toDo, tags: props.tagValue ? props.tagValue : [] })
            resetInput()
        }
    }

    function onTextChange(event) {
        const { value } = event.target;
        setToDo((prevState) => ({
            ...prevState,
            todoText: value
        }));
    }

    function onPriorityChange(event) {
        const { value } = event.target;
        setToDo((prevState) => ({
            ...prevState,
            priority: value,
        }));
    }



    function keyDown(event) {
        if (event.keyCode === 13) {
            onSubmit();
        }
    }

    return (
        <div >
            <h1 className="heading">Add new Todo</h1>
            <div >
                <h2 className="text-sub-heading">Text</h2>
                <textarea
                    name="todoText"
                    id=""
                    className="text-input"
                    placeholder=" Enter your todo text here"
                    onKeyDown={keyDown}
                    onChange={onTextChange}
                    value={toDo.todoText}>
                </textarea>
                <div className="tag-and-priority-div">
                    <div className="priority-container">
                        <h2 className="priority-sub-heading">Priority</h2>
                        <select onChange={onPriorityChange} name="priority" value={toDo.priority} className="priority-select">
                            <option className="first-option">HIGH</option>
                            <option className="second-option">MEDIUM</option>
                            <option className="third-option">LOW</option>
                        </select>

                    </div>
                    <div className="tag-container">
                        <h2 className='tag-sub-heading'>Tags</h2>
                        <TagSelect setToDo={setToDo} toDo={toDo} tagOptions={props.tagOptions} setTagOptions={props.setTagOptions}
                            value={props.tagValue} setValue={props.setTagValue} />
                    </div>


                </div>

                <button className="add-button" onClick={onSubmit}>
                    Add Todo
                </button>
            </div>
        </div>
    )
}

export default TodoInput;