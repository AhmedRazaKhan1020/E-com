const div = document.querySelector("#container")

const result = localStorage.getItem("card");
console.log(result);
fetch(`https://fakestoreapi.com/products/${result}`)
.then(res => res.json())
.then((res)=>{
        div.innerHTML += `
     <div class="card" data-aos="fade-up" style="width: 18rem;">
        <img src="${res.image}" class="card-img-top" alt="..." width=" 80%" height="150px">
        <div class="card-body">
          <h5 class="card-title">$${res.price}|${res.rating.rate}★★★</h5>
          <p class="card-text">${res.title}</p>
        </div>
    
      </div>
        `
    })

.catch((err)=>{
    console.log(err);
    
})