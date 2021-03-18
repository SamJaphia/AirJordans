//variables



const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlap = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content')
const productsDOM = document.querySelector('.products-center')

//cart
let cart =[];

function addCart() {
    var elem = document.getElementById("cartbutton");
    elem.innerText= "Added to cart!"
}

let currentTrainer

fetch('airjordan.json')
.then(response => response.json())
.then(data => {
    currentTrainer = data.items.find(trainer => trainer.sys.id === (new URL(window.location.href)).searchParams.get('id'));
    console.log(currentTrainer.fields.title)

    document.querySelector('#trainer-name').innerText = currentTrainer.fields.title;
    document.querySelector('#trainer-price').innerText = currentTrainer.fields.price;
    document.querySelector('#main-pic').src = currentTrainer.fields.image.fields.file.url;

    document.querySelector('#first-pic').src = currentTrainer.fields.imgOne.url;
    document.querySelector('#first-pic').addEventListener('click', function(){
        replaceMainImage(currentTrainer.fields.imgOne.url)
    })

    document.querySelector('#second-pic').src = currentTrainer.fields.imgTwo.url;
    document.querySelector('#second-pic').addEventListener('click', function(){
        replaceMainImage(currentTrainer.fields.imgTwo.url)
    });
    
    document.querySelector('#third-pic').src = currentTrainer.fields.imgThree.url;
    document.querySelector('#third-pic').addEventListener('click', function(){
        replaceMainImage(currentTrainer.fields.imgThree.url)
    });

    document.querySelector('#fourth-pic').src = currentTrainer.fields.imgFour.url;
    document.querySelector('#fourth-pic').addEventListener('click', function(){
        replaceMainImage(currentTrainer.fields.imgFour.url)
    });

    document.querySelector('#fifth-pic').src = currentTrainer.fields.imgFive.url;
    document.querySelector('#fifth-pic').addEventListener('click', function(){
        replaceMainImage(currentTrainer.fields.imgFive.url)
    })

});


// get the kicks
class Products {
  async getProducts () {
    try {
      let result = await fetch('airjordan.json')
      console.log(result)
      let data = await result.json()

      let products = data.items;
      products = products.map(item => {
                const { title, price } = item.fields
                const { id } = item.sys
                const image = item.fields.image.fields.file.url;
                return {title, price, id, image}
            })
            return products
        } catch (error){
            console.log(error)
        }
    } 
}
// display products
class UI{
  displayProducts(products){
      let result = '';
      products.forEach(product => {
          result += `
          <!--single product-->
          <article class="product">
              <div class="img-container">
                  <img src="${product.image}" alt="product" class="product-img">
                  <a href="./sizes?id=${product.id}" class="bag-btn">Choose sizes</a>
              </div>

                  <h3>${product.title}</h3>
                  <h4>$${product.price}</h4>
          </article>
          <!--end of single product-->`
      });
      productsDOM.innerHTML = result;
  }
}


//Local Storage
class Storage {
}

const ui = new UI();
const products = new Products()
products.getProducts().then(prod => ui.displayProducts(prod))

let currentURL = new URL(window.location.href)

currentURL.searchParams.get('id')

function replaceMainImage(path) {
    document.querySelector('#main-pic').src = path; }


