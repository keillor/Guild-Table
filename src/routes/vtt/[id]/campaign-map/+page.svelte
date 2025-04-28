<script lang="ts">
  import { type LatLngExpression, type LatLngBoundsExpression, map } from 'leaflet';
  import Leaflet from '$lib/components/leaflet.svelte';
	import { init } from '@milkdown/kit/core';

  const { character, allCharacters, campaign} = $props();
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
      return {options: {
          title: `${char.name} Custom Marker`,
          icon: L.icon({
            iconUrl: `https://xkosdyzaaquclhzewzgh.supabase.co/storage/v1/object/public/character-avatars//${char._id}`,
            iconSize: [40, 40],
            iconAnchor: [1, 50],
            popupAnchor: [1, -34],
            autoPan: true
          }),
          draggable: true,
        },
        coordinates: initialCoordinates
      }
    } else {
      return {options: {
          title: `${char.name} Custom Marker`,
          icon: L.icon({
            iconUrl: `https://xkosdyzaaquclhzewzgh.supabase.co/storage/v1/object/public/character-avatars//${char._id}`,
            iconSize: [40, 40],
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
</script>

<div class="w-full h-full">
  <Leaflet view={initialView} zoom={initialZoom} customImage={customImageUrl} {customImageBounds} {allMarkers} {character} {initialCoordinates}/>
</div>