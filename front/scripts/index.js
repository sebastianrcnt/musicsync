import $ from "jquery";
import Vue from "vue/dist/vue.js";

const app = new Vue({
  el: "#app",
  data: {
    message: "Hello, Vue!",
    latitude: 0,
    longitude: 0,
    accuracy: 0,
  },
  methods: {
    handleGetGeolocationClick: function (event) {
      const handleSuccess = (position) => {
        let { latitude, longitude, accuracy } = position.coords;
        this.latitude = latitude;
        this.longitude = longitude;
        this.accuracy = accuracy;
        console.table({ latitude, longitude, accuracy });
      };
      const handleError = (error) => {};
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    },
  },
});
