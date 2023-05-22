<template>
    <div class="container justify-content-center">
        <h4>Admini töölaud</h4>
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
                        <td><a href="#" @click="openProfileView(userInfo.userId)">{{ userInfo.username }}</a></td>
                        <td>{{ userInfo.firstName }}</td>
                        <td>{{ userInfo.lastName }}</td>
                        <td>{{ userInfo.email }}</td>
                        <td>{{ userInfo.roleName }}</td>
                        <td>{{ userInfo.status }}</td>
                        <td>
                            <font-awesome-icon @click="navigateToEditProfile(userInfo.userId)" class="hoverable-link me-3" :icon="['fas', 'pen-to-square']"/>
                            <font-awesome-icon class="hoverable-link" :icon="['fas', 'xmark']"/>
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

export default {
    name: "AdminView",
    components: {ProfileView},
    data() {
        return {
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
        openProfileView(userId) {
            router.push({name: 'profileRoute', query: {userId: userId}})
        },
        navigateToEditProfile(userId) {
            router.push({name: 'editProfileRoute', query: {userId: userId}})
        },
    },
    beforeMount() {
        this.getAllUsers()
    }
}

</script>
