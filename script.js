document.addEventListener('DOMContentLoaded', function() {
    const selectedDateInput = document.getElementById('selectedDate');
    const slotsContainer = document.getElementById('slotsContainer');
    const bookSlotsButton = document.getElementById('bookSlotsButton');

    let selectedSlots = [];

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log('User signed in:', user);
        } else {
            console.log('No user signed in');
        }
    });

    selectedDateInput.addEventListener('change', loadSlots);
    bookSlotsButton.addEventListener('click', bookSelectedSlots);

    function loadSlots() {
        const selectedDate = selectedDateInput.value;
        if (!selectedDate) return;

        db.collection('slots').where('date', '==', selectedDate).get()
            .then(querySnapshot => {
                let slots = querySnapshot.docs.map(doc => doc.data());
                displaySlots(slots);
            })
            .catch(error => {
                console.error('Error fetching slots:', error);
            });
    }

    function displaySlots(slots) {
        slotsContainer.innerHTML = '';
        selectedSlots = [];

        slots.forEach(slot => {
            const slotElement = document.createElement('div');
            slotElement.classList.add('slot', slot.status);
            slotElement.textContent = slot.time;

            if (slot.status === 'available') {
                slotElement.dataset.time = slot.time;
                slotElement.addEventListener('click', () => selectSlot(slotElement));
            }

            slotsContainer.appendChild(slotElement);
        });
    }

    function selectSlot(slotElement) {
        if (slotElement.classList.contains('selected')) {
            slotElement.classList.remove('selected');
            selectedSlots = selectedSlots.filter(slot => slot !== slotElement.dataset.time);
        } else {
            if (selectedSlots.length >= 3) {
                alert('You can only select up to 3 slots.');
                return;
            }
            slotElement.classList.add('selected');
            selectedSlots.push(slotElement.dataset.time);
        }
    }

    function bookSelectedSlots() {
        const selectedDate = selectedDateInput.value;
        if (selectedSlots.length === 0) {
            alert('No slots selected.');
            return;
        }

        const user = firebase.auth().currentUser;
        if (!user) {
            alert('Please sign in to book slots.');
            return;
        }

        const formData = {
            user_id: user.uid,
            date: selectedDate,
            slots: selectedSlots
        };

        formData.slots.forEach(slot => {
            db.collection('slots').add({
                user_id: formData.user_id,
                date: formData.date,
                time: slot,
                status: 'booked'
            }).then(() => {
                alert('Slots booked successfully');
                loadSlots();
            }).catch(error => {
                console.error('Error booking slots:', error);
                alert('An error occurred while booking the slots');
            });
        });
    }
});
