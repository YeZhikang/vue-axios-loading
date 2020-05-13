import LoadingHolder from "./components/LoadingHolder";
import Vue from 'vue'

const Loading = Vue.extend(LoadingHolder)

export default async function (data) {
    // 目标 loading
    data = {
        url: data.url,
        method: data.method || 'get',
        barShow: data.barShow,
        containerShow: data.containerShow,
        config: { timeout: 30000, ...data.config } || { timeout: 30000 },
        targetDom: data.targetDom || '',
        isReady: false,
        methodsArrWithoutData: [
            'get',
            'delete'
        ],
        methodsArrHasData: [
            'post',
            'options',
            'put'
        ],
        data: data.params
    }
    const singleLoader = new Loading({
        data
    }).$mount()
    const singleLoaderEl = singleLoader.$el
    document.body.appendChild(singleLoaderEl)


    return await new Promise((resolve => {
        Vue.prototype.$nextTick(async () => {
            const res = await singleLoader.handleStart()
            resolve(res)
        })
    }))
}
