import React, { useState } from "react";
import ReactModal from 'react-modal';
import CreatableSelect from "react-select/creatable";

export default function TaskEdit(props) {
    const { toDos, clickedIndex, setToDos, tagOptions, getTodoById } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [currentTodoTags, setCurrentTodoTags] = useState([])
    const [editedTodo, setEditedTodo] = useState({
        text: '',
        priority: "LOW",
        tags: [],
        isChecked: false,
        id: -1
    });

    function openModal() {
        setIsOpen(true)
    }
    function closeModal() {
        setIsOpen(false)
    }

    const handleTextChange = (event) => {
        const { name, value } = event.target;
        setEditedTodo(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handlePriorityChange = (event) => {
        const { value } = event.target;
        setEditedTodo(prevState => ({
            ...prevState,
            priority: value
        }));
    };

    const createOption = (label) => ({
        label,
        value: label.toLowerCase().replace(/\W/g, ''),
    });

    const handleCreateTag = (inputValue) => {
        const newOption = createOption(inputValue);
        const newTags = [newOption, ...currentTodoTags]
        setCurrentTodoTags(newTags);
        // setToDos((prevState) => ({ ...prevState, tags: tagValue }))getTodoById
        setEditedTodo((prevState) => ({ ...prevState, tags: newTags }))
    };

    const handleSave = () => {
        console.log("edited todo data", { editedTodo, currentTodoTags })
        const updatedTodos = [...toDos];
        const positionIndex = updatedTodos.findIndex(_todo => _todo.id === clickedIndex)
        updatedTodos[positionIndex] = editedTodo;
        setToDos(updatedTodos);
        props.tagUpdation(editedTodo)
        setIsOpen(false);
    };

    React.useEffect(() => {
        if (Array.isArray(toDos) && toDos.length > 0) {

            const clickedTodo = getTodoById(clickedIndex, toDos);
            console.log("clicked todo data in edit", clickedTodo);
            if (clickedTodo) {
                (
                    setEditedTodo)({
                        ...clickedTodo
                    });
                const clickedTodoTags = clickedTodo.tags
                if (Array.isArray(clickedTodoTags) && clickedTodoTags.length > 0) {
                    setCurrentTodoTags(clickedTodoTags)
                }
            }
        }
        // eslint-disable-next-line
    }, [clickedIndex, toDos]);

    return (
        <div className="task-edit-div">

            <button onClick={openModal} className="task-first-edit-button">Edit <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="12" height="12" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0085BF" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                <path d="M13.5 6.5l4 4" />
            </svg></button>

            <ReactModal ariaHideApp={false} isOpen={isOpen} onRequestClose={closeModal} className="task-edit-modal" style={{ overlay: { backgroundColor: "rgb(0,0,0,0.5)" } }} >
                <div className="task-edit-text-area">
                    <p className="task-edit-heading">Edit todo</p>
                    <p className="text-sub-heading">Text</p>
                    <textarea
                        name="text"
                        className="task-edit-text-input"
                        placeholder="Enter your todo text here"
                        onChange={handleTextChange}
                        value={editedTodo.text}
                    />
                </div>
                <div className="tag-and-priority-div">
                    <div className="priority-container">
                        <h2 className="priority-sub-heading">Priority</h2>
                        <select
                            name="priority"
                            onChange={handlePriorityChange}
                            value={editedTodo.priority}
                            className="priority-select"
                        >
                            <option className="first-option">HIGH</option>
                            <option className="second-option">MEDIUM</option>
                            <option className="third-option">LOW</option>
                        </select>
                    </div>
                    <div className="task-edit-tag-container">
                        <h2 className='tag-sub-heading-edit-modal'>Tags</h2>
                        <CreatableSelect
                            isMulti
                            options={tagOptions}
                            onChange={(newTag) => setCurrentTodoTags(newTag)}
                            onCreateOption={handleCreateTag}
                            isClearable={true}
                            value={currentTodoTags}
                            className='react-select-tag-edit-modal'
                            placeholder="Create or select tag"
                            styles={{ control: (styles) => ({ ...styles, color: "black" }), option: (styles, { isFocused }) => ({ ...styles, backgroundColor: isFocused ? "white" : "white" }) }}
                        />
                    </div>
                </div>
                <button className="task-edit-save" onClick={handleSave}>Save</button>
                <button className="task-edit-cancel" onClick={closeModal} >Cancel</button>
            </ReactModal>
        </div >
    );
}
