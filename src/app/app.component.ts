import { Component } from '@angular/core';

import { EsriLoaderService } from 'angular-esri-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mapProperties: __esri.MapProperties = {
    basemap: 'dark-gray'
  };
  mapViewProperties: __esri.MapViewProperties = {
    center: [-95.369803, 29.760427],
    zoom: 8
  };
  map: __esri.Map;
  mapView: __esri.MapView;

  constructor(private esriLoader: EsriLoaderService) { }

  onMapInit(mapInfo: { map: __esri.Map, mapView: __esri.MapView }) {
    this.map = mapInfo.map;
    this.mapView = mapInfo.mapView;

    this.createFeatureLayer();
  }

  createFeatureLayer() {
    this.esriLoader.loadModules([
      'esri/layers/FeatureLayer',
      'esri/PopupTemplate',
      'esri/core/Collection',
      'esri/geometry/Point',
      'esri/renderers/SimpleRenderer',
      'esri/symbols/PictureMarkerSymbol'
    ]).then(([
      FeatureLayer,
      PopupTemplate,
      Collection,
      Point,
      SimpleRenderer,
      PictureMarkerSymbol
    ]) => {
      const graphics = [
        {
          geometry: new Point({
            y: 29.960427,
            x: -95.369803
          }),
          attributes: {
            title: 'Houston, Texas'
          }
        }];

      const pTemplate = new PopupTemplate({
        title: '{title}'
      });

      const renderer = new SimpleRenderer({
        symbol: new PictureMarkerSymbol({
          url: 'https://cdn3.iconfinder.com/data/icons/caps-hats/512/Detectives_Cap-256.png',
          width: '30px',
          height: '30px'
        })
      });

      const featureLayer = new FeatureLayer({
        fields: [
          {
            name: 'ObjectID',
            alias: 'ObjectID',
            type: 'oid'
          }, {
            name: 'type',
            alias: 'Type',
            type: 'string'
          }, {
            name: 'place',
            alias: 'Place',
            type: 'string'
          }],
        objectIdField: 'ObjectID',
        geometryType: 'point',
        spatialReference: { wkid: 4326 },
        source: graphics,
        popupTemplate: pTemplate,
        renderer: renderer
      });
      this.map.add(featureLayer);
    });
  }
}
