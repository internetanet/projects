const btns = document.querySelectorAll('._modal-open');
const modals = document.querySelectorAll('._modal');
const body = document.body;

function openModal(elem) {//открыть попап
    elem.classList.add('_active');
    body.classList.add('._locked');
}
function closeModal(e) {//закрыть попап
    if (e.target.classList.contains('modal-close') || e.target.closest('modal-close') || e.target.classList.contains('modal-bg') || e.target.classList.contains('btn__order')) {
        e.target.closest('._modal').classList.remove('_active');
        body.classList.remove('._locked');
    }
}


btns.forEach(btn => {//если товара в наличии нет
    let datastatus = btn.parentNode.getAttribute('data-status');
    
    if (datastatus == 'false') {
        btn.innerHTML = 'Заказать';
        btn.setAttribute("data-modal-open", "modal-2");
    }
})

btns.forEach(btn => {
    btn.addEventListener('click', (e) => {

        let data = e.target.dataset.modalOpen;
        
        modals.forEach(modal => {
            if (data == 'modal-1') {
                let itemName = btn.parentNode.querySelector('.item__name').innerHTML;
                let itemDescription = btn.parentNode.querySelector('.item__description').innerHTML;
                modal.querySelector('.item__name').innerHTML = itemName;
                modal.querySelector('.item__description').innerHTML = itemDescription;
            }

            if (modal.dataset.modal == data) {
                openModal(modal);
            }
        })
    })
})

modals.forEach(modal => {
    modal.addEventListener('click', (e) => closeModal(e))
})

const form = document.querySelector('#form');

form.addEventListener('submit', formSend)

async function formSend(e) {
    e.preventDefault();

    let errors = validator(form);
    let message = document.querySelector('#error');
    message.innerHTML = '';
    if (errors === 0) {
        console.log(111);
        let formData = new FormData(form);
        let response = await fetch('send.php', {
            method: POST,
            body: formData
        });
        if (response.ok) {
            console.log(222);
            let result = await response.json();
            alert(result.message);
            form.reset();
        }
    } else {
        message.innerHTML = 'Заполните все поля!';
    }

    function validator(form) {

        let errors = 0;
        let formRequired = document.querySelectorAll('._required');

        for (let index = 0; index < formRequired.length; index++) {
            const input = formRequired[index];
            removeError(input);

            if (input.value === '') {
                addError(input);
                errors++;
            }
        }
        return errors;

    }
    function addError(input) {
        input.parentElement.classList.add('_error');
    }
    function removeError(input) {
        input.parentElement.classList.remove('_error');
    }
}