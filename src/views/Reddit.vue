<template>
  <b-container class="mt-5">
    <h1>Reddit</h1>
    <b-row>
      <b-col cols="5">
        <b-form-group
          id="subreddit-group"
          label="Subreddit:"
          label-for="subreddit"
        >
          <b-form-input
            id="subreddit"
            v-model="subreddit"
            type="text"
            placeholder="Subreddit"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col cols="5">
        <b-form-group id="count-group" label="Count:" label-for="count">
          <b-form-select
            v-model="count"
            :options="countOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col cols="2">
        <b-form-group
          id="count-group"
          label="Tweet:"
          label-for="tweetmany-button"
        >
          <b-button @click="tweetMany">Tweet Selected</b-button>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-card-group columns>
        <b-card
          @click="select(post)"
          :bg-variant="isSelected(post)"
          :text-variant="textColor(post)"
          v-for="(post, index) in posts"
          :key="index"
          :img-src="post.thumbnail"
          :img-alt="post.title"
          img-top
          tag="article"
          class="mb-2"
        >
          <b-card-text>
            {{ post.title }}
          </b-card-text>
        </b-card>
      </b-card-group>
    </b-row>
  </b-container>
</template>

<script>
import Axios from "axios";
import apiConfig from "../config/api.config";
const _debounce = require("lodash/debounce");
export default {
  created() {
    this.fetchPosts();
  },
  data() {
    return {
      subreddit: "aww",
      count: 10,
      posts: [],
      selectedPosts: [],
      countOptions: [10, 25, 50, 100]
    };
  },
  methods: {
    fetchPosts: async function() {
      try {
        this.$store.commit("startLoading");
        const { data } = await Axios.get(
          `${apiConfig.baseUrl}/api/explore/reddit`,
          {
            params: {
              subreddit: this.subreddit,
              limit: this.count
            },
            headers: {
              authorization: "Bearer " + this.token
            }
          }
        );
        this.posts = data;
      } catch (e) {
        if (e.response && e.response.status === 422) {
          this.validationErrors = e.response.data;
        } else if (
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
            message: "Unable to fetchPosts",
            type: "danger"
          });
        }
      } finally {
        this.$store.commit("stopLoading");
      }
    },
    _fetchPosts: _debounce(function() {
      this.fetchPosts();
    }, 1000),
    download: async function() {
      this.$store.dispatch("showToast", {
        vm: this,
        message: "Downloading",
        type: "danger"
      });
      await Axios.post(
        `${apiConfig.baseUrl}/api/downloadFiles`,
        {
          urls: this.selected
        },
        {
          headers: {
            authorization: "Bearer " + this.token
          }
        }
      );
      // this.posts.forEach(post => {
      //   var link = document.createElement('a')
      //   link.href = post.url
      //   link.download = post.url.split('/').reverse()[0]
      //   document.body.appendChild(link)
      //   link.click()
      //   document.body.removeChild(link)
      // })
    },
    select(post) {
      return this.selectedPosts.push(post.url);
    },
    isSelected(post) {
      if (this.selectedPosts.includes(post.url)) {
        return "dark";
      }
    },
    textColor(post) {
      if (this.selectedPosts.includes(post.url)) {
        return "white";
      } else {
        return "black";
      }
    },
    async tweetMany() {
      this.$store.dispatch("showToast", {
        vm: this,
        message: "Tweeting",
        type: "danger"
      });
      const posts = [];
      this.selectedPosts.forEach(url => {
        const post = this.posts.find(p => p.url === url);
        posts.push(post);
      });
      await Axios.post(
        `${apiConfig.baseUrl}/api/integration/twitter/tweetMany`,
        {
          posts
        },
        {
          headers: {
            authorization: "Bearer " + this.token
          }
        }
      );
    }
  },

  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    token() {
      return this.$store.state.token;
    },
    rows() {
      return Math.ceil(this.posts.length / 3);
    }
  },

  watch: {
    subreddit: function() {
      this._fetchPosts();
    },
    count: function() {
      this._fetchPosts();
    }
  }
};
</script>
