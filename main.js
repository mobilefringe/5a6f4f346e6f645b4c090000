require.config({
    paths: {
        'Vue': 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue',
        'vue_router': 'https://cdnjs.cloudflare.com/ajax/libs/vue-router/2.7.0/vue-router.min',
        'axios': 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.16.1/axios.min',
        'jquery': 'https://code.jquery.com/jquery-3.2.1.min',
        'lodash': 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min',
        'moment': 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment-with-locales.min',
        'moment-timezone': 'https://momentjs.com/downloads/moment-timezone-with-data-2012-2022.min',
        'vue2-filters': 'https://cdn.jsdelivr.net/vue2-filters/0.1.8/vue2-filters.min',
        'vue': 'https://mmvue.codecloudapp.com/require-vuejs.min',
        'vuex': 'https://cdnjs.cloudflare.com/ajax/libs/vuex/2.3.1/vuex.min',
        'vue-i18n': 'https://cdnjs.cloudflare.com/ajax/libs/vue-i18n/6.1.1/vue-i18n.min',
        'text': 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',
        'json': 'https://unpkg.com/requirejs-plugins-current@1.0.3/src/json',
        'js-cookie': 'https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.1.4/js.cookie.min',
        'vue-meta': 'https://unpkg.com/vue-meta@1.0.4/lib/vue-meta.min',
        'Fuse': 'https://cdnjs.cloudflare.com/ajax/libs/fuse.js/3.0.4/fuse.min',
        'datastore_mutation_types': 'https://mmvue.codecloudapp.com/datastore_mutation_types',
        'datastore_getters': 'https://mmvue.codecloudapp.com/datastore_getters',
        'datastore_actions': 'https://mmvue.codecloudapp.com/datastore_actions',
        'datastore_mutations': 'https://mmvue.codecloudapp.com/datastore_mutations',
        'datastore': 'https://mmvue.codecloudapp.com/datastore',
        'vue-moment': 'https://mmvue.codecloudapp.com/vue-moment',
        //append a dummy query string so requireJS doesn't auto-append .js to the end of the url
        'today_hours': 'https://mmvue.codecloudapp.com/today_hours.vue?noext', 
        'search-component': 'https://mmvue.codecloudapp.com/search-component.vue?noext',
        'vue-simple-spinner': 'https://cdn.jsdelivr.net/npm/vue-simple-spinner@1.2.8/dist/vue-simple-spinner.min',
        'vue-breadcrumbs': 'https://cdn.jsdelivr.net/npm/vue-breadcrumbs@1.1.2/dist/vue-breadcrumbs.min',
        'slick': 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min',
        'vue-slick': 'https://mmvue.codecloudapp.com/slick.vue?noext',
        'vue-paginate': 'https://cdnjs.cloudflare.com/ajax/libs/vue-paginate/3.5.1/vue-paginate',
        'vue-social-sharing': 'https://cdn.jsdelivr.net/npm/vue-social-sharing@2.3.3/dist/vue-social-sharing.min',
        'vue-select': 'https://cdn.jsdelivr.net/npm/vue-select@2.3.0/dist/vue-select.min',
        'lightbox': 'http://5a1835f66e6f6422a6650000.codecloudapp.com/lightbox-mod',
        'v-calendar': 'https://unpkg.com/v-calendar@0.5.1/lib/v-calendar.min',
        'vue-affix': 'https://cdn.jsdelivr.net/npm/vue-affix@0.2.4/dist/vue-affix.min',
        'vee-validate' : 'https://cdn.jsdelivr.net/npm/vee-validate@latest/dist/vee-validate',
        'vuex-router-sync': 'https://mmvue.codecloudapp.com/vuex-router-sync',
        'vue-lazy-load': 'https://unpkg.com/vue-lazyload/vue-lazyload',
        // Dependencies for Map //
        // 'Raphael': 'https://cdnjs.cloudflare.com/ajax/libs/raphael/2.2.7/raphael.min', //'http://mallmaverick.com/javascripts/mapsvg/raphael',
        // 'mousewheel': 'https://mallmaverick.com/javascripts/mapsvg/jquery.mousewheel',
        // 'mm_mapsvg': 'https://mmvue.codecloudapp.com/mallmaverick_svgmap',
        // 'svg-map' : 'https://mmvue.codecloudapp.com/svg_map.vue?noext',
        'mousewheel' : 'https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min',
        'mapplic' : 'https://mmvue.codecloudapp.com/mapplic',
        'hammer' : 'https://codecloud.cdn.speedyrails.net/sites/59bac7db6e6f644f22ba0000/text/javascript/1484859750000/hammer.min',
        'mapplic-map' : 'https://mmvue.codecloudapp.com//mapplic.vue?noext'
    }
});

require(['Vue', 'vuex', 'vue2-filters', 'vue_router', 'routes', 'datastore', 'vue-i18n', 'locales', 'moment', 'vue-meta', 'vue!search-component', 'vue-simple-spinner', 'vue-breadcrumbs', 'vue-paginate', 'vue-social-sharing', 'vue-select', 'v-calendar', 'vue-affix', 'vue!bc-nav.vue', 'vue!np_header.vue', 'vue!np_footer.vue', 'vue!page_breadcrumb.vue', 'vuex-router-sync', 'vue!np-loader.vue'], function (Vue, Vuex, Vue2Filters, VueRouter, appRoutes, store, VueI18n, messages, moment, Meta, SearchComponent, Spinner, VueBreadcrumbs, VuePaginate, SocialSharing, VueSelect, VCalendar, VueAffix, BcNavComponent, NPHeaderComponent, NPFooterComponent, PageBreadcrumbComponent, VuexRouterSync, NpLoader) {

    Vue.use(Meta);
    Vue.use(VueRouter);
    Vue.use(Vue2Filters);
    Vue.use(VueI18n);
    Vue.use(VueBreadcrumbs);
    Vue.use(VueAffix.default);

    /* initialize router */
    const router = new VueRouter({
        mode: 'history',
        routes: appRoutes
    });

    /* initialize i18n */
    const i18n = new VueI18n({
        locale: 'en-ca',
        fallbackLocale: 'en-ca',
        messages,
    });
    
    Vue.component('vue-simple-spinner', Spinner);
    Vue.component('social-sharing', SocialSharing);
    Vue.component('v-select', VueSelect.VueSelect);

    /* Sync Router and Vuex store */
    VuexRouterSync.sync(store, router);
    
    /* bootstrap app */
    const vm = new Vue({
        el: '#app',
        data: function () {
            return {
                dataLoaded: false,
                breadcrumb: this.$breadcrumbs,
                social_media: [
                    {
                        name: "Facebook",
                        url: "https://www.facebook.com/northparkcenter",
                        iconClass: "fa fa-facebook-square"
                    },
                    {
                        name: "Twitter",
                        url: "https://twitter.com/NorthParkCenter",
                        iconClass: "fa fa-twitter-square"
                    },
                    {
                        name: "Pinterest",
                        url: "https://www.pinterest.ca/northparkcenter",
                        iconClass: "fa fa-pinterest-square"
                    },
                    {
                        name: "YouTube",
                        url: "https://www.youtube.com/user/NorthParkCenter",
                        iconClass: "fa fa-youtube-square"
                    },
                    {
                        name: "Instagram",
                        url: "https://www.instagram.com/northparkcenter",
                        iconClass: "fa fa-instagram"
                    },
                    {
                        name: "SnapChat",
                        url: "",
                        iconClass: "fa fa-snapchat-square"
                    }
                ]
            }
        },
        created() {
            this.loadData().then(response => {
                this.dataLoaded = true;      
            });
        },
        watch: {
            // watcher to update vue-i18n when the locale has been changed by the user
            locale: function(val, oldVal) {
                this.$i18n.locale = val;
                moment.locale(val);
            }
        },
        computed: {
            // computed property for locale which returns locale value from data store and also updates the data store with new locale information
            locale: {
                get() {
                    return this.$store.state.locale;
                },
                set(value) {
                    this.$store.commit('SET_LOCALE', { lang: value });
                }
            },
            ...Vuex.mapGetters([
                'property',
                'processedStores'
            ])
        },
        methods: {
            loadData: async function() {
                try {
                    await this.$store.dispatch('initializeApi', {site: "northpark", version: "v4"});
                    // avoid making LOAD_META_DATA call for now as it will cause the entire Promise.all to fail since no meta data is set up.
                    let results = await Promise.all([this.$store.dispatch("INITIALIZE_LOCALE"), this.$store.dispatch("getData", "property"), this.$store.dispatch("getData", "hours"), this.$store.dispatch("getData", "stores")]);
                } catch(e) {
                    console.log("Error loading data: " + e.message);    
                }
            },
            // utility method to allow user to change locale value
            changeLocale: function(val) {
                this.locale = val; // this will update the data store, which in turn will trigger the watcher to update the locale in the system
            }
        },
        router: router,
        store,
        i18n
    });
});
