//Add a description to the data object with the value "A pair of warm, fuzzy socks". Then display the description using an expression in an p element, underneath the h1.

var app = new Vue({
  el: '#app',
  data: {
    brand:'Vue mastery',
    product: 'Socks',
    description: 'A pair of warm, fuzzy socks',
    //image: './assets/vmSocks-green-onWhite.jpg',
    selectedVariant:0,
    link: 'http://google.com',
    label:'Buy',
    //inStock: false,
    OutOfStock:false,
    details: ["80 cotton","20% natural"],
    sizes: ["S","M","L","XL"],
    variants:[
      {
        variantId:2234,
        variantColor:"green",
        variantImage: "./assets/vmSocks-green-onWhite.jpg",
        variantQuantity: 10
      },
      {
        variantId:2235,
        variantColor:"blue",
        variantImage: "./assets/vmSocks-blue-onWhite.jpg",
        variantQuantity: 0
      }
    ],
    cart:0,
    onSale: true
  },
  methods: {
    addToCart: function(){
      this.cart += 1
    },
    removeFromCart(){
      if(this.cart == 0){
        return
      }
      this.cart -= 1
    },
    updateProduct(index){
      this.selectedVariant = index
      
    }
  },
  computed:{
    title(){
      this.brand + ' ' + this.product
    },
    image(){
      return this.variants[this.selectedVariant].variantImage
      
    },
    inStock(){
      return this.variants[this.selectedVariant].variantQuantity
    },
    sale(){
      if(this.onSale){
        return this.brand + this.product + ' are on sale!'
      }
      return this.brand + this.product + ' are not on sale!'
    }
  }
})
  
  