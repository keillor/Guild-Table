<script lang="ts">
  import { type LatLngExpression, type LatLngBoundsExpression, map } from 'leaflet';
  import Leaflet from '$lib/components/leaflet.svelte';

  const mapImage = new Image();
  mapImage.src = 'https://th.bing.com/th/id/OIP.O8K_5c54_Itan5ccfeaUXwHaHa?rs=1&pid=ImgDetMain'
  const imageWidth = mapImage.width;
  const imageHeight = mapImage.height;

  const southWestCorner: LatLngExpression = [0, 0];
  const northEastCorner: LatLngExpression = [imageWidth/2, imageHeight/2];

  const initialView: LatLngExpression = [imageWidth/4, imageHeight/4];
  const initialZoom: number = 2;
  const customImageUrl = mapImage.src
  const customImageBounds: LatLngBoundsExpression = [ southWestCorner, northEastCorner ];

  const { character } = $props();

  const markerOptions= {
    title: 'Custom Marker',
    icon: L.icon({
      iconUrl: 'https://xkosdyzaaquclhzewzgh.supabase.co/storage/v1/object/public/character-avatars//68028fa05750fa22e6ac3d32',
      iconSize: [40, 40],
      iconAnchor: [1, 50],
      popupAnchor: [1, -34],
      shadowUrl: 'https://th.bing.com/th/id/OIP.1vGduXYuY44G_z4_rofPxQHaKq?rs=1&pid=ImgDetMain',
      shadowSize: [41, 41],
      autoPan: true

    }),
    draggable: true,

  }
</script>

<div class="w-full h-full">
  <Leaflet view={initialView} zoom={initialZoom} customImage={customImageUrl} customImageBounds={customImageBounds} {markerOptions} {character}/>
</div>