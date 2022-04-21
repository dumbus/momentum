const todo = () => {
  const todoBtn = document.querySelector('.todo-button');
  const todoPopup = document.querySelector('.todo-popup');
  const todoClose = document.querySelector('.todo-close');

  const noTodos = document.querySelector('.no-todos');
  const todoNewBtn = document.querySelector('.todo-new-btn');
  const todoNewInput = document.querySelector('.todo-new');

  const todoList = document.querySelector('.todo-list');
  
  if (localStorage.getItem('numberItems') == null) {
    localStorage.setItem('numberItems', 0);
  }

  let numberItems = +localStorage.getItem('numberItems');

  if (numberItems > 0) {
    for (let i = 0; i < numberItems; i++) {
      const li = document.createElement('li');
      li.classList.add('todo-list-item');
      const label = document.createElement('label');
      li.append(label);
      const input = document.createElement('input');
      if (localStorage.getItem(`checkbox${i+1}`) == 'true') {
        input.checked = true;
      }
      input.setAttribute('type', 'checkbox');
      input.classList.add('todo-checkbox');
      input.style.marginRight = '10px';
      label.append(input);
      const span = document.createElement('span');
      span.classList.add('todo-span');
      if (input.checked == true) {
        span.classList.add('todo-done');
      }
      span.textContent = localStorage.getItem(`todoItem${i+1}`);
      label.append(span);
      todoList.append(li);


      noTodos.classList.add('hidden');
    }
  }

  let todoListItems = document.querySelectorAll('.todo-list-item');

  todoBtn.addEventListener('click', () => {
    if (!todoPopup.classList.contains('opened-popup')) {
      todoPopup.classList.remove('closed-popup');
      todoPopup.classList.remove('fadeOut');
      todoPopup.classList.add('fadeIn');
      
      todoPopup.addEventListener('animationend', () => {
        todoPopup.classList.remove('closed-popup');
        todoPopup.classList.add('opened-popup');
      });
    } else {
      todoPopup.classList.remove('fadeIn');
      todoPopup.classList.add('fadeOut');
      todoPopup.classList.remove('opened-popup');

      todoPopup.addEventListener('animationend', () => {
        todoPopup.classList.add('closed-popup');
        todoPopup.classList.remove('opened-popup');
      });
    }
  });

  todoClose.addEventListener('click', () => {
    todoPopup.classList.remove('fadeIn');
    todoPopup.classList.add('fadeOut');
    todoPopup.classList.remove('opened-popup');

    todoPopup.addEventListener('animationend', () => {
      todoPopup.classList.add('closed-popup');
      todoPopup.classList.remove('opened-popup');
    });
  });

  function checkListLength() {
    todoListItems = document.querySelectorAll('.todo-list-item');

    if (todoListItems.length < 1) {
      noTodos.classList.remove('hidden');
      todoNewBtn.classList.remove('hidden');
      todoNewInput.classList.add('closed-items');
    } else {
      noTodos.classList.add('hidden');
      todoNewBtn.classList.add('hidden');
    }
  }

  checkListLength();

  todoNewBtn.addEventListener('click', () => {
    todoNewBtn.classList.add('fadeOutItems');
    todoNewBtn.addEventListener('animationend', () => {
      todoNewBtn.classList.add('hidden');
      todoNewInput.classList.add('fadeInItems');
    });
    todoNewInput.classList.add('fadeInItems');
    todoNewInput.addEventListener('animationend', () => {
      todoNewInput.classList.remove('closed-items');
    }); 
  });

  let todoCheckboxes = document.querySelectorAll('.todo-checkbox');
  let todoSpans = document.querySelectorAll('.todo-span');

  todoNewInput.addEventListener('change', () => {
    numberItems += 1;

    const li = document.createElement('li');
    li.classList.add('todo-list-item');
    const label = document.createElement('label');
    li.append(label);
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.style.marginRight = '10px';
    input.classList.add(`checkbox${numberItems}`);
    input.classList.add('todo-checkbox');
    label.append(input);
    const span = document.createElement('span');
    span.textContent = todoNewInput.value;
    span.classList.add('todo-span');
    label.append(span);
    todoList.append(li);

    localStorage.setItem(`todoItem${numberItems}`, todoNewInput.value);
    localStorage.setItem(`checkbox${numberItems}`, false);
    localStorage.setItem('numberItems', numberItems);
    
    todoNewInput.value = '';

    todoCheckboxes = document.querySelectorAll('.todo-checkbox');
    todoSpans = document.querySelectorAll('.todo-span');

    for (let i = 0; i < todoCheckboxes.length; i++) {
      todoCheckboxes[i].addEventListener('change', () => {
        console.log(todoCheckboxes[i].checked);
        if (todoCheckboxes[i].checked == true) {
          todoSpans[i].classList.add('todo-done');
          localStorage.setItem(`checkbox${i+1}`, true);
        } else {
          localStorage.setItem(`checkbox${i+1}`, false);
          todoSpans[i].classList.remove('todo-done');
        }
      });
    }

    checkListLength();
  });

  todoCheckboxes = document.querySelectorAll('.todo-checkbox');
  todoSpans = document.querySelectorAll('.todo-span');

  for (let i = 0; i < todoCheckboxes.length; i++) {
    todoCheckboxes[i].addEventListener('change', () => {
      console.log(todoCheckboxes[i].checked);
      if (todoCheckboxes[i].checked == true) {
        todoSpans[i].classList.add('todo-done');
        localStorage.setItem(`checkbox${i+1}`, true);
      } else {
        localStorage.setItem(`checkbox${i+1}`, false);
        todoSpans[i].classList.remove('todo-done');
      }
    });
  }
  

};

export default todo;