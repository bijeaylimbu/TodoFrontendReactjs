import React, { Component, useEffect, useState } from "react";

import "../HomePage/HomePage.css";
function HomePage(){

    const [todoList, setTodoList]=useState([]);
    const [title, setTitle]=useState("")
    const [id, setId]=useState('')

    useEffect(()=>{

        fetch("http://localhost:8080/api/todo")
        .then(res=>res.json())
        .then(

            (result)=>{

                setTodoList(result);
            }
        )
    },[])


    // const AddTodoList=()=>{

    //     const uploadData=new FormData();

    //         uploadData.append('title',title);
    //         fetch("http://localhost:8080/api/todo",{

    //         method:"POST",
    //         headers: {
    //             'Accept':'application/json',
    //     'Content-Type':'application/json'
    //         },
    //         body:uploadData
    //         }
        
    //         )
    // }
  
   

    function AddTodo(){
let item={title}
        fetch('http://localhost:8080/api/todo', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: title,
              
            })
          })
          window.location.reload();
    }
  

    function deleteList(id) {
        fetch(`http://localhost:8080/api/todo/${id}`, {
          method: 'DELETE'
        }).then((result) => {
          result.json().then((resp) => {
            console.warn(resp)
           
          })
        })
        window.location.reload();
      }

      function UpdateTodo(id){
        let item={title}
                fetch(`http://localhost:8080/api/todo/${id}`, {
                    method: 'PUT',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      title: title,
                      
                    })
                  })
                  window.location.reload();
            }
      
   
    return (
        <>
{todoList.map(list=>(
    <div key={list.id} className="todo_list">

        {list.title}
        <input type="text" id='title' className='' value = {title} onChange={(evt) => setTitle(evt.target.value)}  />


<button onClick={()=>UpdateTodo(list.id)} className="button_delete" >Update</button>
        <button className="button_delete"  onClick={() => deleteList(list.id)}>
            Delete
            </button>
    </div>



))}

<div className="add">
 <input type="text" id='title' className='' value = {title} onChange={(evt) => setTitle(evt.target.value)}  />
<br/>
<br/>
<button onClick={()=>AddTodo()}>Add</button>
</div>
        </>
    )

}



export default HomePage;