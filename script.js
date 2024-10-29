// URL base del API
const API_URL = 'http://localhost:3000';

// Función para cargar y mostrar la lista de animales y sus vacunas
async function loadAnimals() {
    try {
        const response = await fetch(`${API_URL}/animales`);
        const animals = await response.json();
        
        // Genera el HTML para cada animal y sus vacunas
        const animalListElement = document.getElementById('animalesList');
        animalListElement.innerHTML = animals.map(animal => `
            <div>
                <h3>${animal.animalNombre}</h3>
                <p>Vacunas: ${animal.vacunaNombre || 'Ninguna'}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error al cargar los animales:', error);
    }
}

// Función para agregar un nuevo animal
async function addAnimal(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const especie = document.getElementById('especie').value;
    const raza = document.getElementById('raza').value;
    const edad = document.getElementById('edad').value;

    try {
        await fetch(`${API_URL}/animales`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, especie, raza, edad })
        });
        
        // Limpiar el formulario y recargar la lista de animales
        document.getElementById('animalForm').reset();
        loadAnimals();
    } catch (error) {
        console.error('Error al agregar el animal:', error);
    }
}

// Event listener para el formulario de agregar animal
document.getElementById('animalForm').addEventListener('submit', addAnimal);

// Llamar a la función de carga al inicio
document.addEventListener('DOMContentLoaded', loadAnimals);
