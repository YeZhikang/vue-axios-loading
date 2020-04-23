<template>
    <div>
    </div>
</template>

<script>
export default {
    name: "LoadingContainer",
    props: {
        parentNode: {
            type: HTMLElement
        },
        isReady: {
            type: Boolean,
            default: false
        },
    },
    data(){
        return{
            childNode: null
        }
    },
    methods: {
        /**
         * 添加 loading 遮罩
         * @param parentNode
         */
        addLoadingContainer(parentNode) {
            console.log(parentNode)
            const position = parentNode.style.position
            if (!position) parentNode.style.position = 'relative'
            const child = document.createElement('div')
            child.classList.add('loading-dom')
            child.appendChild(this.createChildLoadingComponent())
            this.childNode = child
            parentNode.appendChild(child)
            child.style.opacity = 0
            child.classList.add('loading')
            setTimeout(() => child.style.opacity = 0.5,0)
        },

        /**
         * 移除父组件的遮罩
         * @param parentNode
         * @returns {boolean}
         */
        removeLoadingContainer(parentNode) {
            setTimeout(() => this.childNode.style.opacity = 0,0)
            setTimeout(() => parentNode.removeChild(this.childNode), 200)
            return true
        },

        /**
         * 增加子loading装饰
         */
        createChildLoadingComponent() {
            const childComponent = document.createElement('div')
            childComponent.classList.add('loader')
            return childComponent
        }
    },
    mounted() {
        this.$nextTick(() => this.addLoadingContainer(this.parentNode))
    },
    watch: {
        isReady: {
            handler: function (val) {
                console.log('special',val)
                if (val) this.removeLoadingContainer(this.parentNode)
            }
        }
    }
}
</script>

<style>
    .loading-dom {
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        position: absolute;
        z-index: 2000;
        transition: 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .loading {
        background-color: #f7f7f7;
        animation: showContainer;
    }

    .loader {
        border: 3px solid darkgray;
        border-bottom-color: transparent;
        border-radius: 50%;
        -webkit-animation: 1s loader linear infinite;
        animation: 1s loader linear infinite;
        animation-delay: 0.1s;
        position: relative;
        height: 15px;
        width: 15px;
    }

    @-webkit-keyframes loader {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    @keyframes loader {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
</style>
