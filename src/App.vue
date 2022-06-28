<template>
<body>
   <div class="container">
    <div class="row">
      <div class="offset-md-3 col-md-6 text-center mt-5">
        <nav>
          <router-link class="text-secondary text-decoration-none" to="/">Analytics</router-link> |
          <router-link class="text-secondary text-decoration-none" to="/autorisation">Autorisation</router-link>
        </nav>
        </div>
    </div>
    <router-view />
  </div>
  </body>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
HTML {
  margin:0;
  padding: 0;
  height: 100%;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif !important;
  font-weight: 400;
}
body {
  width: 100%;
  height: 100%;
  background: url('./assets/img/s1.png') no-repeat;
  background-size: 700px 850px;
  background-position-x: 500px;

  @media(max-width: 992px) {
    background-position-x: 300px;
  }
  @media(max-width: 768px) {
    background-position-x: 150px;
  }
  @media(max-width: 576px) {
    background-position-x: 50px;
  }
}

</style>
