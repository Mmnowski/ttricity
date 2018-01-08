import firebase from "firebase/index";

export function createPlace(description, img, lat, lon, name) {
  return (dispatch) => {
    firebase.database().ref(`/places/`)
      .push({ description: description, img: img, lat: lat, lon: lon, name: name })
      .catch((e) => console.log(e));
  };
}