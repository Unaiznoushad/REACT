import React from "react";
import ReactModal from "react-modal";
import { useState } from "react";

export default function TaskDelete(props) {
    const { toDos, clickedIndex, setToDos } = props
    const [isOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true)
    }
    function closeModal() {
        setIsOpen(false)
    }
    function deleteFunction() {
        props.setClickedIndex(null)
        const updatedToDos = [...toDos]
        const positionIndex = updatedToDos.findIndex(_todo => _todo.id === clickedIndex)
        updatedToDos.splice(positionIndex, 1)
        setToDos(updatedToDos)
        setIsOpen(false)
    }

    return (
        <div>
            <button onClick={openModal} className="task-first-delete-button">Delete <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="12" height="12" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 7l16 0" />
                <path d="M10 11l0 6" />
                <path d="M14 11l0 6" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg></button>

            <ReactModal isOpen={isOpen} onRequestClose={closeModal} className="task-delete-modal" style={{ overlay: { backgroundColor: "rgb(0,0,0,0.5)" } }} >
                <p className="task-delete-heading">Are you sure want to delete this todo?</p>
                <span className="task-delete-and-cancel-button-container">
                    <button onClick={deleteFunction} className="task-delete-button">Delete</button>
                    <button onClick={closeModal} className="task-delete-cancel-button">Cancel</button>
                </span>
            </ReactModal>
        </div>
    )
}