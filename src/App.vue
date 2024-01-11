<template>
  <div id="app">
    <div class="row" role="banner">
      <div class="col-12">
        <h1>Codex Editor</h1>
      </div>
    </div>
    <router-view/>
  </div>
</template>
<style>
@charset "UTF-8";
@import url(https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap);
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);
html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

#app {
  min-height: 100vh;
  background: #dacfc6;
  color: darkslategray;
  overflow-x : hidden;
}

body.login {
  background-color: white;
  max-width: 500px;
  margin: 10vh auto;
  padding: 1em;
  height: auto;
}

/* general utility classes */
.warn {
  color: lightsalmon;
}
.row[role="banner"] {
  font-family: "Josefin Sans";
  background: white;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
}
.row[role="banner"] h1 {
  margin: 0;
  font-weight: 300;
  padding: 1rem;
}
.row[role="banner"] h1:before {
  font-family: FontAwesome;
  padding-right: 0.4em;
  content: "\f02d";
}

.ProseMirror p{
    margin-bottom: 0px;
  }
</style>
