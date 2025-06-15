import { createStore } from "vuex"
import { getDashboardStats, articles, authenticateUser, createUser, addFeedback } from "../data/DummyData"

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    dashboardStats: {},
    articles: [],
    loading: false,
    error: null,
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      localStorage.setItem("user", JSON.stringify(user))
    },
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem("token", token)
    },
    CLEAR_AUTH(state) {
      state.user = null
      state.token = null
      localStorage.removeItem("user")
      localStorage.removeItem("token")
    },
    SET_DASHBOARD_STATS(state, stats) {
      state.dashboardStats = stats
    },
    SET_ARTICLES(state, articles) {
      state.articles = articles
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        commit("SET_LOADING", true)
        commit("SET_ERROR", null)

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const user = authenticateUser(credentials.email, credentials.password)

        if (!user) {
          throw new Error("Invalid credentials")
        }

        // Generate a fake token
        const token = `fake-jwt-token-${user.id}-${Date.now()}`

        commit("SET_TOKEN", token)
        commit("SET_USER", {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        })

        return { user, token }
      } catch (error) {
        commit("SET_ERROR", error.message || "Login failed")
        throw error
      } finally {
        commit("SET_LOADING", false)
      }
    },

    async register({ commit }, userData) {
      try {
        commit("SET_LOADING", true)
        commit("SET_ERROR", null)

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Check if user already exists
        const existingUser = authenticateUser(userData.email, "")
        if (existingUser) {
          throw new Error("User already exists")
        }

        const newUser = createUser(userData)

        // Generate a fake token
        const token = `fake-jwt-token-${newUser.id}-${Date.now()}`

        commit("SET_TOKEN", token)
        commit("SET_USER", {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
        })

        return { user: newUser, token }
      } catch (error) {
        commit("SET_ERROR", error.message || "Registration failed")
        throw error
      } finally {
        commit("SET_LOADING", false)
      }
    },

    logout({ commit }) {
      commit("CLEAR_AUTH")
    },

    async fetchDashboardStats({ commit }) {
      try {
        commit("SET_ERROR", null)

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const stats = getDashboardStats()
        commit("SET_DASHBOARD_STATS", stats)
      } catch (error) {
        commit("SET_ERROR", error.message || "Failed to fetch dashboard stats")
      }
    },

    async fetchArticles({ commit }) {
      try {
        commit("SET_ERROR", null)

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300))

        commit("SET_ARTICLES", articles)
      } catch (error) {
        commit("SET_ERROR", error.message || "Failed to fetch articles")
      }
    },

    async submitFeedback({ commit }, feedbackData) {
      try {
        commit("SET_LOADING", true)
        commit("SET_ERROR", null)

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        addFeedback(feedbackData)

        return { message: "Feedback submitted successfully" }
      } catch (error) {
        commit("SET_ERROR", error.message || "Failed to submit feedback")
        throw error
      } finally {
        commit("SET_LOADING", false)
      }
    },
  },
})
