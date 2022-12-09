const URL_BASE = "https://6388fbf0a4bb27a7f796c4f7.mockapi.io";
let dataUser = [];
let dataPost = [];

const getDataFromApi = function(endpoint) {
    const url = URL_BASE + endpoint;
    const ajax = new XMLHttpRequest();
    
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            dataUser = data;
            userId = data.id;
            getPost(dataUser.id)
        }
    };
    
    ajax.open('GET', url, true);
    ajax.send();
    
}

const getPost = function(idUser) {
    const url = URL_BASE + "/user/" + idUser + "/posts";
    const ajax = new XMLHttpRequest();
    
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let post = JSON.parse(this.responseText);
            let tam = post.length
            postRand =  Math.floor(Math.random() * (tam - 1) + 1)
            dataPost = post[postRand]
            findPosts(4);
            
        }
    };
    
    ajax.open('GET', url, true);
    ajax.send();
 
}


const findPosts = function(total) {
    for (let i = 1; i <= total; i++) {
        createPost(dataPost, dataUser);
    }
  }

const createPost = function(post, user) {
    console.log(post)
    const paginationDiv = document.querySelector(".pagination");
    paginationDiv.insertAdjacentHTML("beforebegin", `
      <article class="box post post-excerpt">
            <header>
              <h2><a href="#">${post ? post.titlePost : "Teste"}</a></h2>
              <p>${post ? post.captionPost : "Teste"}</p>
            </header>
            <div class="info">
              <span class="date"><span class="month">Dez</span> <span class="day">01</span><span class="year">,
                  2022</span></span>
              <ul class="stats">
                <li><a href="#" class="icon fa-comment">${post ? post.countComments : "Teste"}</a></li>
                <li><a href="#" class="icon fa-heart">${post.countLikes}</a></li>
                <li><a href="#" class="icon brands fa-twitter">${post.countTwitter}</a></li>
                <li><a href="#" class="icon brands fa-facebook-f">${post.countFacebook}</a></li>
              </ul>
            </div>
            <a href="#" class="image featured"><img src="https://loremflickr.com/640/480/business" alt="" /></a>
            <p>
              ${post ? post.textPost : "Teste"}
            </p>
            <p class="author-avatar">
              <strong>Create by</strong>
              ${user.userName}
              <img src="${user.avatar}" />
            </p>
          </article>
    `)
  }

const carregarMais = document.querySelector("#carregar-mais");
carregarMais.addEventListener("click", function() {
    let ran =  Math.floor(Math.random() * (34 - 1) + 1);
    let valor = "/user/" + ran;
    getDataFromApi(valor);
});
