import React, { useState } from "react";
import ReactModal from 'react-modal';
import CreatableSelect from "react-select/creatable";

export default function TaskEdit(props) {
    const { toDos, clickedIndex, setToDos, tagOptions } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [currentTodoTags, setCurrentTodoTags] = useState([])
    const [editedTodo, setEditedTodo] = useState({
        text: '',
        priority: "LOW",
        tags: []
    });

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

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
        // setToDos((prevState) => ({ ...prevState, tags: tagValue }))
        setEditedTodo((prevState) => ({ ...prevState, tags: newTags }))
    };

    const handleSave = () => {
        console.log("edited todo data", { editedTodo, currentTodoTags })
        const updatedTodos = [...toDos];
        updatedTodos[clickedIndex] = editedTodo;
        setToDos(updatedTodos);

        // setToDo({ todoText: "", isChecked: false, priority: "LOW", tags: [] });
        // setTagValue([])
        props.tagUpdation(editedTodo)
        setIsOpen(false);
    };

    React.useEffect(() => {
        if (Array.isArray(toDos) && toDos.length > 0) {

            const clickedTodo = toDos[clickedIndex];
            if (clickedTodo) {
                setEditedTodo({
                    text: clickedTodo.text,
                    priority: clickedTodo.priority,
                    tags: clickedTodo.tags
                });
                const clickedTodoTags = clickedTodo.tags
                if (Array.isArray(clickedTodoTags) && clickedTodoTags.length > 0) {
                    setCurrentTodoTags(clickedTodoTags)
                }
            }
        }
    }, [clickedIndex]);

    return (
        <div>

            <button onClick={openModal}>Edit</button>

            <ReactModal ariaHideApp={false} isOpen={isOpen} onRequestClose={closeModal} >
                <p>Edit todo</p>
                <p>Text</p>
                <textarea
                    name="text"
                    className="text-input"
                    placeholder="Enter your todo text here"
                    onChange={handleTextChange}
                    value={editedTodo.text}
                />
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
                    <div className="tag-container">
                        <h2 className='tag-sub-heading'>Tags</h2>
                        <CreatableSelect
                            isMulti
                            options={tagOptions}
                            onChange={(newTag) => setCurrentTodoTags(newTag)}
                            onCreateOption={handleCreateTag}
                            isClearable={true}
                            value={currentTodoTags}
                            className='react-select-tag'
                            placeholder="Create or select tag"
                            styles={{ control: (styles) => ({ ...styles, color: "black" }), option: (styles, { isFocused }) => ({ ...styles, backgroundColor: isFocused ? "white" : "white" }) }}
                        />
                    </div>
                </div>
                <button onClick={handleSave}>Save</button>
            </ReactModal>
        </div>
    );
}
