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
        updatedToDos.splice(clickedIndex, 1)
        setToDos(updatedToDos)
        // var clickedObject = updatedToDos[clickedIndex]
        // clickedObject = undefined
        // setToDos((prevState) => ({ ...prevState, ...clickedObject }))
        setIsOpen(false)

    }
    // function deleteFunction() {
    //     const activeIndex = clickedIndex
    // props.setClickedIndex(null)
    //     setToDos((prevState) => {
    //         // Create a new array without the clicked object
    //         const arr = prevState.filter((todo, index) => index !== clickedIndex);
    //         return arr
    //     });
    //     setIsOpen(false);
    // }
    return (
        <div>
            <button onClick={openModal}>Delete</button>

            <ReactModal isOpen={isOpen} onRequestClose={closeModal} >
                <p>Are you sure want to delete this todo?</p>
                <span>
                    <button onClick={deleteFunction}>Delete</button>
                    <button onClick={closeModal}>Cancel</button>
                </span>
            </ReactModal>
        </div>
    )
}