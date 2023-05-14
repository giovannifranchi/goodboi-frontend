import { createStore } from "vuex";
import { useToast } from "vue-toastification";
import axios from "axios";
import login from "../../api/login";
import Contracts from "../../api/Contracts";

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
      //TODO: refactoring required, all enpoints need to be in a .env file
      try {
        const response = await login(query);
        if (response.error) {
          throw new Error(response.error);
        }
        localStorage.setItem("authToken", response.token);
        commit("setAuthToken", response.token);
      } catch (error) {
        toast.error(error.message);
      }
    },

    async fetchContracts({ commit }) {
      const response = await Contracts.getContracts(this.state.user.authToken);
      if (response.error) {
        localStorage.removeItem("authToken");
        commit("setAuthToken", null);
        return;
      }
      commit("setContracts", response);
    },

    async fetchContracts24({ commit }) {
        const response = await Contracts.getContracts24(this.state.user.authToken);
        if (response.error) {
          localStorage.removeItem("authToken");
          commit("setAuthToken", null);
          return;
        }
        commit("setContracts24", response.count);
    },

    async fetchFlaggedContracts({ commit }) {
        const response = await Contracts.getFlaggedContracts(this.state.user.authToken);
        if (response.error) {
          localStorage.removeItem("authToken");
          commit("setAuthToken", null);
          return;
        }
        commit("setFlaggedContracts", response);
    },

    fetchCompilationErrors({ commit }) {
      let compilationErrors = null;

      const endpoint = "http://65.108.85.188:3000/api/compilationErrors";

      const headers = {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        authtoken: this.state.user.authToken,
      };

      axios.get(endpoint, { headers }).then((result) => {
        if (result.data.error) {
          localStorage.removeItem("authToken");
          commit("setAuthToken", null);
          return;
        }
        compilationErrors = result.data;
        commit("setCompilationErrors", compilationErrors);
      });
    },

    fetchDetectors({ commit }, query) {
      let detectors = null;

      const endpoint = `http://65.108.85.188:3000/api/detectors/${query}`;

      const headers = {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        authtoken: this.state.user.authToken,
      };
      axios.get(endpoint, { headers }).then((result) => {
        if (result.data.error) {
          localStorage.removeItem("authToken");
          commit("setAuthToken", null);
          return;
        }
        detectors = result.data;
        commit("setDetectors", detectors);
      });
    },

    fetchAnalysisCount({ commit }, query) {
      const endpoint = `http://65.108.85.188:3000/api/analysisCount/${query}`;

      const headers = {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        authtoken: this.state.user.authToken,
      };

      axios.get(endpoint, { headers }).then((result) => {
        if (result.data.error) {
          localStorage.removeItem("authToken");
          commit("setAuthToken", null);
          return;
        }
        const analysisCount = result.data;
        commit("setAnalysisCount", analysisCount);
      });
    },

    fetchTables({ commit }, query) {
      let tables = null;

      const endpoint = `http://65.108.85.188:3000/api/hits/${query.detector}/${query.revState}/${query.offset}`;

      const headers = {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        authtoken: this.state.user.authToken,
      };
      axios.get(endpoint, { headers }).then((result) => {
        if (result.data.error) {
          localStorage.removeItem("authToken");
          commit("setAuthToken", null);
          return;
        }
        tables = result.data;
        commit("setTables", tables);
      });
    },
  },
});

export default store;
