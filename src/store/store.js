import { createStore } from "vuex";
import { useToast } from "vue-toastification";



import Auth from "../api/Auth";
import Analysis from "../api/Analysis";
import Detector from "../api/Detector";
import Contract from "../api/Contract";
import Error from "../api/Error";
import Table from "../api/Table";

const toast = useToast();

const store = createStore({
  state: {
    user: {
      username: null,
      authToken: null,
      contracts: null,
      contracts24: null,
      flaggedContracts: null,
      compilationErrors: null,
      detectors: null,
      analysisCount: null,
      tables: null,
    },
  },

  getters: {
    getUsername(state) {
      return state.user.username;
    },

    getAuthToken(state) {
      return state.user.authToken;
    },

    getContracts(state) {
      return state.user.contracts;
    },

    getContracts24(state) {
      return state.user.contracts24;
    },

    getFlaggedContracts(state) {
      return state.user.flaggedContracts;
    },

    getCompilationErrors(state) {
      return state.user.compilationErrors;
    },

    getDetectors(state) {
      return state.user.detectors;
    },

    getAnalysisCount(state) {
      return state.user.analysisCount;
    },

    getTables(state) {
      return state.user.tables;
    },
  },

  mutations: {
    setUsername(state, value) {
      state.user.username = value;
    },

    setAuthToken(state, value) {
      state.user.authToken = value;
    },

    setContracts(state, value) {
      state.user.contracts = value;
    },

    setContracts24(state, value) {
      state.user.contracts24 = value;
    },

    setFlaggedContracts(state, value) {
      state.user.flaggedContracts = value;
    },

    setCompilationErrors(state, value) {
      state.user.compilationErrors = value;
    },

    setDetectors(state, value) {
      state.user.detectors = value;
    },

    setAnalysisCount(state, value) {
      state.user.analysisCount = value;
    },

    setTables(state, value) {
      state.user.tables = value;
    },
  },

  actions: {
    async login({ commit }, query) {
      try {
        const response = await Auth.login(query);
        if (response.error) {
          throw new Error(response.error);
        }
        localStorage.setItem("username", query.username);
        localStorage.setItem("authToken", response.token);
        commit("setAuthToken", response.token);
      } catch (error) {
        toast.error(error.message);
      }
    },

    async fetchContracts({ commit }) {
      const response = await Contract.get(this.state.user.authToken);
      response.error ? this.dispatch('cleanToken') : commit('setContracts', response);
    },

    async fetchContracts24({ commit }) {
      const response = await Contract.get24(this.state.user.authToken);
      response.error ? this.dispatch('cleanToken') : commit('setContracts24', response.count);
    },

    async fetchFlaggedContracts({ commit }) {
      const response = await Contract.getFlagged(this.state.user.authToken);
      response.error ? this.dispatch('cleanToken') : commit('setFlaggedContracts', response);
    },

    async fetchCompilationErrors({ commit }) {
      const response = await Error.get(this.state.user.authToken);
      response.error ? this.dispatch('cleanToken') : commit("setCompilationErrors", response);
    },

    async fetchDetectors({ commit }) {
      const response = await Detector.getList(this.state.user.authToken);
      if(response.error) return this.dispatch('cleanToken');
      const detectorsList = response.detectors.split(',');
      commit("setDetectors", detectorsList);;
    },

    async fetchAnalysisCount({ commit }, currentDetector) {
      const response = await Analysis.get(this.state.user.authToken, currentDetector);
      response.error ? this.dispatch('cleanToken') : commit("setAnalysisCount", response.count);
    },

    async fetchTables({ commit }, query) {
      const response = await Table.get(this.state.user.authToken, query);
      response.error ? this.dispatch('cleanToken') : commit("setTables", response);
    },

    cleanToken({commit}){
      localStorage.clear();
      commit("setAuthToken", null);
    },
  },
});

export default store;
