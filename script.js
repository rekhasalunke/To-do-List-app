const inputBox =  document.getElementById('inputBox');
const addBtn =  document.getElementById('addBtn');
const todoList =  document.getElementById('todoList');

let editTodo = null;

// function to add to do
const addTodo = ( )=>{ 
    const inputText = inputBox.value.trim();
    if(inputText.length <= 0){
        alert("You must write something in your to do");
        return false;
    }
    if(addBtn.value === "Edit"){
        editTodo.target.previousElementSibling.innerHTML = inputText;
        editLocalTodo(inputText);
        addBtn.value = "Add";
        inputBox.value = "";
    }
    else{

    
    // creating p tag
    const li = document.createElement("li");
    const p = document.createElement("p");
    

    p.innerHTML = inputText; 
    li.appendChild(p); 


    
    // creating edit Btn
    const editBtn = document.createElement("button");
    editBtn.innerText="edit";
    editBtn.classList.add("btn","editBtn")
    li.appendChild(editBtn);

    editBtn.addEventListener("click",(e)=>{
        inputBox.value = p.innerHTML;
        addBtn.value = "Edit";
        editTodo = e;
        

    })


    // creating delete Btn
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText="Remove";
    deleteBtn.classList.add("btn","deleteBtn" )
    li.appendChild(deleteBtn);     




    todoList.appendChild(li);
    inputBox.value = "";
    
        saveLocalTodos(inputText);
    }
}

// function to update :(Edit /Delete) to do
const updateTodo = (e)=>{

    if(e.target.innerHTML === "Remove"){
    
    todoList.removeChild(e.target.parentElement);
    deleteLocalTodos(e.target.parentElement);
    }

    if(e.target.innerHTML === "Edit"){
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = " Edit ";
        editTodo = "e";
        
        
    
        
    }

}



const saveLocalTodos=(todo)=>{
    let todos = [];
    if(localStorage.getItem("todos") === null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    
     
     todos.push(todo);
     localStorage.setItem("todos",JSON.stringify(todos));
    

}

const getLocalTodos = ()=>{
    let todos = [];
    if(localStorage.getItem("todos") === null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
         todos.forEach(todo => {
             // creating p tag
    const li = document.createElement("li");
    const p = document.createElement("p");

    p.innerHTML = todo; 
    li.appendChild(p); 


    
    // creating edit Btn
    const editBtn = document.createElement("button");
    editBtn.innerText="edit";
    editBtn.classList.add("btn","editBtn")
    li.appendChild(editBtn)


    // creating delete Btn
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText="Remove";
    deleteBtn.classList.add("btn","deleteBtn" )
    li.appendChild(deleteBtn)




    todoList.appendChild(li);
   
            
         }); 
            
         }
    }
// function to delete local todo
    const deleteLocalTodos = (todo)=>{ 
        let todos = [];
    if(localStorage.getItem("todos") === null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText); 
    todos.splice(todoIndex,1);  
    localStorage.setItem("todos",JSON.stringify(todos));
    // Array functions : slice / slice
    console.log(todoIndex);
    

    }

    const editLocalTodo = (todo) =>{
        let todos = JSON.parse(localStorage.getItem("todos"));
        let todoIndex =  todos.indexOf(todo);
        todos[todoIndex] = inputBox.value;
        localStorage.setItem("todos",JSON.stringify(todos));     
        
        

    }


    document.addEventListener('DOMContentLoaded ',getLocalTodos)
addBtn.addEventListener('click',addTodo);
todoList.addEventListener('click',updateTodo); 