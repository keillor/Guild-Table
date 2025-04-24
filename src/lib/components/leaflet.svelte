<script lang="ts">
  import { onDestroy, onMount, setContext } from 'svelte';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import { Heart } from "lucide-svelte";
	import { characterSchema } from '../../routes/(main)/character/[id]/schema';

  let map: L.Map | undefined;
  let mapElement: HTMLDivElement;
  let bounds: L.LatLngBoundsExpression | undefined = undefined;

  const { view, 
          zoom, 
          character,
          customImage, 
          customImageBounds, 
          markerOptions } = $props();

  const mapOptions = {
    center: view || [0, 0],
    zoom: zoom || 2,
    maxZoom: 19,
    minZoom: 2,
    maxBounds: bounds || undefined,
    scrollWheelZoom: true,
    zoomControl: true,
    attributionControl: true
  };

  onMount(() => {
    map = L.map(mapElement);

    if (customImage && customImageBounds) {
      // Use custom image overlay
      const imageOverlay = L.imageOverlay(customImage, customImageBounds).addTo(map);

      // Fit the map to the image bounds
      map.fitBounds(customImageBounds);

      // Set maxBounds to prevent panning/zooming out of the image
      map.setMaxBounds(customImageBounds);
    } else {
      // Use default tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      if (!bounds && (!view || !zoom)) {
        throw new Error('Either bounds or view and zoom must be provided');
      }
    }

    const customMarker = L.marker([0, 0], markerOptions).addTo(map).bindPopup('This is your character popup');

    customMarker.on("moveend", function (event) {
    const marker = event.target;
    const position = marker.getLatLng();
    console.log(`${character._id}`, position);
  })
  });

  onDestroy(() => {
    map?.remove();
    map = undefined;
  });

  setContext('map', {
    getMap: () => map
  });

  $effect: if (map) {
    if (bounds) {
      map.fitBounds(bounds);
    } else if (view && zoom) {
      map.setView(view, zoom);
    }
  }

  
</script>

<div class="w-full h-full z-0" bind:this={mapElement}>
  <slot/>
</div>