<template>
    <Modal ref="modalRef" close-button-name="Sulge">
        <template #header>
            {{user.firstName}} {{user.lastName}}
        </template>
        <template #body>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <p>E-mail: {{user.email}}</p>
                        <p>Kasutajanimi: {{user.username}}</p>
                    </div>
                    <div class="col">
                        <ProfileImage :picture-data-base64="user.imageData"/>
                    </div>
                </div>
            </div>
        </template>
        <template #footer>
            <slot name="footer">
            </slot>
        </template>
    </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";
import ProfileImage from "@/components/image/ProfileImage.vue";

export default {
    name: "ProfileModal",
    components: {ProfileImage, Modal},
    data() {
        return {
            user: {
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                imageData: '',
            },
        }
    },
    methods: {
         getUserInfoAndOpenProfileModal(userId) {
            this.$http.get("/profile", {
                    params: {
                        userId: userId,
                    }
                }
            ).then(response => {
                this.user = response.data
                this.$refs.modalRef.openModal()
            }).catch(error => {
                this.$refs.modalRef.closeModal()
                router.push({name: 'errorRoute'})
            })
        },
    }
}
</script>
