import { debounce } from './utils.js'
import backTop from '@/components/content/backTop/backTop.vue'
export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            refresh: null
        }
    },
    mounted() {
        this.refresh = debounce(this.$refs.scroll.refresh, 5)
        this.itemImgListener = () => {
            this.refresh()
        }
        this.$bus.$on('itemImgLoad', this.itemImgListener)
            // console.log(1);

    }
}
export const backTopMixin = {
    components: { backTop },
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        backClick() {
            //console.log(11);
            this.$refs.scroll.scrollTo(0, 0, 1000)
        },
        listenShowBackTop(position) {
            this.isShowBackTop = (-position.y) > 1000
        }
    }
}