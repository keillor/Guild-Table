<script>
	import { page } from '$app/state';
	import { GuildSocket } from '$lib/socket/SocketIOTools.js';

    let lastMessage = $state('');
    let text = $state('');

    const { data } = $props();
    const access_token = data.session?.access_token

    // http://localhost:5173/socket/6802904e5750fa22e6ac3d33
    // http://localhost:5001/socket/6802904e5750fa22e6ac3d33
    const socket = new GuildSocket('http://localhost:5001', access_token, page.params.id);
    socket.on('message', (msg) => {
        lastMessage = msg;
    })
</script>

<span>
    last message:
    <span>{lastMessage}</span>
</span>

<form onsubmit={(e) =>{
    e.preventDefault();
    socket.sendMessage('message', text)
    text = '';
}}>
    <input bind:value={text}>
</form>