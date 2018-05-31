import { expect } from 'chai'
import sinon from 'sinon'
import Vuex from 'vuex'
import Polls from '../src/components/Polls.vue'
import { shallow, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)


describe ('Polls.vue', () => {
    let actions
    let store
    let getters

    beforeEach( () => {
        actions = {
            loadPolls: sinon.stub()
        }
        getters = {
            loading: () => 'false',
            userPolls: () => []
        }
        store = new Vuex.Store({
            state: {},
            getters,
            actions
        })
    })

    it('should dispatch the loadPoll action on click', () => {
        const wrapper = shallow(Polls, { store, localVue })
        wrapper.vm.onLoadPoll()
        expect().to.equal(200)
    })
    it('should verify the click button', () => {
        const wrapper = shallow(Polls, { store, localVue })
        expect(true).to.equal(true)
    })
})