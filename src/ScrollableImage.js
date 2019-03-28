import React, { Component } from 'react';

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {getCenter} from 'ol/extent.js';
import ImageLayer from 'ol/layer/Image.js';
import Projection from 'ol/proj/Projection.js';
import Static from 'ol/source/ImageStatic.js';
import Draw from 'ol/interaction/Draw.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';

export class ScrollableImage extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            src : props.src,
            points : props.points,
        }
    }
    
    componentDidMount(){
        var extent = [0, 0, 1024, 968];
        var projection = new Projection({
          code: 'xkcd-image',
          units: 'pixels',
          extent: extent
        });

        var raster = new TileLayer({
          source: new OSM()
        });
    
        var source = new VectorSource({wrapX: false});
    
        var vector = new VectorLayer({
          source: source
        });

        var map = new Map({
            layers: [
              raster,
              new ImageLayer({
                source: new Static({
                  attributions: '© <a href="http://xkcd.com/license.html">xkcd</a>',
                  url: this.state.src,
                  projection: projection,
                  imageExtent: extent
                })
              }),
              vector
            ],
            target: 'map',
            view: new View({
              projection: projection,
              center: getCenter(extent),
              zoom: 0,
              maxZoom: 8
            })
        });

        var typeSelect = document.getElementById('type');

        var draw; // global so we can remove it later
        function addInteraction() {
            var value = typeSelect.value;
            if (value !== 'None') {
            draw = new Draw({
                source: source,
                type: typeSelect.value
            });
            map.addInteraction(draw);
            }
        }


        /**
         * Handle change event.
         */
        typeSelect.onchange = function() {
            map.removeInteraction(draw);
            addInteraction();
        };

        addInteraction();
    }

    static getDerivedStateFromProps(props, state){
        return null;
    }

    render() {
        return (
            <div>
                <h1>ScrollableImage: {this.props.name} </h1>
                <form>
                    <label>Geometry type &nbsp;</label>
                    <select id="type">
                        <option value="Point">Point</option>
                        <option value="LineString">LineString</option>
                        <option value="Polygon">Polygon</option>
                        <option value="Circle">Circle</option>
                        <option value="None">None</option>
                    </select>
                </form>
                <div id="map"></div>
            </div>
        )
    }
}