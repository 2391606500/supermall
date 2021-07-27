import axios from 'axios'
export function request(config) {
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
    })
    instance.interceptors.request.use(config => {
        //console.log(config);
        return config
    }, err => {
        console.log(err);
        return err
    })
    instance.interceptors.response.use(res => {
        //console.log(res);
        return res.data
    }, err => {
        //console.log(err);
        return err
    })
    return instance(config)
}