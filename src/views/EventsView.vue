<template>
    <div class="col">
        <button v-if="Number(userId) === 0" @click="navigateToLogin" type="button" class="btn btn-success">Loo ise üritus</button>
        <button v-else @click="navigateToCreateEvent" type="button" class="btn btn-success">Loo ise üritus</button>
    </div>
    <div class="container">
        <div class="row">
            <div class="col">
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Toimumise kuupäev</th>
                        <th scope="col">Registreerumise tähtaeg</th>
                        <th scope="col">Üritus</th>
                        <th scope="col">Piirkond</th>
                        <th scope="col">Valdkond</th>
                        <th scope="col">Vabu kohti</th>
                        <th scope="col">Maksumus</th>
                        <th v-if="userId !== 0" scope="col">Minu seos</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="event in allEvents" :key="event.name">
                        <td>{{event.startDate}}</td>
                        <td>{{event.registrationDate}}</td>
                        <td><a href="#" @click="navigateToEventView(event.eventId)">{{event.name}}</a></td>
                        <td>{{event.locationName}}</td>
                        <td>{{event.activityTypeName}}</td>
                        <td>{{event.spotsAvailable}}</td>
                        <td>{{event.fee}}</td>
                        <td v-if="userId !== 0">{{event.connectionTypeName}}</td>
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
    name: "EventsView",
    data() {
        return {
            userId: sessionStorage.getItem('userId'),
            allEvents: [
                {
                    eventId: '',
                    name: '',
                    fee: '',
                    activityTypeName: '',
                    locationName: '',
                    spotsAvailable: '',
                    registrationDate: '',
                    startDate: '',
                    connectionTypeName: ''
                }
            ]
        }
    },
    methods: {
        getAllEvents() {
            console.log('olen siin ' + this.userId)
            this.$http.get("/events/all", {
                params: {
                    userId: this.userId
                }
            })
                .then(response => {
                    this.allEvents = response.data
                })
                .catch(error => {
                    router.push({name: 'errorRoute'})
                })
        },
        navigateToEventView(eventId) {
            router.push({name: 'eventRoute', query: {eventId: eventId}})
        },
        navigateToLogin() {
            router.push({name: 'loginRoute'})
        },
        navigateToCreateEvent() {
            router.push({name: 'createEventRoute'})
        }
    },
    beforeMount() {
        if (sessionStorage.getItem('userId') === null) {
            this.userId = 0
        }
        this.getAllEvents();
    }
}
</script>
