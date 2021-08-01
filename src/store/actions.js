import {
    ADD_COUNTER,
    ADD_COUNTERS
} from './mutation-types'
export default {
    addCart(context, payload) {
        return new Promise((resolve) => {
            //查找之前数组中是否有该商品
            let oldproduct = context.state.cartList.find(item => item.iid === payload.iid)
                //判断oldproduct
            if (oldproduct) {
                // oldproduct.count+=1
                context.commit(ADD_COUNTER, oldproduct)
                resolve('当前的商品数量+1')
            } else {
                payload.count = 1;
                // state.cartList.push(payload)
                context.commit(ADD_COUNTERS, payload)
                resolve('添加了新的商品')
            }
        })
    }
}