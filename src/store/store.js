import { createStore } from "vuex";
import { useToast } from "vue-toastification";
import Login from "../../api/login";
import Contracts from "../../api/Contracts";
import CompilationErrors from "../../api/CompilationErrors";
import Detectors from "../../api/Detectors";
import AnalysisCount from "../../api/AnalysisCount";
import Tables from "../../api/Tables";

// this is a try
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
        const response = await Login.access(query);
        if (response.error) {
          throw new Error(response.error);
        }
        localStorage.clear();
        localStorage.setItem("username", query.username);
        localStorage.setItem("authToken", response.token);
        commit("setAuthToken", response.token);
      } catch (error) {
        toast.error(error.message);
      }
    },

    async fetchContracts({ commit }) {
      const response = await Contract.get(this.state.user.authToken);
      if (response.error) {
        localStorage.removeItem("authToken");
        commit("setAuthToken", null);
        return;
      }
      commit('setContracts', response);
    },

    async fetchContracts24({ commit }) {
      const response = await Contract.get24(this.state.user.authToken);
      if (response.error) {
        localStorage.removeItem("authToken");
        commit("setAuthToken", null);
        return;
      }
      commit('setContracts24', response.count);
    },

    async fetchFlaggedContracts({ commit }) {
      const response = await Contract.getFlagged(this.state.user.authToken);
      if (response.error) {
        localStorage.removeItem("authToken");
        commit("setAuthToken", null);
        return;
      }
      commit('setFlaggedContracts', response);
    },

    async fetchCompilationErrors({ commit }) {
      const response = await Error.get(this.state.user.authToken);
      if (response.error) {
        localStorage.removeItem("authToken");
        commit("setAuthToken", null);
        return;
      }
      commit("setCompilationErrors", response);
    },

    async fetchDetectors({ commit }) {
      const response = await Detector.getDetectorList(this.state.user.authToken);
      if (response.error) {
        localStorage.removeItem("authToken");
        commit("setAuthToken", null);
        return;
      }
      const detectorsList = response.detectors.split(",");
      commit("setDetectors", detectorsList);
    },

    async fetchAnalysisCount({ commit }, currentDetector) {
      const response = await Analysis.getAnalysisCount(this.state.user.authToken, currentDetector);
      if (response.error) {
        localStorage.removeItem("authToken");
        commit("setAuthToken", null);
        return;
      }
      commit("setAnalysisCount", response.count);
    },

    async fetchTables({ commit }, query) {
      const response = await Table.get(this.state.user.authToken, query);
      if (response.error) {
        localStorage.removeItem("authToken");
        commit("setAuthToken", null);
        return;
      }
      commit("setTables", response);
    },
  },
});

export default store;
