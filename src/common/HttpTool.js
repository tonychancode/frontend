
const delay = timeout => {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject('请求超时'), timeout * 1000)
    })
}

const get = ({url, params = {}, timeout}) => {
    const paramArr = []
    if (Object.keys(params).length !== 0) {
        for (const key in params) {
            paramArr.push(`${key}=${params[key]}`)
        }
    }
    const urlStr = `${url}?${paramArr.join('&')}`

    if (timeout === undefined) {
        return fetch(urlStr)
    } else {
        return Promise.race([fetch(urlStr), delay(timeout)])
    }
}

const post = ({url, params = {}, timeout}) => {
    const paramArr = []
    if (Object.keys(params).length !== 0) {
        for (const key in params) {
            paramArr.push(`${key}=${params[key]}`)
        }
    }

    if (timeout === undefined) {
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `${paramArr.join('&')}`
        })
    } else {
        return Promise.race([fetch(urlStr), delay(timeout)])
    }
}

export { get,post }