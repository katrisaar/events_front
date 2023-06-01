<template>
    <div class="container">
        <div class="row justify-content-between mt-2">
            <div class="col"><h5>Tulevased üritused, mida korraldan</h5></div>
            <div class="col"><button @click="createNewEvent" class="btn btn-success" type="submit">Loo uus üritus</button></div>
        </div>
        <div class="row mt-2">
            <div class="col">
                <h6 v-if="organisedEventsMessage !== ''">{{organisedEventsMessage}}</h6>
                <table v-else class="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Toimumise aeg</th>
                        <th scope="col">Registreerumine</th>
                        <th scope="col">Üritus</th>
                        <th scope="col">Vabu kohti</th>
                        <th scope="col">Osalejaid</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="event in organisedEvents" :key="event.eventId">
                        <td>{{formatDate(event.startDate)}}</td>
                        <td>{{formatDate(event.registrationDate)}}</td>
                        <td v-if="event.status === 'A'"><a href="#" @click="navigateToEventView(event.eventId)">{{event.eventName}}</a></td>
                        <td v-else>TÜHISTATUD: {{event.eventName}}</td>
                        <td>{{event.spotsAvailable}}</td>
                        <td>{{event.spotsTaken}}</td>
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
    name: "OrganizedEvents",
    data() {
        return {
            userId: sessionStorage.getItem('userId'),
            organisedEventsMessage: '',
            organisedEvents: [
                {
                    eventId: 0,
                    eventName: '',
                    spotsAvailable: 0,
                    spotsTaken: 0,
                    registrationDate: 0,
                    startDate: 0,
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
        getOrganisedEvents() {
            this.$http.get("/events/organised", {
                params: {
                    userId: this.userId
                }
            })
                .then(response => {
                    this.organisedEvents = response.data
                })
                .catch(error => {
                    this.errorResponse = error.response.data
                    if (this.errorResponse.errorCode === 555) {
                        this.organisedEventsMessage = this.errorResponse.message
                    } else {
                        router.push({name: 'errorRoute'})
                    }
                })
        },
        navigateToEventView(eventId) {
            router.push({name: 'eventRoute', query: {eventId: eventId}})
        },
        createNewEvent() {
            router.push({name: 'createEventRoute'})
        },
        formatDate(date) {
            return moment(date).format('DD.MM.YYYY');
        }
    },
    beforeMount() {
        this.getOrganisedEvents()
    }
}
</script>

