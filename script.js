document.addEventListener('DOMContentLoaded', function() {
    const selectedDateInput = document.getElementById('selectedDate');
    const slotsContainer = document.getElementById('slotsContainer');
    const bookSlotsButton = document.getElementById('bookSlotsButton');

    let selectedSlots = [];

    selectedDateInput.addEventListener('change', loadSlots);
    bookSlotsButton.addEventListener('click', bookSelectedSlots);

    function loadSlots() {
        const selectedDate = selectedDateInput.value;
        if (!selectedDate) return;

        // Fetch slot availability from the backend
        fetch(`/api/slots?date=${selectedDate}`)
            .then(response => response.json())
            .then(data => {
                displaySlots(data.slots);
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

        const formData = {
            user_id: 'user_123',  // Replace with actual user ID
            module_id: 'module_456',  // Replace with actual module ID
            date: selectedDate,
            slots: selectedSlots
        };

        fetch('/api/book_slots', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Slots booked successfully');
                loadSlots();  // Reload slots to update the UI
            } else {
                alert(`Failed to book slots: ${data.message}`);
            }
        })
        .catch(error => {
            console.error('Error booking slots:', error);
            alert('An error occurred while booking the slots');
        });
    }
});
