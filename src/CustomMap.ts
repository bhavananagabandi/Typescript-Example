export interface MarkerDetails {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
}

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0,
      },
    });
  }

  addMarker(markerDetails: MarkerDetails): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: markerDetails.location.lat,
        lng: markerDetails.location.lng,
      },
    });

    marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: markerDetails.markerContent(),
      });

      infoWindow.open(this.googleMap, marker);
    });
  }
}
