const form = document.getElementById('medicine-form');
const addBtn = document.getElementById('add-medicine-btn');
const calendarBody = document.querySelector('#calendar tbody');
const timeSlots = [
    '7-8 AM', '8-9 AM', '9-10 AM', '10-11 AM', 
    '12-1 PM', 
    '1-2 PM', '2-3 PM', '3-4 PM', '4-5 PM', '5-6 PM', 
    '6-7 PM', '7-8 PM', '8-9 PM', '9-10 PM'
];
let medicines = []; // To store medicines before displaying them

function generateCalendar() {
    calendarBody.innerHTML = ''; // Clear the calendar first
    timeSlots.forEach(timeSlot => {
        const row = document.createElement('tr');

        const timeCell = document.createElement('td');
        timeCell.textContent = timeSlot;
        timeCell.classList.add('p-4', 'border', 'border-gray-300', 'text-center');
        row.appendChild(timeCell);

        for (let i = 0; i < 7; i++) {
            const dayCell = document.createElement('td');
            dayCell.classList.add('p-4', 'border', 'border-gray-300', 'text-center');
            row.appendChild(dayCell);
        }

        calendarBody.appendChild(row);
    });

    // Now add all medicines to the calendar
    medicines.forEach(({ name, dayOfWeek, timeSlotIndex }) => {
        const row = calendarBody.rows[timeSlotIndex];
        const cell = row.cells[dayOfWeek];

        const medicineEntry = document.createElement('div');
        medicineEntry.classList.add('bg-gray-200', 'border', 'border-teal-500', 'rounded-lg', 'p-2', 'text-sm', 'text-gray-700', 'mt-2', 'relative', 'inline-block');

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.classList.add('bg-red-500', 'text-white', 'rounded-full', 'px-2', 'py-1', 'text-xs', 'absolute', 'top-0', 'right-0', 'transform', '-translate-x-2', '-translate-y-2');
        deleteBtn.onclick = () => cell.removeChild(medicineEntry);

        medicineEntry.appendChild(deleteBtn);
        medicineEntry.textContent = `${name} `;
        cell.appendChild(medicineEntry);
    });
}

function addMedicine() {
    const medicineName = document.getElementById('medicine-name').value;
    const medicineDate = new Date(document.getElementById('medicine-date').value);
    const medicineTime = document.getElementById('medicine-time').value;

    if (!medicineName || !medicineDate || !medicineTime) {
        alert("Please fill in all fields.");
        return;
    }

    const dayOfWeek = medicineDate.getDay();
    const timeSlotIndex = timeSlots.findIndex(slot => slot.startsWith(medicineTime.split(":")[0]));

    if (dayOfWeek >= 1 && dayOfWeek <= 7 && timeSlotIndex !== -1) {
        // Store the medicine data to be added later when calendar is generated
        medicines.push({ name: medicineName, dayOfWeek, timeSlotIndex });
        
        // Show a success popup
        alert(`${medicineName} has been added.`);
        
        // Clear the form fields
        form.reset();
    } else {
        alert("Invalid time or day.");
    }
}

addBtn.addEventListener('click', addMedicine);

// Create a button to generate the calendar after all medicines are added
const createCalendarBtn = document.getElementById('create-calendar-btn');
createCalendarBtn.onclick = generateCalendar;

generateCalendar(); // Generate empty calendar initially
