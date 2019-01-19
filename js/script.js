class Helper {

  constructor() {

  }
  /**
   * fatch element by queryselector 
   * @param {*} context 
   * @param {*} selectors
   */
  static byqueryselector(context, selectors) {
    return context.querySelector(selectors);
  }

  /**
   * fetch elements based on given selectors
   * @param {*} context 
   * @param  {...any} selectors 
   */
  static byqueryselectorAll(context, ...selectors) {
    return context.querySelectorAll(selectors.join(','));
  }

  /**
   * add class function
   * @param {*} elem 
   * @param {*} cls 
   */
  static addclass({ elem = undefined, cls = '' }) {
    if (elem) {
      elem.classList.add(cls);
    }
  }

  /**
   * remove class function
   * @param {*} elem 
   * @param {*} cls 
   */
  static removeclass({ elem = undefined, cls = '' }) {
    if (elem) {
      elem.classList.remove(cls);
    }
  }

  /**
   * check class is available 
   * @param {*} elem 
   * @param {*} cls 
   */
  static containsclass({ elem = undefined, cls = '' }) {
    if (elem) {
      return elem.classList.contains(cls);
    }
  }
  /**
  * 
  * @param {*} elem 
  * @param {*} cls 
  */
  static toggleclass({ elem = undefined, cls = '' }) {
    elem.classList.toggle(cls);
  }
  /**
   * create new duplicate child container
   * @param {*} elem 
   */
  static newNode(elem) {
    return elem.cloneNode(true);
  }

  /**
   * add attribute with given name and value
   * @param {*} elem 
   * @param {*} name 
   * @param {*} value 
   */
  static addAttribute(elem, name, value) {
    return elem.setAttribute(name, value);
  }

  /**
   * remove attribute from element
   * @param {*} elem 
   * @param {*} name 
   */
  static removeAttribute(elem, name) {
    return elem.removeAttribute(name);
  }

  /**
   * append node within elem
   * @param {*} elem 
   * @param {*} node 
   */
  static appendNode(elem, node) {
    elem.appendChild(node);
  }

  /**
   * get list of standard messages
   */
  static getMessages() {
    return { error: "kindly add at least one friends", success: "Request send successfully" };
  }

}

/**
 * check the length of clone container
 * @param {*} clonecontainer 
 */
const isLimitReached = (clonecontainer) => {
  return (clonecontainer.children.length === MAX_LIMIT);
}
/**
 * friend list add section block accessibility base on the maximum count
 * @param {*} container 
 * @param {*} clonecontainer 
 */
const checkfriendlistStatus = (container, clonecontainer) => {
  if (isLimitReached(clonecontainer)) {
    Helper.addclass({ elem: container, cls: 'hide' });
  } else if (Helper.containsclass({ elem: container, cls: 'hide' })) {
    Helper.removeclass({ elem: container, cls: 'hide' });
  }
}

(function () {
    let _searchContainer = Helper.byqueryselector(document, '.search__filter');
    _searchContainer.onclick = (event) => {
    let _foodContainer = Helper.byqueryselector(document, '.search__foodcontainer');
    let _searchCollapsed = Helper.byqueryselector(document, '.search__collapsed');
    let _searchbox = Helper.byqueryselector(_searchContainer,'.search__filterbox');
    Helper.toggleclass({ elem: _searchCollapsed, cls: 'search__switch' });
    if (!Helper.containsclass({ elem: _foodContainer, cls: 'show' })) {
      Helper.addclass({ elem: _foodContainer, cls: 'show' });
      Helper.addAttribute(_searchbox,'aria-selected',true);
    }
    else {
      Helper.removeclass({ elem: _foodContainer, cls: 'show' });
      Helper.addAttribute(_searchbox,'aria-selected',false);
    }
  }
})();

const MAX_LIMIT = 5; //maximum limit of friends matrix
let counter = 0; // initial counter value
let friends = [];
// load commencing elements
(function () {
  let _container = Helper.byqueryselector(document, "#newsletter-org");
  let _btnRemove = Helper.byqueryselector(_container, "#btn_remove");
  Helper.addclass({ elem: _btnRemove, cls: 'hide' });
})();

/**
 * add friend list functionality
 * @param {*} event 
 * @param {*} form 
 */
const btnAdd_click = (event, form) => {
  event.preventDefault();
  counter++;
  // initially add new dublicate friends container when friends count 0.
  if (friends.length == 0) {
    let elem = document.createElement('div');
    elem.setAttribute('id', 'newsletter-dup-grid');
    Helper.addclass({ elem: elem, cls: 'newsletter__friendlist' });
    let maincontainer = Helper.byqueryselector(document, ".newsletter__subscription");
    maincontainer.prepend(elem);
  }
  // create new clone for dublicate friends container
  let _cloneContainer = Helper.byqueryselector(document, "#newsletter-dup-grid");
  let _container = Helper.byqueryselector(document, "#newsletter-org");
  let _node = Helper.newNode(_container);
  let _btnAdd = Helper.byqueryselector(_node, "#btn_add");
  let _btnRemove = Helper.byqueryselector(_node, "#btn_remove");
  Helper.addAttribute(_node, "id", `clone${counter}`);
  Helper.addAttribute(_btnRemove, "id", counter);
  Helper.addclass({ elem: _btnAdd, cls: 'hide' });
  Helper.removeclass({ elem: _btnRemove, cls: 'hide' });
  pushFriend(form, counter);
  readOnlyTextboxes(_node);
  Helper.appendNode(_cloneContainer, _node);
  updateGridBorder(_cloneContainer);
  // clone creation complited
  // check status with max count for visibility of main friend container.
  checkfriendlistStatus(_container, _cloneContainer);
  form.reset();
  form.name.focus();
}

/**
 * maker textboxes readonly of given node
 * @param {*} node 
 */
const readOnlyTextboxes = (node) => {
  const _textboxes = Helper.byqueryselectorAll(node, "input[type='text']", "input[type='email']");
  for (let _textbox of _textboxes) {
    _textbox.readOnly = true;
    Helper.removeAttribute(_textbox, 'aria-required');
  }
}

/**
 * fill friends array
 * @param {*} form 
 */
const pushFriend = (form, id) => {
  let data = {};
  for (let elem of form.elements) {
    if (elem.name) {
      data[elem.name] = elem.value;
    }
  }
  data.id = id;
  friends.push(data);
}

/**
 * remove friends array base on count id
 * @param {*} id 
 */
const removeFriend = id => {
  let idx = friends.findIndex(e => e.id === +id);
  friends.splice(idx, 1);
}

/**
 * send friends, clear array
 * remove all childs from duplicate friens container
 * @param {*} form 
 */
const btnsend_click = form => {
  if (friends.length > 0) {
    let _cloneContainer = Helper.byqueryselector(document, "#newsletter-dup-grid");
    let _container = Helper.byqueryselector(document, "#newsletter-org");
    _cloneContainer.remove();
    Helper.removeclass({ elem: _container, cls: 'hide' });
    let { success } = Helper.getMessages();
    alert(success);
    console.log(`Newsletter JSON Request: ${JSON.stringify(friends)}`);
    friends = [];
  } else {
    let { error } = Helper.getMessages();
    alert(error);
  }
}

/**
 * update element's border which is added in the clone container
 * @param {*} container 
 */
const updateGridBorder = (container) => {
  Helper.removeclass({ elem: container.lastChild, cls: 'grid--noborder' });
  if (container.lastChild && friends.length === MAX_LIMIT) {
    Helper.addclass({ elem: container.lastChild, cls: 'grid--noborder' });
  }
}

/**
 * remove friend from friens array base on count id.
 * @param {*} elem 
 */
const btnRemove_click = elem => {
  let _cloneContainer = Helper.byqueryselector(document, "#newsletter-dup-grid");
  let _trashContainer = Helper.byqueryselector(document, `#clone${elem.id}`);
  let _container = Helper.byqueryselector(document, "#newsletter-org");
  _trashContainer.remove();
  removeFriend(elem.id);
  updateGridBorder(_cloneContainer);
  checkfriendlistStatus(_container, _cloneContainer);
  if (friends.length === 0) {
    _cloneContainer.remove();
  }
}