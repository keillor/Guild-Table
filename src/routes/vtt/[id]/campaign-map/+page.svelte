<script lang="ts">
  import { type LatLngExpression, type LatLngBoundsExpression, map } from 'leaflet';
  import Leaflet from '$lib/components/leaflet.svelte';
	import { init } from '@milkdown/kit/core';

  const { monsters, character, allCharacters, campaign, socket } = $props();
  console.log('Monsters:', monsters);
  const mapURL = `https://xkosdyzaaquclhzewzgh.supabase.co/storage/v1/object/public/character-avatars//${campaign.mapIds[0].id}`

  const mapImage = new Image();
  mapImage.src = mapURL
  const imageWidth = mapImage.width;
  const imageHeight = mapImage.height;

  const initialCoordinates: LatLngExpression = [0,0];

  const southWestCorner: LatLngExpression = [0, 0];
  const northEastCorner: LatLngExpression = [imageWidth/2, imageHeight/2];

  const initialView: LatLngExpression = [imageWidth/4, imageHeight/4];
  const initialZoom: number = 2;
  const customImageUrl = mapImage.src
  const customImageBounds: LatLngBoundsExpression = [ southWestCorner, northEastCorner ];

  let allMarkers = $state(allCharacters.map((char) => {
    if (char._id == character._id) { //User's own marker
      return {
        id: char._id,
        options: {
          title: `${char.name} Marker`,
          icon: L.icon({
            iconUrl: `https://xkosdyzaaquclhzewzgh.supabase.co/storage/v1/object/public/character-avatars//${char._id}`,
            iconSize: [50, 50],
            iconAnchor: [1, 50],
            popupAnchor: [1, -34],
            autoPan: true
          }),
          draggable: true,
        },
        coordinates: initialCoordinates
      }
    } else {
      return {
        id: char._id,
        options: {
          title: `${char.name} Marker`,
          icon: L.icon({
            iconUrl: `https://xkosdyzaaquclhzewzgh.supabase.co/storage/v1/object/public/character-avatars//${char._id}`,
            iconSize: [50, 50],
            iconAnchor: [1, 50],
            popupAnchor: [1, -34],
            autoPan: true
          }),
          draggable: false,
        },
        coordinates: [50, 60]
      }
    }
  }))

  socket.on('moveMarker', (markerObject) => {
    allMarkers = allMarkers.map(marker => {
      if (marker.id === markerObject.id) {
        console.log('Marker moved:', markerObject);
        return { ...marker, coordinates: markerObject.coordinates };
      }
      return marker;
    });
  });

  function changeMarkerPosition(markerId: string) {
    const randomCoordinates: LatLngExpression = [
      Math.random() * (imageWidth / 2),
      Math.random() * (imageHeight / 2)
    ];

    allMarkers = allMarkers.map(marker => {
      if (marker.id === markerId) {
        return { ...marker, coordinates: randomCoordinates };
      }
      return marker;
    });
  }
</script>

<div class="w-full h-full">
  <button onclick={() => {changeMarkerPosition(character._id)}}>Change Coordinates</button>
  <Leaflet view={initialView} zoom={initialZoom} customImage={customImageUrl} {customImageBounds} {allMarkers} {character} {initialCoordinates} {socket}/>
</div>