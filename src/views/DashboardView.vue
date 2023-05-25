<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h3>Kõik minuga seotud üritused </h3>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <OrganizedEvents/>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <ParticipatingEvents/>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <InterestedEvents/>
            </div>
        </div>
    </div>
</template>

<script>
import OrganizedEvents from "@/components/events/OrganizedEvents.vue";
import ParticipatingEvents from "@/components/events/ParticipatingEvents.vue";
import InterestedEvents from "@/components/events/InterestedEvents.vue";

export default {
    name: "DashboardView",
    components: {InterestedEvents, ParticipatingEvents, OrganizedEvents},
    data() {
        return {
            userId: sessionStorage.getItem('userId')
        }
    },
}
</script>

<style scoped>

</style>