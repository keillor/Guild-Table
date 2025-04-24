<script>
    import { io } from 'socket.io-client';
	import { onMount } from 'svelte';

    let lastMessage = $state('');

    let authToken = '';
    authToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('sb-xkosdyzaaquclhzewzgh-auth-token='))
    ?.split('=')[1];

    const socket = io('localhost:5000', {
        auth: {
            token: authToken
        }
    });

    socket.on('message', (msg) => {
        lastMessage = msg;
    })
</script>


<span>last message:
    <span>{lastMessage}</span>
</span>