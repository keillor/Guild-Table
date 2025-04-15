<script lang="ts">
  import type { LatLngExpression, LatLngBoundsExpression } from 'leaflet';
  import Leaflet from '$lib/components/leaflet.svelte';
  import customImage from '$lib/assets/images/enchanted_forest.jpg';

  const initialView: LatLngExpression = [0, 0];
  const initialZoom: number = 2;
  const customImageUrl = customImage;
  const customImageBounds: LatLngBoundsExpression = [
    [0, 0], // Southwest corner (latitude, longitude)
    [1000, 1000] // Northeast corner (latitude, longitude)
  ];
</script>

<div class="w-full h-full">
  <Leaflet view={initialView} zoom={initialZoom} customImage={customImageUrl} customImageBounds={customImageBounds}/>
</div>