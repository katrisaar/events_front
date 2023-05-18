<template>
  <nav>
    <router-link to="/">Avaleht</router-link> |
    <router-link to="#">Üritused</router-link> |

    <router-link to="/login">Logi sisse</router-link>

    <router-link to="/dashboard">Dashboard</router-link> |
    <router-link to="#">Logi välja</router-link>

  </nav>
  <router-view @event-update-nav-menu="updateNavMenu"/>
</template>

<script>
export default {
    data() {
        return {
            userId: sessionStorage.getItem('userId'),
            roleName: sessionStorage.getItem('roleName')
        }
    },
    methods: {
        updateNavMenu() {
            this.userId = sessionStorage.getItem('userId')
            this.roleName = sessionStorage.getItem('roleName')
        }
    }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
