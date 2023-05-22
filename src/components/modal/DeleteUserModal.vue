<template>
<Modal ref="modalRef" close-button-name="Ei soovi">
    <template #header>
        Kustuta konto
    </template>
    <template #body>
        Kas oled kindel, et soovid kontot kustutada?
    </template>
    <template #footer>
        <button @click="executeUserDelete" type="button" class="btn btn-primary">Jah, soovin</button>
    </template>
</Modal>
</template>

><script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default {
    name: "DeleteUserModal",
    components: {Modal},
    data() {
        return {
            userId: sessionStorage.getItem('userId'),
            roleName: sessionStorage.getItem('roleName')
        }
    },
    methods: {
        executeUserDelete: function () {
            this.$http.delete("/profile", {
                params: {
                    use
                }
            })
            sessionStorage.clear()
            this.$refs.modalRef.closeModal()
            this.$emit('event-update-nav-menu')
            router.push({name: 'homeroute'})
        }
    }
}
</script>

<style scoped>

</style>