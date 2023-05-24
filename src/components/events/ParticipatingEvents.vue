<template>
    <div class="container">
        <div class="row mt-4">
            <div class="col">
                <h5>Tulevased üritused, kus osalen</h5>
                <h6 v-if="participatingEventsMessage !== ''">{{participatingEventsMessage}}</h6>
                <table v-else class="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Toimumise aeg</th>
                        <th scope="col">Üritus</th>
                        <th scope="col">Asukoht</th>
                        <th scope="col">Tasu</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="event in participatingEvents" :key="event.eventId">
                        <td>{{event.startDate}}</td>
                        <td>{{event.eventName}}</td>
                        <td>{{event.locationName}}</td>
                        <td>{{event.fee}}</td>
                        <td>
                            <font-awesome-icon  class="hoverable-link me-3" :icon="['fas', 'pen-to-square']"/>
                            <font-awesome-icon  class="hoverable-link" :icon="['fas', 'xmark']"/>
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
    name: "ParticipatingEvents",
    data() {
        return {
            userId: sessionStorage.getItem('userId'),
            participatingEventsMessage: '',
            participatingEvents: [
                {
                    eventId: 0,
                    eventName: '',
                    startDate: 0,
                    locationName: '',
                    fee: 0
                }
            ],
            errorResponse: {
                message: '',
                errorCode: 0
            }
        }
    },
    methods: {
        getParticipatingEvents() {
            this.$http.get("/participatingevents", {
                params: {
                    userId: this.userId
                }
            })
                .then(response => {
                    this.participatingEvents = response.data
                })
                .catch(error => {
                    this.errorResponse = error.response.data
                    if (this.errorResponse.errorCode === 555) {
                        this.participatingEventsMessage = this.errorResponse.message
                    } else {
                        router.push({name: 'errorRoute'})
                    }
                })
        }
    },
    beforeMount() {
        this.getParticipatingEvents()
    }
}
</script>

<style scoped>

</style>