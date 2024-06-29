// node_modules/@angular/core/fesm2022/primitives/event-dispatch.mjs
var JSACTION$1 = "jsaction";
var OI$1 = "oi";
var VED = "ved";
var VET = "vet";
var JSINSTANCE = "jsinstance";
var JSTRACK = "jstrack";
var Attribute = { JSACTION: JSACTION$1, OI: OI$1, VED, VET, JSINSTANCE, JSTRACK };
var Char = {
  /**
   * The separator between the namespace and the action name in the
   * jsaction attribute value.
   */
  NAMESPACE_ACTION_SEPARATOR: ".",
  /**
   * The separator between the event name and action in the jsaction
   * attribute value.
   */
  EVENT_ACTION_SEPARATOR: ":",
  /**
   * The separator between the logged oi attribute values in the &oi=
   * URL parameter value.
   */
  OI_SEPARATOR: ".",
  /**
   * The separator between the key and the value pairs in the &cad=
   * URL parameter value.
   */
  CAD_KEY_VALUE_SEPARATOR: ":",
  /**
   * The separator between the key-value pairs in the &cad= URL
   * parameter value.
   */
  CAD_SEPARATOR: ","
};
var EventType = {
  /**
   * Mouse middle click, introduced in Chrome 55 and not yet supported on
   * other browsers.
   */
  AUXCLICK: "auxclick",
  /**
   * The change event fired by browsers when the `value` attribute of input,
   * select, and textarea elements are changed.
   */
  CHANGE: "change",
  /**
   * The click event. In addEvent() refers to all click events, in the
   * jsaction attribute it refers to the unmodified click and Enter/Space
   * keypress events.  In the latter case, a jsaction click will be triggered,
   * for accessibility reasons.  See clickmod and clickonly, below.
   */
  CLICK: "click",
  /**
   * Specifies the jsaction for a modified click event (i.e. a mouse
   * click with the modifier key Cmd/Ctrl pressed). This event isn't
   * separately enabled in addEvent(), because in the DOM, it's just a
   * click event.
   */
  CLICKMOD: "clickmod",
  /**
   * Specifies the jsaction for a click-only event.  Click-only doesn't take
   * into account the case where an element with focus receives an Enter/Space
   * keypress.  This event isn't separately enabled in addEvent().
   */
  CLICKONLY: "clickonly",
  /**
   * The dblclick event.
   */
  DBLCLICK: "dblclick",
  /**
   * Focus doesn't bubble, but you can use it in addEvent() and
   * jsaction anyway. EventContract does the right thing under the
   * hood.
   */
  FOCUS: "focus",
  /**
   * This event only exists in IE. For addEvent() and jsaction, use
   * focus instead; EventContract does the right thing even though
   * focus doesn't bubble.
   */
  FOCUSIN: "focusin",
  /**
   * Analog to focus.
   */
  BLUR: "blur",
  /**
   * Analog to focusin.
   */
  FOCUSOUT: "focusout",
  /**
   * Submit doesn't bubble, so it cannot be used with event
   * contract. However, the browser helpfully fires a click event on
   * the submit button of a form (even if the form is not submitted by
   * a click on the submit button). So you should handle click on the
   * submit button instead.
   */
  SUBMIT: "submit",
  /**
   * The keydown event. In addEvent() and non-click jsaction it represents the
   * regular DOM keydown event. It represents click actions in non-Gecko
   * browsers.
   */
  KEYDOWN: "keydown",
  /**
   * The keypress event. In addEvent() and non-click jsaction it represents the
   * regular DOM keypress event. It represents click actions in Gecko browsers.
   */
  KEYPRESS: "keypress",
  /**
   * The keyup event. In addEvent() and non-click jsaction it represents the
   * regular DOM keyup event. It represents click actions in non-Gecko
   * browsers.
   */
  KEYUP: "keyup",
  /**
   * The mouseup event. Can either be used directly or used implicitly to
   * capture mouseup events. In addEvent(), it represents a regular DOM
   * mouseup event.
   */
  MOUSEUP: "mouseup",
  /**
   * The mousedown event. Can either be used directly or used implicitly to
   * capture mouseenter events. In addEvent(), it represents a regular DOM
   * mouseover event.
   */
  MOUSEDOWN: "mousedown",
  /**
   * The mouseover event. Can either be used directly or used implicitly to
   * capture mouseenter events. In addEvent(), it represents a regular DOM
   * mouseover event.
   */
  MOUSEOVER: "mouseover",
  /**
   * The mouseout event. Can either be used directly or used implicitly to
   * capture mouseover events. In addEvent(), it represents a regular DOM
   * mouseout event.
   */
  MOUSEOUT: "mouseout",
  /**
   * The mouseenter event. Does not bubble and fires individually on each
   * element being entered within a DOM tree.
   */
  MOUSEENTER: "mouseenter",
  /**
   * The mouseleave event. Does not bubble and fires individually on each
   * element being entered within a DOM tree.
   */
  MOUSELEAVE: "mouseleave",
  /**
   * The mousemove event.
   */
  MOUSEMOVE: "mousemove",
  /**
   * The pointerup event. Can either be used directly or used implicitly to
   * capture pointerup events. In addEvent(), it represents a regular DOM
   * pointerup event.
   */
  POINTERUP: "pointerup",
  /**
   * The pointerdown event. Can either be used directly or used implicitly to
   * capture pointerenter events. In addEvent(), it represents a regular DOM
   * mouseover event.
   */
  POINTERDOWN: "pointerdown",
  /**
   * The pointerover event. Can either be used directly or used implicitly to
   * capture pointerenter events. In addEvent(), it represents a regular DOM
   * pointerover event.
   */
  POINTEROVER: "pointerover",
  /**
   * The pointerout event. Can either be used directly or used implicitly to
   * capture pointerover events. In addEvent(), it represents a regular DOM
   * pointerout event.
   */
  POINTEROUT: "pointerout",
  /**
   * The pointerenter event. Does not bubble and fires individually on each
   * element being entered within a DOM tree.
   */
  POINTERENTER: "pointerenter",
  /**
   * The pointerleave event. Does not bubble and fires individually on each
   * element being entered within a DOM tree.
   */
  POINTERLEAVE: "pointerleave",
  /**
   * The pointermove event.
   */
  POINTERMOVE: "pointermove",
  /**
   * The pointercancel event.
   */
  POINTERCANCEL: "pointercancel",
  /**
   * The gotpointercapture event is fired when
   * Element.setPointerCapture(pointerId) is called on a mouse input, or
   * implicitly when a touch input begins.
   */
  GOTPOINTERCAPTURE: "gotpointercapture",
  /**
   * The lostpointercapture event is fired when
   * Element.releasePointerCapture(pointerId) is called, or implicitly after a
   * touch input ends.
   */
  LOSTPOINTERCAPTURE: "lostpointercapture",
  /**
   * The error event. The error event doesn't bubble, but you can use it in
   * addEvent() and jsaction anyway. EventContract does the right thing under
   * the hood (except in IE8 which does not use error events).
   */
  ERROR: "error",
  /**
   * The load event. The load event doesn't bubble, but you can use it in
   * addEvent() and jsaction anyway. EventContract does the right thing
   * under the hood.
   */
  LOAD: "load",
  /**
   * The unload event.
   */
  UNLOAD: "unload",
  /**
   * The touchstart event. Bubbles, will only ever fire in browsers with
   * touch support.
   */
  TOUCHSTART: "touchstart",
  /**
   * The touchend event. Bubbles, will only ever fire in browsers with
   * touch support.
   */
  TOUCHEND: "touchend",
  /**
   * The touchmove event. Bubbles, will only ever fire in browsers with
   * touch support.
   */
  TOUCHMOVE: "touchmove",
  /**
   * The input event.
   */
  INPUT: "input",
  /**
   * The scroll event.
   */
  SCROLL: "scroll",
  /**
   * The toggle event. The toggle event doesn't bubble, but you can use it in
   * addEvent() and jsaction anyway. EventContract does the right thing
   * under the hood.
   */
  TOGGLE: "toggle",
  /**
   * A custom event. The actual custom event type is declared as the 'type'
   * field in the event details. Supported in Firefox 6+, IE 9+, and all Chrome
   * versions.
   *
   * This is an internal name. Users should use jsaction's fireCustomEvent to
   * fire custom events instead of relying on this type to create them.
   */
  CUSTOM: "_custom"
};
var NON_BUBBLING_MOUSE_EVENTS = [
  EventType.MOUSEENTER,
  EventType.MOUSELEAVE,
  "pointerenter",
  "pointerleave"
];
var isSupportedEvent = (eventType) => SUPPORTED_EVENTS.indexOf(eventType) >= 0;
var SUPPORTED_EVENTS = [
  EventType.CLICK,
  EventType.DBLCLICK,
  EventType.FOCUS,
  EventType.FOCUSIN,
  EventType.BLUR,
  EventType.ERROR,
  EventType.FOCUSOUT,
  EventType.KEYDOWN,
  EventType.KEYUP,
  EventType.KEYPRESS,
  EventType.LOAD,
  EventType.MOUSEOVER,
  EventType.MOUSEOUT,
  EventType.SUBMIT,
  EventType.TOGGLE,
  EventType.TOUCHSTART,
  EventType.TOUCHEND,
  EventType.TOUCHMOVE,
  "touchcancel",
  "auxclick",
  "change",
  "compositionstart",
  "compositionupdate",
  "compositionend",
  "beforeinput",
  "input",
  "select",
  "copy",
  "cut",
  "paste",
  "mousedown",
  "mouseup",
  "wheel",
  "contextmenu",
  "dragover",
  "dragenter",
  "dragleave",
  "drop",
  "dragstart",
  "dragend",
  "pointerdown",
  "pointermove",
  "pointerup",
  "pointercancel",
  "pointerover",
  "pointerout",
  "gotpointercapture",
  "lostpointercapture",
  // Video events.
  "ended",
  "loadedmetadata",
  // Page visibility events.
  "pagehide",
  "pageshow",
  "visibilitychange",
  // Content visibility events.
  "beforematch"
];
var isCaptureEvent = (eventType) => CAPTURE_EVENTS.indexOf(eventType) >= 0;
var CAPTURE_EVENTS = [
  EventType.FOCUS,
  EventType.BLUR,
  EventType.ERROR,
  EventType.LOAD,
  EventType.TOGGLE
];
var JSACTION = "__jsaction";
var OWNER = "__owner";
var parseCache = {};
function get(element) {
  return element[JSACTION];
}
function set(element, actionMap) {
  element[JSACTION] = actionMap;
}
function getParsed(text) {
  return parseCache[text];
}
function setParsed(text, parsed) {
  parseCache[text] = parsed;
}
function getEventType(eventInfo) {
  return eventInfo.eventType;
}
function setEventType(eventInfo, eventType) {
  eventInfo.eventType = eventType;
}
function getEvent(eventInfo) {
  return eventInfo.event;
}
function setEvent(eventInfo, event) {
  eventInfo.event = event;
}
function getTargetElement(eventInfo) {
  return eventInfo.targetElement;
}
function setTargetElement(eventInfo, targetElement) {
  eventInfo.targetElement = targetElement;
}
function getContainer(eventInfo) {
  return eventInfo.eic;
}
function setContainer(eventInfo, container) {
  eventInfo.eic = container;
}
function getTimestamp(eventInfo) {
  return eventInfo.timeStamp;
}
function setTimestamp(eventInfo, timestamp) {
  eventInfo.timeStamp = timestamp;
}
function getAction(eventInfo) {
  return eventInfo.eia;
}
function setAction(eventInfo, actionName, actionElement) {
  eventInfo.eia = [actionName, actionElement];
}
function unsetAction(eventInfo) {
  eventInfo.eia = void 0;
}
function getActionElement(actionInfo) {
  return actionInfo[1];
}
function getIsReplay(eventInfo) {
  return eventInfo.eirp;
}
function setIsReplay(eventInfo, replay) {
  eventInfo.eirp = replay;
}
function getA11yClickKey(eventInfo) {
  return eventInfo.eiack;
}
function setA11yClickKey(eventInfo, a11yClickKey) {
  eventInfo.eiack = a11yClickKey;
}
function getResolved(eventInfo) {
  return eventInfo.eir;
}
function setResolved(eventInfo, resolved) {
  eventInfo.eir = resolved;
}
function cloneEventInfo(eventInfo) {
  return {
    eventType: eventInfo.eventType,
    event: eventInfo.event,
    targetElement: eventInfo.targetElement,
    eic: eventInfo.eic,
    eia: eventInfo.eia,
    timeStamp: eventInfo.timeStamp,
    eirp: eventInfo.eirp,
    eiack: eventInfo.eiack,
    eir: eventInfo.eir
  };
}
function createEventInfoFromParameters(eventType, event, targetElement, container, timestamp, action, isReplay, a11yClickKey) {
  return {
    eventType,
    event,
    targetElement,
    eic: container,
    timeStamp: timestamp,
    eia: action,
    eirp: isReplay,
    eiack: a11yClickKey
  };
}
var EventInfoWrapper = class _EventInfoWrapper {
  constructor(eventInfo) {
    this.eventInfo = eventInfo;
  }
  getEventType() {
    return getEventType(this.eventInfo);
  }
  setEventType(eventType) {
    setEventType(this.eventInfo, eventType);
  }
  getEvent() {
    return getEvent(this.eventInfo);
  }
  setEvent(event) {
    setEvent(this.eventInfo, event);
  }
  getTargetElement() {
    return getTargetElement(this.eventInfo);
  }
  setTargetElement(targetElement) {
    setTargetElement(this.eventInfo, targetElement);
  }
  getContainer() {
    return getContainer(this.eventInfo);
  }
  setContainer(container) {
    setContainer(this.eventInfo, container);
  }
  getTimestamp() {
    return getTimestamp(this.eventInfo);
  }
  setTimestamp(timestamp) {
    setTimestamp(this.eventInfo, timestamp);
  }
  getAction() {
    const action = getAction(this.eventInfo);
    if (!action)
      return void 0;
    return {
      name: action[0],
      element: action[1]
    };
  }
  setAction(action) {
    if (!action) {
      unsetAction(this.eventInfo);
      return;
    }
    setAction(this.eventInfo, action.name, action.element);
  }
  getIsReplay() {
    return getIsReplay(this.eventInfo);
  }
  setIsReplay(replay) {
    setIsReplay(this.eventInfo, replay);
  }
  getResolved() {
    return getResolved(this.eventInfo);
  }
  setResolved(resolved) {
    setResolved(this.eventInfo, resolved);
  }
  clone() {
    return new _EventInfoWrapper(cloneEventInfo(this.eventInfo));
  }
};
function contains(node, otherNode) {
  if (otherNode === null) {
    return false;
  }
  if ("contains" in node && otherNode.nodeType === 1) {
    return node.contains(otherNode);
  }
  if ("compareDocumentPosition" in node) {
    return node === otherNode || Boolean(node.compareDocumentPosition(otherNode) & 16);
  }
  while (otherNode && node !== otherNode) {
    otherNode = otherNode.parentNode;
  }
  return otherNode === node;
}
var MAC_ENTER = 3;
var ENTER = 13;
var SPACE = 32;
var KeyCode = { MAC_ENTER, ENTER, SPACE };
function getBrowserEventType(eventType) {
  if (eventType === EventType.MOUSEENTER) {
    return EventType.MOUSEOVER;
  } else if (eventType === EventType.MOUSELEAVE) {
    return EventType.MOUSEOUT;
  } else if (eventType === EventType.POINTERENTER) {
    return EventType.POINTEROVER;
  } else if (eventType === EventType.POINTERLEAVE) {
    return EventType.POINTEROUT;
  }
  return eventType;
}
function addEventListener(element, eventType, handler) {
  let capture = false;
  if (isCaptureEvent(eventType)) {
    capture = true;
  }
  element.addEventListener(eventType, handler, capture);
  return { eventType, handler, capture };
}
function removeEventListener(element, info) {
  if (element.removeEventListener) {
    element.removeEventListener(info.eventType, info.handler, info.capture);
  } else if (element.detachEvent) {
    element.detachEvent(`on${info.eventType}`, info.handler);
  }
}
function preventDefault(e) {
  e.preventDefault ? e.preventDefault() : e.returnValue = false;
}
function getTarget(e) {
  let el = e.target;
  if (!el.getAttribute && el.parentNode) {
    el = el.parentNode;
  }
  return el;
}
var isMac = typeof navigator !== "undefined" && /Macintosh/.test(navigator.userAgent);
function isMiddleClick(e) {
  return (
    // `which` is an old DOM API.
    // tslint:disable-next-line:no-any
    e.which === 2 || // `which` is an old DOM API.
    // tslint:disable-next-line:no-any
    e.which == null && // `button` is an old DOM API.
    // tslint:disable-next-line:no-any
    e.button === 4
  );
}
function isModifiedClickEvent(e) {
  return (
    // `metaKey` is an old DOM API.
    // tslint:disable-next-line:no-any
    isMac && e.metaKey || // `ctrlKey` is an old DOM API.
    // tslint:disable-next-line:no-any
    !isMac && e.ctrlKey || isMiddleClick(e) || // `shiftKey` is an old DOM API.
    // tslint:disable-next-line:no-any
    e.shiftKey
  );
}
var isWebKit = typeof navigator !== "undefined" && !/Opera/.test(navigator.userAgent) && /WebKit/.test(navigator.userAgent);
var isIe = typeof navigator !== "undefined" && (/MSIE/.test(navigator.userAgent) || /Trident/.test(navigator.userAgent));
var isGecko = typeof navigator !== "undefined" && !/Opera|WebKit/.test(navigator.userAgent) && /Gecko/.test(navigator.product);
function isValidActionKeyTarget(el) {
  if (!("getAttribute" in el)) {
    return false;
  }
  if (isTextControl(el)) {
    return false;
  }
  if (isNativelyActivatable(el)) {
    return false;
  }
  if (el.isContentEditable) {
    return false;
  }
  return true;
}
function hasModifierKey(e) {
  return (
    // `ctrlKey` is an old DOM API.
    // tslint:disable-next-line:no-any
    e.ctrlKey || // `shiftKey` is an old DOM API.
    // tslint:disable-next-line:no-any
    e.shiftKey || // `altKey` is an old DOM API.
    // tslint:disable-next-line:no-any
    e.altKey || // `metaKey` is an old DOM API.
    // tslint:disable-next-line:no-any
    e.metaKey
  );
}
function shouldCallPreventDefaultOnNativeHtmlControl(e) {
  const el = getTarget(e);
  const tagName = el.tagName.toUpperCase();
  const role = (el.getAttribute("role") || "").toUpperCase();
  if (tagName === "BUTTON" || role === "BUTTON") {
    return true;
  }
  if (!isNativeHTMLControl(el)) {
    return false;
  }
  if (tagName === "A") {
    return false;
  }
  if (tagName === "SELECT") {
    return false;
  }
  if (processSpace(el)) {
    return false;
  }
  if (isTextControl(el)) {
    return false;
  }
  return true;
}
function isActionKeyEvent(e) {
  let key = (
    // `which` is an old DOM API.
    // tslint:disable-next-line:no-any
    e.which || // `keyCode` is an old DOM API.
    // tslint:disable-next-line:no-any
    e.keyCode
  );
  if (!key && e.key) {
    key = ACTION_KEY_TO_KEYCODE[e.key];
  }
  if (isWebKit && key === KeyCode.MAC_ENTER) {
    key = KeyCode.ENTER;
  }
  if (key !== KeyCode.ENTER && key !== KeyCode.SPACE) {
    return false;
  }
  const el = getTarget(e);
  if (e.type !== EventType.KEYDOWN || !isValidActionKeyTarget(el) || hasModifierKey(e)) {
    return false;
  }
  if (processSpace(el) && key === KeyCode.SPACE) {
    return false;
  }
  if (!isFocusable(el)) {
    return false;
  }
  const type = (el.getAttribute("role") || el.type || el.tagName).toUpperCase();
  const isSpecificTriggerKey = IDENTIFIER_TO_KEY_TRIGGER_MAPPING[type] % key === 0;
  const isDefaultTriggerKey = !(type in IDENTIFIER_TO_KEY_TRIGGER_MAPPING) && key === KeyCode.ENTER;
  const hasType = el.tagName.toUpperCase() !== "INPUT" || !!el.type;
  return (isSpecificTriggerKey || isDefaultTriggerKey) && hasType;
}
function isFocusable(el) {
  return (el.tagName in NATIVELY_FOCUSABLE_ELEMENTS || hasSpecifiedTabIndex(el)) && !el.disabled;
}
function hasSpecifiedTabIndex(element) {
  const attrNode = element.getAttributeNode("tabindex");
  return attrNode != null && attrNode.specified;
}
var NATIVELY_FOCUSABLE_ELEMENTS = {
  "A": 1,
  "INPUT": 1,
  "TEXTAREA": 1,
  "SELECT": 1,
  "BUTTON": 1
};
function isSpaceKeyEvent(e) {
  const key = (
    // `which` is an old DOM API.
    // tslint:disable-next-line:no-any
    e.which || // `keyCode` is an old DOM API.
    // tslint:disable-next-line:no-any
    e.keyCode
  );
  const el = getTarget(e);
  const elementName = (el.type || el.tagName).toUpperCase();
  return key === KeyCode.SPACE && elementName !== "CHECKBOX";
}
function isMouseSpecialEvent(e, type, element) {
  const related = e.relatedTarget;
  return (e.type === EventType.MOUSEOVER && type === EventType.MOUSEENTER || e.type === EventType.MOUSEOUT && type === EventType.MOUSELEAVE || e.type === EventType.POINTEROVER && type === EventType.POINTERENTER || e.type === EventType.POINTEROUT && type === EventType.POINTERLEAVE) && (!related || related !== element && !contains(element, related));
}
function createMouseSpecialEvent(e, target) {
  const copy = {};
  for (const property in e) {
    if (property === "srcElement" || property === "target") {
      continue;
    }
    const key = property;
    const value = e[key];
    if (typeof value === "function") {
      continue;
    }
    copy[key] = value;
  }
  if (e.type === EventType.MOUSEOVER) {
    copy["type"] = EventType.MOUSEENTER;
  } else if (e.type === EventType.MOUSEOUT) {
    copy["type"] = EventType.MOUSELEAVE;
  } else if (e.type === EventType.POINTEROVER) {
    copy["type"] = EventType.POINTERENTER;
  } else {
    copy["type"] = EventType.POINTERLEAVE;
  }
  copy["target"] = copy["srcElement"] = target;
  copy["bubbles"] = false;
  return copy;
}
var ACTION_KEY_TO_KEYCODE = {
  "Enter": KeyCode.ENTER,
  " ": KeyCode.SPACE
};
var IDENTIFIER_TO_KEY_TRIGGER_MAPPING = {
  "A": KeyCode.ENTER,
  "BUTTON": 0,
  "CHECKBOX": KeyCode.SPACE,
  "COMBOBOX": KeyCode.ENTER,
  "FILE": 0,
  "GRIDCELL": KeyCode.ENTER,
  "LINK": KeyCode.ENTER,
  "LISTBOX": KeyCode.ENTER,
  "MENU": 0,
  "MENUBAR": 0,
  "MENUITEM": 0,
  "MENUITEMCHECKBOX": 0,
  "MENUITEMRADIO": 0,
  "OPTION": 0,
  "RADIO": KeyCode.SPACE,
  "RADIOGROUP": KeyCode.SPACE,
  "RESET": 0,
  "SUBMIT": 0,
  "SWITCH": KeyCode.SPACE,
  "TAB": 0,
  "TREE": KeyCode.ENTER,
  "TREEITEM": KeyCode.ENTER
};
function processSpace(element) {
  const type = (element.getAttribute("type") || element.tagName).toUpperCase();
  return type in PROCESS_SPACE;
}
function isTextControl(el) {
  const type = (el.getAttribute("type") || el.tagName).toUpperCase();
  return type in TEXT_CONTROLS;
}
function isNativeHTMLControl(el) {
  return el.tagName.toUpperCase() in NATIVE_HTML_CONTROLS;
}
function isNativelyActivatable(el) {
  return el.tagName.toUpperCase() === "BUTTON" || !!el.type && el.type.toUpperCase() === "FILE";
}
var PROCESS_SPACE = {
  "CHECKBOX": true,
  "FILE": true,
  "OPTION": true,
  "RADIO": true
};
var TEXT_CONTROLS = {
  "COLOR": true,
  "DATE": true,
  "DATETIME": true,
  "DATETIME-LOCAL": true,
  "EMAIL": true,
  "MONTH": true,
  "NUMBER": true,
  "PASSWORD": true,
  "RANGE": true,
  "SEARCH": true,
  "TEL": true,
  "TEXT": true,
  "TEXTAREA": true,
  "TIME": true,
  "URL": true,
  "WEEK": true
};
var NATIVE_HTML_CONTROLS = {
  "A": true,
  "AREA": true,
  "BUTTON": true,
  "DIALOG": true,
  "IMG": true,
  "INPUT": true,
  "LINK": true,
  "MENU": true,
  "OPTGROUP": true,
  "OPTION": true,
  "PROGRESS": true,
  "SELECT": true,
  "TEXTAREA": true
};
var EMPTY_ACTION_MAP = {};
var REGEXP_SEMICOLON = /\s*;\s*/;
var DEFAULT_EVENT_TYPE = EventType.CLICK;
var ActionResolver = class {
  constructor({ syntheticMouseEventSupport = false } = {}) {
    this.a11yClickSupport = false;
    this.updateEventInfoForA11yClick = void 0;
    this.preventDefaultForA11yClick = void 0;
    this.populateClickOnlyAction = void 0;
    this.syntheticMouseEventSupport = syntheticMouseEventSupport;
  }
  resolveEventType(eventInfo) {
    if (getEventType(eventInfo) === EventType.CLICK && isModifiedClickEvent(getEvent(eventInfo))) {
      setEventType(eventInfo, EventType.CLICKMOD);
    } else if (this.a11yClickSupport) {
      this.updateEventInfoForA11yClick(eventInfo);
    }
  }
  resolveAction(eventInfo) {
    if (getResolved(eventInfo)) {
      return;
    }
    this.populateAction(eventInfo, getTargetElement(eventInfo));
    setResolved(eventInfo, true);
  }
  resolveParentAction(eventInfo) {
    const action = getAction(eventInfo);
    const actionElement = action && getActionElement(action);
    unsetAction(eventInfo);
    const parentNode = actionElement && this.getParentNode(actionElement);
    if (!parentNode) {
      return;
    }
    this.populateAction(eventInfo, parentNode);
  }
  /**
   * Searches for a jsaction that the DOM event maps to and creates an
   * object containing event information used for dispatching by
   * jsaction.Dispatcher. This method populates the `action` and `actionElement`
   * fields of the EventInfo object passed in by finding the first
   * jsaction attribute above the target Node of the event, and below
   * the container Node, that specifies a jsaction for the event
   * type. If no such jsaction is found, then action is undefined.
   *
   * @param eventInfo `EventInfo` to set `action` and `actionElement` if an
   *    action is found on any `Element` in the path of the `Event`.
   */
  populateAction(eventInfo, currentTarget) {
    let actionElement = currentTarget;
    while (actionElement && actionElement !== getContainer(eventInfo)) {
      if (actionElement.nodeType === Node.ELEMENT_NODE) {
        this.populateActionOnElement(actionElement, eventInfo);
      }
      if (getAction(eventInfo)) {
        break;
      }
      actionElement = this.getParentNode(actionElement);
    }
    const action = getAction(eventInfo);
    if (!action) {
      return;
    }
    if (this.a11yClickSupport) {
      this.preventDefaultForA11yClick(eventInfo);
    }
    if (this.syntheticMouseEventSupport) {
      if (getEventType(eventInfo) === EventType.MOUSEENTER || getEventType(eventInfo) === EventType.MOUSELEAVE || getEventType(eventInfo) === EventType.POINTERENTER || getEventType(eventInfo) === EventType.POINTERLEAVE) {
        if (isMouseSpecialEvent(getEvent(eventInfo), getEventType(eventInfo), getActionElement(action))) {
          const copiedEvent = createMouseSpecialEvent(getEvent(eventInfo), getActionElement(action));
          setEvent(eventInfo, copiedEvent);
          setTargetElement(eventInfo, getActionElement(action));
        } else {
          unsetAction(eventInfo);
        }
      }
    }
  }
  /**
   * Walk to the parent node, unless the node has a different owner in
   * which case we walk to the owner. Attempt to walk to host of a
   * shadow root if needed.
   */
  getParentNode(element) {
    const owner = element[OWNER];
    if (owner) {
      return owner;
    }
    const parentNode = element.parentNode;
    if (parentNode?.nodeName === "#document-fragment") {
      return parentNode?.host ?? null;
    }
    return parentNode;
  }
  /**
   * Accesses the jsaction map on a node and retrieves the name of the
   * action the given event is mapped to, if any. It parses the
   * attribute value and stores it in a property on the node for
   * subsequent retrieval without re-parsing and re-accessing the
   * attribute.
   *
   * @param actionElement The DOM node to retrieve the jsaction map from.
   * @param eventInfo `EventInfo` to set `action` and `actionElement` if an
   *    action is found on the `actionElement`.
   */
  populateActionOnElement(actionElement, eventInfo) {
    const actionMap = this.parseActions(actionElement);
    const actionName = actionMap[getEventType(eventInfo)];
    if (actionName !== void 0) {
      setAction(eventInfo, actionName, actionElement);
    }
    if (this.a11yClickSupport) {
      this.populateClickOnlyAction(actionElement, eventInfo, actionMap);
    }
  }
  /**
   * Parses and caches an element's jsaction element into a map.
   *
   * This is primarily for internal use.
   *
   * @param actionElement The DOM node to retrieve the jsaction map from.
   * @return Map from event to qualified name of the jsaction bound to it.
   */
  parseActions(actionElement) {
    let actionMap = get(actionElement);
    if (!actionMap) {
      const jsactionAttribute = actionElement.getAttribute(Attribute.JSACTION);
      if (!jsactionAttribute) {
        actionMap = EMPTY_ACTION_MAP;
        set(actionElement, actionMap);
      } else {
        actionMap = getParsed(jsactionAttribute);
        if (!actionMap) {
          actionMap = {};
          const values = jsactionAttribute.split(REGEXP_SEMICOLON);
          for (let idx = 0; idx < values.length; idx++) {
            const value = values[idx];
            if (!value) {
              continue;
            }
            const colon = value.indexOf(Char.EVENT_ACTION_SEPARATOR);
            const hasColon = colon !== -1;
            const type = hasColon ? value.substr(0, colon).trim() : DEFAULT_EVENT_TYPE;
            const action = hasColon ? value.substr(colon + 1).trim() : value;
            actionMap[type] = action;
          }
          setParsed(jsactionAttribute, actionMap);
        }
        set(actionElement, actionMap);
      }
    }
    return actionMap;
  }
  addA11yClickSupport(updateEventInfoForA11yClick2, preventDefaultForA11yClick2, populateClickOnlyAction2) {
    this.a11yClickSupport = true;
    this.updateEventInfoForA11yClick = updateEventInfoForA11yClick2;
    this.preventDefaultForA11yClick = preventDefaultForA11yClick2;
    this.populateClickOnlyAction = populateClickOnlyAction2;
  }
};
var Restriction;
(function(Restriction2) {
  Restriction2[Restriction2["I_AM_THE_JSACTION_FRAMEWORK"] = 0] = "I_AM_THE_JSACTION_FRAMEWORK";
})(Restriction || (Restriction = {}));
var Dispatcher = class {
  /**
   * Options are:
   *   - `eventReplayer`: When the event contract dispatches replay events
   *      to the Dispatcher, the Dispatcher collects them and in the next tick
   *      dispatches them to the `eventReplayer`. Defaults to dispatching to `dispatchDelegate`.
   * @param dispatchDelegate A function that should handle dispatching an `EventInfoWrapper` to handlers.
   */
  constructor(dispatchDelegate, { actionResolver, eventReplayer } = {}) {
    this.dispatchDelegate = dispatchDelegate;
    this.eventReplayScheduled = false;
    this.replayEventInfoWrappers = [];
    this.actionResolver = actionResolver;
    this.eventReplayer = eventReplayer;
  }
  /**
   * Receives an event or the event queue from the EventContract. The event
   * queue is copied and it attempts to replay.
   * If event info is passed in it looks for an action handler that can handle
   * the given event.  If there is no handler registered queues the event and
   * checks if a loader is registered for the given namespace. If so, calls it.
   *
   * Alternatively, if in global dispatch mode, calls all registered global
   * handlers for the appropriate event type.
   *
   * The three functionalities of this call are deliberately not split into
   * three methods (and then declared as an abstract interface), because the
   * interface is used by EventContract, which lives in a different jsbinary.
   * Therefore the interface between the three is defined entirely in terms that
   * are invariant under jscompiler processing (Function and Array, as opposed
   * to a custom type with method names).
   *
   * @param eventInfo The info for the event that triggered this call or the
   *     queue of events from EventContract.
   */
  dispatch(eventInfo) {
    const eventInfoWrapper = new EventInfoWrapper(eventInfo);
    this.actionResolver?.resolveEventType(eventInfo);
    this.actionResolver?.resolveAction(eventInfo);
    const action = eventInfoWrapper.getAction();
    if (action && shouldPreventDefaultBeforeDispatching(action.element, eventInfoWrapper)) {
      preventDefault(eventInfoWrapper.getEvent());
    }
    if (this.eventReplayer && eventInfoWrapper.getIsReplay()) {
      this.scheduleEventInfoWrapperReplay(eventInfoWrapper);
      return;
    }
    this.dispatchDelegate(eventInfoWrapper);
  }
  /**
   * Schedules an `EventInfoWrapper` for replay. The replaying will happen in its own
   * stack once the current flow cedes control. This is done to mimic
   * browser event handling.
   */
  scheduleEventInfoWrapperReplay(eventInfoWrapper) {
    this.replayEventInfoWrappers.push(eventInfoWrapper);
    if (this.eventReplayScheduled) {
      return;
    }
    this.eventReplayScheduled = true;
    Promise.resolve().then(() => {
      this.eventReplayScheduled = false;
      this.eventReplayer(this.replayEventInfoWrappers);
    });
  }
};
function shouldPreventDefaultBeforeDispatching(actionElement, eventInfoWrapper) {
  return actionElement.tagName === "A" && (eventInfoWrapper.getEventType() === EventType.CLICK || eventInfoWrapper.getEventType() === EventType.CLICKMOD);
}
var PROPAGATION_STOPPED_SYMBOL = Symbol.for("propagationStopped");
var EventPhase = {
  REPLAY: 101
};
var PREVENT_DEFAULT_ERROR_MESSAGE_DETAILS = " Because event replay occurs after browser dispatch, `preventDefault` would have no effect. You can check whether an event is being replayed by accessing the event phase: `event.eventPhase === EventPhase.REPLAY`.";
var PREVENT_DEFAULT_ERROR_MESSAGE = `\`preventDefault\` called during event replay.`;
var COMPOSED_PATH_ERROR_MESSAGE_DETAILS = " Because event replay occurs after browser dispatch, `composedPath()` will be empty. Iterate parent nodes from `event.target` or `event.currentTarget` if you need to check elements in the event path.";
var COMPOSED_PATH_ERROR_MESSAGE = `\`composedPath\` called during event replay.`;
var EventDispatcher = class {
  constructor(dispatchDelegate) {
    this.dispatchDelegate = dispatchDelegate;
    this.actionResolver = new ActionResolver();
    this.dispatcher = new Dispatcher((eventInfoWrapper) => {
      this.dispatchToDelegate(eventInfoWrapper);
    }, {
      actionResolver: this.actionResolver
    });
  }
  /**
   * The entrypoint for the `EventContract` dispatch.
   */
  dispatch(eventInfo) {
    this.dispatcher.dispatch(eventInfo);
  }
  /** Internal method that does basic disaptching. */
  dispatchToDelegate(eventInfoWrapper) {
    if (eventInfoWrapper.getIsReplay()) {
      prepareEventForReplay(eventInfoWrapper);
    }
    prepareEventForBubbling(eventInfoWrapper);
    while (eventInfoWrapper.getAction()) {
      prepareEventForDispatch(eventInfoWrapper);
      this.dispatchDelegate(eventInfoWrapper.getEvent(), eventInfoWrapper.getAction().name);
      if (propagationStopped(eventInfoWrapper)) {
        return;
      }
      this.actionResolver.resolveParentAction(eventInfoWrapper.eventInfo);
    }
  }
};
function prepareEventForBubbling(eventInfoWrapper) {
  const event = eventInfoWrapper.getEvent();
  const stopPropagation = () => {
    event[PROPAGATION_STOPPED_SYMBOL] = true;
  };
  patchEventInstance(event, "stopPropagation", stopPropagation);
  patchEventInstance(event, "stopImmediatePropagation", stopPropagation);
}
function propagationStopped(eventInfoWrapper) {
  const event = eventInfoWrapper.getEvent();
  return !!event[PROPAGATION_STOPPED_SYMBOL];
}
function prepareEventForReplay(eventInfoWrapper) {
  const event = eventInfoWrapper.getEvent();
  const target = eventInfoWrapper.getTargetElement();
  patchEventInstance(event, "target", target);
  patchEventInstance(event, "eventPhase", EventPhase.REPLAY);
  patchEventInstance(event, "preventDefault", () => {
    throw new Error(PREVENT_DEFAULT_ERROR_MESSAGE + (ngDevMode ? PREVENT_DEFAULT_ERROR_MESSAGE_DETAILS : ""));
  });
  patchEventInstance(event, "composedPath", () => {
    throw new Error(COMPOSED_PATH_ERROR_MESSAGE + (ngDevMode ? COMPOSED_PATH_ERROR_MESSAGE_DETAILS : ""));
  });
}
function prepareEventForDispatch(eventInfoWrapper) {
  const event = eventInfoWrapper.getEvent();
  const currentTarget = eventInfoWrapper.getAction()?.element;
  if (currentTarget) {
    patchEventInstance(event, "currentTarget", currentTarget, {
      // `currentTarget` is going to get reassigned every dispatch.
      configurable: true
    });
  }
}
function patchEventInstance(event, property, value, { configurable = false } = {}) {
  Object.defineProperty(event, property, { value, configurable });
}
function registerDispatcher(eventContract, dispatcher) {
  eventContract.ecrd((eventInfo) => {
    dispatcher.dispatch(eventInfo);
  }, Restriction.I_AM_THE_JSACTION_FRAMEWORK);
}
var isIos = typeof navigator !== "undefined" && /iPhone|iPad|iPod/.test(navigator.userAgent);
var EventContractContainer = class {
  /**
   * @param element The container Element.
   */
  constructor(element) {
    this.element = element;
    this.handlerInfos = [];
  }
  /**
   * Installs the provided installer on the element owned by this container,
   * and maintains a reference to resulting handler in order to remove it
   * later if desired.
   */
  addEventListener(eventType, getHandler) {
    if (isIos) {
      this.element.style.cursor = "pointer";
    }
    this.handlerInfos.push(addEventListener(this.element, eventType, getHandler(this.element)));
  }
  /**
   * Removes all the handlers installed on this container.
   */
  cleanUp() {
    for (let i = 0; i < this.handlerInfos.length; i++) {
      removeEventListener(this.element, this.handlerInfos[i]);
    }
    this.handlerInfos = [];
  }
};
function updateEventInfoForA11yClick(eventInfo) {
  if (!isActionKeyEvent(getEvent(eventInfo))) {
    return;
  }
  setA11yClickKey(eventInfo, true);
  setEventType(eventInfo, EventType.CLICK);
}
function preventDefaultForA11yClick(eventInfo) {
  if (!getA11yClickKey(eventInfo) || !isSpaceKeyEvent(getEvent(eventInfo)) && !shouldCallPreventDefaultOnNativeHtmlControl(getEvent(eventInfo))) {
    return;
  }
  preventDefault(getEvent(eventInfo));
}
function populateClickOnlyAction(actionElement, eventInfo, actionMap) {
  if (
    // If there's already an action, don't attempt to set a CLICKONLY
    getAction(eventInfo) || // Only attempt CLICKONLY if the type is CLICK
    getEventType(eventInfo) !== EventType.CLICK || // a11y clicks are never CLICKONLY
    getA11yClickKey(eventInfo) || actionMap[EventType.CLICKONLY] === void 0
  ) {
    return;
  }
  setEventType(eventInfo, EventType.CLICKONLY);
  setAction(eventInfo, actionMap[EventType.CLICKONLY], actionElement);
}
var A11Y_CLICK_SUPPORT = false;
var MOUSE_SPECIAL_SUPPORT = false;
var _EventContract = class _EventContract {
  constructor(containerManager, useActionResolver) {
    this.useActionResolver = useActionResolver;
    this.eventHandlers = {};
    this.browserEventTypeToExtraEventTypes = {};
    this.dispatcher = null;
    this.queuedEventInfos = [];
    this.addA11yClickListener = false;
    this.containerManager = containerManager;
    if (this.useActionResolver) {
      this.actionResolver = new ActionResolver({
        syntheticMouseEventSupport: _EventContract.MOUSE_SPECIAL_SUPPORT
      });
    }
    if (_EventContract.A11Y_CLICK_SUPPORT) {
      this.addA11yClickSupport();
    }
  }
  handleEvent(eventType, event, container) {
    const eventInfo = createEventInfoFromParameters(
      /* eventType= */
      eventType,
      /* event= */
      event,
      /* targetElement= */
      event.target,
      /* container= */
      container,
      /* timestamp= */
      Date.now()
    );
    this.handleEventInfo(eventInfo);
  }
  /**
   * Handle an `EventInfo`.
   */
  handleEventInfo(eventInfo) {
    if (!this.dispatcher) {
      setIsReplay(eventInfo, true);
      this.queuedEventInfos?.push(eventInfo);
      return;
    }
    if (this.useActionResolver) {
      this.actionResolver.resolveEventType(eventInfo);
      this.actionResolver.resolveAction(eventInfo);
    }
    this.dispatcher(eventInfo);
  }
  /**
   * Enables jsaction handlers to be called for the event type given by
   * name.
   *
   * If the event is already registered, this does nothing.
   *
   * @param prefixedEventType If supplied, this event is used in
   *     the actual browser event registration instead of the name that is
   *     exposed to jsaction. Use this if you e.g. want users to be able
   *     to subscribe to jsaction="transitionEnd:foo" while the underlying
   *     event is webkitTransitionEnd in one browser and mozTransitionEnd
   *     in another.
   */
  addEvent(eventType, prefixedEventType) {
    if (eventType in this.eventHandlers || !this.containerManager) {
      return;
    }
    if (!_EventContract.MOUSE_SPECIAL_SUPPORT && NON_BUBBLING_MOUSE_EVENTS.indexOf(eventType) >= 0) {
      return;
    }
    const eventHandler = (eventType2, event, container) => {
      this.handleEvent(eventType2, event, container);
    };
    this.eventHandlers[eventType] = eventHandler;
    const browserEventType = getBrowserEventType(prefixedEventType || eventType);
    if (browserEventType !== eventType) {
      const eventTypes = this.browserEventTypeToExtraEventTypes[browserEventType] || [];
      eventTypes.push(eventType);
      this.browserEventTypeToExtraEventTypes[browserEventType] = eventTypes;
    }
    this.containerManager.addEventListener(browserEventType, (element) => {
      return (event) => {
        eventHandler(eventType, event, element);
      };
    });
    if (this.addA11yClickListener && eventType === EventType.CLICK) {
      this.addEvent(EventType.KEYDOWN);
    }
  }
  /**
   * Gets the queued early events and replay them using the appropriate handler
   * in the provided event contract. Once all the events are replayed, it cleans
   * up the early contract.
   */
  replayEarlyEvents(earlyJsactionContainer = window) {
    const earlyJsactionData = earlyJsactionContainer._ejsa;
    if (!earlyJsactionData) {
      return;
    }
    const earlyEventInfos = earlyJsactionData.q;
    for (let idx = 0; idx < earlyEventInfos.length; idx++) {
      const earlyEventInfo = earlyEventInfos[idx];
      const eventTypes = this.getEventTypesForBrowserEventType(earlyEventInfo.eventType);
      for (let i = 0; i < eventTypes.length; i++) {
        const eventInfo = cloneEventInfo(earlyEventInfo);
        setEventType(eventInfo, eventTypes[i]);
        this.handleEventInfo(eventInfo);
      }
    }
    const earlyEventHandler = earlyJsactionData.h;
    removeEventListeners(earlyJsactionData.c, earlyJsactionData.et, earlyEventHandler);
    removeEventListeners(earlyJsactionData.c, earlyJsactionData.etc, earlyEventHandler, true);
    delete earlyJsactionContainer._ejsa;
  }
  /**
   * Returns all JSAction event types that have been registered for a given
   * browser event type.
   */
  getEventTypesForBrowserEventType(browserEventType) {
    const eventTypes = [];
    if (this.eventHandlers[browserEventType]) {
      eventTypes.push(browserEventType);
    }
    if (this.browserEventTypeToExtraEventTypes[browserEventType]) {
      eventTypes.push(...this.browserEventTypeToExtraEventTypes[browserEventType]);
    }
    return eventTypes;
  }
  /**
   * Returns the event handler function for a given event type.
   */
  handler(eventType) {
    return this.eventHandlers[eventType];
  }
  /**
   * Cleans up the event contract. This resets all of the `EventContract`'s
   * internal state. Users are responsible for not using this `EventContract`
   * after it has been cleaned up.
   */
  cleanUp() {
    this.containerManager.cleanUp();
    this.containerManager = null;
    this.eventHandlers = {};
    this.browserEventTypeToExtraEventTypes = {};
    this.dispatcher = null;
    this.queuedEventInfos = [];
  }
  /**
   * Register a dispatcher function. Event info of each event mapped to
   * a jsaction is passed for handling to this callback. The queued
   * events are passed as well to the dispatcher for later replaying
   * once the dispatcher is registered. Clears the event queue to null.
   *
   * @param dispatcher The dispatcher function.
   * @param restriction
   */
  registerDispatcher(dispatcher, restriction) {
    this.ecrd(dispatcher, restriction);
  }
  /**
   * Unrenamed alias for registerDispatcher. Necessary for any codebases that
   * split the `EventContract` and `Dispatcher` code into different compilation
   * units.
   */
  ecrd(dispatcher, restriction) {
    this.dispatcher = dispatcher;
    if (this.queuedEventInfos?.length) {
      for (let i = 0; i < this.queuedEventInfos.length; i++) {
        this.handleEventInfo(this.queuedEventInfos[i]);
      }
      this.queuedEventInfos = null;
    }
  }
  /**
   * Adds a11y click support to the given `EventContract`. Meant to be called in
   * the same compilation unit as the `EventContract`.
   */
  addA11yClickSupport() {
    this.addA11yClickSupportImpl(updateEventInfoForA11yClick, preventDefaultForA11yClick, populateClickOnlyAction);
  }
  /**
   * Enables a11y click support to be deferred. Meant to be called in the same
   * compilation unit as the `EventContract`.
   */
  exportAddA11yClickSupport() {
    this.addA11yClickListener = true;
    this.ecaacs = this.addA11yClickSupportImpl.bind(this);
  }
  /**
   * Unrenamed function that loads a11yClickSupport.
   */
  addA11yClickSupportImpl(updateEventInfoForA11yClick2, preventDefaultForA11yClick2, populateClickOnlyAction2) {
    this.addA11yClickListener = true;
    if (this.useActionResolver) {
      this.actionResolver.addA11yClickSupport(updateEventInfoForA11yClick2, preventDefaultForA11yClick2, populateClickOnlyAction2);
    }
  }
};
_EventContract.A11Y_CLICK_SUPPORT = A11Y_CLICK_SUPPORT;
_EventContract.MOUSE_SPECIAL_SUPPORT = MOUSE_SPECIAL_SUPPORT;
var EventContract = _EventContract;
function removeEventListeners(container, eventTypes, earlyEventHandler, capture) {
  for (let idx = 0; idx < eventTypes.length; idx++) {
    container.removeEventListener(
      eventTypes[idx],
      earlyEventHandler,
      /* useCapture */
      capture
    );
  }
}
var EarlyEventContract = class {
  constructor(replaySink = window, container = window.document.documentElement) {
    this.replaySink = replaySink;
    this.container = container;
    replaySink._ejsa = {
      c: container,
      q: [],
      et: [],
      etc: [],
      h: (event) => {
        const eventInfo = createEventInfoFromParameters(event.type, event, event.target, container, Date.now());
        replaySink._ejsa.q.push(eventInfo);
      }
    };
  }
  /**
   * Installs a list of event types for container .
   */
  addEvents(types, capture) {
    const replaySink = this.replaySink._ejsa;
    for (let idx = 0; idx < types.length; idx++) {
      const eventType = types[idx];
      const eventTypes = capture ? replaySink.etc : replaySink.et;
      eventTypes.push(eventType);
      this.container.addEventListener(eventType, replaySink.h, capture);
    }
  }
};
function bootstrapEarlyEventContract(field, container, appId, eventTypes, captureEventTypes, earlyJsactionTracker = window) {
  if (!earlyJsactionTracker[field]) {
    earlyJsactionTracker[field] = {};
  }
  earlyJsactionTracker[field][appId] = {};
  const eventContract = new EarlyEventContract(earlyJsactionTracker[field][appId], container);
  if (eventTypes)
    eventContract.addEvents(eventTypes);
  if (captureEventTypes)
    eventContract.addEvents(captureEventTypes, true);
}

export {
  JSACTION$1,
  OI$1,
  VED,
  VET,
  JSINSTANCE,
  JSTRACK,
  Attribute,
  isSupportedEvent,
  isCaptureEvent,
  EventInfoWrapper,
  EventPhase,
  EventDispatcher,
  registerDispatcher,
  EventContractContainer,
  EventContract,
  bootstrapEarlyEventContract
};
/*! Bundled license information:

@angular/core/fesm2022/primitives/event-dispatch.mjs:
  (**
   * @license Angular v18.0.5
   * (c) 2010-2024 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=chunk-JKBTTGCY.js.map