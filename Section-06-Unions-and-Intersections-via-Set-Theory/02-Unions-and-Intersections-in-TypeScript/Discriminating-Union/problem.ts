export {}

type LocationState = {
  state: "Loading" | "Success" | "Error";
  coords?: { lat: number; lon: number };
  error?: { message: string };
};

function printLocation(location: LocationState) {
  switch (location.state) {
    case "Loading":
      console.log(location.state);
      break;
    case "Success":
      console.log(location.coords.lat, location.coords.lon);
      break;
    case "Error":
      console.log(location.error.message);
      break;
  }
}
