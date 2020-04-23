<template>
    <div
        v-if="isShow"
        class="loading-bar"
    ></div>
</template>

<script>
export default {
    name: "LoadingBar",
    props: {
        isShow: {
            default: true,
            type: Boolean
        },
        timeout: {
            type: Number,
            default: 3000
        },
        isReady: {
            default: false,
            type: Boolean
        }
        // transition: {
        //     default:
        // }
    },
    methods: {
        loading(timeOut = 3000, loadingBar) {
            const windowWidth = window.innerWidth
            let singleLoadingWidth = windowWidth / timeOut * 300;
            let currentWidth = loadingBar.style.width = singleLoadingWidth
            const inte = setInterval(() => {
                currentWidth += singleLoadingWidth
                if (this.isReady === true) {
                    currentWidth = windowWidth
                    setTimeout(() => loadingBar.style.left = `${ windowWidth }px`, 500)
                }
                if (currentWidth >= windowWidth) {
                    clearInterval(inte)
                    setTimeout(() => loadingBar.parentNode.removeChild(loadingBar), 1000)
                }
                loadingBar.style.width = `${ currentWidth }px`
            }, 300)
        },
    },
    mounted() {
        this.$nextTick(() => this.loading(this.timeout, document.querySelector('.loading-bar')))
    },
}
</script>

<style scoped>
    .loading-bar {
        z-index: 2023;
        position: fixed;
        top: 0;
        width: 0;
        background-color: #007a7a;
        transition: 0.3s linear;
        height: 3px;
    }
</style>
