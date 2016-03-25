export default {
    post: async (url, data, successCb, errorCb) => {
        let client = new XMLHttpRequest()
        client.open('POST', url, true)
        client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        client.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
        client.setRequestHeader('Accept', 'application/json')
        client.responseType = "json";

        client.onload = function(){
            if(this.status === 200){
                await successCb(this.response)
            } else {
                await errorCb(this.statusText)
            }
        }
    },
    bind: (el, eventName, eventHandler) => {
        if(!el) return
        if(el.length !== undefined){
            Array.from(el, (_el, i) => {
                _el.addEventListener(eventName, eventHandler)
            })
        } else {
            el.addEventListener(eventName, eventHandler)
        }
    },
    unbind: (el, eventName, eventHandler) => {
        if(!el) return
        if(el.length !== undefined){
            Array.from(el, (_el, i) => {
                _el.removeventListener(eventName, eventHandler)
            })
        } else {
            el.removeventListener(eventName, eventHandler)
        }
    },
    /**
     * 停止事件冒泡传播
     * @param {Event}
     */
    stopBubble: e => {
        var e = window.event || e;
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
    },

    /**
     * 阻止默认事件处理
     * @param {Event}
     */
    preventDefault: e => {
        var e = window.event || e;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        return false;
    },
}
