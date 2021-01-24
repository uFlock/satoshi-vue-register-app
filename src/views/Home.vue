<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png"/>
        <UserProfile msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>

import UserProfile from "@/components/UserProfile";

export default {
    name: "Home",
    components: {
        UserProfile
    },
    computed: {

    }
};
</script>
