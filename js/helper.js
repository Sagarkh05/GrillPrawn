export default class Helper {
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

  static validatelist({ arr = '', attr = '' }) {
    return arr.includes(attr);
    // arr.some(function(e){
    //   return e.email === attr;
    // });
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
    return { senderror: "kindly add at least one friends", sendsuccess: "Request send successfully",
             emailerror: "Email id  is already exist"  };
  }
  static activecheckbox(){
    return ['Mains','French','Spanish','Thai','Danish'];
  }
}
