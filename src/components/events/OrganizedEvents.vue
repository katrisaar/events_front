<template>
    <div class="container">
        <div class="row justify-content-between">
            <div class="col"><h5>Tulevased üritused, mida korraldan</h5></div>
            <div class="col"><button @click="createNewEvent" class="btn btn-primary" type="submit">Loo uus üritus</button></div>
        </div>
        <div class="row mt-4">
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
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="event in organisedEvents" :key="event.eventId">
                        <td>{{event.startDate}}</td>
                        <td>{{event.registrationDate}}</td>
                        <td><a href="#" @click="navigateToEventView(event.eventId)">{{event.eventName}}</a></td>
                        <td>{{event.spotsAvailable}}</td>
                        <td>{{event.spotsTaken}}</td>
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
                    startDate: 0
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
    },
    beforeMount() {
        this.getOrganisedEvents()
    }
}
</script>

