<template>
  <div style="position:relative; margin: auto;width: 100%;overflow: hidden;">
    <div id="mapplic" class="mapplic" @mapready="mapready" @locationopened="locationopened" @locationclosed="locationclosed" @levelswitched="levelswitched" @positionchanged="positionchanged"></div>
</div>
</template>



<style>
    .mapplic-pin{
        /*background-color: transparent!important;    */
    }
    /* INTERACTIVE ELEMENTS */
    /* clickable elements */
    .mapplic-clickable:not(g),
    g.mapplic-clickable > * {
    	opacity: 1;
    	/*fill: #b7a6bd*/;
    }
    
    /* hovered elements */
    .mapplic-clickable:not(g):hover,
    g.mapplic-clickable:hover > * {
    	opacity: 1;
    	fill: #be7bf4;
    }
    
    /* active elements */
    .mapplic-active,
    a.mapplic-active > path,
    g.mapplic-active > * {
    	fill: #a366d4;
    	opacity: 1.0 !important;
    }
    /*.mapplic-coordinates {*/
    /*    visibility: hidden;*/
    /*}*/
</style>

<script>
    define(["Vue","jquery", "mousewheel", "hammer", "mapplic"], function(Vue, $ , mousewheel, hammer, mapplic) {
        return Vue.component('mapplic-map', {
            template: template,
            props: {
                store_source: {
                    type: Object,
                    required: true
                },
                height: {
                    type: Number,
                    default: 1000
                },
                landmark: {
                    type: String,
                    default: null
                },
                mapfill: {
                    type: Boolean,
                    default: false
                },
                markers: {
                    type: Boolean,
                    default: true
                },
                minimap: {
                    type: Boolean,
                    default: true
                },
                sidebar: {
                    type: Boolean,
                    default: true
                },
                search: {
                    type: Boolean,
                    default: true
                },
                lightbox: {
                    type: Boolean,
                    default: false
                },
                deeplinking: {
                    type: Boolean,
                    default: true
                },
                clearbutton: {
                    type: Boolean,
                    default: true
                },
                zoombuttons: {
                    type: Boolean,
                    default: true
                },
                zoomoutclose: {
                    type: Boolean,
                    default: false
                },
                hovertip: {
                    type: Boolean,
                    default: false
                },
                tooltip: {
                    type: Object,
                    default: this.getTooltip
                },
                smartip: {
                    type: Boolean,
                    default: true
                },
                mousewheel: {
                    type: Boolean,
                    default: true
                },
                fullscreen: {
                    type: Boolean,
                    default: false
                },
                fillcolor: {
                    type: String,
                    default: "#4d5e6d"
                },
                action: {
                    type: String,
                    default: 'tooltip'
                },
                maxscale: {
                    type: Number,
                    default: 4
                },
                zoom: {
                    type: Boolean,
                    default: true
                }
            },
            data() {
                return {
                    map: null,
                    self: null,
                    developer: true
                }
            },
            computed: {
                options() {
                    var options = {
                        source: this.store_source,
                        height: this.height,
                        landmark: this.landmark,
                        mapfill: this.mapfill,
                        markers: this.markers,
                        minimap: this.minimap,
                        sidebar: this.sidebar,
                        search: this.search,
                        lightbox: this.lightbox,
                        deeplinking: this.deeplinking,
                        clearbutton: this.clearbutton,
                        zoombuttons: this.zoombuttons,
                        zoomoutclose: this.zoomoutclose,
                        hovertip: this.hovertip,
                        tooltip: this.tooltip,
                        smartip: this.smartip,
                        mousewheel: this.mousewheel,
                        fullscreen: this.fullscreen,
                        developer: this.developer,
                        fillcolor: this.fillcolor,
                        action: this.action,
                        maxscale: this.maxscale,
                        zoom: this.zoom
                    }
                    return options;
                }
            },
            mounted() {
                this.initMapplic();
            },
            watch: {
                map: function() {
                    this.$emit('updateMap', this.map);
                }
            },
            methods: {
                getTooltip() {
                    //   { thumb: true, desc: true, link: true }  
                    return {
                        thumb: true,
                        desc: true,
                        link: true
                    };
                },
                initMapplic() {
                    this.map = $('#mapplic').mapplic(this.options);
                    this.self = this.map.data('mapplic');
                    
                    this.map.on('mapready',this.mapready());
                    this.map.on('locationopened',this.locationopened());
                    this.map.on('locationclosed',this.locationclosed());
                    this.map.on('levelswitched',this.levelswitched());
                    this.map.on('positionchanged',this.positionchanged());
                
                },
                mapready(e, location) {
                    console.log('Map is ready!')
                },
                locationopened(e, loc) {
                    if(loc) {
                        console.log(loc.title + ' opened.');
                        var self = map.data('mapplic');
                        console.log(self);
                        var el = document.getElementById('svg4538');
                        var myWidth = el.getBoundingClientRect().width;
                        var myHeight = el.getBoundingClientRect().height;
                        console.log(myWidth,myHeight);
                        // console.log(self.getLocationData(loc.id));
                    	// location grants full access to the location
                        console.log(loc ,' opened.');
                        console.log($(".mapplic-coordinates-x").text());
                        console.log($(".mapplic-coordinates-y").text());
                        
                    //     var current_location = loc.el[0].getBBox();
                    //     console.log(current_location);
                        var location = self.getLocationData(loc.id);
                        console.log("old location",location.x + ", " + location.y);
                    }
                },
                locationclosed(e) {
                    console.log('Location closed.');
                },
                levelswitched(e, level) {
                    if(level) {
                        console.log('Switched to ' + level + ' level.');
                    }
                },
                positionchanged(e, self) {
                    if(self) {
                        console.log('Pan or zoom performed, current scale: ' + self.scale);
                    }
                },
                switchLevel(target) {
                    this.self.switchLevel(target);
                },
                moveTo(x, y, s, d) {
                    this.self.moveTo(x, y, s, d);
                },
                getLocationData(id) {
                    this.self.getLocationData(id);
                },
                showLocation(id, d) {
                    this.self.showLocation(id, d);
                },
                hideLocation() {
                    this.self.hideLocation();
                },
                updateLocation(id) {
                    this.self.updateLocation(id);
                },
            },
            beforeDestroy: function() {
                this.map.destroy();
                console.log("Destroyed!");
            }
        });
    });
</script>