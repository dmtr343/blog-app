import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    editingPost: {
      id: null,
      title: "",
      body: "",
      userId: null,
    },
  },
  getters: {
    getPosts(state) {
      return state.posts;
    },
    getEditingPost(state) {
      return state.editingPost;
    },
  },
  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem("store")) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("store")))
        );
      }
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
    addPost(state, postData) {
      state.posts.push(postData);
    },
    editPost(state, postData) {
      const idx = state.posts.findIndex((post) => post.id == postData.id);
      state.posts[idx].title = postData.title;
      state.posts[idx].body = postData.body;
    },
    deletePost(state, postId) {
      const idx = state.posts.findIndex((post) => post.id == postId);
      state.posts.splice(idx, 1);
    },
    setEditingPost(state, postData) {
      state.editingPost = postData;
    },
    resetEditingPost(state) {
      state.editingPost = {
        id: null,
        title: "",
        body: "",
        userId: null,
      };
    },
  },
  actions: {
    async loadPosts(context) {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.message || "Произошла ошибка при загрузки статей."
        );
        throw error;
      }

      context.commit("setPosts", responseData);
    },
    addPost(context, formData) {
      context.commit("addPost", formData);
    },
    editPost(context, postData) {
      context.commit("editPost", postData);
    },
    setEditingPost(context, postData) {
      context.commit("setEditingPost", postData);
    },
    resetEditingPost(context) {
      context.commit("resetEditingPost");
    },
    deletePost(context, postId) {
      context.commit("deletePost", postId);
    },
  },
});
