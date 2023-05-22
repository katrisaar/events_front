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
                        <td>{{ userInfo.username }}</td>
                        <td>{{ userInfo.firstName }}</td>
                        <td>{{ userInfo.lastName }}</td>
                        <td>{{ userInfo.email }}</td>
                        <td>{{ userInfo.roleName }}</td>
                        <td>{{ userInfo.status }}</td>
                        <td>
                            <font-awesome-icon class="hoverable-link me-3" :icon="['fas', 'pen-to-square']"/>
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

export default {
    name: "AdminView",
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
        }
    },
    beforeMount() {
        this.getAllUsers()
    }
}

</script>
