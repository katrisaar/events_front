<template>
    <div class="container">
        <div class="row">
            <div class="col">
                Korraldaja(d):
            </div>
            <div class="col">
                <div v-for="organiser in organisers" :key="organiser.lastName" class="row">
                    <div class="col">
                        {{organiser.firstName}} {{organiser.lastName}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from "@/router";

export default {
    name: "Organisers",
    props: {
        eventId: 0
    },
    data() {
        return {
            organisers: [
                {
                firstName: '',
                lastName: ''
            }]
        }
    },
    methods: {
        getOrganisers() {
            this.$http.get("/connection/organisers", {
                    params: {
                        eventId: this.eventId
                    }
                }
            ).then(response => {
                this.organisers = response.data
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },
    },
    beforeMount() {
        this.getOrganisers()
    }
}
</script>

