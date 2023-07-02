import React, { Component } from "react";
// const log = (...args) => console.log.apply(null, ["GoogleMap -->", ...args]);
const log = (...args: any[]) => console.log("GoogleMap -->", ...args);

interface Props {
  lat: number;
  lng: number;
  zoom: number;
  title: string;
  type: string;
  markerReady: boolean;
}

export class GoogleMap extends Component<Props> {
  mapRef = React.createRef<HTMLDivElement>();
  theMap: google.maps.Map | null = null;

  shouldComponentUpdate(nextProps: Props) {
    log("shouldComponentUpdate >>>>");
    // log("this.props:", this.props);
    // log("this.state:", this.state);
    // log("nextState:", nextState);
    // log("nextProps:", nextProps);
    // log("<<<< shouldComponentUpdate");
    const map = this.theMap as google.maps.Map;

    if (nextProps.markerReady === true) {
      this.addMarker(nextProps.title, nextProps.type);
    }
    if (nextProps.lat !== this.props.lat || nextProps.lng !== this.props.lng) {
      map.setCenter({ lat: nextProps.lat, lng: nextProps.lng });
    }
    if (this.props.zoom !== nextProps.zoom) {
      map.setZoom(nextProps.zoom);
    }

    return false;
  }

  addMarker(title:string, type:string) {
    const map = this.theMap as google.maps.Map;
    const marker = new google.maps.Marker({
      position: map.getCenter(),
      map,
      title
    });
    const infoWindow = new google.maps.InfoWindow({
      content: `
      <div style="text-align:center">
        <h2>${title}</h2>
        <h3>Type: ${type}</h3>
        <br/>
        <img src="https://picsum.photos/125/85?r=${Math.random()}"/>
        <br/>
      </div>`
    });
    marker.addListener("click", function () {
      infoWindow.open(map, marker);
    });
  }

  componentDidMount() {
    // log(this.mapRef);
    this.theMap = new google.maps.Map(this.mapRef.current as HTMLDivElement, {
      center: { lat: this.props.lat, lng: this.props.lng },
      zoom: 8,
    });
  }

  render() {
    return <div ref={this.mapRef} className="map-box" />;
  }
}
