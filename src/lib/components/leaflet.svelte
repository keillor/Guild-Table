<script lang="ts">
  import { onDestroy, onMount, setContext } from 'svelte';
  import L, { marker } from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import { Button } from '$lib/components/ui/button/index.js';
	import { characterSchema } from '../../routes/(main)/character/[id]/schema';

  let map: L.Map | undefined;
  let mapElement: HTMLDivElement;
  let bounds: L.LatLngBoundsExpression | undefined = undefined;
  let markerLayer: L.LayerGroup | undefined = undefined;
  let mapLayer: L.LayerGroup | undefined = undefined;
  let imageOverlay: L.ImageOverlay | undefined;

  const { socket,
          character,
          allMarkers,
          monsterMarkers,
          mapInformation } = $props();
  

  const mapOptions = $derived({
    center: mapInformation.initialCoordinates || [0, 0],
    zoom: mapInformation.initialZoom || 2,
    maxZoom: 19,
    minZoom: 2,
    maxBounds: mapInformation.bounds || undefined,
    scrollWheelZoom: true,
    zoomControl: true,
    attributionControl: true
  })

  onMount(() => {
    map = L.map(mapElement, mapOptions);
    mapLayer = L.layerGroup().addTo(map);
    markerLayer = L.layerGroup().addTo(map);

    if (mapInformation.url && mapInformation.bounds) {
      updateImageOverlay();
    } else {
      // Use default tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      if (!bounds && (!mapInformation.initialView || !mapInformation.initialZoom)) {
        throw new Error('Either bounds or view and zoom must be provided');
      }
    }

    updateMarkers();
  });


  function updateImageOverlay() {
    console.log('Updating image overlay with custom image:', mapInformation.url);
    if (mapLayer) {
      mapLayer.clearLayers();
      imageOverlay = L.imageOverlay(mapInformation.url, mapInformation.bounds);
      imageOverlay.addTo(mapLayer);
    }
  }

  function updateMarkers() {
    if (markerLayer) {
      markerLayer.clearLayers();
      for (const marker of allMarkers) {
        const newMarker = L.marker(marker.coordinates, marker.options).bindPopup(`${marker.options.title} popup`);
        newMarker.on("moveend", function (event) {
          const markerEvent = event.target;
          const position = markerEvent.getLatLng();
          socket.moveMarker({
            id: marker.id,
            coordinates: position
          }, 'player');
        });
        newMarker.addTo(markerLayer);
      }
    }
  }

  // function updateMapOptions() {
  //   return {
  //     center: mapInformation.initialCoordinates || [0, 0],
  //     zoom: mapInformation.initialZoom || 2,
  //     maxZoom: 19,
  //     minZoom: 2,
  //     maxBounds: mapInformation.bounds || undefined,
  //     scrollWheelZoom: true,
  //     zoomControl: true,
  //     attributionControl: true
  //   };
  // }

  // $effect(() => {
  //   if (mapLayer && mapInformation.url && mapInformation.bounds) {
  //     updateImageOverlay();
  //   }
  // });

  $effect(() => {
    if (markerLayer && allMarkers) {
      updateMarkers();
    }
  })

  onDestroy(() => {
    map?.remove();
    map = undefined;
  });

  setContext('map', {
    getMap: () => map
  });

  socket.on('changeMap', (mapID) => {
  if (map) {
    map.remove(); // Properly destroy the existing map instance
    map = undefined; // Clear the reference to the old map
  }

  map = L.map(mapElement, mapOptions);
  mapLayer = L.layerGroup().addTo(map);
  markerLayer = L.layerGroup().addTo(map);

  if (mapInformation.url && mapInformation.bounds) {
    updateImageOverlay();
  } else {
    // Use default tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    if (!bounds && (!mapInformation.initialView || !mapInformation.initialZoom)) {
      throw new Error('Either bounds or view and zoom must be provided');
    }
  }

  updateMarkers();
});
</script>

<div class="w-full h-full z-0" bind:this={mapElement}>
  <slot/>
</div>