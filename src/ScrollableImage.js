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
                  //url: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
                  url: 'https://imgs.xkcd.com/comics/online_communities.png',
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