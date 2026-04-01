export {};

type LoadingState = {
  state: "Loading";
};

type SuccessState = {
  state: "Success";
  coords: { lat: number; lon: number };
};

type ErrorState = {
  state: "Error";
  error: { message: string };
};

type LocationState = LoadingState | SuccessState | ErrorState;

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

  // downside
  if (typeof location.state === "bigint") console.log(location);
  /*
  location.state on hover: "Loading" | "Success" | "Error"
  but in intellisense: "bigint" | "boolean" | function | number and more...
  */
}
