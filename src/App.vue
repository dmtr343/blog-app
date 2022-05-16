<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <h3 class="text-sm-h4">Blog App</h3>
      </div>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row justify="center" no-gutters>
          <v-col md="8" xl="4">
            <v-card>
              <div class="py-7 d-flex justify-center flex-wrap">
                <v-btn class="ma-3" elevation="2" x-large @click="loadPosts"
                  >Загрузить</v-btn
                >
                <v-btn class="ma-3" elevation="2" x-large @click="openDialog"
                  >Добавить</v-btn
                >
              </div>
              <posts-list
                :page="page"
                :perPage="perPage"
                class="px-3"
              ></posts-list>
            </v-card>
          </v-col>
        </v-row>
        <post-dialog ref="dialog"></post-dialog>
        <v-row>
          <v-col>
            <v-pagination
              v-model="page"
              :length="Math.ceil(totalPaginationItems / perPage)"
              @input="scrollToTop"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import PostsList from "./components/PostsList";
import PostDialog from "./components/PostDialog";

export default {
  name: "App",
  components: {
    PostsList,
    PostDialog,
  },
  data: () => ({
    isLoading: false,
    error: null,
    isDialogOpen: false,
    page: 1,
    perPage: 10,
  }),
  computed: {
    totalPaginationItems() {
      return this.$store.getters.getPosts.length;
    },
  },
  methods: {
    async loadPosts() {
      this.isLoading = true;

      try {
        await this.$store.dispatch("loadPosts");
      } catch (error) {
        this.error = error.message || "Произошла ошибка при загрузки статей";
      }

      this.isLoading = false;
    },
    openDialog() {
      this.$refs.dialog.openDialog();
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>
