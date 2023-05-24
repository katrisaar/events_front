<template>
<p>Siia tuleb ühe konkreetse ürituse detailvaade (eventId alusel). </p>
    <p>Aga hetkel seda veel valmis ei ole. </p>
    <p>EventId saadame router.pushi parameetrina kaasa (sest me alati pushime siia mõnelt olemasolevalt lehelt)</p>

    <p>Praeguse sissetulnud evendi id on {{eventId}}</p>
</template>

<script>
import {useRoute} from "vue-router";

export default {
    name: "EventView",
    data() {
        return {
            eventId: Number(useRoute().query.eventId)
        }
    },
}
</script>

