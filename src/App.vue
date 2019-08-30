<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      light
      app

    >
      <v-list>

          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.route"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>mdi-{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.text" />
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
            exact
            to="/deployment"
            router
          >
          <v-list-item-action>
            <v-icon>mdi-cloud-upload-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Deployment</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      color="black"
      dark
      app
    >
      <v-app-bar-nav-icon @click.stop="miniVariant = !miniVariant" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-content light>
      <v-container light fluid fill-height>
      <router-view></router-view>
      </v-container>

    </v-content>
    <v-footer
      :fixed="false"
      app
      dark
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>


<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  data: () => ({
    clipped: true,
    drawer: true,
    fixed: false,
    items: [
      {route: "/", text: "Dashboard", icon: "home", name: "home"},
      {route: "/tables", text: "Tables", icon: "table-edit", name: "tables"},
      {route: "/query", text: "GraphQL", icon: "graphql", name: "graphql"},
      {route: "/auth/users", text: "Users", icon: "account-group", name: "users"},
      {route: "/auth/apikeys", text: "API Keys", icon: "key-wireless", name: "apikeys"},
      {route: "/auth/providers", text: "OAuth Settings", icon: "chemical-weapon", name: "providers"},
    ],
    miniVariant: false,
    title: 'Velzy'
  }),
  created(){
    this.$store.dispatch("loadTables");
  }
};
</script>
