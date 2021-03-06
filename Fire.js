import firebase from 'firebase';
class Fire {
    constructor() {
        this.init();
        this.observeAuth();
    }

    init = () => {
        firebase.initializeApp({
            apiKey: 'AIzaSyDVhBtsM1-3fAY1JOUccEk6S0euk5erX6s',
            authDomain: 'chatapp-97384.firebaseapp.com',
            databaseURL: 'https://chatapp-97384.firebaseio.com',
            projectId: 'chatapp-97384',
            storageBucket: 'chatapp-97384.appspot.com',
            messagingSenderId: '473664732575',
        })
    }

    observeAuth = () => {
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    }

    onAuthStateChanged = (user) => {
        if(!user) {
            try {
                firebase.auth().signInAnonymously();
            } catch ({ message }) {
                alert(message);
            }
        }
    }

    get ref() {
        return firebase.database().ref('messages');
    }

    on = callback => this.ref.limitToLast(20).on('child_added', snapshot => callback(this.parse(snapshot)));

    off = () => this.ref.off();

    parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;

        const timestamp = new Date(numberStamp);

        const message = {
            _id,
            timestamp,
            text,
            user,
        };

        return message;
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];
            
            const message = {
                text,
                user,
                timestamp: this.timestamp,
            };
            this.append(message)
        }
    };

    append = message => this.ref.push(message);

}

Fire.shared = new Fire();
export default Fire;