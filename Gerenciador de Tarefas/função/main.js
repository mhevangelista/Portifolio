// função que adiciona tarefa

function addTask() {

    //titulo da tarefa
    const taskTitle = document.querySelector("#task-title").value;

    if(taskTitle){

        //clonar template

        const template = document.querySelector(".template");

        const newTask = template.cloneNode(true);

        //adicionar titulo

        newTask.querySelector(".task-title").textContent = taskTitle;
        
        //remover as classes Desnecessarias
        newTask.classList.remove("template");
        newTask.classList.remove("hide");

        //adicionar tarefa na lista 
        const list = document.querySelector("#task-list");

        list.appendChild(newTask)

        // Adicionar o evento de remover 
       const removeBtn = newTask.querySelector(".remove-btn").addEventListener("click", function(){
        removeTask(this);
       })

       //Adicionar o evento de tarefa concluida
       const doneBtn = newTask.querySelector(".done-btn").addEventListener("click", function(){

        doneTask(this);
       })
        // limpar texto
        document.querySelector("#task-title").value = "";
    }
}

//Função remover tarefa
function removeTask(task){

    task.parentNode.remove(true)
}

//Função Completar a tarefa
function doneTask(task){
    
    const taskComplete = task.parentNode;

    taskComplete.classList.toggle("done");
}

const addBtn = document.querySelector("#add-btn");

    addBtn.addEventListener("click", function(e) {

        e.preventDefault();

        addTask();

});