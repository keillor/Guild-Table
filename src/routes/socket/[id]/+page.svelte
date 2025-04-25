<script>
	import { page } from '$app/state';
	import { GuildSocket } from '$lib/socket/SocketIOTools.js';

    let lastMessage = $state('');
    let text = $state('');

    const { data } = $props();
    const access_token = data.session?.access_token

    const socket = new GuildSocket('http://localhost:5000', access_token, page.params.id);
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