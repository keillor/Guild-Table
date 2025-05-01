<script lang="ts">
  import { type LatLngExpression, type LatLngBoundsExpression, map } from 'leaflet';
  import Leaflet from '$lib/components/leaflet.svelte';
	import { init } from '@milkdown/kit/core';
  import { monsterAvatar } from '$lib/utilities/character/monster.ts';
	import { derived } from 'svelte/store';

  const { monsters, character, allCharacters, campaign, socket, monsterContainer, mapURL } = $props();
  console.log('Monsters:', monsters);

  let mapInformation = $derived.by(() => {
    let mapImage = $derived.by(() => {
      let image = new Image();
      image.src = mapURL;
      return {
        src: image.src,
        width: image.width,
        height: image.height
      }
    })

    let initialCoordinates: LatLngExpression = [0, 0];

    let southWestCorner: LatLngExpression = [0, 0];
    let northEastCorner: LatLngExpression = $derived([mapImage.width/2, mapImage.height/2]);

    let initialZoom: number = 2;
    let initialView: LatLngExpression = $derived([mapImage.width/4, mapImage.height/4]);
    let bounds: LatLngBoundsExpression = $derived([ southWestCorner, northEastCorner ]);

    return {
      url: mapImage.src,
      width: mapImage.width,
      height: mapImage.height,
      initialCoordinates: initialCoordinates,
      southWestCorner: southWestCorner,
      northEastCorner: northEastCorner,
      initialView: initialView,
      initialZoom: initialZoom,
      bounds: bounds
    }
  })

  console.log('Map Information:', mapInformation);

  /* let monsterCount = 0;
  
  let monsterMarkers = $derived.by(() => {
    return monsterContainer.map((monst) => {
      monsterCount++;
      return {
        id: monsterCount,
        type: 'monster',
        options: {
          title: `${monst.name} Marker`,
          icon: L.icon({
            iconUrl: monsterAvatar(monst.image),
            iconSize: [50, 50],
            iconAnchor: [1, 50],
            popupAnchor: [1, -34],
            autoPan: true
          }),
          draggable: true,
        },
        coordinates: mapInformation.initialCoordinates
      }
    })
  }) */

  let allMarkers = $state(allCharacters.map((char) => {
    if (char._id == character._id) { //User's own marker
      return {
        id: char._id,
        type: 'player',
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
        coordinates: mapInformation.initialCoordinates
      }
    } else {
      return {
        id: char._id,
        type: 'player',
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

  socket.on('moveMarker', (markerObject, markerType) => {
      allMarkers = allMarkers.map(marker => {
      if (marker.id === markerObject.id) {
        console.log('Marker moved:', markerObject);
        return { ...marker, coordinates: markerObject.coordinates };
      }
      return marker;
    })
  });

  socket.on('changeMap', (mapID) => {
   console.log('Map changed to:', mapInformation);
  })
</script>

<div class="w-full h-full">
  <Leaflet {mapInformation} {allMarkers} {character} {socket}/>
</div>