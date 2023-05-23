<template>
    <img v-if="pictureDataBase64 === ''" src="../../assets/blank-profile-picture.webp" class="img-thumbnail"/>
    <img v-else :src="pictureDataBase64" class="img-thumbnail">
</template>

<script>
export default {
    name: "ProfileImage",
    props: {
        pictureDataBase64: String
    }
}
</script>

<style scoped>

</style>