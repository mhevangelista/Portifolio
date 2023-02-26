const url = "https://jsonplaceholder.typicode.com/posts"

const loadingElement = document.querySelector("#loadding")
const postsContainer = document.querySelector("#posts-container")

const postPage = document.querySelector("#post")
const postContainer = document.querySelector("#post-container")
const comentsContainer = document.querySelector("#coments-container")

const commentForm = document.querySelector("#coment-form")
const emailInput = document.querySelector("#email")
const bodyInput = document.querySelector("#body")

// Get id From URL 
const urlSearchParams = new URLSearchParams(window.location.search)
const postId = urlSearchParams.get("id")

// Get All Post
async function getAllPosts(){
    const response = await fetch(url);

    console.log(response)

    const data = await response.json();
    
    console.log(data)

    loadingElement.classList.add("hide")
    
    data.map((post) => {
        const div = document.createElement('div');
        const title = document.createElement('h2');
        const body = document.createElement("p");
        const link = document.createElement("a");

        title.innerText = post.title;
        body.innerText = post.body;
        link.innerText = "Ler";
        link.setAttribute("href", `/post.html?id=${post.id}`);

        div.appendChild(title);
        div.appendChild(body);
        div.appendChild(link)

        postsContainer.appendChild(div)
    }) 
}

// Get individual Post 
async function getPost(id){

    const [responsePost, responseComments] = await Promise.all([
        fetch(`${url}/${id}`),
        fetch(`${url}/${id}/comments`)
    ])

    const dataPost = await responsePost.json();
    const dataComments = await responseComments.json();

    loadingElement.classList.add("hide");
    postPage.classList.remove("hide");

    const title = document.createElement("h1")
    const body = document.createElement("p")

    title.innerText = dataPost.title
    body.innerText = dataPost.body

    postContainer.appendChild(title)
    postContainer.appendChild(body)

    dataComments.map((coment) =>{
        createComment(coment)
    })
}
   
function createComment(coment){
    const div = document.createElement("div")
    const email = document.createElement("h3")
    const comentBody = document.createElement("p")

    email.innerText = coment.email;
    comentBody.innerText = coment.body;

    div.appendChild(email);
    div.appendChild(comentBody);

    comentsContainer.appendChild(div);
}

async function postComent(coment){
    const response = await fetch(`${url}/${postId}/comments`, {
        method: "POST",
        body: coment,
        headers: {
            "content-type": "application/json", 
        }
    })

    const data = await response.json()

    createComment(data);
}

if(!postId){
    getAllPosts()
}else{
    getPost(postId)

    commentForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let comment = {
            email: emailInput.value,
            body: bodyInput.value
        };

        comment = JSON.stringify(comment)

        postComent(comment)
    })

}

