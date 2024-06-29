fetch('/key/firebase_key.json')
    .then(response => response.json())
    .then(config => {
        // Initialize Firebase
        firebase.initializeApp(config);
    })
    .catch(error => {
        console.error('Error loading Firebase config:', error);
    });
