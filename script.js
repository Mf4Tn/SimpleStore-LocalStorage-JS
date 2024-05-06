var cart = localStorage.getItem("cart_products") || [];
if (cart == null || cart == ''){
    data_cart = []
}else{
    data_cart = JSON.parse('['+cart+']');

}
function add_item(product_name,price,image,id){
    document.getElementsByClassName('products')[0].innerHTML += `
    <div class="col-md-4">
    <div class="product text-center">
      <img src="${image}" alt="${product_name}">
      <h3>${product_name}</h3>
      <p>${price}</p>
      <button class="btn btn-primary btn-add-to-cart" id="${id}" onclick="save_cart(this.id);">Add to Cart</button>
    </div>
  </div>
    `
    console.log('done')
}
function save_cart(product_id){
    cart_len();

    data_cart.push(product_id);
    // alert(cart)
    localStorage.setItem("cart_products",String(data_cart));
    alert(`Product: ${product_id} added successfully to cart !`)
}
//document.addEventListener('DOMContentLoaded',function(){
//   fetch_products()
//})

function fetch_products(){
    fetch('products.json').then(res =>res.json()).then(data=>{
        data.products.forEach(product => {
            add_item(product.product_name,product.price,product.image,product.id);
    });
    })
}
function fetch_cart(){
    product_info()
    
}
function add_cart(product_name,price,image,id){
    document.getElementsByClassName('cart')[0].innerHTML += `
        <div class="col-md-4 ${id}">
        <div class="product text-center">
        <img src="${image}" alt="${product_name}">
        <h3>${product_name}</h3>
        <p>${price}</p>
        <button class="btn btn-danger btn-remove" id="${id}" onclick='delete_product_cart(this.id)'>Remove from Cart</button>
        </div>
    </div>`
}
function cart_array(){
    var data = localStorage.getItem("cart_products");
    if( data != null && data != ""){
        return data.split(',');
    }
}
function product_info(){
    var remove_duplicates = []
    fetch('products.json').then(res =>res.json()).then(data=>{
        data.products.forEach(product => {
            // alert(cart_array().includes(product.id) +" "+product.id +" "+cart_array())
            if(cart_array().includes(String(product.id))){
                //remove_duplicates.push(product.id);
                add_cart(product.product_name,product.price,product.image,product.id)
            }
    });
    })
}

function delete_product_cart(product_id){
    if(cart_array().includes(product_id)){
        var new_cart = cart_array();
        var index_ = new_cart.indexOf(product_id);
        new_cart.splice(index_,1);
        localStorage.setItem("cart_products",new_cart);
        document.getElementsByClassName(product_id)[0].remove();
        alert(`Product: ${index_} deleted successfully !`);
        return true;
    }
}
function cart_len(){
    var data = localStorage.getItem("cart_products") || [];
    console.log(data.length);
    var len = "0";
    if(data == "" || data == null){
        len = "0";
    }else{
        if(data.length == 1){
            len = "1";
        }else{
            len = data.split(',').length;
        }
        
    }
    document.getElementById('cart_len').innerText = len;
}