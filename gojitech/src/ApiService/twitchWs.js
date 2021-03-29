// Helper class to connect and subscribe to Twitch websockets
class TwitchWs {
    constructor(auth_token) {
        // this.connectToWs();
        this.auth_token = auth_token;
        this.connectTimeout = null;
        this.ws = null;
    }

    // Mapper Function for ws methods
    connectToWs = () => {
        this.ws = new WebSocket('wss://pubsub-edge.twitch.tv');
                
        this.ws.onopen = this.onOpen;
        
        this.ws.onerror = this.onError;
        
        this.ws.onclose = this.onClose;
        
        this.ws.onmessage = this.onMessage;
    }

    reconnectToWs = () => {
    // Using timeout to handle api limiting issue
        let self = this;
        clearTimeout(this.connectTimeout);
        this.connectTimeout = setTimeout(self.connectToWs(), 5000);
    }

    onError = () => {
        this.reconnectToWs()
    }

    onOpen = () => {
        console.log('Connected to Twitch WS');
        let self = this;
        this.subscribeToTopics([ 'channel-subscribe-events-v1.665059320' ])
    }

    onClose = () => {
        console.log('Connection to Twitch closed')
        clearTimeout(this.connectTimeout);
        this.connectToWs()
    }

    onMessage = (msg) => {
        console.log(msg, 'events msg')
    }

    // Pass topics - [array of topics] to listen 
    subscribeToTopics = (topics) => {
        console.log(topics)
        const subMsg = {
            "type": "LISTEN",
            "nonce": "jhggjhgjh",
            "data": {
              "topics": topics,
              "auth_token": this.auth_token
            }
        }
        console.log(subMsg)
        if(this.ws) {
            this.ws.send(JSON.stringify(subMsg));
        }
    }
}

const twitchInstance = new TwitchWs('ixv93daf44zjxvibyvv20p21wuityl');

export default twitchInstance;