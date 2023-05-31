<template>
<ProfileModal ref="profileModalRef">
    <template #footer>
        <button @click="executeUserDelete" type="button" class="btn btn-danger">Kustuta</button>
    </template>
</ProfileModal>
</template>

><script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";
import ProfileModal from "@/components/modal/ProfileModal.vue";

export default {
    name: "DeleteProfileModal",
    components: {ProfileModal, Modal},
    data() {
        return {
            selectedUserId: 0
        }
    },
    methods: {
        setSelectedUserId(selectedUserId) {
            this.selectedUserId = selectedUserId
        },

        executeUserDelete() {
            this.$http.delete("/profile", {
                params: {
                    userId: this.selectedUserId
                }
            }).then(response => {
                this.$refs.profileModalRef.$refs.modalRef.closeModal()
                this.$emit('event-user-deleted', 'Kasutaja profiil on edukalt kustutatud')
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })

        }
    }
}
</script>

<style scoped>

</style>