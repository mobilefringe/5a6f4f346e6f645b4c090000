<template>
    <div> <!-- without an outer container div this component template will not render -->
        <np-loader v-if="!dataLoaded"></np-loader>
        <transition name="fade">
            <div v-if="dataLoaded" class="page-container" v-cloak>
                <div class="margin-60"></div>
                <div class="row">
                    <div class="col-md-4">
                        <h5>Store Directory</h5>
                        <h2>Select A Category</h2>
                        <div class="category-select-container map">
                            <v-select 
                                v-if="allCategories" 
                                v-model="selected" 
                                :options="allCategories" 
                                :searchable="false" 
                                class="category-select"
                            ></v-select>
                        </div>
                        <div class="store-search-container">
                            <search-component v-model="search" :list="processedStores" :suggestion-attribute="suggestionAttribute" @select="onOptionSelect">
                                <template slot="item" scope="option">
                                    <article class="media">
                                        <p>{{ option.data.name }}</p>
                                    </article>
                                </template>
                            </search-component>
                            <i id="store-search-icon" class="fa fa-search" aria-hidden="true"></i>
                        </div>
                        <div class="storelist-container" v-if="currentSelection">
                            <div class="storename" v-for="store in currentSelection">
                                <p @click="dropPin(store)">{{store.name}}</p>
                            </div>
                        </div>
                        <div class="store-map-download" v-if="getMapDownload">
                            <a :href="mapDownload()" target="_blank">
                                <h5>Download Directory Map</h5>
                            </a>
                        </div>
                        <div>
                            <a class="details-link" href="https://www.google.com/maps/place/NorthPark+Center/@32.868225,-96.773204,15z/data=!4m5!3m4!1s0x0:0x95fc10ba98f7aad4!8m2!3d32.8680671!4d-96.7735128?hl=en-US" target="_blank">
                                Get Directions <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                    <div class="margin-30 visible-mobile"></div>
                    <div class="col-md-8">
                        <div class="map-container">
                            <h5>Map Coming Soon</h5>
                        </div>
                        <!--<div class="row floor-select-row">-->
                        <!--    <div class="col-md-12">-->
                        <!--        <div class="category-select-container right">-->
                        <!--            <v-select v-model="floorSelect" :options="floorOptions" :searchable="false" class="category-select"></v-select>-->
                        <!--        </div>-->
                        <!--    </div>-->
                        <!--</div>-->
                        <!--<svg-map v-bind:svg-map-url="getSVGurl"></svg-map>-->
                    </div>
                </div>
                <div class="margin-60"></div>
                <page-breadcrumb></page-breadcrumb>
            </div>
        </transition>
    </div>
</template>
<!--:on-change="selectCategory()"-->
<script>
    define(["Vue", "vuex", "v-select", "jquery", "Raphael", "mm_mapsvg", "mousewheel", "vue!svg-map"], function (Vue, Vuex, vSelect, $, Raphael, mapSvg, mousewheel, SVGMapComponent) {
        return Vue.component("stores-component", {
            template: template, // the variable template will be injected
            data: function () {
                return {
                    dataLoaded: false,
                    selected: "Select a Category",
                    categoryOptions: null,
                    suggestionAttribute: "name",
                    search: "",
                    currentSelection: null,
                    listMode: "alphabetical",
                    floorSelect: "Select a Level",
                    floorOptions: [
                        { label: "Level One", value: "[260,260,900,900]" },
                        { label: "Level Two", value: "[260,1200,900,900]" }
                    ]
                };
            },
            created() {
                this.loadData().then(response => {
                    this.dataLoaded = true;
                    this.categoryOptions = this.allCategories,
                    this.currentSelection = this.allStores;
                });

                window.Raphael = Raphael; // our mapSvg plugin is stupid and outdated. need this hack to tie Raphael to window object (global variable)
            },
            watch: {
                currentSelection: function () {
                    if (this.currentSelection.length === 0) {
                        this.currentSelection = this.processedStores;
                    }
                },
                selected: function () {
                    var catName = this.selected.value;
                    var storesByCategory = this.$store.getters.storesByCategoryName;
                    var sortedList = _.uniq(storesByCategory[catName]);
                    this.currentSelection = sortedList;
                },
                floorSelect: function () {
                    this.svgMapRef.setFloorViewBox(this.floorSelect.value);
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    "property",
                    "stores",
                    "processedStores",
                    "categories",
                    "storesByCategoryName",
                    "repos",
                    "findRepoByName"
                ]),
                allCategories() {
                    var storesByCategory = this.storesByCategoryName;
                    var categoryName = [];
                    _.forEach(storesByCategory, function (value, key) {
                        var name = key;
                        var id = key;
                        if (name != null && id != null) {
                            var object = {
                                label: name,
                                value: name
                            };
                            categoryName.push(object);
                        }
                    });
                    return categoryName;
                },
                allStores() {
                    return this.processedStores;
                },
                getSVGurl() {
                    return "https://www.mallmaverick.com" + this.property.svgmap_url;
                },
                svgMapRef() {
                    return _.filter(this.$children, function (o) { return o.$el.className == "svg-map"; })[0];
                },
                getMapDownload() {
                    var repo = this.findRepoByName("maps").images;
                    var map = _.filter(repo, function (o) { return o.id == "31625"; });
                    var mapURL = "http://www.mallmaverick.com" + map[0].photo_url;
                    return mapURL;
                }
            },
            methods: {
                loadData: async function () {
                    try {
                        let results = await Promise.all([this.$store.dispatch("getData", "stores"), this.$store.dispatch("getData", "categories"), this.$store.dispatch("getData", "repos")]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                updateSVGMap(map) {
                    this.map = map;
                },
                dropPin(store) {
                    this.$router.push("/stores/" + store.slug);
                    
                    // this.svgMapRef.hideMarkers();
                    // this.svgMapRef.addMarker(store, "//codecloud.cdn.speedyrails.net/sites/589e308f6e6f641b9f010000/image/png/1484850466000/show_pin.png");
                    // this.svgMapRef.setViewBox(store);
                },
                onOptionSelect(option) {
                    // console.log("Selected option:", option);
                    this.$router.push("/stores/" + option.slug);
                },
                mapDownload: function mapDownload() {
                    return this.getMapDownload;
                }
            }
        });
    });
</script>

<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <mapplic-map :store_source="getStoreSource" :height="800" :minimap= "true" :sidebar="false" :maxscale= "5"></mapplic-map>
    </div>
</template>
<script>
    define(["Vue","mousewheel", "hammer", "vue!mapplic-map"], function(Vue, mousewheel, hammer,MapplicComponent) {
        return Vue.component("stores-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    breadcrumb: null,
                    listMode: "alphabetical",
                }
            },
            mounted() {
                console.log("floor1Stores", this.floor1Stores);
                console.log("floor2Stores", this.floor2Stores);
            },
            methods: {
                loadData: async function () {
                    try {
                        let results = await Promise.all([this.$store.dispatch("getData", "stores"), this.$store.dispatch("getData", "categories"), this.$store.dispatch("getData", "repos")]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                changeMode(mode) {
                    this.listMode = mode;
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    "property",
                    "timezone"
                    "stores",
                    "processedStores",
                    "categories",
                    "storesByCategoryName",
                    "repos",
                    "findRepoByName"
                ]),
                // property() {
                //     return this.$store.getters.getProperty;
                // },
                // timezone() {
                //     return this.$store.getters.getTimezone;
                // },
                // storesByAlphaIndex() {
                //     return this.$store.getters.storesByAlphaIndex;
                // },
                // storesByCategoryName() {
                //     return this.$store.getters.storesByCategoryName;
                // },
                allStores() {
                    return this.processedStores;
                },
                floor1Stores() {
                    return _.filter(this.processedStores, ['z_coordinate', 1]);
                },
                floor2Stores() {
                    return _.filter(this.processedStores, ['z_coordinate', 2]);
                },
                allCategories() {
                    return this..processedCategories;
                },
                getStoreSource() {
                    var mall_json = {};
                    var landmarks = {};
                    mall_json.mapwidth = "1000";
                    mall_json.mapheight = "1000";
                    mall_json.categories = [];
                    // console.log(store_cats);
                    _.forEach(this.allCategories, function(val, key) {
                        var temp_val = {};
                        temp_val.id = val.id;
                        temp_val.title = val.name;
                        temp_val.color = "#b7a6bd";
                        temp_val.show = "true";
                        mall_json.categories.push(temp_val);
                    });
                    // this.floor1Stores
                    mall_json.levels = [];
                    // need to add the following for each floor we want to configure.
                    var floor_1 = {};
                    floor_1.id = "first-floor";
                    floor_1.title = "Floor 1";
                    floor_1.map = "//www.mallmaverick.com/system/site_images/photos/000/035/861/original/NorthPark_-_Dec-15-2017_-_Floor_1.svg";
                    //"//www.mallmaverick.com/system/site_images/photos/000/034/516/original/Northpark_-_Map_-_Floor_1_-modifed_for_Mapplic.svg";
                    floor_1.minimap = "//codecloud.cdn.speedyrails.net/sites/5a4bb6d36e6f6473fa0a0000/image/png/1513365138000/NorthPark - Dec-15-2017 - Floor 1.png";
                    floor_1.show = "true";
                    floor_1.locations = [];
                    _.forEach(this.floor1Stores, function(val, key) {
                        //for testing limiting the store numbers to this
                        // if(key < 10) {
                        var temp_val = {};
                        temp_val.id = val.svgmap_region;
                        temp_val.title = val.name;
                        temp_val.about = $.trim(val.description).substring(0, 200).split(" ").slice(0, -1).join(" ") + "...";;
                        temp_val.category = val.categories[1];
                        // temp_val.thumbnail = "";
                        temp_val.link = "/stores/" + val.slug;
                        temp_val.pin = "hidden";
                        // temp_val.action = "none";
                        temp_val.fill = "#";
                        // if(val.store_front_url_abs.indexOf("missing") == -1){
                        //     temp_val.thumbnail=val.store_front_url_abs;
                        // }
                        //get svg's wifth/height by checking the map
                        var svg_width = 1530;
                        var svg_height = 1358;

                        temp_val.x = val.x_coordinate / svg_width;
                        temp_val.y = val.y_coordinate / svg_height;
                        floor_1.locations.push(temp_val);
                        // }
                        // else {
                        //     return;
                        // }
                    });
                    mall_json.levels.push(floor_1);
                    
                    // need to add the following for each floor we want to configure.
                    var floor_2 = {};
                    floor_2.id = "second-floor";
                    floor_2.title = "Floor 2";
                    floor_2.map = "//www.mallmaverick.com/system/site_images/photos/000/035/873/original/NorthPark_-_Dec-15-2017_-_Floor_2.svg";
                    //"//www.mallmaverick.com/system/site_images/photos/000/034/516/original/Northpark_-_Map_-_Floor_1_-modifed_for_Mapplic.svg";
                    floor_2.minimap = "//codecloud.cdn.speedyrails.net/sites/5a4bb6d36e6f6473fa0a0000/image/png/1513365146000/NorthPark - Dec-15-2017 - Floor 2.png";
                    floor_2.show = "true";
                    floor_2.locations = [];
                    _.forEach(this.floor2Stores, function(val, key) {
                        //for testing limiting the store numbers to this
                        // if(key < 10) {
                        var temp_val = {};
                        temp_val.id = val.svgmap_region;
                        temp_val.title = val.name;
                        temp_val.about = $.trim(val.description).substring(0, 200).split(" ").slice(0, -1).join(" ") + "...";;
                        temp_val.category = val.categories[1];
                        // temp_val.thumbnail = "";
                        temp_val.link = "/stores/" + val.slug;
                        temp_val.pin = "hidden";
                        // temp_val.action = "none";
                        temp_val.fill = "#";
                        // if(val.store_front_url_abs.indexOf("missing") == -1){
                        //     temp_val.thumbnail=val.store_front_url_abs;
                        // }
                        //get svg's wifth/height by checking the map
                        var svg_width = 1530;
                        var svg_height = 1358;

                        temp_val.x = val.x_coordinate / svg_width;
                        temp_val.y = val.y_coordinate / svg_height;
                        floor_2.locations.push(temp_val);
                        // }
                        // else {
                        //     return;
                        // }
                    });
                    mall_json.levels.push(floor_2);
                    return mall_json;
                }
            }
        });
    });
</script>