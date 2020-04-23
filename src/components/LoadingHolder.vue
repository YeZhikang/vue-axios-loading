<template>
    <div>
        <loading-bar
                v-if="barShow"
                :is-show="barShow"
                :timeout="config.timeout"
                :is-ready="isReady"
        ></loading-bar>
        <loading-container
                v-if="containerShow"
                :parent-node="chooseCurrentDom(targetDom)"
                :is-ready="isReady"
        ></loading-container>
    </div>
</template>

<script>
import LoadingBar from "./LoadingBar";
import LoadingContainer from "./LoadingContainer";
import axios from 'axios'
import { returnDom } from "../utils";

export default {
    name: "LoadingHolder",
    components: { LoadingContainer, LoadingBar },
    data() {
        return {
            url: '',
            method: '',
            barShow: true,
            containerShow: true,
            config: {},
            data: {},
            // 目标 loading
            targetDom: '',
            isReady: false,
            methodsArrWithoutData: [
                'get',
                'delete'
            ],
            methodsArrHasData: [
                'post',
                'options',
                'put'
            ]
        }
    },
    methods: {
        sendRequest() {
            const method = this.methodsArrHasData.includes(this.method.toLowerCase())
            || this.methodsArrWithoutData.includes(this.method.toLowerCase())
                ? this.method.toLowerCase() : 'error'
            const requestFrom = window.service ? window.service : axios
            if (method === 'error') throw 'Request method is not support !'
            return this.choseRequestWay(method, this.url, this.config, requestFrom, this.data)
        },
        choseRequestWay(method, url, config, requestFrom, data) {
            if (this.methodsArrWithoutData.includes(method)) return requestFrom[method](url, config)
            else return requestFrom[method](url, data, config)
        },
        chooseCurrentDom() {
            const { isDom, dom } = returnDom(this.targetDom)
            if (!isDom) throw 'target is not a DOMElement !'
            return dom
        },

        async handleStart() {
            this.isReady = false
            const response = await this.sendRequest()
            this.isReady = true
            return response
        }
    },
    mounted() {

    }
}
</script>

<style scoped>

</style>
