<template>
  <div class="home">
    <h1>demos</h1>
    <table class="demos-table">
      <thead>
        <tr>
          <th>demo</th>
          <th>source code</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><router-link to="/example/basic">basic</router-link></td>
          <td><a href="https://github.com/TinyWisp/twtree/blob/master/src/views/BasicExample.vue">code</a></td>
        </tr>
        <tr>
          <td><router-link to="/example/checkbox">checkbox</router-link></td>
          <td><a href="https://github.com/TinyWisp/twtree/blob/master/src/views/CheckboxExample.vue">code</a></td>
        </tr>
        <tr>
          <td><router-link to="/example/radio-button">radio button</router-link></td>
          <td><a href="https://github.com/TinyWisp/twtree/blob/master/src/views/RadioButtonExample.vue">code</a></td>
        </tr>
        <tr>
          <td><router-link to="/example/async">ansyc loading</router-link></td>
          <td><a href="https://github.com/TinyWisp/twtree/blob/master/src/views/AsyncExample.vue">code</a></td>
        </tr>
        <tr>
          <td><router-link to="/example/edit">edit</router-link></td>
          <td><a href="https://github.com/TinyWisp/twtree/blob/master/src/views/EditExample.vue">code</a></td>
        </tr>
        <tr>
          <td><router-link to="/example/button">button</router-link></td>
          <td><a href="https://github.com/TinyWisp/twtree/blob/master/src/views/ButtonExample.vue">code</a></td>
        </tr>
        <tr>
          <td><router-link to="/example/drag-and-drop">drag and drop</router-link></td>
          <td><a href="https://github.com/TinyWisp/twtree/blob/master/src/views/DragAndDropExample.vue">code</a></td>
        </tr>
        <tr>
          <td><router-link to="/example/contextmenu">context menu</router-link></td>
          <td><a href="https://github.com/TinyWisp/twtree/blob/master/src/views/ContextMenuExample.vue">code</a></td>
        </tr>
        <tr>
          <td><router-link to="/example/search">search</router-link></td>
          <td><a href="https://github.com/TinyWisp/twtree/blob/master/src/views/SearchExample.vue">code</a></td>
        </tr>
        <tr>
          <td><router-link to="/example/multi-select">multiple select</router-link></td>
          <td><a href="https://github.com/TinyWisp/twtree/blob/master/src/views/MultiSelectExample.vue">code</a></td>
        </tr>
        <tr>
          <td><router-link to="/example/sort">sort</router-link></td>
          <td><a href="https://github.com/TinyWisp/twtree/blob/master/src/views/SortExample.vue">code</a></td>
        </tr>
        <tr>
          <td><router-link to="/example/no-root">no root</router-link></td>
          <td><a href="https://github.com/TinyWisp/twtree/blob/master/src/views/NoRootExample.vue">code</a></td>
        </tr>
        <tr>
          <td><router-link to="/example/custom-appearance">custom appearance</router-link></td>
          <td><a href="https://github.com/TinyWisp/twtree/blob/master/src/views/CustomAppearanceExample.vue">code</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home'
}
</script>

<style scoped>
.demos-table {
  margin-left: auto;
  margin-right: auto;
  border: 1px solid gray;
  border-collapse: collapse;
}
.demos-table tr {
  height: 2em;
}
.demos-table td, .demos-table th {
  border: 1px solid gray;
}
.demos-table tr td:nth-child(even) {
  text-align: center;
}
.demos-table tr td:nth-child(odd) {
  text-align: left;
  padding-left: 1em;
}
.demos-table a {
  text-decoration: none;
}
</style>