import { createStore } from "vuex";

import axios from "axios";

const store = createStore({

    state:{

        user: {
            authToken: null,
            contracts: null,
            contracts24: null,
            compilationErrors: null,
            tables: null
        }
    },

    getters: {

        getAuthToken(state){
            return state.user.authToken;
        },

        getContracts(state){
            return state.user.contracts;
        },

        getContracts24(state){
            return state.user.contracts24;
        },

        getCompilationErrors(state){
            return state.user.compilationErrors;
        },

        getTables(state){
            return state.user.tables;
        }

    },

    mutations: {

        setAuthToken(state, value){
            state.user.authToken = value;
        },

        setContracts(state, value){
            state.user.contracts = value;
        },

        setContracts24(state, value){
            state.user.contracts24 = value;
        },

        setCompilationErrors(state, value){
            state.user.compilationErrors = value;
        },

        setTables(state, value){
            state.user.tables = value;
        }

    },
    actions: {

        login({ commit }, query){  //TODO: refactoring required, all enpoints need to be in a .env file
            let authToken = null;
            const endpoint = "http://65.108.85.188:3000/api/login";
            const headers = {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            const payload = {
                username: query.username,
                password: query.password,
            }
            axios.post(endpoint, payload, {headers})
            .then((result)=> {
                authToken = result.data.token;
                commit('setAuthToken', authToken);
            })
        },

        fetchContracts({commit}){
            let contracts = null;

            const endpoint =  'http://65.108.85.188:3000/api/contracts';

            const headers = {
                'Accept': 'application/json',
                "Content-Type": "multipart/form-data",
                'authtoken': this.state.user.authToken,
            }

            axios.get(endpoint, {headers})
            .then((result)=>{
                contracts = result.data;
                commit("setContracts", contracts);
            })
        },

        fetchContracts24({commit}){
            let contracts = null;

            const endpoint = 'http://65.108.85.188:3000/api/contracts24h';

            const headers = {
                'Accept': 'application/json',
                "Content-Type": "multipart/form-data",
                'authtoken': this.state.user.authToken,
            }

            axios.get(endpoint, {headers})
            .then((result)=>{
                contracts = result.data.count;
                commit("setContracts24", contracts);
            })
        },

        fetchCompilationErrors({commit}){
            let compilationErrors = null;

            const endpoint = 'http://65.108.85.188:3000/api/compilationErrors';

            const headers = {
                'Accept': 'application/json',
                "Content-Type": "multipart/form-data",
                'authtoken': this.state.user.authToken,
            }

            axios.get(endpoint, {headers})
            .then((result)=>{
                compilationErrors = result.data;
                commit("setCompilationErrors", compilationErrors);
            })

        }
        
    }

})

export default store