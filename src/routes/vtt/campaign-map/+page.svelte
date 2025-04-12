<script lang="ts">
  import type { LatLngExpression } from 'leaflet';
  import Leaflet from '$lib/components/leaflet.svelte';

  const initialView: LatLngExpression = [0, 0];
</script>

<div>
  <Leaflet />
</div>