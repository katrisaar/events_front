<template>
    <div class="container">
        <div class="row">
            <div class="col-sm">
                <h5>Peatselt lõppeva registreerumisega üritused</h5>
                <SoonToEndEvents/>
            </div>
            <div class="col-sm">
                <h5>Peatselt täis saavad üritused</h5>
                <SoonToFillEvents/>
            </div>
            <div class="col-sm">
                <h5>Värskeimalt lisatud üritused</h5>
                <MostRecentEvents/>
            </div>
        </div>
    </div>
</template>

<script>
import SoonToEndEvents from "@/components/events/SoonToEndEvents.vue";
import SoonToFillEvents from "@/components/events/SoonToFillEvents.vue";
import MostRecentEvents from "@/components/events/MostRecentEvents.vue";

export default {
    name: "HighlightedEventsView",
    components: {MostRecentEvents, SoonToFillEvents, SoonToEndEvents}
}
</script>
