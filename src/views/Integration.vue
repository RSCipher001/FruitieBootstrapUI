<template>
  <b-container class="mt-5">
    <b-button @click="twitter">Twitter</b-button>
    <b-table bordered striped hover :items="data"></b-table>
  </b-container>
</template>

<script>
import Axios from "axios";
import apiConfig from "../config/api.config";
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          first_name: "Jesse",
          last_name: "Simmons",
          date: "2016-10-15 13:43:27",
          gender: "Male"
        },
        {
          id: 2,
          first_name: "John",
          last_name: "Jacobs",
          date: "2016-12-15 06:00:53",
          gender: "Male"
        },
        {
          id: 3,
          first_name: "Tina",
          last_name: "Gilbert",
          date: "2016-04-26 06:26:28",
          gender: "Female"
        },
        {
          id: 4,
          first_name: "Clarence",
          last_name: "Flores",
          date: "2016-04-10 10:28:46",
          gender: "Male"
        },
        {
          id: 5,
          first_name: "Anne",
          last_name: "Lee",
          date: "2016-12-06 14:38:38",
          gender: "Female"
        }
      ],
      columns: [
        {
          field: "id",
          label: "ID",
          width: "40",
          numeric: true
        },
        {
          field: "first_name",
          label: "First Name"
        },
        {
          field: "last_name",
          label: "Last Name"
        },
        {
          field: "date",
          label: "Date",
          centered: true
        },
        {
          field: "gender",
          label: "Gender"
        }
      ]
    };
  },
  methods: {
    twitter: async function() {
      try {
        this.$store.commit("startLoading");
        const { data } = await Axios.get(
          `${apiConfig.baseUrl}/api/integration/twitter/initate`,
          {
            headers: {
              authorization: "Bearer " + this.token
            }
          }
        );
        window.location = data;
      } catch (e) {
        if (
          e.response &&
          e.response.data.errors &&
          e.response.data.errors.length
        ) {
          e.response.data.errors.forEach(error => {
            this.$store.dispatch("showToast", {
              vm: this,
              message: error.message,
              type: "danger"
            });
          });
        } else {
          this.$store.dispatch("showToast", {
            vm: this,
            message: "Unable to initiate integration",
            type: "danger"
          });
        }
      } finally {
        this.$store.commit("stopLoading");
      }
    }
  },
  computed: {
    token() {
      return this.$store.state.token;
    }
  }
};
</script>
