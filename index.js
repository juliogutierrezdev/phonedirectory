const inputName = document.querySelector('#name-input');
const inputPhone = document.querySelector('#phone-input');
const form = document.querySelector('#form');
const formBtn = document.querySelector('#form-btn');
const list = document.querySelector('#list');

const NAME_REGEX = /^[A-Z][a-z]{2,20}$/;
const PHONE_REGEX = /^[0]{1}[42]{1}[12]{1}[246]{1}[0-9]{7}$/;

let nameValidation = false;
let phoneValidation = false;

const validateInput = (input, validation) => {
  // Selecciono el p 
  const helper = input.parentElement.children[2];

  // Verifico las validaciones para quitar el atributo disabled del boton
  if (nameValidation && phoneValidation) {
    formBtn.disabled = false;
  } else {
    formBtn.disabled = true;
  }

  // Valido si el input esta vacio
  // Si la validacion es verdadera
  // Si la validacion es falsa
  if (input.value === '') {
    input.classList.remove('error');
    input.classList.remove('correct');
    helper.classList.remove('show');
  } else if (validation) {
    input.classList.add('correct');
    input.classList.remove('error');
    helper.classList.remove('show');
  } else {
    input.classList.add('error');
    input.classList.remove('correct');
    helper.classList.add('show');
  }
}

inputName.addEventListener('input', e => {
  nameValidation = NAME_REGEX.test(inputName.value);
  validateInput(inputName, nameValidation)
});

inputPhone.addEventListener('input', e => {
  phoneValidation = PHONE_REGEX.test(inputPhone.value);
  validateInput(inputPhone, phoneValidation)
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const newContact = document.createElement('li');
  newContact.classList.add('list-item');
  newContact.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="delete-icon">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <input type="text" value="${inputName.value}" readonly>
  <input type="text" value="${inputPhone.value}" readonly>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="edit-icon">
    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
  `;
  
  list.append(newContact);
  inputName.value = '';
  inputPhone.value = '';
  nameValidation = false;
  phoneValidation = false;
  validateInput(inputName);
  validateInput(inputPhone);
  
  localStorage.setItem('contacts', list.innerHTML);
});

list.addEventListener('click', e => {
  if (e.target.closest('.delete-icon')) {
    e.target.closest('.delete-icon').parentElement.remove();
    localStorage.setItem('contacts', list.innerHTML);
  }

  if (e.target.closest('.edit-icon')) {
    const editBtn = e.target.closest('.edit-icon');
    const editName = editBtn.parentElement.children[1];
    const editPhone = editBtn.parentElement.children[2];
    
    inputName.addEventListener('input', e => {
      nameValidation = NAME_REGEX.test(inputName.value);
      validateInput(inputName, nameValidation)
    });
    
    inputPhone.addEventListener('input', e => {
      phoneValidation = PHONE_REGEX.test(inputPhone.value);
      validateInput(inputPhone, phoneValidation)
    });

    editName.addEventListener('input', e => {
      nameValidation = NAME_REGEX.test(editName.value);
      validateInput(editName, nameValidation)
    });
    
    editPhone.addEventListener('input', e => {
      phoneValidation = PHONE_REGEX.test(editPhone.value);
      validateInput(editPhone, phoneValidation)
    });
    
    if (!editBtn.classList.contains('editando')) {
      editBtn.classList.add('editando');
      editName.removeAttribute('readonly');
      editPhone.removeAttribute('readonly');
    } else {
      editBtn.classList.remove('editando');
      editName.setAttribute('readonly', true);
      editPhone.setAttribute('readonly', true);

      // Guardar valor
      editName.setAttribute('value', editName.value);
      editPhone.setAttribute('value', editPhone.value);

      localStorage.setItem('contacts', list.innerHTML);
      
    }
  };
});


const loadFromLocal = () => {
  const localList = localStorage.getItem('contacts');
  list.innerHTML = localList;
}

loadFromLocal();
