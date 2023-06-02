<template>
    <div class="container">
        <div class="row mt-2 ">
            <div class="col">
                <h5>Tulevased üritused, kus osalen</h5>
            </div>
        </div>
        <div class="row mt-2 ">
            <div class="col">
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
                        <td>{{formatDate(event.startDate)}}</td>
                        <td v-if="event.status === 'A'"><a href="#" @click="navigateToEventView(event.eventId)">{{event.eventName}}</a></td>
                        <td v-else>TÜHISTATUD: {{event.eventName}}</td>
                        <td>{{event.locationName}}</td>
                        <td>{{event.fee}} EUR</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import router from "@/router";
import moment from "moment";

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
                    fee: 0,
                    status: ''
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
            this.$http.get("/connection/participant", {
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
        },
        formatDate(date) {
            return moment(date).format('DD.MM.YYYY');
        }
    },
    beforeMount() {
        this.getParticipatingEvents()
    }
}
</script>
