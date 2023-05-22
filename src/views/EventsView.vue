<template>
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
                        <th scope="col">Minu seos</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="event in allEvents" :key="event.name">
                        <td>{{event.startDate}}</td>
                        <td>{{event.registrationDate}}</td>
                        <td>{{event.name}}</td>
                        <td>{{event.locationName}}</td>
                        <td>{{event.activityTypeName}}</td>
                        <td>{{event.spotsAvailable}}</td>
                        <td>{{event.fee}}</td>
                        <td></td>
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
            allEvents: [
                {
                    eventId: '',
                    name: '',
                    fee: '',
                    activityTypeName: '',
                    locationName: '',
                    spotsAvailable: '',
                    registrationDate: '',
                    startDate: ''
                }
            ]
        }
    },
    methods: {
        getAllEvents() {
            this.$http.get("/events")
                .then(response => {
                    this.allEvents = response.data
                })
                .catch(error => {
                    router.push({name: 'errorRoute'})
                })
        }
    },
    beforeMount() {
        this.getAllEvents()
    }
}
</script>
