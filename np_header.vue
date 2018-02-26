<template>
    <header :class="{ home: route.path === '/'}">
        <div class="page-container">
            <div class="row">
                <div class="col-xs-6 col-sm-3">
                    <router-link to="/" active-class="active" exact>
                        <img class="header-logo" src="//codecloud.cdn.speedyrails.net/sites/5a6f4f346e6f645b4c090000/image/png/1511803959000/northpark-logo.png"  alt="Northpark Property Logo">
                    </router-link>
                </div>
                <div class="col-xs-6 col-sm-9">
                    <div class="menu-icons">
                        <div @click="show_search = !show_search" :class="{ open: show_search, invisible: show_menu }" id="search-icon">
                            <span class="circle"></span>
                            <span class="handle"></span>
                        </div>
                        <div @click="show_menu = !show_menu" :class="{ open: show_menu, invisible: show_search }" id="menu-icon">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div class="header-breadcrumb-container">
                            <breadcrumbs></breadcrumbs>
                            <bc-nav></bc-nav>
                        </div>
                    </div>
                    <div v-if="show_menu" class="menu-container" v-on:keyup.esc="show_menu = false">
                        <div class="menu-content">
                            <ul class="menu">
                                <router-link tag="li" to="/stores" active-class="active" exact>
                                    <a class="main-menu-link"><h1 @click="show_menu = !show_menu">Shops & Dining</h1></a>
                                </router-link>
                                <router-link tag="li" to="/events" active-class="active" exact>
                                    <a class="main-menu-link"><h1 @click="show_menu = !show_menu">Events</h1></a>
                                </router-link>
                                <router-link tag="li" to="/art" active-class="active" exact>
                                    <a class="main-menu-link"><h1 @click="show_menu = !show_menu">Art</h1></a>
                                </router-link>
                                <router-link tag="li" to="/news" active-class="active" exact>
                                    <a class="main-menu-link"><h1 @click="show_menu = !show_menu">News</h1></a>
                                </router-link>
                                <router-link tag="li" to="/visit" active-class="active" exact>
                                    <a class="main-menu-link"><h1 @click="show_menu = !show_menu">Visit</h1></a>
                                </router-link>
                                <router-link tag="li" to="/our-story" active-class="active" exact>
                                    <a class="main-menu-link"><h1 @click="show_menu = !show_menu">Our Story</h1></a>
                                </router-link>
                                <router-link tag="li" to="/magazine" active-class="active" exact>
                                    <a class="main-menu-link"><h1 @click="show_menu = !show_menu">The Magazine</h1></a>
                                </router-link>
                                <router-link tag="li" to="/hours" active-class="active" exact>
                                    <a class="main-menu-link"><h1 @click="show_menu = !show_menu">Hours</h1></a>
                                </router-link>
                                <router-link tag="li" to="/holiday" active-class="active" exact>
                                    <a class="main-menu-link"><h1 @click="show_menu = !show_menu">Holiday</h1></a>
                                </router-link>
                            </ul>
                            <div class="menu-newsletter-container">
                                <form action="https://mobilefringe.createsend.com/t/d/s/jhithd/" method="post">
                                    <input class="" id="fieldEmail" name="cm-jhithd-jhithd" type="email" required placeholder="Sign Up for Email Newsletter"/>
                                    <button class="news-submit" type="submit"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
                                </form>
                            </div>
                            <div class="menu-social-container">
                                <span v-for="item in social_media">
                                    <a :href="item.url" target="_blank">
                                        <i :class="item.iconClass" aria-hidden="true"></i>
                                    </a>
                                </span>
                            </div>
                            <div class="menu-address-container">
                                <p v-if="property">{{property.address1}}<br>
                                    {{property.city}}, {{property.province_state}} {{property.postal_code}} <br>
                                    {{property.contact_phone}}
                                </p>    
                            </div>
                        </div>
                    </div>
                    <div v-if="show_search" class="search-container" v-on:keyup.esc="show_search = false">
                        <div class="search-content">
                            <search-component v-model="search" :list="processedStores" :suggestion-attribute="suggestionAttribute" @select="onOptionSelect" :keys="['name', 'keywords','tags']">
                                <template slot="item" scope="option">
                                    <article class="media">
                                        <p>{{ option.data.name }}</p>
                                    </article>
                                </template>
                            </search-component>
                            <div class="menu-social-container" >
                                <span v-for="item in social_media">
                                    <a :href="item.url" target="_blank">
                                        <i :class="item.iconClass" aria-hidden="true"></i>
                                    </a>
                                </span>
                            </div>
                            <div class="menu-address-container">
                                <p v-if="property">{{property.address1}}<br>
                                    {{property.city}}, {{property.province_state}} {{property.postal_code}} <br>
                                    {{property.contact_phone}}
                                </p>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    define(["Vue", "vuex", "vue_router", "routes", "moment", "moment-timezone", "vue-moment", "vue!bc-nav.vue"], function (Vue, Vuex, VueRouter, appRoutes, moment, tz, VueMoment, BcNavComponent) {
        return Vue.component("np-header", {
            template: template, // the variable template will be injected,
            data: function () {
                return {
                    isOpen: false,
                    show_menu: false,
                    show_search: false,
                    breadcrumb: this.$breadcrumbs,
                    suggestionAttribute: 'name',
                    search: '',
                }
            },
            props:['social_media'],
            watch: {
                show_menu: function() {
                    if(this.show_menu == true){
                        document.body.classList.add("no-scroll");
                    } else if (this.show_menu == false) {
                        document.body.classList.remove("no-scroll");
                    }
                },
                show_search: function(){
                    if(this.show_search == true){
                        document.body.classList.add("no-scroll");
                    } else if (this.show_search == false) {
                        document.body.classList.remove("no-scroll");
                    } 
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'processedStores',
                    'route'
                ])
            },
            methods: {
                onOptionSelect(option) {
                    console.log('Selected option:', option);
                    this.$router.push("/stores/" + option.slug);
                    this.show_search = false;
                    this.search = '';
                }
            }
        });
    });
</script>