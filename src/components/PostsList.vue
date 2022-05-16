<template>
  <div>
    <v-row>
      <v-col>
        <template v-if="posts.length > 0">
          <post-item
            v-for="post in visiblePageItems"
            :key="post.id"
            :post="post"
          ></post-item>
        </template>
        <template v-else>
          <div class="text-center pa-10">
            <h4>В данный момент нет статей.</h4>
          </div>
        </template>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PostItem from "../components/PostItem";

export default {
  components: {
    PostItem,
  },
  props: {
    page: {
      type: Number,
    },
    perPage: {
      type: Number,
    },
  },
  computed: {
    posts() {
      return this.$store.getters.getPosts.slice().reverse();
    },
    visiblePageItems() {
      return this.posts.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      );
    },
  },
};
</script>
