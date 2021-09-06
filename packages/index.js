/**
 * @author monkeywang
 * Date: 17/11/9
 */
import LzDatePicker from './date/index.js';



const components = [
  LzDatePicker
]

const install = function(Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))

 
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  LzDatePicker
}
