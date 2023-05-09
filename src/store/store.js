import { createStore } from "vuex";
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import axios from "axios";

const toast = useToast();

const store = createStore({

    state:{

        user: {
            username: null,
            authToken: null,
            contracts: null,
            contracts24: null,
            compilationErrors: null,
            detectors: null,
            tables: null
        }
    },

    getters: {

        getUsername(state){
            return state.user.username;
        },

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

        getDetectors(state){
            return state.user.detectors;
        },

        getTables(state){
            return state.user.tables;
        }

    },

    mutations: {

        setUsername(state, value){
            state.user.username = value;
        },

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

        setDetectors(state, value){
            state.user.detectors = value;
        },

        setTables(state, value){
            state.user.tables = value;
        }

    },
    actions: {

      async  login({ commit }, query){  //TODO: refactoring required, all enpoints need to be in a .env file
            const endpoint = "http://65.108.85.188:3000/api/login";
            const headers = {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            const payload = {
                username: query.username,
                password: query.password,
            }
            try {
                const response = await axios.post(endpoint, payload, {headers})
                if(response.data.error){
                    throw new Error(response.data.error);
                }
                localStorage.setItem('authToken', response.data.token);
                commit('setAuthToken', response.data.token);
                commit('setUsername', payload.username);
            }catch(error){
                toast.error(error.message);
            }
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

        },

        fetchDetectors({commit}, query){
            let detectors = null;

            const router = useRouter();

            const endpoint = `http://65.108.85.188:3000/api/detectors/${query}`;

            const headers = {
                'Accept': 'application/json',
                "Content-Type": "multipart/form-data",
                'authtoken': this.state.user.authToken,
            }

            axios.get(endpoint, {headers})
            .then((result)=> {
                if(result.data.error){
                    router.push('/');
                    localStorage.removeItem('authToken');
                    commit('setAuthToken', null);
                    return;
                }
                detectors = result.data;
                commit("setDetectors", detectors);
            })
        },

        fetchTables({commit}, query){

            let tables = null;

            const endpoint = `http://65.108.85.188:3000/api/hits/${query.detector}/${query.revState}/${query.offset}`;

            const headers = {
                'Accept': 'application/json',
                "Content-Type": "multipart/form-data",
                'authtoken': this.state.user.authToken,
            }

            axios.get(endpoint, {headers})
            .then((result)=> {
                tables = result.data;
                commit("setTables", tables);
            })

        }
        
    }

});

export default store;