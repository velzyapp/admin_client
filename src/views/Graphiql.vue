<template>
  <v-container fluid fill-height>
    <v-layout row wrap>

      <iframe :src="graphUrl" class="elevation-1" frameborder="0"  style="overflow:hidden;height:100%;width:100%" height="100%" width="100%"></iframe>
    </v-layout>

  </v-container>
</template>
<script>
import { mapState } from 'vuex';
export default {
  computed :  mapState({
    graphUrl: state => state.graphUrl
  })
}
</script>
