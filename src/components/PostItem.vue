<template>
  <v-row>
    <v-col class="post" :class="{ full: isFull }">
      <v-divider class="mb-5"></v-divider>
      <div class="d-flex justify-end">
        <v-btn class="mx-2" fab dark x-small color="primary" @click="editPost">
          <v-icon> mdi-pencil </v-icon>
        </v-btn>
        <v-btn
          class="mx-2"
          fab
          dark
          x-small
          color="red"
          @click="deletePost(post.id)"
        >
          <v-icon> mdi-delete </v-icon>
        </v-btn>
      </div>
      <h3>{{ post.title }}</h3>
      <div class="body" ref="body">
        <template v-if="post.id <= 100">
          <span>{{ post.body }}</span>
        </template>
        <template v-else>
          <span>{{ post.body }}</span>
        </template>
      </div>
      <div class="text-center mt-5">
        <v-btn
          v-if="!isFull && textHeight == 75"
          class="show-full-btn"
          @click="isFull = !isFull"
          >Полный текст</v-btn
        >
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    post: Object,
  },
  data() {
    return {
      isFull: false,
      wasEdited: false,
      isMounted: false,
    };
  },
  computed: {
    textHeight() {
      if (!this.isMounted) return;
      return this.$refs.body.clientHeight;
    },
  },
  methods: {
    editPost() {
      this.$store.dispatch("setEditingPost", { ...this.post });
      this.wasEdited = true;
    },
    deletePost(postId) {
      this.$store.dispatch("deletePost", postId);
    },
  },
  mounted() {
    this.isMounted = true;
  },
  updated() {
    if (this.isFull && this.wasEdited) {
      this.isFull = false;
      this.wasEdited = false;
    }
  },
};
</script>

<style scoped>
.post .body {
  max-height: 75px;
  overflow: hidden;
}

.post.full .body {
  max-height: none;
}

.post pre {
  white-space: pre-wrap;
}

.body span {
  display: block;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
