import Helper from './helper.js'
import * as Custom from './util.js'
import * as Constant from './constant.js'
(function () {
  let _searchContainer = Helper.byqueryselector(document, Constant.selector.class.FILTER);
  let _allRecipeslist = Helper.byqueryselectorAll(document, Constant.selector.element.input.CHECKBOX);
  for (let _recipe of _allRecipeslist) {
     if(Helper.activecheckbox().includes(_recipe.id)){_recipe.click()};
    _recipe.onclick = (event) => {
      (event.target.checked) ? Helper.addAttribute(event.target, Constant.aria.CHECKED, true) : Helper.addAttribute(event.target, Constant.aria.CHECKED, false);
    }
  }
  _searchContainer.onclick = (event) => {
    let _foodContainer = Helper.byqueryselector(document, Constant.selector.class.CONTAINER);
    let _searchCollapsed = Helper.byqueryselector(document, Constant.selector.class.COLLAPSED);
    let _searchbox = Helper.byqueryselector(_searchContainer, Constant.selector.class.FILTERBOX);
    if(!(Helper.containsclass({ elem: _searchCollapsed, cls : 'search__switch'}))){
      Helper.addclass({elem: _searchCollapsed, cls: 'search__switch'});
    }
    else{
      Helper.toggleclass({ elem: _searchCollapsed, cls: Constant.common.SWITCH });
    }
    if (!Helper.containsclass({ elem: _foodContainer, cls: Constant.common.HIDE })) {
      Helper.addclass({ elem: _foodContainer, cls: Constant.common.HIDE });
      Helper.addAttribute(_searchbox, Constant.aria.EXPANDED, true);
    }
    else {
      Helper.removeclass({ elem: _foodContainer, cls: Constant.common.HIDE });
      Helper.addAttribute(_searchbox, Constant.aria.EXPANDED, false);
    }
  }

})();
(function () {
  let _container = Helper.byqueryselector(document, Constant.selector.id.NEWSLETTER);
  let _btnRemove = Helper.byqueryselector(_container, Constant.selector.id.REMOVE);
  Helper.addclass({ elem: _btnRemove, cls: Constant.common.HIDE });
})();

/**
 * add friend list functionality
 * @param {*} event 
 * @param {*} form 
 */
let COUNTER = 0;
 window.btnAdd_click = (event, form) => {
  event.preventDefault();
  // initially add new dublicate friends container when friends count 0.
  if (Custom.friends.size == 0) {
    let elem = document.createElement(Constant.selector.element.DIV);
    elem.setAttribute('id', Constant.common.CLONE);
    Helper.addclass({ elem: elem, cls: Constant.common.LIST });
    let maincontainer = Helper.byqueryselector(document, Constant.selector.class.SUBSCRIPTION);
    maincontainer.prepend(elem);
  }
  // create new clone for dublicate friends container
  if (!(Custom.isfriendexist(form.elements[2].value))) {
    COUNTER++;
    let _cloneContainer = Helper.byqueryselector(document, Constant.selector.id.GRIDCLONE);
    let _container = Helper.byqueryselector(document, Constant.selector.id.GRIDMAIN);
    let _node = Helper.newNode(_container);
    let _btnAdd = Helper.byqueryselector(_node, Constant.selector.id.ADD);
    let _btnRemove = Helper.byqueryselector(_node, Constant.selector.id.REMOVE);
    Helper.addAttribute(_node, "id", `clone${COUNTER}`);
    Helper.addAttribute(_btnRemove, "id",COUNTER);
    Helper.addclass({ elem: _btnAdd, cls: Constant.common.HIDE });
    Helper.removeclass({ elem: _btnRemove, cls: Constant.common.HIDE });
    Custom.pushFriend(form,COUNTER);
    Custom.readOnlyTextboxes(_node);
    Helper.appendNode(_cloneContainer, _node);
    Custom.updateGridBorder(_cloneContainer);
    Custom.checkfriendlistStatus(_container, _cloneContainer);
    form.reset();
    form.name.focus();
  }
  else{
    let{emailerror : error} = Helper.getMessages();
    alert(`${error} ${form.elements[2].value}`);
  }
}
/**
 * send friends, clear array
 * remove all childs from duplicate friens container
 * @param {*} form 
 */
  window.btnsend_click = form => {
  if (Custom.friends.size > 0) {
    let _cloneContainer = Helper.byqueryselector(document, Constant.selector.id.GRIDCLONE);
    let _container = Helper.byqueryselector(document, Constant.selector.id.GRIDMAIN);
    _cloneContainer.remove();
    Helper.removeclass({ elem: _container, cls: Constant.common.HIDE});
    let { sendsuccess : success } = Helper.getMessages();
    alert(success);
    console.log(`%c Newsletter JSON Request: ${Custom.friends}`,'color: orange');
    Custom.friends.clear();
  } else {
    let { senderror : error } = Helper.getMessages();
    alert(error);
  }
}
/**
 * remove friend from friens array base on count id.
 * @param {*} elem 
 */
 window.btnRemove_click = elem => {
  let _cloneContainer = Helper.byqueryselector(document, Constant.selector.id.GRIDCLONE);
  let _trashContainer = Helper.byqueryselector(document, `#clone${elem.id}`);
  let _container = Helper.byqueryselector(document, Constant.selector.id.GRIDMAIN);
  _trashContainer.remove();
  Custom.removeFriend(elem.id);
  Custom.updateGridBorder(_cloneContainer);
  Custom.checkfriendlistStatus(_container, _cloneContainer);
  if (Custom.friends.size === 0) {
    _cloneContainer.remove();
  }
}
