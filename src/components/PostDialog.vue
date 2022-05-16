<template>
  <v-row justify="center">
    <v-dialog v-model="isDialogOpen" persistent max-width="800px">
      <v-card class="pa-5">
        <v-card-title>
          <span class="text-h5">Добавить статью</span>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid" ref="form">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="post.title"
                    :rules="titleRules"
                    :counter="256"
                    label="Заголовок"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="post.body"
                    :rules="textRules"
                    :counter="1000"
                    label="Текст"
                    required
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">
            Закрыть
          </v-btn>
          <v-btn color="blue darken-1" text @click="submitForm">
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      isDialogOpen: false,
      valid: false,
      post: {
        title: "",
        body: "",
      },
      titleRules: [
        (v) => !!v || "Заголовок обязателен",
        (v) => v.length >= 10 || "Заголовок должен быть длинее 10 символов.",
        (v) => v.length <= 256 || "Заголовок должен быть короче 256 символов.",
      ],
      textRules: [
        (v) => !!v || "Текст обязателен",
        (v) => v.length >= 100 || "Текст должен быть длинее 100 символов.",
        (v) => v.length <= 1000 || "Текст должен быть короче 1000 символов.",
      ],
    };
  },
  computed: {
    getEditingPost() {
      return this.$store.getters.getEditingPost;
    },
  },
  watch: {
    getEditingPost: function (val) {
      if (val.id !== null && this.isDialogOpen !== true) {
        this.post = this.getEditingPost;
        this.openDialog();
      }
    },
  },
  methods: {
    submitForm() {
      if (!this.$refs.form.validate()) return;

      if (!this.post.id) {
        this.post.id = new Date().getTime();
        this.post.userId = 10;
        this.$store.dispatch("addPost", { ...this.post });
      } else {
        this.$store.dispatch("editPost", { ...this.post });
      }

      this.closeDialog();
    },
    resetForm() {
      this.post.id = null;
      this.post.title = "";
      this.post.body = "";
      this.post.userId = null;
      this.$store.dispatch("resetEditingPost");
      this.$refs.form.resetValidation();
    },
    openDialog() {
      this.isDialogOpen = true;
    },
    closeDialog() {
      this.resetForm();
      this.isDialogOpen = false;
    },
  },
};
</script>

<style scoped>
.v-card__title {
  word-break: break-word;
}
</style>
