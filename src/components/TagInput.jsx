import React from "react";
import { useState } from "react";



export default function Tag(props) {
    console.log(props)
    const [isTag, setIsTag] = useState(false)
    console.log(isTag)
    function contentVisibility() {

        setIsTag(!isTag)
        props.funct(!isTag)
    }
    function handleKeyChange(event) {


        if (event.key === "Enter") {
            props.setToDo(event.target.value)
            // props.toDo.tag.push(event.target.value)
            // props.toDo.tag.push(<span className="removed-element">&times;</span>)
            // event.target.value = ''
        }

    }
    function saveButtonToggled() {
        contentVisibility()
    }


    return (
        <div>
            <button className={isTag && "tag-button"} onClick={contentVisibility}>TAG</button>

            {isTag && <div >
                <h4>ADD TAGS</h4>
                <div className="tag-border" >
                    <input onKeyDown={handleKeyChange} className="input-tag" type="text" placeholder="Name" />
                    <button onClick={saveButtonToggled}>Save</button>
                    {/* {props.todo.tag} */}


                </div>
            </div>}

        </div>
    )
}