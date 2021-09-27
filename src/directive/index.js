import directive from './directives'

const importDirective = Vue => {
  Vue.directive('hasIdentity', directive.HasIdentity)
  // Vue.directive('draggable', directive.draggable)
  // Vue.directive('clipboard', directive.clipboard)
}

export default importDirective
