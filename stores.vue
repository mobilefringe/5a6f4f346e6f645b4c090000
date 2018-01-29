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
                    return this.processedCategories;
                },
                getMapDownload() {
                    var repo = this.findRepoByName("maps").images;
                    var map = _.filter(repo, function (o) { return o.id == "31625"; });
                    var mapURL = "http://www.mallmaverick.com" + map[0].photo_url;
                    return mapURL;
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