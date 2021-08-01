import {
    ADD_COUNTER,
    ADD_COUNTERS
} from './mutation-types'
export default {
    //mutations唯一目的就是修改state中的状态，它一般做比较单一的事情,他可以跟踪
    [ADD_COUNTER](state, payload) {
        payload.count++
    },
    [ADD_COUNTERS](state, payload) {
        payload.checked = false
        state.cartList.push(payload)
    }
}