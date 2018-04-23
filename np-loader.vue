<template>
    <div id="overlay">
        <div class="loading-container">
            <vue-simple-spinner size="huge" message="NorthPark Center is loading..."></vue-simple-spinner>
        </div>
    </div>
</template>

<script>
    define(["Vue", "vue-simple-spinner"], function (Vue, Spinner) {
        Vue.component("vue-simple-spinner", Spinner);
        return Vue.component("np-loader", {
            template: template, // the variable template will be injected,
            data: function () {
                return {};
            }
        });
    });
</script>

<!--<style>-->
<!--    #overlay {-->
<!--        position: fixed;-->
        /* Sit on top of the page content */
<!--        width: 100%;-->
        /* Full width (cover the whole page) */
<!--        height: 100%;-->
        /* Full height (cover the whole page) */
<!--        overflow: hidden;-->
<!--        top: 0;-->
<!--        left: 0;-->
<!--        right: 0;-->
<!--        bottom: 0;-->
<!--        background-color: #ffffff;-->
<!--        z-index: 999;-->
<!--        display: -webkit-box;-->
<!--        display: -webkit-flex;-->
<!--        display: -moz-box;-->
<!--        display: -moz-flex;-->
<!--        display: -ms-flexbox;-->
<!--        display: flex;-->
<!--    }-->
<!--    .loading-container .vue-simple-spinner-text{-->
<!--        line-height: 1;-->
<!--    }-->
<!--</style>-->
<style>
@font-face {
  font-family: 'Futura-Light';
  src: url('//codecloud.cdn.speedyrails.net/sites/5a1835f66e6f6422a6650000//1513139998000/Futura-Light.woff2') format('woff2'), url('//codecloud.cdn.speedyrails.net/sites/5a1835f66e6f6422a6650000/application/font-woff/1513139998000/Futura-Light.woff') format('woff');
  font-weight: 300;
  font-style: normal;
}
body, html, #__nuxt {
  background-color: <%= options.background %>;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}
.spinner {
  margin: 0 auto;
  width: 50px;
  height: 40px;
  text-align: center;
  font-size: 10px;
}
.spinner > div {
  background-color: <%= options.color %>;
  height: 100%;
  width: 6px;
  display: inline-block;
  
  -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
  animation: sk-stretchdelay 1.2s infinite ease-in-out;
}
.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
.spinner .rect3 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
@-webkit-keyframes sk-stretchdelay {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
  20% { -webkit-transform: scaleY(1.0) }
}
@keyframes sk-stretchdelay {
  0%, 40%, 100% { 
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% { 
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
}
.hero-container{
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  font-family: 'Futura-Light';
  font-size: 3rem;
  line-height: 3rem;
  color: <%=options.color%>;
  text-align: center;
  text-transform: uppercase;
}
</style>