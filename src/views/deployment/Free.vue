<template>
  <v-container fluid fill-height>
    <v-layout>
    <div>
      <h1>Deploy Velzy for Free</h1>
      <p>
        Usual caveat: <i>this is not intended for production.</i> You do get a secure, publicly accessible site but it will spin down, and you can't use a custom domain. Also: hosting a database in a Docker container isn't the best idea... but it is fun to check it out.
      </p>
      <p>
        <code style="width:100%; padding:12px">
version: "3.7"

services:
  postgres:
    image: robconery/velzypg
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=velzy_user
      - POSTGRES_PASSWORD=bigwavedave
      - POSTGRES_DB=velzy
  nuxt:
    image: robconery/velzyapp
    container_name: velzy-web
    restart: always
    ports:
      - "8000:3000"
    command:
      "npm run start"
    environment:
      - DATABASE_URL=postgres://velzy_user:bigwavedave@postgres/velzy
    depends_on:
      - postgres

        </code>
      </p>
      <p>
        This is the <code>docker-compose.yml</code> file in Velzy's root. Feel free to change it.
      </p>
    </div>
      </v-layout>
  </v-container>

</template>
<script>
export default {
  data(){

  }
}
</script>
