<template>
  <div class="row">
    <div class="offset-md-3 col-md-6">
      <h1 class="mt-5 mb-5 text-secondary">LeadHit</h1>
      <div v-if="!LEADHIT_SITE_ID">
        <form @submit.prevent="setRequest(siteId)" class="mb-3">
          <input
            class="form-control transparent-area"
            type="text"
            placeholder="Введите id сайта"
            aria-label="id"
            v-model="siteId"
          />
          <label v-if="v$.siteId.minLengthValue.$invalid " class="form-label mt-1 text-danger">
          id сайта должен содержать 24 символа</label
        ><br>
          <button class="btn btn-secondary mt-3" type="submit">Войти</button>
        </form>
        
      </div>
      <div v-else>
          <h2 class="text-secondary">Вы авторизованы</h2>
        <button class="btn btn-danger mt-3" @click.prevent="signOut">Выйти</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, minLength  } from "@vuelidate/validators";
import axios from "axios";
export default {
  data() {
    return {
      v$: useVuelidate(),
      siteId: "",
    };
  },
  validations() {
    return {
      siteId: {required,
              minLengthValue: minLength(24)}
    }
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

<style lang="scss">
.transparent-area {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #fbfbff;
  box-shadow: 0px 4px 20px rgba(193, 193, 193, 0.3);
  border-radius: 10px;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0px 0px 20px rgba(15, 1, 1, 0.08);
  }
  &:focus {
    background: rgba(255, 255, 255, 0.5);
    border: none;
    outline: none;
    box-shadow: 0px 4px 20px rgba(193, 193, 193, 0.3);
  }
}
</style>
