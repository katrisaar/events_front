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
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="event in participatingEvents" :key="event.eventId">
                        <td>{{event.startDate}}</td>
                        <td><a href="#" @click="navigateToEventView(event.eventId)">{{event.eventName}}</a></td>
                        <td>{{event.locationName}}</td>
                        <td>{{event.fee}}</td>
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
        },
        navigateToEventView(eventId) {
            router.push({name: 'eventRoute', query: {eventId: eventId}})
        }
    },
    beforeMount() {
        this.getParticipatingEvents()
    }
}
</script>

<style scoped>

</style>