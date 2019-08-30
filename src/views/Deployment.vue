<template>
  <v-container fluid fill-height>
    <v-layout>

      <div>
        <h1>Velzy Deployment Center</h1>
        <p>
          You can deploy Velzy to suit your needs, from <i>free</i> all the way to fully managed and globally scalable. Velzy is powered by PostgreSQL, and you can push a simple Dockerized container to play around for free, or you can push to Azure's fully managed PostgreSQL backend - it's totally up to you.
        </p>
      </div>
      <div>
        <h3>Free and Simple</h3>
        <p>
          Deploying Velzy for free (to Azure) involves the click of a button, but there are a few things you'll need to have in place first:
        </p>
        <ul>
          <li>An active Azure subscription.</li>
          <li>The Azure CLI installed, which you can <a href="https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest" target=_blank>get from here</a>.</li>
          <li>NodeJS</li>
          <li>Docker</li>
        </ul>
        <p>
          Deploying Velzy is a matter of pushing a <code>docker-compose.yml</code> file up to Azure, using the F1 free tier. You can pull directly from our image too and have Azure build everything for you.
        </p>
        <v-btn class="mb-8 primary" router to="/deployment/free">Deploy for Free</v-btn>

      </div>
      <div>
        <h3>Fully Managed</h3>
        <p>
          A fully-managed Velzy app is:
        </p>
        <ol>
          <li>A Nuxt app (Vue/NodeJS combo) pushed to Azure's App Services and</li>
          <li>A <a href="https://docs.microsoft.com/en-us/azure/postgresql/" target=_blank>managed PostgreSQL instance.</a></li>
        </ol>
        <p>
          Once again: you click a button and we're off. You just need the the Azure CLI installed and we're good.
        </p>
        <v-btn class="mb-8 primary"  router to="/deployment/managed">Deploy Managed</v-btn>
      </div>

    </v-layout>
  </v-container>
</template>

<script>
export default {

}
</script>
