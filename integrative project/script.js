// Sample data for Barranquilla tours
let tours = [{
    id: 1,
    title: 'Tour Carnaval de Barranquilla',
    location: 'Centro Histórico',
    price: 75000,
    duration: 4,
    description: 'Descubre la historia y tradiciones detrás de la fiesta más grande de Colombia. Incluye visita al Museo del Carnaval y explicación de las danzas típicas.',
    imageUrl: 'https://placehold.co/600x400?text=Carnaval+de+Barranquilla',
    type: 'cultural'
}, {
    id: 2,
    title: 'Tour Gastronómico Caribe',
    location: 'Mercado Público',
    price: 90000,
    duration: 3,
    description: 'Degustación de platos típicos como el arroz de lisa, sancocho de guandú y postres como el enyucado y la alegría. Incluye 5 muestras gastronómicas.',
    imageUrl: 'https://placehold.co/600x400?text=Gastronomía+Caribe',
    type: 'gastronomic'
}, {
    id: 3,
    title: 'Tour Histórico por el Centro',
    location: 'Centro de Barranquilla',
    price: 50000,
    duration: 2.5,
    description: 'Recorrido por los edificios históricos más importantes, incluyendo el Teatro Amira de la Rosa, la Catedral Metropolitana y la Antigua Aduana.',
    imageUrl: 'https://placehold.co/600x400?text=Centro+Histórico',
    type: 'cultural'
}, {
    id: 4,
    title: 'Malecón del Río',
    location: 'Vía 40',
    price: 30000,
    duration: 2,
    description: 'Paseo por el renovado malecón del Río Magdalena con paradas en los miradores y explicación de la importancia del río para la ciudad.',
    imageUrl: 'https://placehold.co/600x400?text=Malecón+del+Río',
    type: 'cultural'
}, {
    id: 5,
    title: 'Tour de la Cumbia',
    location: 'Barrio Abajo',
    price: 60000,
    duration: 3,
    description: 'Recorrido por los lugares donde nació la cumbia con demostración de bailes típicos y explicación de los instrumentos musicales tradicionales.',
    imageUrl: 'https://placehold.co/600x400?text=Tour+de+la+Cumbia',
    type: 'cultural'
}, {
    id: 6,
    title: 'Degustación de Café Caribe',
    location: 'Zona Norte',
    price: 45000,
    duration: 1.5,
    description: 'Experiencia sensorial para conocer los sabores únicos del café producido en la región Caribe con catación guiada por expertos.',
    imageUrl: 'https://placehold.co/600x400?text=Café+Caribe',
    type: 'gastronomic'
}];

// Elementos del DOM
const toursContainer = document.getElementById('toursContainer');
const crudForm = document.getElementById('crudForm');
const tourForm = document.getElementById('tourForm');
const addTourBtn = document.getElementById('addTourBtn');
const addTourMobileBtn = document.getElementById('addTourMobileBtn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const cancelBtn = document.getElementById('cancelBtn');
const mediaContainer = document.getElementById('mediaContainer');
const mediaInput = document.getElementById('mediaInput');
const selectedMedia = document.getElementById('selectedMedia');
const mediaPlaceholder = document.getElementById('mediaPlaceholder');
const filterButtons = document.querySelectorAll('#filtros button');

// Campos del formulario
const tourId = document.getElementById('tourId');
const title = document.getElementById('title');
const locationEl = document.getElementById('location');
const price = document.getElementById('price');
const duration = document.getElementById('duration');
const description = document.getElementById('description');

// Modo del formulario (add/edit)
let currentMode = 'add';
let selectedTourImage = '';

// **Nuevas Variables para el Login y Perfiles**
const loginBtn = document.getElementById('loginBtn');
const loginMobileBtn = document.getElementById('loginMobileBtn');
const authOverlay = document.getElementById('auth-overlay');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');
const userProfileBtn = document.getElementById('user-profile-btn');
const logoutBtn = document.getElementById('logoutBtn');
const addTourBtns = document.querySelectorAll('.admin-only'); // Para ocultar/mostrar
const interesOverlay = document.getElementById('interes-overlay');
const interesForm = document.getElementById('interes-form');
const userDropdownMenu = document.getElementById('user-dropdown-menu');

// Estado del usuario
let currentUser = null; // Puede ser 'admin' o 'user'

// Funciones de control de la UI
function updateUI() {
    if (currentUser === 'admin') {
        if (loginBtn) loginBtn.style.display = 'none';
        if (loginMobileBtn) loginMobileBtn.style.display = 'none';
        if (userProfileBtn) userProfileBtn.style.display = 'block';
        addTourBtns.forEach(btn => btn.style.display = 'block');
    } else if (currentUser === 'user') {
        if (loginBtn) loginBtn.style.display = 'none';
        if (loginMobileBtn) loginMobileBtn.style.display = 'none';
        if (userProfileBtn) userProfileBtn.style.display = 'block';
        addTourBtns.forEach(btn => btn.style.display = 'none');
    } else {
        if (loginBtn) loginBtn.style.display = 'block';
        if (loginMobileBtn) loginMobileBtn.style.display = 'block';
        if (userProfileBtn) userProfileBtn.style.display = 'none';
        addTourBtns.forEach(btn => btn.style.display = 'none');
    }
}

// Renderizar todos los tours
function renderTours(filterType = 'all') {
    toursContainer.innerHTML = '';
    const filteredTours = filterType === 'all' ?
        tours :
        tours.filter(tour => tour.type === filterType);

    filteredTours.forEach(tour => {
        const tourCard = document.createElement('div');
        tourCard.setAttribute('id', `tour-${tour.id}`);
        tourCard.setAttribute('data-type', tour.type);

        const cardImageContainer = document.createElement('div');
        const img = document.createElement('img');
        img.src = tour.imageUrl;
        img.alt = `${tour.title} en ${tour.location}`;
        cardImageContainer.appendChild(img);

        const typeSpanContainer = document.createElement('div');
        typeSpanContainer.className = 'type-label';
        const typeSpan = document.createElement('span');
        typeSpan.textContent = tour.type === 'cultural' ? 'Cultural' : 'Gastronómico';
        typeSpanContainer.appendChild(typeSpan);
        cardImageContainer.appendChild(typeSpanContainer);

        const btnContainer = document.createElement('div');
        btnContainer.className = 'admin-only'; // Solo visible para admins
        const editBtn = document.createElement('button');
        editBtn.setAttribute('id', `edit-btn-${tour.id}`);
        editBtn.innerHTML = '<i class="fas fa-edit" style="color: blue;"></i>';
        btnContainer.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('id', `delete-btn-${tour.id}`);
        deleteBtn.innerHTML = '<i class="fas fa-trash" style="color: red;"></i>';
        btnContainer.appendChild(deleteBtn);
        cardImageContainer.appendChild(btnContainer);

        const cardContent = document.createElement('div');
        const titleEl = document.createElement('h3');
        titleEl.textContent = tour.title;
        cardContent.appendChild(titleEl);

        const locationDiv = document.createElement('div');
        const locationIcon = document.createElement('i');
        locationIcon.className = 'fas fa-map-marker-alt';
        locationDiv.appendChild(locationIcon);
        const locationSpan = document.createElement('span');
        locationSpan.textContent = tour.location;
        locationDiv.appendChild(locationSpan);
        cardContent.appendChild(locationDiv);

        const detailsDiv = document.createElement('div');
        const clockIcon = document.createElement('i');
        clockIcon.className = 'far fa-clock';
        detailsDiv.appendChild(clockIcon);
        const durationSpan = document.createElement('span');
        durationSpan.textContent = `${tour.duration} horas`;
        detailsDiv.appendChild(durationSpan);
        const separatorSpan = document.createElement('span');
        separatorSpan.textContent = '•';
        detailsDiv.appendChild(separatorSpan);
        const dollarIcon = document.createElement('i');
        dollarIcon.className = 'fas fa-dollar-sign';
        detailsDiv.appendChild(dollarIcon);
        const priceSpan = document.createElement('span');
        priceSpan.textContent = tour.price.toLocaleString('es-CO', {
            style: 'currency',
            currency: 'COP',
            maximumFractionDigits: 0
        });
        detailsDiv.appendChild(priceSpan);
        cardContent.appendChild(detailsDiv);

        const descriptionP = document.createElement('p');
        descriptionP.textContent = tour.description;
        cardContent.appendChild(descriptionP);

        const buttonContainer = document.createElement('div');
        const interestBtn = document.createElement('button');
        interestBtn.setAttribute('id', `interes-btn-${tour.id}`);
        interestBtn.textContent = 'Me interesa';

        interestBtn.addEventListener('click', () => {
            if (currentUser) {
                // Si el usuario está logueado, mostrar el formulario de "Me interesa"
                interesOverlay.style.display = 'flex';
                interesForm.reset();
            } else {
                // Si no está logueado, pedirle que inicie sesión
                alert('Por favor, inicia sesión para mostrar tu interés en este tour.');
                authOverlay.style.display = 'flex';
                loginForm.classList.add('active');
                registerForm.classList.remove('active');
            }
        });

        buttonContainer.appendChild(interestBtn);

        tourCard.appendChild(cardImageContainer);
        tourCard.appendChild(cardContent);
        tourCard.appendChild(buttonContainer);

        toursContainer.appendChild(tourCard);

        // Agregamos listeners a los botones solo si el usuario es admin
        editBtn.addEventListener('click', () => {
            editTour(tour.id);
        });

        deleteBtn.addEventListener('click', () => {
            deleteTour(tour.id);
        });
    });

    updateUI(); // Asegura que los botones se muestren/oculten al renderizar
}

// Configurar todos los event listeners
function setupEventListeners() {
    if (addTourBtn) {
        addTourBtn.addEventListener('click', () => {
            currentMode = 'add';
            showForm();
        });
    }

    if (addTourMobileBtn) {
        addTourMobileBtn.addEventListener('click', () => {
            currentMode = 'add';
            showForm();
            mobileMenu.style.display = 'none'; // Ocultar el menú móvil al abrir el formulario
        });
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', hideForm);
    }

    if (tourForm) {
        tourForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveTour();
        });
    }

    if (mediaContainer) {
        mediaContainer.addEventListener('click', () => {
            mediaInput.click();
        });
    }

    if (mediaInput) {
        mediaInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    selectedTourImage = event.target.result;
                    mediaPlaceholder.style.display = 'none';
                    selectedMedia.style.display = 'block';
                    selectedMedia.src = selectedTourImage;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Agregar el listener a los botones de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });
}

// Función para manejar los clics en los botones de filtro
function handleFilterClick(e) {
    filterButtons.forEach(button => button.classList.remove('active'));
    e.target.classList.add('active');
    let filterType = 'all';
    if (e.target.id === 'filterCultural') {
        filterType = 'cultural';
    } else if (e.target.id === 'filterGastronomic') {
        filterType = 'gastronomic';
    }
    renderTours(filterType);
}

// Mostrar formulario en modo agregar o editar
function showForm() {
    mediaPlaceholder.style.display = 'block';
    selectedMedia.style.display = 'none';
    selectedMedia.src = '';
    selectedTourImage = '';

    if (currentMode === 'add') {
        tourId.value = '';
        title.value = '';
        locationEl.value = '';
        price.value = '';
        duration.value = '';
        description.value = '';
        document.getElementById('saveBtn').textContent = 'Guardar Tour';
    }

    crudForm.style.display = 'block';
    crudForm.scrollIntoView({
        behavior: 'smooth'
    });
}

// Ocultar formulario
function hideForm() {
    crudForm.style.display = 'none';
}

// Guardar tour (agregar o editar)
function saveTour() {
    const tourData = {
        title: title.value,
        location: locationEl.value,
        price: parseFloat(price.value),
        duration: parseFloat(duration.value),
        description: description.value,
        imageUrl: selectedTourImage || 'https://placehold.co/600x400?text=Tour+Barranquilla',
        type: 'cultural'
    };

    if (currentMode === 'add') {
        tourData.id = tours.length > 0 ? Math.max(...tours.map(t => t.id)) + 1 : 1;
        tours.push(tourData);
    } else {
        const id = parseInt(tourId.value);
        const index = tours.findIndex(t => t.id === id);
        if (index !== -1) {
            tourData.id = id;
            tours[index] = tourData;
        }
    }

    renderTours();
    hideForm();
}

// Editar tour
function editTour(id) {
    const tour = tours.find(t => t.id === id);
    if (tour) {
        currentMode = 'edit';
        tourId.value = tour.id;
        title.value = tour.title;
        locationEl.value = tour.location;
        price.value = tour.price;
        duration.value = tour.duration;
        description.value = tour.description;

        if (tour.imageUrl) {
            selectedTourImage = tour.imageUrl;
            mediaPlaceholder.style.display = 'none';
            selectedMedia.style.display = 'block';
            selectedMedia.src = tour.imageUrl;
        }

        document.getElementById('saveBtn').textContent = 'Actualizar Tour';
        showForm();
    }
}

// Borrar tour
function deleteTour(id) {
    tours = tours.filter(t => t.id !== id);
    renderTours();
}

// **Función para manejar el Login y Registro**
function setupAuthListeners() {
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            authOverlay.style.display = 'flex';
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        });
    }

    if (loginMobileBtn) {
        loginMobileBtn.addEventListener('click', () => {
            authOverlay.style.display = 'flex';
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
            mobileMenu.style.display = 'none';
        });
    }

    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.remove('active');
            registerForm.classList.add('active');
        });
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            registerForm.classList.remove('active');
            loginForm.classList.add('active');
        });
    }

    // Ocultar el modal al hacer clic fuera del formulario
    if (authOverlay) {
        authOverlay.addEventListener('click', (e) => {
            if (e.target.id === 'auth-overlay') {
                authOverlay.style.display = 'none';
            }
        });
    }

    if (interesOverlay) {
        interesOverlay.addEventListener('click', (e) => {
            if (e.target.id === 'interes-overlay') {
                interesOverlay.style.display = 'none';
            }
        });
    }

    // Simulación de login (sin guardar datos)
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = e.target['login-username'].value;
            const password = e.target['login-password'].value;

            if (username === 'admin' && password === 'admin') {
                currentUser = 'admin';
            } else if (username === 'user' && password === 'user') {
                currentUser = 'user';
            } else {
                alert('Usuario o contraseña incorrectos. ');
                return;
            }

            authOverlay.style.display = 'none';
            renderTours(); // Volver a renderizar para mostrar/ocultar botones
            alert(`¡Bienvenido, ${currentUser}!`);
        });
    }

    // Simulación de registro
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userType = e.target['user-type'].value;
            currentUser = userType;
            authOverlay.style.display = 'none';
            renderTours();
            alert(`¡Registro exitoso! Has iniciado sesión como ${userType}.`);
        });
    }

    // Manejar el menú de perfil
    if (userProfileBtn) {
        userProfileBtn.addEventListener('click', () => {
            userDropdownMenu.classList.toggle('show');
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            currentUser = null;
            userDropdownMenu.classList.remove('show');
            renderTours();
            alert('Sesión cerrada.');
        });
    }
}

// Iniciar la app
function init() {
    setupEventListeners();
    setupAuthListeners();
    renderTours();
}

// Iniciar la aplicación al cargar la página
init();
