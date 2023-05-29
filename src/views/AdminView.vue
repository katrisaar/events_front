<template>
    <div class="container justify-content-center">
        <div class="row mb-5">
            <div class="col">
                <button @click="updateEventsStatuses" type="button" class="btn btn-primary">Värskenda ürituste staatuseid kuupäeva alusel</button>
            </div>
        </div>
        <AlertSuccess :message="successMessage"/>
        <h4>Kasutajad</h4>
        <ProfileModal ref="profileModalRef" />
        <DeleteProfileModal ref="deleteProfileModalRef" @event-user-deleted="eventProfileDeleted" />
        <div class="row mt-5">
            <div class="col">
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Kasutajanimi</th>
                        <th scope="col">Eesnimi</th>
                        <th scope="col">Perekonnanimi</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Roll</th>
                        <th scope="col">Staatus</th>
                        <th scope="col">Muuda/kustuta</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="userInfo in allUsers" :key="userInfo.userId">
                        <td><a href="#" @click="openProfileModal(userInfo.userId)">{{ userInfo.username }}</a></td>
                        <td>{{ userInfo.firstName }}</td>
                        <td>{{ userInfo.lastName }}</td>
                        <td>{{ userInfo.email }}</td>
                        <td>{{ userInfo.roleName }}</td>
                        <td>{{ userInfo.status }}</td>
                        <td>
                            <font-awesome-icon v-if="userInfo.status === 'A'"  @click="navigateToEditProfile(userInfo.userId)" class="hoverable-link me-3" :icon="['fas', 'pen-to-square']"/>
                            <font-awesome-icon v-if="userInfo.status === 'A'"  @click="openDeleteProfileModal(userInfo.userId)" class="hoverable-link" :icon="['fas', 'xmark']"/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import router from "@/router";
import ProfileView from "@/views/ProfileView.vue";
import ProfileModal from "@/components/modal/ProfileModal.vue";
import DeleteProfileModal from "@/components/modal/DeleteProfileModal.vue"
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
    name: "AdminView",
    components: {AlertSuccess, DeleteProfileModal, ProfileModal, ProfileView},
    data() {
        return {
            successMessage: '',
            allUsers: [
                {
                    userId: '',
                    status: '',
                    roleName: '',
                    lastName: '',
                    firstName: '',
                    username: '',
                    email: ''
                }
            ]
        }
    },
    methods: {
        getAllUsers() {
            this.$http.get("/admin")
                .then(response => {
                    this.allUsers = response.data
                })
                .catch(error => {
                    router.push({name: 'errorRoute'})
                })
        },
        openProfileModal(userId) {
            this.$refs.profileModalRef.getUserInfoAndOpenProfileModal(userId);
        },
        navigateToEditProfile(userId) {
            router.push({name: 'editProfileRoute', query: {userId: userId}})
        },
        openDeleteProfileModal(userId) {
            this.successMessage = ''
            this.$refs.deleteProfileModalRef.$refs.profileModalRef.getUserInfoAndOpenProfileModal(userId)
            this.$refs.deleteProfileModalRef.setSelectedUserId(userId)
        },

        eventProfileDeleted(successMessage) {
            this.getAllUsers()
            this.successMessage = successMessage
        },
        updateEventsStatuses() {
            this.successMessage = ''
            this.$http.get("/events/update")
                .then(response => {
                    this.successMessage = 'Ürituste staatused edukalt värskendatud'
                })
                .catch(error => {
                    router.push({name: 'errorRoute'})
                })
        },
    },
    beforeMount() {
        this.getAllUsers()
    }
}

</script>
