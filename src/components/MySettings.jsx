import React from "react";
import ReactModal from "react-modal";
import { useState } from "react";

export default function MySettings({ settingsNameChange, settingsFunction }) {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    function nameTextChange(event) {
        settingsFunction(event.target.value)
    }
    function onSubmit() {
        closeModal()
    }
    function onClose() {
        settingsFunction('Unaiz Noushad')
        closeModal()
    }

    return (
        <div>
            <div className="settings-container">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="23" height="23" viewBox="0 0 24 24" stroke-width="1.5" stroke="#434343" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                    <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                </svg>
                <h4 className="settings" onClick={openModal}>My Settings</h4>
            </div>
            <ReactModal isOpen={isOpen} className="settings-modal-container" style={{ overlay: { backgroundColor: "rgb(0,0,0,0.5)" } }}>
                <div className="svg-name-text-modal-container">
                    <svg className="modal-svg-profile" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-circle" width="400" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="#434343" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                        <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                    </svg>
                    <p className="settings-modal-heading">Name</p>
                    <textarea onChange={nameTextChange} value={settingsNameChange} className="settings-textarea-modal" id="" ></textarea>
                </div>
                <div className="settings-submit-close-button-container">
                    <button className="settings-submit-button" onClick={onSubmit} >Submit</button>
                    <button className="settings-close-button" onClick={onClose}>Close</button>
                </div>
            </ReactModal>
        </div>

    )
}