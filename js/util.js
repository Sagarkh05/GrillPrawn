import Helper from './helper.js'
import * as Constant from './constant.js'
export let friends = new Set();
const MAX_LIMIT = 5;
/**
 * check record present in friend array
 * @param {*} attr 
 */
export const isfriendexist = (attr) => {
    for (let frd of friends) {
        if (frd.email == attr) {
            return true;
            break;
        }
    }
    return false;
}
/**
* fill friends array
* @param {*} form 
*/
export const pushFriend = (form, id) => {
    let data = {};
    for (let elem of form.elements) {
        if (elem.name) {
            data[elem.name] = elem.value;
        }
    }
    data.id = id;
    friends.add(data);
}

/**
* remove friends array base on count id
* @param {*} id 
*/
export const removeFriend = id => {
    friends.forEach(function (frd) {
        if (frd.id == id) {
            friends.delete(frd);
        }
    })
}
/**
* check the length of clone container
* @param {*} clonecontainer 
*/
export const isLimitReached = (clonecontainer) => {
    return (clonecontainer.children.length === MAX_LIMIT);
}
/**
 * update element's border which is added in the clone container
 * @param {*} container 
 */
export const updateGridBorder = (container) => {
    Helper.removeclass({ elem: container.lastChild, cls: Constant.common.NOBORDER });
    if (container.lastChild && friends.size === MAX_LIMIT) {
      Helper.addclass({ elem: container.lastChild, cls: Constant.common.NOBORDER });
    }
  }
  /**
 * friend list add section block accessibility base on the maximum count
 * @param {*} container 
 * @param {*} clonecontainer 
 */
export const checkfriendlistStatus = (container, clonecontainer) => {
    if (isLimitReached(clonecontainer)) {
      Helper.addclass({ elem: container, cls: Constant.common.HIDE });
    } else if (Helper.containsclass({ elem: container, cls:  Constant.common.HIDE })) {
      Helper.removeclass({ elem: container, cls:  Constant.common.HIDE });
    }
  }
  /**
 * maker textboxes readonly of given node
 * @param {*} node 
 */
export const readOnlyTextboxes = (node) => {
    const _textboxes = Helper.byqueryselectorAll(node, Constant.selector.element.input.TEXT, Constant.selector.element.input.EMAIL);
    for (let _textbox of _textboxes) {
      _textbox.readOnly = true;
      Helper.removeAttribute(_textbox, Constant.aria.REQUIRED);
    }
  }