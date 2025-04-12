<script lang="ts">
  import { onDestroy, onMount, setContext } from 'svelte';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';

  export let bounds: L.LatLngBoundsExpression | undefined = undefined;
  export let view: L.LatLngExpression | undefined = undefined;
  export let zoom: number | undefined = undefined;

  let map: L.Map | undefined;
  let mapElement: HTMLElement;

  onMount(() => {
    map = L.map(mapElement);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    if (!bounds && (!view || !zoom)) {
      throw new Error('Either bounds or view and zoom must be provided');
    }
  });

  onDestroy(() => {
    map?.remove();
    map = undefined
  })

  setContext('map', {
    getMap: () => map
  });

  $: if (map) {
    if (bounds) {
      map.fitBounds(bounds);
    } else if (view && zoom) {
      map.setView(view, zoom);
    }
  }
</script>

<div class="w-full h-full" bind:this={mapElement}>
  <slot/>
</div>