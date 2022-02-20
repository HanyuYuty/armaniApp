import request from '../utils/request'
let userInfo = window.localStorage.getItem('userInfo');

try {
    userInfo = JSON.parse(userInfo) || {};
} catch (err) {

    userInfo = {}
}
export default {

    namespaced: true,
    state: {
        userInfo,

    },
    getters: {
        isLogin(state) {
            return !!state.userInfo._id
        }




    },
    mutations: {
        saveUserInfo(state, payload) {
            state.userInfo = payload;
            window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo))


        }

    },
    actions: {
        async loginIng(context, payload) {
            const {
                username,
                phoneNumber,
                password
            } = payload
            const {
                data
            } = await request.get('/users/login', {
                params: {
                    username,
                    phoneNumber,
                    password
                }
            });
            console.log(data);
            if (data.code == 200) {
                //如果登录成功，就把新的登录人员写进localStorage。
                context.commit('saveUserInfo', data.data[0])
            }


            return data
        },

    }
}