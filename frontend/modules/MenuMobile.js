export default function initMenuMobile() {

  function outsideClick(element, events, callback) {
    const html = document.documentElement;
    const outside = 'data-outside';
  
    if(!element.hasAttribute(outside)) {
      events.forEach(userEvent => {
        setTimeout(() => html.addEventListener(userEvent, handleOutsideClick));
      })
      element.setAttribute(outside, '');
    }
    function handleOutsideClick(event) {
      if(!element.contains(event.target)) {
        element.removeAttribute(outside);
        events.forEach(userEvent => {
          html.removeEventListener(userEvent, handleOutsideClick);
        })
        callback();
      }
    }
  }

  const menuButton = document.querySelector('[data-menu="botao"]')
  const menuList = document.querySelector('[data-menu="lista"]')
  const eventos = ['click']
  
  function openMenu(event) {
    menuList.classList.add('ativo')
    menuButton.classList.add('ativo')
    outsideClick(menuList, eventos, () => {
      menuList.classList.remove('ativo')
      menuButton.classList.remove('ativo')
    })
  }
  
  eventos.forEach((evento) => {
    menuButton.addEventListener(evento, openMenu);
  })
}
