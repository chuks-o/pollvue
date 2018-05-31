import { expect } from 'chai'
import { shallow } from '@vue/test-utils'
import Profile from '../src/components/Profile.vue'


describe('Profile.vue', () => {
    it('first vue component test', () => {
        const wrapper = shallow(Profile)
        const header = wrapper.find('.orange')
        expect(header.text()).to.equal('Profile')
    })
    it('contains the toggle property which is false', () => {
        const wrapper = shallow(Profile)
        expect(wrapper.vm.toggle).to.equal(false)
    })    
    it('button should toggle when pressed', () => {
        const wrapper = shallow(Profile)
        expect(wrapper.vm.toggle).to.equal(true)
    })

})
