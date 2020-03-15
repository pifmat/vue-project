import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import BaseIcon from '../src/components/BaseIcon.vue' //includere un component in maniera Global
//Vue.component('BaseIcon',BaseIcon); //il component BaseIcon sarà accessibile all'interno di tutta l'app

/* utilizzare il metodo Automatic Global Registration */
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // The relative path of the components folder
  './components',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName)

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )


  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  )
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,//injected into all components, so they can ha direct access to it
  render: h => h(App)
}).$mount("#app");
