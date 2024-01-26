// import React from "react";
// import { useState } from "react";



// export default function Tag() {
//     const [isTag, setIsTag] = useState(false)
//     const [tags, setTags] = useState([])
//     function contentVisibility() {
//         setIsTag(!isTag)
//     }
//     function handleKeyChange(event) {
//         if (event.key === "Enter") {
//             setTags(event.target.value)
//         }

//     }


//     return (
//         <div className={isTag ? "blurred-background" : ""} >
//             <button onClick={contentVisibility}>TAG</button>

//             {isTag && <div className="non-blurred-background" >
//                 <h4>ADD TAGS</h4>
//                 <div className="tag-border" >
//                     <input onKeyDown={handleKeyChange} className="input-tag" type="text" placeholder="Name" />
//                     {tags}
//                 </div>
//             </div>}
//         </div>
//     )
// }