import Vue from 'vue'
import Landing from '@/views/Landing'

describe('Landing.vue', () => {
  it('should render landing', () => {
    const Constructor = Vue.extend(Landing)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.landing')).to.exist
  })
})
