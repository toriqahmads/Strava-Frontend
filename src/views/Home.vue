<template>
  <div id="page-top">
    <!-- Navigation-->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="mainNav">
      <div class="container">
          <a class="navbar-brand" href="#page-top">
            <!-- <img src="/img/navbar-logo.svg" alt="..." /> -->
            STRAVA
          </a>
      </div>
    </nav>

    <section class="page-section" id="login">
      <div class="container">
        <div class="masthead-subheading" v-if="athlete && athlete !== null">
          <b-card
            :img-src="athlete.profile_picture"
            :img-alt="athlete.username"
            img-top
            style="max-width: 20rem;"
            class="mb-4"
          >
            <b-card-text>
              <b-list-group>
                <b-list-group-item>Name: {{ athlete.firstname }} {{ athlete.lastname }}</b-list-group-item>
                <b-list-group-item>Gender: {{ !athlete.sex || athlete.sex === null ? 'Unknown' : athlete.sex === 'M' ? 'Male' : 'Female' }}</b-list-group-item>
                <b-list-group-item>Followers: {{ athlete.followers }}</b-list-group-item>
                <b-list-group-item>Friends: {{ athlete.friends }}</b-list-group-item>
                <b-list-group-item>Premium: {{ athlete.premium ? 'Yes' : 'No' }}</b-list-group-item>
              </b-list-group>
            </b-card-text>
          </b-card>
          <hr/>
        </div>
        <div v-if="this.logged_in">
          <a class="btn btn-info btn-xl text-uppercase" @click="sync">
            Sync
          </a>
          <br/>
          <br/>
          <a class="btn btn-danger btn-xl text-uppercase" @click="logout">
            Disconnect
          </a>
        </div>
        <div v-if="!this.logged_in">
          <a class="btn btn-primary btn-xl text-uppercase" @click="getLoginUri">
            Connect
          </a>
        </div>
      </div>
    </section>

    <section class="page-section bg-light" id="activities" v-if="load_activity">
      <div class="container">
        <b-container class="mb-5">
          <ActivityList />
        </b-container>
      </div>
    </section>

    <!-- Footer-->
    <footer class="footer py-4">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-4 text-lg-start">Copyright &copy; 2022</div>
          <div class="col-lg-4 my-3 my-lg-0">
            <a class="btn btn-dark btn-social mx-2" href="https://github.com/toriqahmads" target="_blank"><i class="fab fa-github"></i></a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import ActivityList from '@/components/ActivityList'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    ActivityList
  },
  computed: {
    ...mapGetters('authentication', {
      athlete: 'athlete',
      login_uri: 'login_uri',
      logged_in: 'logged_in'
    }),
    ...mapGetters('sync', {
      synced: 'synced'
    }),
  },
  data() {
    return {
      load_activity: false
    }
  },
  async created() {
    const { code } = this.$route.query
    if (!code || code === '') return

    await this.$store.dispatch('authentication/login', code)

    let query = Object.assign({}, this.$route.query);
    delete query.code
    delete query.scope
    delete query.state
    this.$router.replace({ query })
    this.$router.go()
  },
  async mounted() {
    await this.checkLogin()
    this.loadActivities()
  },
  methods: {
    async getLoginUri() {
      try {
        await this.$store.dispatch('authentication/getLoginUri')

        if (this.login_uri && this.login_uri !== '') {
          window.location = this.login_uri
        }
      } catch (err) {
        return
      }
    },
    async checkLogin() {
      try {
        await this.$store.dispatch('authentication/checkIsLoggedIn')
      } catch (err) {
        return
      }
    },
    async logout() {
      try {
        await this.$store.dispatch('authentication/logout')
      } catch (err) {
        return
      }
    },
    async sync() {
      try {
        await this.$store.dispatch('sync/sync')

        if (this.synced) alert('Your activity list synced')
      } catch (err) {
        return
      }
    },
    loadActivities() {
      this.load_activity = true
    }
  },
}
</script>
<style>
.card {
  margin: 0 auto; /* Added */
  float: none; /* Added */
  margin-bottom: 10px; /* Added */
}
</style>
