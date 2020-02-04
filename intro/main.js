//Add a description to the data object with the value "A pair of warm, fuzzy socks". Then display the description using an expression in an p element, underneath the h1.
Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
})

Vue.component('product', {
  props:{
    premium:{
      type:Boolean,
      required:true
    }
  },
  template:`
    <div class="product" v-cloak>
    <div class="product-image">
        <img :src="image" />
        <a :href="link">{{label}}</a>
    </div>
    <div class="product-info">
        <h1 v-text="product"></h1>
        <p v-text="description"></p>
        <p v-if="inStock">In stock</p>
        <p v-else
          :class="{outofstock: !inStock}">Out of stock</p>
        <span v-if="onSale">On Sale</span>
        <p>{{ sale }}</p>
        <p>Shipping {{ shipping }}</p>
        <product-details :details="details"></product-details>
        <div v-for="(variant, index) in variants"
              :key="variant.variantId"
              class="color-box"
              :style="{backgroundColor:variant.variantColor}"
              @mouseover="updateProduct(index)">
            
        </div>
        <ul>
            <li v-for="size in sizes">{{size}}</li>
        </ul>
        <button v-on:click="addToCart"
                :disabled="!inStock"
                :class="{disabledButton: !inStock}">Add to cart</button>
        <button v-on:click="removeFromCart">Remove from cart</button>

        <div>
          <h2>Reviews</h2>
          <p v-if="!reviews.length">There are no reviews yet.</p>
          <ul>
            <li v-for="review in reviews">
              <p>{{review.name}}</p>
              <p>{{review.rating}}</p>
              <p>{{review.review}}</p>
            </li>
          </ul>
        </div>


        <product-review @review-submitted="addReview"></product-review>
    </div>
  </div>
  `,
  data() {
    return {
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
      onSale: true,
      reviews: []

    }
  },
  methods: {
    addToCart: function(){
     this.$emit('add-to-cart',this.variants[this.selectedVariant].variantId)
    },
    removeFromCart(){
      this.$emit('remove-from-cart',this.variants[this.selectedVariant].variantId)
    },
    updateProduct(index){
      this.selectedVariant = index
      
    },
    addReview(productReview){
      this.reviews.push(productReview)
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
    },
    shipping(){
      if(this.premium){
        return "Free"
      }
      return 2.99
    }
  }
})

Vue.component('product-review',{
  template: `
    <form class="review-form" @submit.prevent="onSubmit">
    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name">
    </p>
    <p>
      <label for="review">Review:</label>
      <textarea id="review" v-model="review"></textarea>
    </p>
    <p>
      <label for="rating" >Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
    <p>
      <input type="submit" value="Submit">
      
    </p>
    </form>
  `,
  data(){
    return{
      name: null,
      review: null,
      rating: null
    }
  },
  methods: {
    onSubmit(){
      if(this.name && this.review && this.rating){
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating
        }
        this.$emit('review-submitted',productReview)
        this.name = null
        this.review = null
        this.rating = null
      }else{
        if(!this.name) this.errors.push("Name required")
        if(!this.review) this.errors.push("Review required")
        if(!this.rating) this.errors.push("Rating required")
      }
    }
  }
})

var app = new Vue({
  el: '#app',
  data:{
    premium:true,
    cart: []
  },
  methods:{
    updateCart(id){
      this.cart.push(id)
    },
    removeItem(id){
      for(var i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === id) {
           this.cart.splice(i, 1);
        }
      }
    }
  }
})
  
  