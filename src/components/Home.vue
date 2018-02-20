<template>
    <v-container>
      <v-layout row>
        <v-flex>
          <div id="poll-header">
            <div id="poll-h">
              <h1>PollVue</h1> 
              <h4><span> &copy;</span></h4>
            </div>

            <p>
              <em>
                Make a poll and let your friends decide...
              </em>
            </p>
      
            <v-btn
              href="/auth">
              Get Started
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: 100;
  font-size: 80px;
  color: chocolate;
}
#poll-header {
  display: flex;
  height: 400px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#poll-h {
  display: flex;
}
</style>
