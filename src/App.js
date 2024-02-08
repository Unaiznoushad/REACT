
import React, { useState } from "react";
import "./index.css";
import List from "./components/list";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import Tag from "./components/tagInput";

export default function App() {
  const [toDo, setToDo] = useState({
    enterAList: "",
    isChecked: false,
    priority:"LOW",
    tag:[]
  });
  const [toDos, setToDos] = useState([]);

  function changing(event) {
    const { name, value, type, checked } = event.target;
    setToDo((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function keyDown(event) {
    if (event.keyCode === 13) {
      toggle();
    }
  }
  // function toggledOption(){
  //   console.log("toggle")
  //   toggle()
  // }

  function toggle() {
    if (toDo.enterAList !== "") {
      setToDos((prevData) => [
        { text: toDo.enterAList, isChecked: false ,priority:toDo.priority,tag:toDo.tag},
        ...prevData,
      ]);
      // {tags}
      

      setToDo({ enterAList: "", isChecked: false,priority:"LOW" ,tag:[]});
    }
  }

function toggleCheckbox(index) {
  setToDos((prevData) => {
    const updatedToDos = [...prevData];
    const toggledTodo = { ...updatedToDos[index] }

    toggledTodo.isChecked = !toggledTodo.isChecked;

    if (toggledTodo.isChecked) {
      updatedToDos.splice(index, 1); 
      updatedToDos.push(toggledTodo); 
    } else {
      updatedToDos.splice(index, 1) 
      updatedToDos.unshift(toggledTodo)
    }

    return updatedToDos;
  });
}

const [isTag, setIsTag] = useState(false)
function contentVisibility() {
    setIsTag(!isTag)
}
function handleKeyChange(event) {

    if (event.key === "Enter") {

        toDo.tag.push(event.target.value)
        // setToDo(prevToDo=>{
        //   [prevToDo,tag:event.target.value]
        // })
        event.target.value=''      
    }

}




  return (
    <DndProvider backend={HTML5Backend}>
      <div className="main">
        <h1 className="heading">TODO APPLICATION</h1>
        <span>
          <input
            className="inp"
            type="text"
            placeholder="Enter a list"
            onKeyDown={keyDown}
            onChange={changing}
            name="enterAList"
            value={toDo.enterAList}
          />
          <select onChange={changing} name="priority" value={toDo.priority} className="select">
            <option  className="first">HIGH</option>
            <option className="second-option">MEDIUM</option>
            <option className="third-option">LOW</option>
          </select>
        
        
          <button className="btn" onClick={toggle}>
            +ADD
          </button>
          <div className={isTag ? "blurred-background" : ""} >
            <button onClick={contentVisibility}>TAG</button>

            {isTag && <div className="non-blurred-background" >
                <h4>ADD TAGS</h4>
                <div className="tag-border" >
                    <input onKeyDown={handleKeyChange} className="input-tag" type="text" placeholder="Name" />


                </div>
            </div>}
        </div>
        </span>
        <div>
          {toDos.map((data, i) => (
            <List
              key={i}
              index={i}
              data={data}
              toDos={toDos}
              setToDos={setToDos}
              toggleCheckbox={() => toggleCheckbox(i)}
              
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}




// import React, { useState } from "react";
// import "./index.css"
// import List from "./components/list";
// // import { useDrag } from "react-dnd";

// export default function App() {
//   const [toDo, setToDo] = React.useState({
//     enterAList: "", isChecked: false
//   })
//   const [toDos, setToDos] = useState([])



//   function changing(event) {
//     console.log(event.target.value)
//     const { name, value, type, checked } = event.target
//     setToDo(prevState => {
//       return {
//         ...prevState,
//         [name]: type === 'checkbox' ? checked : value
//       }
//     })
//   }
//   function keyDown(event){
//     if(event.keyCode===13){
//       toggle()
//     }
//     console.log("key")

//   }
//   function toggle() {
//     console.log("toggle called")
//     if (toDo.enterAList !== "") {
//       // let markedIndex
//       // for(let i=0;i<toDos.length;i++){
//       //   if(toDos[i].isChecked===true){
//       //     markedIndex=i
//       //     i= toDos.length
//       //   }
//       //   }

//       setToDos((prevData) => {
//         // if(markedIndex){
//         //   console.log("array mod")
//         //   const test = JSON.parse(JSON.stringify(prevData))
//         //   test.splice(markedIndex,0, { text: toDo.enterAList, isChecked: false })
//         //   return test
//         // }
//       //   const firstElement=prevData.unshift({ text: toDo.enterAList, isChecked: false })
//       //   return [...prevData, firstElement]
//       // })
//         return [{text: toDo.enterAList, isChecked: false},...prevData]
//       })

//       setToDo({ enterAList: "", isChecked: false }) 
//     }
//   }


//   // const styles={
//   //   textDecoration:lineThrough
//   // }
//   // function toggleTwo(i){
//   //   console.log("iiii",i)
//   //   setToDos((prevTodos)=>{
//   //     const newTodos = prevTodos.filter((todo,indx)=>indx !== i)
//   //     console.log(newTodos)
//   //     return newTodos
//   //   })
//   // }

  // function toggleTwo(i, data) {
  //   // const tt = toDos.map((item, index) => index === i ? { ...item, isChecked: !item.isChecked } : item)

  //   //adding elements before the marked checkbox
  //   // const tt = [...toDos]
  //   // tt[i].isChecked = !tt[i].isChecked

  //   // const array1 = tt.filter((data) => data.isChecked === true)
  //   // const array2 = tt.filter((data) => data.isChecked === false)
  //   // setToDos( [...array2, ...array1])

  //   //adding elements after the marked checkbox

  //   setToDos((prevToDos)=>{
  //     const updatedToDos=[...prevToDos]
  //     const lastElement=updatedToDos.splice(i,1)[0]
  //     lastElement.isChecked=!lastElement.isChecked


  //     if(lastElement.isChecked){
  //     updatedToDos.push(lastElement)
  //     }
      // else{
      //   updatedToDos.unshift(lastElement)
      // }
  //     return updatedToDos
  //   })

  // }
//   // const [{isDragging},Drag]=useDrag(  )

  

//   // const arr = toDos.map((data, i) => (
//   //   <li className="list" key={i} draggable>
//   //     {data.isChecked ? <s>{data.text}</s> : toDos[i].text}
      
//   //     {/* {data.isChecked ? toDos.push(<s>{toDos[i].text}</s>)  : toDos[i].text} */}
//   //     <input
//   //       onClick={() => {
//   //         toggleTwo(i, data);
//   //       }}
//   //       onChange={changing}
//   //       type="checkbox"
//   //       name="isChecked"
//   //       checked={data.isChecked}
//   //     />
//   //   <hr />
//   //   </li>
//   // ))

//   return (
//     <div className="main">
//       <h1 className="heading">TODO APPLICATION</h1>

//       <span><input className="inp" type="text" placeholder="Enter a list" onKeyDown={keyDown} onChange={changing} name='enterAList' value={toDo.enterAList} />
//         <button className="btn"  onClick={toggle}>+ADD</button></span>
//       <div>{toDos.map((data, i) => (
//    <List id={data.i} data={data}/>
//   ))}
//   </div>
//     </div>
//   )
// }

