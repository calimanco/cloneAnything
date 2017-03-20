function cloneAnything(objectToBeCloned) {
  "use strict";
  // 如果不是对象则直接返回
  if (!(objectToBeCloned instanceof Object)) {
    return objectToBeCloned;
  }
  var objectClone;

  // 获取对象的构造函数
  var Constructor = objectToBeCloned.constructor;
  // 对DOM对象特殊处理，列表就用数组把克隆结果装起来
  var reg = /(HTMLUListElement|NodeList|HTMLCollection|HTMLLIElement)/;
  if (reg.test(Constructor.toString())) {
    if (objectToBeCloned.length || objectToBeCloned.length === 0) {
      var list = [];
      for (var i = 0; i < objectToBeCloned.length; i++) {
        list.push(objectToBeCloned[i].cloneNode(true));
      }
      return objectClone = list;
    }
    return objectClone = objectToBeCloned.cloneNode(true);
  }
  // 对特殊构造器进行特殊处理。
  switch (Constructor) {
    case RegExp:
      return objectClone = new Constructor(objectToBeCloned);
    case Date:
      return objectClone = new Constructor(objectToBeCloned.getTime());
    case Number:
      return objectClone = new Constructor(objectToBeCloned);
    case String:
      return objectClone = new Constructor(objectToBeCloned);
    case Boolean:
      return objectClone = new Constructor(emulateMessage(objectToBeCloned));
    case Function:
      return objectClone = objectToBeCloned;
    default:
      objectClone = new Constructor();
  }

  function emulateMessage(vVal) {
    return JSON.parse(JSON.stringify(vVal));
  }
  // 递归遍历.
  for (var prop in objectToBeCloned) {
    objectClone[prop] = cloneAnything(objectToBeCloned[prop]);
  }
  return objectClone;
}
