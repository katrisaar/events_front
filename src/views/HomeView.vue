<template>
    <div class="container">
        <div class="row">
            <div class="col-sm">
                <h5>Peatselt lõppeva registreerumisega üritused</h5>
                <SoonToFinishEvents/>
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
// @ is an alias to /src

import Modal from "@/components/modal/Modal.vue";
import SoonToFinishEvents from "@/components/events/SoonToFinishEvents.vue";
import SoonToFillEvents from "@/components/events/SoonToFillEvents.vue";
import MostRecentEvents from "@/components/events/MostRecentEvents.vue";

export default {
  name: 'HomeView',
  components: {
      MostRecentEvents,
      SoonToFillEvents,
      SoonToFinishEvents,
      Modal

  }
}
</script>
