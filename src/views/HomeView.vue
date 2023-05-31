<template>
    <div class="container mb-5">
        <div class="row">
            <div class="col-sm">
                <h1>Tere tulemast</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
                <h1>Ägedate Ürituste Portaali!</h1>
            </div>
        </div>
    </div>
    <div class="container col-5 mt-5">
        <div class="row">
            <div class="col-sm">
                <h3>Ükskõik millises Eestimaa otsas Sa parasjagu viibid, leiad siit kindlasti midagi meelepärast!</h3>
            </div>
        </div>
    </div>
    <div class="container col-3 mt-3 mb-5">
        <div class="row">
            <div class="col-sm">
                <h3>Ja kui ei leia, siis tule loo ise mõni äge üritus!</h3>
            </div>
        </div>
    </div>
    <div class="container col-2 mt-5">
        <div class="row">
            <div class="col-sm">
                <h5><a href="#" @click="navigateToHighlights">Tule vaata täpsemalt!</a></h5>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src


import router from "@/router";

export default {
    name: 'HomeView',
    methods: {
        navigateToHighlights() {
            router.push({name: 'highlightedRoute'})
        },
    }

}
</script>
