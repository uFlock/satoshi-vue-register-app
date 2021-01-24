<template>
  <div class="hello">
    <h3>Essential Links</h3>
    <ul>
      <li>Name: {{ name }}</li>
      <li>Age: {{ age }}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "UserProfile",
  computed: {
    ...mapGetters({ name: "getName", age: "getAge" })
  },
  methods: {
    ...mapMutations({ setAge: "setAge", setName: "setName" })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
