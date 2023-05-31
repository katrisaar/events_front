<template>
    <div class="row justify-content-center ">
        <div class="row col-8">
            <div class="col-sm">
                <SoonToEndEvents/>
            </div>
            <div class="col-sm">
                <SoonToFillEvents/>
            </div>
            <div class="col-sm">

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
