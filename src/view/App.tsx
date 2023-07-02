import React, { ChangeEvent, Component } from "react";
import { TopBar } from "./TopBar";
import { GoogleMap } from "./GMaps";
// const log = (...args) => console.log.apply(null, ["App -->", ...args]);
const log = (...args: any[]) => console.log("App -->", ...args);

interface State {
  lat: number;
  lng: number;
  zoom: number;
  title: string;
  type: string;
  markerReady: boolean;
}

export class App extends Component<object, State> {
  input = React.createRef<HTMLInputElement>();

  state = {
    lat: -34.397,
    lng: 150.644,
    zoom: 8,
    title: "",
    type: "",
    markerReady: false,
  };

  reposition = (event: React.MouseEvent<HTMLButtonElement>) => {
    const city = (event.target as HTMLElement).dataset.city;
    switch (city) {
      case "tel aviv":
        this.setState({ lat: 32.0042938, lng: 34.7615399 });
        break;
      case "london":
        this.setState({ lat: 51.528308, lng: -0.3817828 });
        break;
      case "paris":
        this.setState({ lat: 48.8587741, lng: 2.2069754 });
        break;
      default:
        alert("wrong city");
    }
  };
  updateZoom = (event: ChangeEvent) => {
    const z = (event.target as HTMLInputElement).value;
    // const z = (this.input.current as HTMLInputElement).value;
    // log({ z });
    // log("typeof z: ", typeof z);
    this.setState({ zoom: Number(z) }); // parseInt(zoom); // +zoom;
    // this.setState({ zoom: parseInt(z,10) }); // parseInt(zoom); // +zoom;
    // this.setState({ zoom: +z }); // parseInt(zoom); // +zoom;
  };

  locate_me = () => {
    log("position");
    if ("geolocation" in navigator) {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          log({ position });

          // const lat = position.coords.latitude;
          // const lng = position.coords.longitude;

          const { latitude: lat, longitude: lng } = position.coords;

          this.setState({ lat, lng, zoom: 18 });
        },
        (error) => {
          log(`ERROR(${error.code}): ${error.message}`);
        }
      );
    } else {
      alert("geolocation IS NOT available in your browser :(");
    }
  };

  // updateField = (event) => {
  //   log("title", event.target.value);
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  // };

  updateTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    log("title", event.target.value);
    this.setState({
      title: event.target.value
    });
  };

  updateType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    log("type", event.target.value);
    this.setState({
      type: event.target.value
    });
  };

  addMarker = () => {
    log("add_marker");
    log("ready? ", this.state.markerReady);
    this.setState({ markerReady: true }, () => {
      log("ready? ", this.state.markerReady);
      this.setState({ markerReady: false });
    });
    // this.setState({ marker_ready: false });
  };

  
  render() {
    log(this.state);
    return (
      <div className="app">
        <TopBar>
          <h1>Google Maps Example in React</h1>
        </TopBar>
        <div className="controls-box mb20">
          <span>City: &nbsp;</span>
          <button data-city="tel aviv" onClick={this.reposition}>
            Tel Aviv
          </button>
          <button data-city="paris" onClick={this.reposition}>
            Paris
          </button>
          <button data-city="london" onClick={this.reposition}>
            London
          </button>
          <span>Zoom: &nbsp;</span>
          <input
            ref={this.input}
            type="number"
            min="8"
            max="16"
            placeholder="8"
            onChange={this.updateZoom}
          /> 
          <button onClick={this.locate_me}>locate me</button>
        </div>
        <div className="controls-box mb20">
          <span>Title: &nbsp;</span>
          <input
            name="title"
            type="text"
            className="title-input"
            onChange={this.updateTitle}
          />
          <select
            name="type"
            className="type-selector"
            onChange={this.updateType}
          >
            <option value="None">Type:</option>
            <option value="Barbecue">Barbecue </option>
            <option value="Buffet">Buffet </option>
            <option value="Brasserie">Brasserie</option>
            <option value="Cafe">Cafe</option>
            <option value="Casual">Casual</option>
            <option value="Chef">Chef</option>
            <option value="Diner">Diner</option>
            <option value="Ethnic">Ethnic</option>
            <option value="Fast food">Fast food</option>
            <option value="Kosher">Kosher</option>
            <option value="Pub">Pub</option>
          </select>
          <button onClick={this.addMarker}>Add Marker</button>
        </div>
        <GoogleMap {...this.state} />
        {/* <GoogleMap
          lat={this.state.lat}
          lng={this.state.lng}
          zoom={this.state.zoom}
          title={this.state.title}
          type={this.state.type}
          markerReady={this.state.markerReady}
        /> */}
      
      </div>
    );
  }
}
