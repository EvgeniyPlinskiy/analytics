<template>
  <div class="row">
    <div class="offset-md-3 col-md-6">
      <h1 class="mt-5 mb-5">LeadHit</h1>
      <div v-if="!LEADHIT_SITE_ID">
        <form @submit.prevent="setRequest(siteId)" class="input-group mb-3">
          <input
            class="form-control"
            type="text"
            placeholder="Введите id сайта"
            aria-label="id"
            v-model="siteId"
          />
          <button class="btn btn-secondary" type="submit">Войти</button>
        </form>
        <label v-if="siteId.length < 24" class="form-label mt-1 text-danger">
          id сайта должен содержать 24 символа</label>
      </div>
      <div v-else>
        <h2>Вы авторизованы</h2>
        <button class="btn btn-danger" @click.prevent="signOut">Выйти</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      siteId: "",
    };
  },
  methods: {
    ...mapActions(["ADD_LEADHIT_SITE_ID", "DELETE_LEADHIT_SITE_ID"]),
    setRequest(siteId) {
      if (siteId.length >= 24) {
        return axios("https://track-api.leadhit.io/client/test_auth", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            "Api-Key": "5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo",
            "Leadhit-Site-Id": siteId,
          },
        })
          .then((response) => {
            if (response.data.message === "ok") {
              this.ADD_LEADHIT_SITE_ID(siteId);
              this.$router.push("/");
            }
          })
          .catch((error) => {
            console.log(error);
            return error;
          });
      }
    },
    signOut() {
      this.DELETE_LEADHIT_SITE_ID();
    },
  },
  computed: {
    ...mapGetters(["LEADHIT_SITE_ID"]),
  },
};
</script>
