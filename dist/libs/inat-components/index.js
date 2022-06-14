import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useCallback, useState, useEffect } from 'react';
import LoadingSpinner from 'react-spinners/MoonLoader';
import { format } from 'date-fns';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var fails$l = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$k = fails$l;

var functionBindNative = !fails$k(function () {
  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

var NATIVE_BIND$3 = functionBindNative;

var FunctionPrototype$2 = Function.prototype;
var bind$5 = FunctionPrototype$2.bind;
var call$i = FunctionPrototype$2.call;
var uncurryThis$k = NATIVE_BIND$3 && bind$5.bind(call$i, call$i);

var functionUncurryThis = NATIVE_BIND$3 ? function (fn) {
  return fn && uncurryThis$k(fn);
} : function (fn) {
  return fn && function () {
    return call$i.apply(fn, arguments);
  };
};

var uncurryThis$j = functionUncurryThis;

var toString$6 = uncurryThis$j({}.toString);
var stringSlice$4 = uncurryThis$j(''.slice);

var classofRaw$1 = function (it) {
  return stringSlice$4(toString$6(it), 8, -1);
};

var uncurryThis$i = functionUncurryThis;
var fails$j = fails$l;
var classof$6 = classofRaw$1;

var $Object$4 = Object;
var split = uncurryThis$i(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$j(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object$4('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$6(it) == 'String' ? split(it, '') : $Object$4(it);
} : $Object$4;

var $TypeError$d = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$4 = function (it) {
  if (it == undefined) throw $TypeError$d("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject$1 = indexedObject;
var requireObjectCoercible$3 = requireObjectCoercible$4;

var toIndexedObject$5 = function (it) {
  return IndexedObject$1(requireObjectCoercible$3(it));
};

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$m =
  // eslint-disable-next-line es-x/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var shared$4 = {exports: {}};

var global$l = global$m;

// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty$5 = Object.defineProperty;

var defineGlobalProperty$3 = function (key, value) {
  try {
    defineProperty$5(global$l, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global$l[key] = value;
  } return value;
};

var global$k = global$m;
var defineGlobalProperty$2 = defineGlobalProperty$3;

var SHARED = '__core-js_shared__';
var store$3 = global$k[SHARED] || defineGlobalProperty$2(SHARED, {});

var sharedStore = store$3;

var store$2 = sharedStore;

(shared$4.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.23.0',
  mode: 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.23.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

var requireObjectCoercible$2 = requireObjectCoercible$4;

var $Object$3 = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$5 = function (argument) {
  return $Object$3(requireObjectCoercible$2(argument));
};

var uncurryThis$h = functionUncurryThis;
var toObject$4 = toObject$5;

var hasOwnProperty = uncurryThis$h({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es-x/no-object-hasown -- safe
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject$4(it), key);
};

var uncurryThis$g = functionUncurryThis;

var id = 0;
var postfix = Math.random();
var toString$5 = uncurryThis$g(1.0.toString);

var uid$2 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$5(++id + postfix, 36);
};

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
var isCallable$m = function (argument) {
  return typeof argument == 'function';
};

var global$j = global$m;
var isCallable$l = isCallable$m;

var aFunction = function (argument) {
  return isCallable$l(argument) ? argument : undefined;
};

var getBuiltIn$8 = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global$j[namespace]) : global$j[namespace] && global$j[namespace][method];
};

var getBuiltIn$7 = getBuiltIn$8;

var engineUserAgent = getBuiltIn$7('navigator', 'userAgent') || '';

var global$i = global$m;
var userAgent$5 = engineUserAgent;

var process$3 = global$i.process;
var Deno$1 = global$i.Deno;
var versions = process$3 && process$3.versions || Deno$1 && Deno$1.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent$5) {
  match = userAgent$5.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent$5.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

var engineV8Version = version;

/* eslint-disable es-x/no-symbol -- required for testing */

var V8_VERSION$1 = engineV8Version;
var fails$i = fails$l;

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$i(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
});

/* eslint-disable es-x/no-symbol -- required for testing */

var NATIVE_SYMBOL$1 = nativeSymbol;

var useSymbolAsUid = NATIVE_SYMBOL$1
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var global$h = global$m;
var shared$3 = shared$4.exports;
var hasOwn$a = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = nativeSymbol;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var WellKnownSymbolsStore = shared$3('wks');
var Symbol$1 = global$h.Symbol;
var symbolFor = Symbol$1 && Symbol$1['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID$1 ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

var wellKnownSymbol$g = function (name) {
  if (!hasOwn$a(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn$a(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else if (USE_SYMBOL_AS_UID$1 && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};

var isCallable$k = isCallable$m;

var isObject$7 = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$k(it);
};

var isObject$6 = isObject$7;

var $String$3 = String;
var $TypeError$c = TypeError;

// `Assert: Type(argument) is Object`
var anObject$e = function (argument) {
  if (isObject$6(argument)) return argument;
  throw $TypeError$c($String$3(argument) + ' is not an object');
};

var objectDefineProperties = {};

var fails$h = fails$l;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$h(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var DESCRIPTORS$a = descriptors;
var fails$g = fails$l;

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
var v8PrototypeDefineBug = DESCRIPTORS$a && fails$g(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

var objectDefineProperty = {};

var global$g = global$m;
var isObject$5 = isObject$7;

var document$3 = global$g.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject$5(document$3) && isObject$5(document$3.createElement);

var documentCreateElement$2 = function (it) {
  return EXISTS$1 ? document$3.createElement(it) : {};
};

var DESCRIPTORS$9 = descriptors;
var fails$f = fails$l;
var createElement$1 = documentCreateElement$2;

// Thanks to IE8 for its funny defineProperty
var ie8DomDefine = !DESCRIPTORS$9 && !fails$f(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement$1('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var NATIVE_BIND$2 = functionBindNative;

var call$h = Function.prototype.call;

var functionCall = NATIVE_BIND$2 ? call$h.bind(call$h) : function () {
  return call$h.apply(call$h, arguments);
};

var uncurryThis$f = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$f({}.isPrototypeOf);

var getBuiltIn$6 = getBuiltIn$8;
var isCallable$j = isCallable$m;
var isPrototypeOf$3 = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var $Object$2 = Object;

var isSymbol$2 = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$6('Symbol');
  return isCallable$j($Symbol) && isPrototypeOf$3($Symbol.prototype, $Object$2(it));
};

var $String$2 = String;

var tryToString$5 = function (argument) {
  try {
    return $String$2(argument);
  } catch (error) {
    return 'Object';
  }
};

var isCallable$i = isCallable$m;
var tryToString$4 = tryToString$5;

var $TypeError$b = TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$8 = function (argument) {
  if (isCallable$i(argument)) return argument;
  throw $TypeError$b(tryToString$4(argument) + ' is not a function');
};

var aCallable$7 = aCallable$8;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$4 = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable$7(func);
};

var call$g = functionCall;
var isCallable$h = isCallable$m;
var isObject$4 = isObject$7;

var $TypeError$a = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$h(fn = input.toString) && !isObject$4(val = call$g(fn, input))) return val;
  if (isCallable$h(fn = input.valueOf) && !isObject$4(val = call$g(fn, input))) return val;
  if (pref !== 'string' && isCallable$h(fn = input.toString) && !isObject$4(val = call$g(fn, input))) return val;
  throw $TypeError$a("Can't convert object to primitive value");
};

var call$f = functionCall;
var isObject$3 = isObject$7;
var isSymbol$1 = isSymbol$2;
var getMethod$3 = getMethod$4;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$f = wellKnownSymbol$g;

var $TypeError$9 = TypeError;
var TO_PRIMITIVE = wellKnownSymbol$f('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$1 = function (input, pref) {
  if (!isObject$3(input) || isSymbol$1(input)) return input;
  var exoticToPrim = getMethod$3(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call$f(exoticToPrim, input, pref);
    if (!isObject$3(result) || isSymbol$1(result)) return result;
    throw $TypeError$9("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol = isSymbol$2;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$3 = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

var DESCRIPTORS$8 = descriptors;
var IE8_DOM_DEFINE$1 = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$d = anObject$e;
var toPropertyKey$2 = toPropertyKey$3;

var $TypeError$8 = TypeError;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE$1 = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$8 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
  anObject$d(O);
  P = toPropertyKey$2(P);
  anObject$d(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor$1(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject$d(O);
  P = toPropertyKey$2(P);
  anObject$d(Attributes);
  if (IE8_DOM_DEFINE$1) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError$8('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var ceil = Math.ceil;
var floor$2 = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es-x/no-math-trunc -- safe
var mathTrunc = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor$2 : ceil)(n);
};

var trunc = mathTrunc;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
var toIntegerOrInfinity$4 = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};

var toIntegerOrInfinity$3 = toIntegerOrInfinity$4;

var max$2 = Math.max;
var min$2 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$2 = function (index, length) {
  var integer = toIntegerOrInfinity$3(index);
  return integer < 0 ? max$2(integer + length, 0) : min$2(integer, length);
};

var toIntegerOrInfinity$2 = toIntegerOrInfinity$4;

var min$1 = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$2 = function (argument) {
  return argument > 0 ? min$1(toIntegerOrInfinity$2(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength$1 = toLength$2;

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
var lengthOfArrayLike$4 = function (obj) {
  return toLength$1(obj.length);
};

var toIndexedObject$4 = toIndexedObject$5;
var toAbsoluteIndex$1 = toAbsoluteIndex$2;
var lengthOfArrayLike$3 = lengthOfArrayLike$4;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod$1 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$4($this);
    var length = lengthOfArrayLike$3(O);
    var index = toAbsoluteIndex$1(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$1(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$1(false)
};

var hiddenKeys$4 = {};

var uncurryThis$e = functionUncurryThis;
var hasOwn$9 = hasOwnProperty_1;
var toIndexedObject$3 = toIndexedObject$5;
var indexOf$1 = arrayIncludes.indexOf;
var hiddenKeys$3 = hiddenKeys$4;

var push$2 = uncurryThis$e([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$3(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn$9(hiddenKeys$3, key) && hasOwn$9(O, key) && push$2(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn$9(O, key = names[i++])) {
    ~indexOf$1(result, key) || push$2(result, key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$3 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es-x/no-object-keys -- safe
var objectKeys$2 = Object.keys || function keys(O) {
  return internalObjectKeys$1(O, enumBugKeys$2);
};

var DESCRIPTORS$7 = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule$5 = objectDefineProperty;
var anObject$c = anObject$e;
var toIndexedObject$2 = toIndexedObject$5;
var objectKeys$1 = objectKeys$2;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es-x/no-object-defineproperties -- safe
objectDefineProperties.f = DESCRIPTORS$7 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$c(O);
  var props = toIndexedObject$2(Properties);
  var keys = objectKeys$1(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule$5.f(O, key = keys[index++], props[key]);
  return O;
};

var getBuiltIn$5 = getBuiltIn$8;

var html$2 = getBuiltIn$5('document', 'documentElement');

var shared$2 = shared$4.exports;
var uid = uid$2;

var keys = shared$2('keys');

var sharedKey$3 = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

/* global ActiveXObject -- old IE, WSH */

var anObject$b = anObject$e;
var definePropertiesModule = objectDefineProperties;
var enumBugKeys$1 = enumBugKeys$3;
var hiddenKeys$2 = hiddenKeys$4;
var html$1 = html$2;
var documentCreateElement$1 = documentCreateElement$2;
var sharedKey$2 = sharedKey$3;

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO$1 = sharedKey$2('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement$1('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html$1.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys$1.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys$1[length]];
  return NullProtoObject();
};

hiddenKeys$2[IE_PROTO$1] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es-x/no-object-create -- safe
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject$b(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};

var wellKnownSymbol$e = wellKnownSymbol$g;
var create$2 = objectCreate;
var defineProperty$4 = objectDefineProperty.f;

var UNSCOPABLES = wellKnownSymbol$e('unscopables');
var ArrayPrototype$1 = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
  defineProperty$4(ArrayPrototype$1, UNSCOPABLES, {
    configurable: true,
    value: create$2(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables$1 = function (key) {
  ArrayPrototype$1[UNSCOPABLES][key] = true;
};

var iterators = {};

var uncurryThis$d = functionUncurryThis;
var isCallable$g = isCallable$m;
var store$1 = sharedStore;

var functionToString = uncurryThis$d(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$g(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource$4 = store$1.inspectSource;

var global$f = global$m;
var isCallable$f = isCallable$m;
var inspectSource$3 = inspectSource$4;

var WeakMap$1 = global$f.WeakMap;

var nativeWeakMap = isCallable$f(WeakMap$1) && /native code/.test(inspectSource$3(WeakMap$1));

var createPropertyDescriptor$4 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var DESCRIPTORS$6 = descriptors;
var definePropertyModule$4 = objectDefineProperty;
var createPropertyDescriptor$3 = createPropertyDescriptor$4;

var createNonEnumerableProperty$5 = DESCRIPTORS$6 ? function (object, key, value) {
  return definePropertyModule$4.f(object, key, createPropertyDescriptor$3(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var NATIVE_WEAK_MAP = nativeWeakMap;
var global$e = global$m;
var uncurryThis$c = functionUncurryThis;
var isObject$2 = isObject$7;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$5;
var hasOwn$8 = hasOwnProperty_1;
var shared$1 = sharedStore;
var sharedKey$1 = sharedKey$3;
var hiddenKeys$1 = hiddenKeys$4;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$2 = global$e.TypeError;
var WeakMap = global$e.WeakMap;
var set$1, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set$1(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$2(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$2('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared$1.state) {
  var store = shared$1.state || (shared$1.state = new WeakMap());
  var wmget = uncurryThis$c(store.get);
  var wmhas = uncurryThis$c(store.has);
  var wmset = uncurryThis$c(store.set);
  set$1 = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError$2(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey$1('state');
  hiddenKeys$1[STATE] = true;
  set$1 = function (it, metadata) {
    if (hasOwn$8(it, STATE)) throw new TypeError$2(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$4(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn$8(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn$8(it, STATE);
  };
}

var internalState = {
  set: set$1,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

var objectGetOwnPropertyDescriptor = {};

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$2(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

var DESCRIPTORS$5 = descriptors;
var call$e = functionCall;
var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
var createPropertyDescriptor$2 = createPropertyDescriptor$4;
var toIndexedObject$1 = toIndexedObject$5;
var toPropertyKey$1 = toPropertyKey$3;
var hasOwn$7 = hasOwnProperty_1;
var IE8_DOM_DEFINE = ie8DomDefine;

// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$5 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$1(O);
  P = toPropertyKey$1(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn$7(O, P)) return createPropertyDescriptor$2(!call$e(propertyIsEnumerableModule$1.f, O, P), O[P]);
};

var makeBuiltIn$2 = {exports: {}};

var DESCRIPTORS$4 = descriptors;
var hasOwn$6 = hasOwnProperty_1;

var FunctionPrototype$1 = Function.prototype;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS$4 && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn$6(FunctionPrototype$1, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS$4 || (DESCRIPTORS$4 && getDescriptor(FunctionPrototype$1, 'name').configurable));

var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

var fails$e = fails$l;
var isCallable$e = isCallable$m;
var hasOwn$5 = hasOwnProperty_1;
var DESCRIPTORS$3 = descriptors;
var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;
var inspectSource$2 = inspectSource$4;
var InternalStateModule$2 = internalState;

var enforceInternalState = InternalStateModule$2.enforce;
var getInternalState$2 = InternalStateModule$2.get;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty$3 = Object.defineProperty;

var CONFIGURABLE_LENGTH = DESCRIPTORS$3 && !fails$e(function () {
  return defineProperty$3(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn$1 = makeBuiltIn$2.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === 'Symbol(') {
    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn$5(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)) {
    defineProperty$3(value, 'name', { value: name, configurable: true });
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn$5(options, 'arity') && value.length !== options.arity) {
    defineProperty$3(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn$5(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS$3) defineProperty$3(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn$5(state, 'source')) {
    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn$1(function toString() {
  return isCallable$e(this) && getInternalState$2(this).source || inspectSource$2(this);
}, 'toString');

var isCallable$d = isCallable$m;
var definePropertyModule$3 = objectDefineProperty;
var makeBuiltIn = makeBuiltIn$2.exports;
var defineGlobalProperty$1 = defineGlobalProperty$3;

var defineBuiltIn$7 = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable$d(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty$1(key, value);
  } else {
    if (!options.unsafe) delete O[key];
    else if (O[key]) simple = true;
    if (simple) O[key] = value;
    else definePropertyModule$3.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};

var objectGetOwnPropertyNames = {};

var internalObjectKeys = objectKeysInternal;
var enumBugKeys = enumBugKeys$3;

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$4 = getBuiltIn$8;
var uncurryThis$b = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
var anObject$a = anObject$e;

var concat$2 = uncurryThis$b([].concat);

// all object keys, includes non-enumerable and symbols
var ownKeys$1 = getBuiltIn$4('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject$a(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
  return getOwnPropertySymbols ? concat$2(keys, getOwnPropertySymbols(it)) : keys;
};

var hasOwn$4 = hasOwnProperty_1;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule$2 = objectDefineProperty;

var copyConstructorProperties$1 = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule$2.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn$4(target, key) && !(exceptions && hasOwn$4(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

var fails$d = fails$l;
var isCallable$c = isCallable$m;

var replacement = /#|\.prototype\./;

var isForced$2 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable$c(detection) ? fails$d(detection)
    : !!detection;
};

var normalize = isForced$2.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$2.data = {};
var NATIVE = isForced$2.NATIVE = 'N';
var POLYFILL = isForced$2.POLYFILL = 'P';

var isForced_1 = isForced$2;

var global$d = global$m;
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$5;
var defineBuiltIn$6 = defineBuiltIn$7;
var defineGlobalProperty = defineGlobalProperty$3;
var copyConstructorProperties = copyConstructorProperties$1;
var isForced$1 = isForced_1;

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$d;
  } else if (STATIC) {
    target = global$d[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global$d[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor$1(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty$3(sourceProperty, 'sham', true);
    }
    defineBuiltIn$6(target, key, sourceProperty, options);
  }
};

var fails$c = fails$l;

var correctPrototypeGetter = !fails$c(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es-x/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var hasOwn$3 = hasOwnProperty_1;
var isCallable$b = isCallable$m;
var toObject$3 = toObject$5;
var sharedKey = sharedKey$3;
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

var IE_PROTO = sharedKey('IE_PROTO');
var $Object$1 = Object;
var ObjectPrototype = $Object$1.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es-x/no-object-getprototypeof -- safe
var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object$1.getPrototypeOf : function (O) {
  var object = toObject$3(O);
  if (hasOwn$3(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable$b(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object$1 ? ObjectPrototype : null;
};

var fails$b = fails$l;
var isCallable$a = isCallable$m;
var getPrototypeOf$1 = objectGetPrototypeOf;
var defineBuiltIn$5 = defineBuiltIn$7;
var wellKnownSymbol$d = wellKnownSymbol$g;

var ITERATOR$5 = wellKnownSymbol$d('iterator');
var BUGGY_SAFARI_ITERATORS$1 = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es-x/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$b(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype$2[ITERATOR$5].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable$a(IteratorPrototype$2[ITERATOR$5])) {
  defineBuiltIn$5(IteratorPrototype$2, ITERATOR$5, function () {
    return this;
  });
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$2,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
};

var defineProperty$2 = objectDefineProperty.f;
var hasOwn$2 = hasOwnProperty_1;
var wellKnownSymbol$c = wellKnownSymbol$g;

var TO_STRING_TAG$3 = wellKnownSymbol$c('toStringTag');

var setToStringTag$3 = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn$2(target, TO_STRING_TAG$3)) {
    defineProperty$2(target, TO_STRING_TAG$3, { configurable: true, value: TAG });
  }
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
var create$1 = objectCreate;
var createPropertyDescriptor$1 = createPropertyDescriptor$4;
var setToStringTag$2 = setToStringTag$3;
var Iterators$4 = iterators;

var returnThis$1 = function () { return this; };

var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create$1(IteratorPrototype$1, { next: createPropertyDescriptor$1(+!ENUMERABLE_NEXT, next) });
  setToStringTag$2(IteratorConstructor, TO_STRING_TAG, false);
  Iterators$4[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var isCallable$9 = isCallable$m;

var $String$1 = String;
var $TypeError$7 = TypeError;

var aPossiblePrototype$1 = function (argument) {
  if (typeof argument == 'object' || isCallable$9(argument)) return argument;
  throw $TypeError$7("Can't set " + $String$1(argument) + ' as a prototype');
};

/* eslint-disable no-proto -- safe */

var uncurryThis$a = functionUncurryThis;
var anObject$9 = anObject$e;
var aPossiblePrototype = aPossiblePrototype$1;

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es-x/no-object-setprototypeof -- safe
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis$a(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject$9(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var $$9 = _export;
var call$d = functionCall;
var FunctionName = functionName;
var isCallable$8 = isCallable$m;
var createIteratorConstructor = createIteratorConstructor$1;
var getPrototypeOf = objectGetPrototypeOf;
var setPrototypeOf$1 = objectSetPrototypeOf;
var setToStringTag$1 = setToStringTag$3;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$5;
var defineBuiltIn$4 = defineBuiltIn$7;
var wellKnownSymbol$b = wellKnownSymbol$g;
var Iterators$3 = iterators;
var IteratorsCore = iteratorsCore;

var PROPER_FUNCTION_NAME$1 = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$4 = wellKnownSymbol$b('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

var defineIterator$1 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$4]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf$1) {
          setPrototypeOf$1(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable$8(CurrentIteratorPrototype[ITERATOR$4])) {
          defineBuiltIn$4(CurrentIteratorPrototype, ITERATOR$4, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag$1(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME$1 && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty$2(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call$d(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        defineBuiltIn$4(IterablePrototype, KEY, methods[KEY]);
      }
    } else $$9({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if (IterablePrototype[ITERATOR$4] !== defaultIterator) {
    defineBuiltIn$4(IterablePrototype, ITERATOR$4, defaultIterator, { name: DEFAULT });
  }
  Iterators$3[NAME] = defaultIterator;

  return methods;
};

var toIndexedObject = toIndexedObject$5;
var addToUnscopables = addToUnscopables$1;
var Iterators$2 = iterators;
var InternalStateModule$1 = internalState;
var defineProperty$1 = objectDefineProperty.f;
var defineIterator = defineIterator$1;
var DESCRIPTORS$2 = descriptors;

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$1 = InternalStateModule$1.set;
var getInternalState$1 = InternalStateModule$1.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState$1(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$1(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = Iterators$2.Arguments = Iterators$2.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// V8 ~ Chrome 45- bug
if (DESCRIPTORS$2 && values.name !== 'values') try {
  defineProperty$1(values, 'name', { value: 'values' });
} catch (error) { /* empty */ }

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = documentCreateElement$2;

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;

var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

var global$c = global$m;
var DOMIterables = domIterables;
var DOMTokenListPrototype = domTokenListPrototype;
var ArrayIteratorMethods = es_array_iterator;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$5;
var wellKnownSymbol$a = wellKnownSymbol$g;

var ITERATOR$3 = wellKnownSymbol$a('iterator');
var TO_STRING_TAG$2 = wellKnownSymbol$a('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR$3] !== ArrayValues) try {
      createNonEnumerableProperty$1(CollectionPrototype, ITERATOR$3, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR$3] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG$2]) {
      createNonEnumerableProperty$1(CollectionPrototype, TO_STRING_TAG$2, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty$1(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global$c[COLLECTION_NAME] && global$c[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

var DESCRIPTORS$1 = descriptors;
var uncurryThis$9 = functionUncurryThis;
var call$c = functionCall;
var fails$a = fails$l;
var objectKeys = objectKeys$2;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var toObject$2 = toObject$5;
var IndexedObject = indexedObject;

// eslint-disable-next-line es-x/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
var defineProperty = Object.defineProperty;
var concat$1 = uncurryThis$9([].concat);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
var objectAssign = !$assign || fails$a(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS$1 && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es-x/no-symbol -- safe
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject$2(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? concat$1(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS$1 || call$c(propertyIsEnumerable, S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

var $$8 = _export;
var assign = objectAssign;

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es-x/no-object-assign -- required for testing
$$8({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign }, {
  assign: assign
});

var classof$5 = classofRaw$1;
var global$b = global$m;

var engineIsNode = classof$5(global$b.process) == 'process';

var getBuiltIn$3 = getBuiltIn$8;
var definePropertyModule$1 = objectDefineProperty;
var wellKnownSymbol$9 = wellKnownSymbol$g;
var DESCRIPTORS = descriptors;

var SPECIES$3 = wellKnownSymbol$9('species');

var setSpecies$1 = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$3(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule$1.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES$3]) {
    defineProperty(Constructor, SPECIES$3, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

var isPrototypeOf$2 = objectIsPrototypeOf;

var $TypeError$6 = TypeError;

var anInstance$1 = function (it, Prototype) {
  if (isPrototypeOf$2(Prototype, it)) return it;
  throw $TypeError$6('Incorrect invocation');
};

var wellKnownSymbol$8 = wellKnownSymbol$g;

var TO_STRING_TAG$1 = wellKnownSymbol$8('toStringTag');
var test$1 = {};

test$1[TO_STRING_TAG$1] = 'z';

var toStringTagSupport = String(test$1) === '[object z]';

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var isCallable$7 = isCallable$m;
var classofRaw = classofRaw$1;
var wellKnownSymbol$7 = wellKnownSymbol$g;

var TO_STRING_TAG = wellKnownSymbol$7('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$4 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable$7(O.callee) ? 'Arguments' : result;
};

var uncurryThis$8 = functionUncurryThis;
var fails$9 = fails$l;
var isCallable$6 = isCallable$m;
var classof$3 = classof$4;
var getBuiltIn$2 = getBuiltIn$8;
var inspectSource$1 = inspectSource$4;

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn$2('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec$1 = uncurryThis$8(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable$6(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable$6(argument)) return false;
  switch (classof$3(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec$1(constructorRegExp, inspectSource$1(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
var isConstructor$1 = !construct || fails$9(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;

var isConstructor = isConstructor$1;
var tryToString$3 = tryToString$5;

var $TypeError$5 = TypeError;

// `Assert: IsConstructor(argument) is true`
var aConstructor$1 = function (argument) {
  if (isConstructor(argument)) return argument;
  throw $TypeError$5(tryToString$3(argument) + ' is not a constructor');
};

var anObject$8 = anObject$e;
var aConstructor = aConstructor$1;
var wellKnownSymbol$6 = wellKnownSymbol$g;

var SPECIES$2 = wellKnownSymbol$6('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
var speciesConstructor$1 = function (O, defaultConstructor) {
  var C = anObject$8(O).constructor;
  var S;
  return C === undefined || (S = anObject$8(C)[SPECIES$2]) == undefined ? defaultConstructor : aConstructor(S);
};

var NATIVE_BIND$1 = functionBindNative;

var FunctionPrototype = Function.prototype;
var apply$2 = FunctionPrototype.apply;
var call$b = FunctionPrototype.call;

// eslint-disable-next-line es-x/no-reflect -- safe
var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$1 ? call$b.bind(apply$2) : function () {
  return call$b.apply(apply$2, arguments);
});

var uncurryThis$7 = functionUncurryThis;
var aCallable$6 = aCallable$8;
var NATIVE_BIND = functionBindNative;

var bind$4 = uncurryThis$7(uncurryThis$7.bind);

// optional / simple context binding
var functionBindContext = function (fn, that) {
  aCallable$6(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind$4(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var uncurryThis$6 = functionUncurryThis;

var arraySlice$2 = uncurryThis$6([].slice);

var $TypeError$4 = TypeError;

var validateArgumentsLength$1 = function (passed, required) {
  if (passed < required) throw $TypeError$4('Not enough arguments');
  return passed;
};

var userAgent$4 = engineUserAgent;

var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$4);

var global$a = global$m;
var apply$1 = functionApply;
var bind$3 = functionBindContext;
var isCallable$5 = isCallable$m;
var hasOwn$1 = hasOwnProperty_1;
var fails$8 = fails$l;
var html = html$2;
var arraySlice$1 = arraySlice$2;
var createElement = documentCreateElement$2;
var validateArgumentsLength = validateArgumentsLength$1;
var IS_IOS$1 = engineIsIos;
var IS_NODE$2 = engineIsNode;

var set = global$a.setImmediate;
var clear = global$a.clearImmediate;
var process$2 = global$a.process;
var Dispatch = global$a.Dispatch;
var Function$1 = global$a.Function;
var MessageChannel = global$a.MessageChannel;
var String$1 = global$a.String;
var counter = 0;
var queue$1 = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var location, defer, channel, port;

try {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  location = global$a.location;
} catch (error) { /* empty */ }

var run = function (id) {
  if (hasOwn$1(queue$1, id)) {
    var fn = queue$1[id];
    delete queue$1[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global$a.postMessage(String$1(id), location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(handler) {
    validateArgumentsLength(arguments.length, 1);
    var fn = isCallable$5(handler) ? handler : Function$1(handler);
    var args = arraySlice$1(arguments, 1);
    queue$1[++counter] = function () {
      apply$1(fn, undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue$1[id];
  };
  // Node.js 0.8-
  if (IS_NODE$2) {
    defer = function (id) {
      process$2.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS$1) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind$3(port.postMessage, port);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global$a.addEventListener &&
    isCallable$5(global$a.postMessage) &&
    !global$a.importScripts &&
    location && location.protocol !== 'file:' &&
    !fails$8(post)
  ) {
    defer = post;
    global$a.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

var task$1 = {
  set: set,
  clear: clear
};

var userAgent$3 = engineUserAgent;
var global$9 = global$m;

var engineIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$3) && global$9.Pebble !== undefined;

var userAgent$2 = engineUserAgent;

var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent$2);

var global$8 = global$m;
var bind$2 = functionBindContext;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var macrotask = task$1.set;
var IS_IOS = engineIsIos;
var IS_IOS_PEBBLE = engineIsIosPebble;
var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
var IS_NODE$1 = engineIsNode;

var MutationObserver = global$8.MutationObserver || global$8.WebKitMutationObserver;
var document$2 = global$8.document;
var process$1 = global$8.process;
var Promise$1 = global$8.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global$8, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify$1, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE$1 && (parent = process$1.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify$1();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE$1 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
    toggle = true;
    node = document$2.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify$1 = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise$1.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise$1;
    then = bind$2(promise.then, promise);
    notify$1 = function () {
      then(flush);
    };
  // Node.js without promises
  } else if (IS_NODE$1) {
    notify$1 = function () {
      process$1.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessage
  // - onreadystatechange
  // - setTimeout
  } else {
    // strange IE + webpack dev server bug - use .bind(global)
    macrotask = bind$2(macrotask, global$8);
    notify$1 = function () {
      macrotask(flush);
    };
  }
}

var microtask$1 = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify$1();
  } last = task;
};

var global$7 = global$m;

var hostReportErrors$1 = function (a, b) {
  var console = global$7.console;
  if (console && console.error) {
    arguments.length == 1 ? console.error(a) : console.error(a, b);
  }
};

var perform$3 = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

var Queue$1 = function () {
  this.head = null;
  this.tail = null;
};

Queue$1.prototype = {
  add: function (item) {
    var entry = { item: item, next: null };
    if (this.head) this.tail.next = entry;
    else this.head = entry;
    this.tail = entry;
  },
  get: function () {
    var entry = this.head;
    if (entry) {
      this.head = entry.next;
      if (this.tail === entry) this.tail = null;
      return entry.item;
    }
  }
};

var queue = Queue$1;

var global$6 = global$m;

var promiseNativeConstructor = global$6.Promise;

var engineIsBrowser = typeof window == 'object' && typeof Deno != 'object';

var global$5 = global$m;
var NativePromiseConstructor$3 = promiseNativeConstructor;
var isCallable$4 = isCallable$m;
var isForced = isForced_1;
var inspectSource = inspectSource$4;
var wellKnownSymbol$5 = wellKnownSymbol$g;
var IS_BROWSER = engineIsBrowser;
var V8_VERSION = engineV8Version;

NativePromiseConstructor$3 && NativePromiseConstructor$3.prototype;
var SPECIES$1 = wellKnownSymbol$5('species');
var SUBCLASSING = false;
var NATIVE_PROMISE_REJECTION_EVENT$1 = isCallable$4(global$5.PromiseRejectionEvent);

var FORCED_PROMISE_CONSTRUCTOR$5 = isForced('Promise', function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor$3);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor$3);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = new NativePromiseConstructor$3(function (resolve) { resolve(1); });
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES$1] = FakePromise;
  SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
  if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_PROMISE_REJECTION_EVENT$1;
});

var promiseConstructorDetection = {
  CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR$5,
  REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT$1,
  SUBCLASSING: SUBCLASSING
};

var newPromiseCapability$2 = {};

var aCallable$5 = aCallable$8;

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable$5(resolve);
  this.reject = aCallable$5(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
newPromiseCapability$2.f = function (C) {
  return new PromiseCapability(C);
};

var $$7 = _export;
var IS_NODE = engineIsNode;
var global$4 = global$m;
var call$a = functionCall;
var defineBuiltIn$3 = defineBuiltIn$7;
var setPrototypeOf = objectSetPrototypeOf;
var setToStringTag = setToStringTag$3;
var setSpecies = setSpecies$1;
var aCallable$4 = aCallable$8;
var isCallable$3 = isCallable$m;
var isObject$1 = isObject$7;
var anInstance = anInstance$1;
var speciesConstructor = speciesConstructor$1;
var task = task$1.set;
var microtask = microtask$1;
var hostReportErrors = hostReportErrors$1;
var perform$2 = perform$3;
var Queue = queue;
var InternalStateModule = internalState;
var NativePromiseConstructor$2 = promiseNativeConstructor;
var PromiseConstructorDetection = promiseConstructorDetection;
var newPromiseCapabilityModule$3 = newPromiseCapability$2;

var PROMISE = 'Promise';
var FORCED_PROMISE_CONSTRUCTOR$4 = PromiseConstructorDetection.CONSTRUCTOR;
var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var setInternalState = InternalStateModule.set;
var NativePromisePrototype$1 = NativePromiseConstructor$2 && NativePromiseConstructor$2.prototype;
var PromiseConstructor = NativePromiseConstructor$2;
var PromisePrototype = NativePromisePrototype$1;
var TypeError$1 = global$4.TypeError;
var document$1 = global$4.document;
var process = global$4.process;
var newPromiseCapability$1 = newPromiseCapabilityModule$3.f;
var newGenericPromiseCapability = newPromiseCapability$1;

var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$4.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;

var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

// helpers
var isThenable = function (it) {
  var then;
  return isObject$1(it) && isCallable$3(then = it.then) ? then : false;
};

var callReaction = function (reaction, state) {
  var value = state.value;
  var ok = state.state == FULFILLED;
  var handler = ok ? reaction.ok : reaction.fail;
  var resolve = reaction.resolve;
  var reject = reaction.reject;
  var domain = reaction.domain;
  var result, then, exited;
  try {
    if (handler) {
      if (!ok) {
        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
        state.rejection = HANDLED;
      }
      if (handler === true) result = value;
      else {
        if (domain) domain.enter();
        result = handler(value); // can throw
        if (domain) {
          domain.exit();
          exited = true;
        }
      }
      if (result === reaction.promise) {
        reject(TypeError$1('Promise-chain cycle'));
      } else if (then = isThenable(result)) {
        call$a(then, result, resolve, reject);
      } else resolve(result);
    } else reject(value);
  } catch (error) {
    if (domain && !exited) domain.exit();
    reject(error);
  }
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  microtask(function () {
    var reactions = state.reactions;
    var reaction;
    while (reaction = reactions.get()) {
      callReaction(reaction, state);
    }
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document$1.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global$4.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global$4['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  call$a(task, global$4, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform$2(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  call$a(task, global$4, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind$1 = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          call$a(then, value,
            bind$1(internalResolve, wrapper, state),
            bind$1(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED_PROMISE_CONSTRUCTOR$4) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromisePrototype);
    aCallable$4(executor);
    call$a(Internal, this);
    var state = getInternalPromiseState(this);
    try {
      executor(bind$1(internalResolve, state), bind$1(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };

  PromisePrototype = PromiseConstructor.prototype;

  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: new Queue(),
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };

  // `Promise.prototype.then` method
  // https://tc39.es/ecma262/#sec-promise.prototype.then
  Internal.prototype = defineBuiltIn$3(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
    var state = getInternalPromiseState(this);
    var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
    state.parent = true;
    reaction.ok = isCallable$3(onFulfilled) ? onFulfilled : true;
    reaction.fail = isCallable$3(onRejected) && onRejected;
    reaction.domain = IS_NODE ? process.domain : undefined;
    if (state.state == PENDING) state.reactions.add(reaction);
    else microtask(function () {
      callReaction(reaction, state);
    });
    return reaction.promise;
  });

  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalPromiseState(promise);
    this.promise = promise;
    this.resolve = bind$1(internalResolve, state);
    this.reject = bind$1(internalReject, state);
  };

  newPromiseCapabilityModule$3.f = newPromiseCapability$1 = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (isCallable$3(NativePromiseConstructor$2) && NativePromisePrototype$1 !== Object.prototype) {
    nativeThen = NativePromisePrototype$1.then;

    if (!NATIVE_PROMISE_SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      defineBuiltIn$3(NativePromisePrototype$1, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          call$a(nativeThen, that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype$1.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype$1, PromisePrototype);
    }
  }
}

$$7({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR$4 }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false);
setSpecies(PROMISE);

var wellKnownSymbol$4 = wellKnownSymbol$g;
var Iterators$1 = iterators;

var ITERATOR$2 = wellKnownSymbol$4('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod$1 = function (it) {
  return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$2] === it);
};

var classof$2 = classof$4;
var getMethod$2 = getMethod$4;
var Iterators = iterators;
var wellKnownSymbol$3 = wellKnownSymbol$g;

var ITERATOR$1 = wellKnownSymbol$3('iterator');

var getIteratorMethod$2 = function (it) {
  if (it != undefined) return getMethod$2(it, ITERATOR$1)
    || getMethod$2(it, '@@iterator')
    || Iterators[classof$2(it)];
};

var call$9 = functionCall;
var aCallable$3 = aCallable$8;
var anObject$7 = anObject$e;
var tryToString$2 = tryToString$5;
var getIteratorMethod$1 = getIteratorMethod$2;

var $TypeError$3 = TypeError;

var getIterator$1 = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$1(argument) : usingIterator;
  if (aCallable$3(iteratorMethod)) return anObject$7(call$9(iteratorMethod, argument));
  throw $TypeError$3(tryToString$2(argument) + ' is not iterable');
};

var call$8 = functionCall;
var anObject$6 = anObject$e;
var getMethod$1 = getMethod$4;

var iteratorClose$1 = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject$6(iterator);
  try {
    innerResult = getMethod$1(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call$8(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject$6(innerResult);
  return value;
};

var bind = functionBindContext;
var call$7 = functionCall;
var anObject$5 = anObject$e;
var tryToString$1 = tryToString$5;
var isArrayIteratorMethod = isArrayIteratorMethod$1;
var lengthOfArrayLike$2 = lengthOfArrayLike$4;
var isPrototypeOf$1 = objectIsPrototypeOf;
var getIterator = getIterator$1;
var getIteratorMethod = getIteratorMethod$2;
var iteratorClose = iteratorClose$1;

var $TypeError$2 = TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

var iterate$2 = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject$5(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw $TypeError$2(tryToString$1(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike$2(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf$1(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = iterator.next;
  while (!(step = call$7(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && isPrototypeOf$1(ResultPrototype, result)) return result;
  } return new Result(false);
};

var wellKnownSymbol$2 = wellKnownSymbol$g;

var ITERATOR = wellKnownSymbol$2('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es-x/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

var NativePromiseConstructor$1 = promiseNativeConstructor;
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
var FORCED_PROMISE_CONSTRUCTOR$3 = promiseConstructorDetection.CONSTRUCTOR;

var promiseStaticsIncorrectIteration = FORCED_PROMISE_CONSTRUCTOR$3 || !checkCorrectnessOfIteration(function (iterable) {
  NativePromiseConstructor$1.all(iterable).then(undefined, function () { /* empty */ });
});

var $$6 = _export;
var call$6 = functionCall;
var aCallable$2 = aCallable$8;
var newPromiseCapabilityModule$2 = newPromiseCapability$2;
var perform$1 = perform$3;
var iterate$1 = iterate$2;
var PROMISE_STATICS_INCORRECT_ITERATION$1 = promiseStaticsIncorrectIteration;

// `Promise.all` method
// https://tc39.es/ecma262/#sec-promise.all
$$6({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION$1 }, {
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule$2.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform$1(function () {
      var $promiseResolve = aCallable$2(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate$1(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        remaining++;
        call$6($promiseResolve, C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var $$5 = _export;
var FORCED_PROMISE_CONSTRUCTOR$2 = promiseConstructorDetection.CONSTRUCTOR;
var NativePromiseConstructor = promiseNativeConstructor;
var getBuiltIn$1 = getBuiltIn$8;
var isCallable$2 = isCallable$m;
var defineBuiltIn$2 = defineBuiltIn$7;

var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

// `Promise.prototype.catch` method
// https://tc39.es/ecma262/#sec-promise.prototype.catch
$$5({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR$2, real: true }, {
  'catch': function (onRejected) {
    return this.then(undefined, onRejected);
  }
});

// makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
if (isCallable$2(NativePromiseConstructor)) {
  var method = getBuiltIn$1('Promise').prototype['catch'];
  if (NativePromisePrototype['catch'] !== method) {
    defineBuiltIn$2(NativePromisePrototype, 'catch', method, { unsafe: true });
  }
}

var $$4 = _export;
var call$5 = functionCall;
var aCallable$1 = aCallable$8;
var newPromiseCapabilityModule$1 = newPromiseCapability$2;
var perform = perform$3;
var iterate = iterate$2;
var PROMISE_STATICS_INCORRECT_ITERATION = promiseStaticsIncorrectIteration;

// `Promise.race` method
// https://tc39.es/ecma262/#sec-promise.race
$$4({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule$1.f(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable$1(C.resolve);
      iterate(iterable, function (promise) {
        call$5($promiseResolve, C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var $$3 = _export;
var call$4 = functionCall;
var newPromiseCapabilityModule = newPromiseCapability$2;
var FORCED_PROMISE_CONSTRUCTOR$1 = promiseConstructorDetection.CONSTRUCTOR;

// `Promise.reject` method
// https://tc39.es/ecma262/#sec-promise.reject
$$3({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR$1 }, {
  reject: function reject(r) {
    var capability = newPromiseCapabilityModule.f(this);
    call$4(capability.reject, undefined, r);
    return capability.promise;
  }
});

var anObject$4 = anObject$e;
var isObject = isObject$7;
var newPromiseCapability = newPromiseCapability$2;

var promiseResolve$1 = function (C, x) {
  anObject$4(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var $$2 = _export;
var getBuiltIn = getBuiltIn$8;
var FORCED_PROMISE_CONSTRUCTOR = promiseConstructorDetection.CONSTRUCTOR;
var promiseResolve = promiseResolve$1;

getBuiltIn('Promise');

// `Promise.resolve` method
// https://tc39.es/ecma262/#sec-promise.resolve
$$2({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
  resolve: function resolve(x) {
    return promiseResolve(this, x);
  }
});

var classof$1 = classof$4;

var $String = String;

var toString$4 = function (argument) {
  if (classof$1(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};

var anObject$3 = anObject$e;

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags$1 = function () {
  var that = anObject$3(this);
  var result = '';
  if (that.hasIndices) result += 'd';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

var fails$7 = fails$l;
var global$3 = global$m;

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp$2 = global$3.RegExp;

var UNSUPPORTED_Y$1 = fails$7(function () {
  var re = $RegExp$2('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY = UNSUPPORTED_Y$1 || fails$7(function () {
  return !$RegExp$2('a', 'y').sticky;
});

var BROKEN_CARET = UNSUPPORTED_Y$1 || fails$7(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp$2('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

var regexpStickyHelpers = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y$1
};

var fails$6 = fails$l;
var global$2 = global$m;

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp$1 = global$2.RegExp;

var regexpUnsupportedDotAll = fails$6(function () {
  var re = $RegExp$1('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});

var fails$5 = fails$l;
var global$1 = global$m;

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global$1.RegExp;

var regexpUnsupportedNcg = fails$5(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call$3 = functionCall;
var uncurryThis$5 = functionUncurryThis;
var toString$3 = toString$4;
var regexpFlags = regexpFlags$1;
var stickyHelpers = regexpStickyHelpers;
var shared = shared$4.exports;
var create = objectCreate;
var getInternalState = internalState.get;
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG = regexpUnsupportedNcg;

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt$3 = uncurryThis$5(''.charAt);
var indexOf = uncurryThis$5(''.indexOf);
var replace$1 = uncurryThis$5(''.replace);
var stringSlice$3 = uncurryThis$5(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call$3(nativeExec, re1, 'a');
  call$3(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString$3(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call$3(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call$3(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace$1(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice$3(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$3(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call$3(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice$3(match.input, charsAdded);
        match[0] = stringSlice$3(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      call$3(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

var regexpExec$2 = patchedExec;

var $$1 = _export;
var exec = regexpExec$2;

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$$1({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});

// TODO: Remove from `core-js@4` since it's moved to entry points

var uncurryThis$4 = functionUncurryThis;
var defineBuiltIn$1 = defineBuiltIn$7;
var regexpExec$1 = regexpExec$2;
var fails$4 = fails$l;
var wellKnownSymbol$1 = wellKnownSymbol$g;
var createNonEnumerableProperty = createNonEnumerableProperty$5;

var SPECIES = wellKnownSymbol$1('species');
var RegExpPrototype$2 = RegExp.prototype;

var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol$1(KEY);

  var DELEGATES_TO_SYMBOL = !fails$4(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$4(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var uncurriedNativeRegExpMethod = uncurryThis$4(/./[SYMBOL]);
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis$4(nativeMethod);
      var $exec = regexp.exec;
      if ($exec === regexpExec$1 || $exec === RegExpPrototype$2.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
        }
        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
      }
      return { done: false };
    });

    defineBuiltIn$1(String.prototype, KEY, methods[0]);
    defineBuiltIn$1(RegExpPrototype$2, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype$2[SYMBOL], 'sham', true);
};

var uncurryThis$3 = functionUncurryThis;
var toIntegerOrInfinity$1 = toIntegerOrInfinity$4;
var toString$2 = toString$4;
var requireObjectCoercible$1 = requireObjectCoercible$4;

var charAt$2 = uncurryThis$3(''.charAt);
var charCodeAt = uncurryThis$3(''.charCodeAt);
var stringSlice$2 = uncurryThis$3(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString$2(requireObjectCoercible$1($this));
    var position = toIntegerOrInfinity$1(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt$2(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice$2(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};

var charAt$1 = stringMultibyte.charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
var advanceStringIndex$1 = function (S, index, unicode) {
  return index + (unicode ? charAt$1(S, index).length : 1);
};

var uncurryThis$2 = functionUncurryThis;
var toObject$1 = toObject$5;

var floor$1 = Math.floor;
var charAt = uncurryThis$2(''.charAt);
var replace = uncurryThis$2(''.replace);
var stringSlice$1 = uncurryThis$2(''.slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject$1(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice$1(str, 0, position);
      case "'": return stringSlice$1(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice$1(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor$1(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};

var call$2 = functionCall;
var anObject$2 = anObject$e;
var isCallable$1 = isCallable$m;
var classof = classofRaw$1;
var regexpExec = regexpExec$2;

var $TypeError$1 = TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (isCallable$1(exec)) {
    var result = call$2(exec, R, S);
    if (result !== null) anObject$2(result);
    return result;
  }
  if (classof(R) === 'RegExp') return call$2(regexpExec, R, S);
  throw $TypeError$1('RegExp#exec called on incompatible receiver');
};

var apply = functionApply;
var call$1 = functionCall;
var uncurryThis$1 = functionUncurryThis;
var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
var fails$3 = fails$l;
var anObject$1 = anObject$e;
var isCallable = isCallable$m;
var toIntegerOrInfinity = toIntegerOrInfinity$4;
var toLength = toLength$2;
var toString$1 = toString$4;
var requireObjectCoercible = requireObjectCoercible$4;
var advanceStringIndex = advanceStringIndex$1;
var getMethod = getMethod$4;
var getSubstitution = getSubstitution$1;
var regExpExec = regexpExecAbstract;
var wellKnownSymbol = wellKnownSymbol$g;

var REPLACE = wellKnownSymbol('replace');
var max$1 = Math.max;
var min = Math.min;
var concat = uncurryThis$1([].concat);
var push$1 = uncurryThis$1([].push);
var stringIndexOf = uncurryThis$1(''.indexOf);
var stringSlice = uncurryThis$1(''.slice);

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$3(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : getMethod(searchValue, REPLACE);
      return replacer
        ? call$1(replacer, searchValue, O, replaceValue)
        : call$1(nativeReplace, toString$1(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject$1(this);
      var S = toString$1(string);

      if (
        typeof replaceValue == 'string' &&
        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
        stringIndexOf(replaceValue, '$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = isCallable(replaceValue);
      if (!functionalReplace) replaceValue = toString$1(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        push$1(results, result);
        if (!global) break;

        var matchStr = toString$1(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = toString$1(result[0]);
        var position = max$1(min(toIntegerOrInfinity(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) push$1(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== undefined) push$1(replacerArgs, namedCaptures);
          var replacement = toString$1(apply(replaceValue, undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + stringSlice(S, nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

var styles$5 = {"obs":"observation-module_obs__dWhTB","image":"observation-module_image__khpXf"};

const Observation = ({
  imageUrl,
  linkUrl,
  children
}) => {
  const gotoObservation = useCallback(() => {
    window.open(linkUrl);
  }, [linkUrl]);
  return jsxs("article", Object.assign({
    className: styles$5.obs,
    onClick: gotoObservation
  }, {
    children: [jsx("div", {
      style: {
        width: 200,
        height: 200,
        overflow: "hidden",
        borderRadius: 5,
        background: `url(${imageUrl}) 50% 50% no-repeat`,
        margin: "0 auto",
        backgroundSize: "cover"
      }
    }), children]
  }));
};

var styles$4 = {"page":"general-module_page__FxUnt","grid":"general-module_grid__x3dH-","obsLabel":"general-module_obsLabel__fZ18d","loader":"general-module_loader__Tcx4R","loaderBg":"general-module_loaderBg__wsjnN","count":"general-module_count__1RFbc"};

const Loader = ({
  loading
}) => {
  let loaderClasses = styles$4.loader; // if (loading) {
  //     loaderClasses += ` ${styles.loading}`;
  // }

  if (!loading) {
    return null;
  }

  return jsxs("div", Object.assign({
    className: loaderClasses
  }, {
    children: [jsx("div", {
      className: styles$4.loaderBg
    }), jsx(LoadingSpinner, {
      color: "#000000"
    })]
  }));
};

const BASE_API_URL = 'https://api.inaturalist.org';
const PER_PAGE = 100;
const DEFAULT_TAXON_ID = 47157; // Lepidoptera

const DEFAULT_PLACE_ID = 7085; // BC

const BASE_URL = "https://www.inaturalist.org"; // /people/justin_demerchant

const getRecentObservations = ({
  taxonId,
  placeId,
  perPage
}) => __awaiter(void 0, void 0, void 0, function* () {
  const url = `${BASE_API_URL}/v1/observations?photos=true&per_page=${perPage}&taxon_id=${taxonId}&place_id=${placeId}&order=desc&order_by=observed_on`;
  const response = yield fetch(url);
  const obs = yield response.json();
  return {
    totalResults: obs.total_results,
    results: obs.results.map(obs => {
      var _a;

      return {
        id: obs.id,
        imageUrl: obs.observation_photos[0].photo.url,
        obsUrl: obs.uri,
        obsDate: obs.observed_on_string,
        taxonName: ((_a = obs === null || obs === void 0 ? void 0 : obs.taxon) === null || _a === void 0 ? void 0 : _a.name) || "",
        taxonCommonName: obs === null || obs === void 0 ? void 0 : obs.taxon.preferred_common_name,
        observerUsername: obs.user.login
      };
    })
  };
});

var recentObservations = /*#__PURE__*/Object.freeze({
	__proto__: null,
	getRecentObservations: getRecentObservations
});

var styles$3 = {"panel":"recent-observations-module_panel__fOdhc"};

var DataSource;

(function (DataSource) {
  DataSource["autoLoad"] = "autoLoad";
  DataSource["dataProp"] = "dataProp";
  DataSource["url"] = "url";
})(DataSource || (DataSource = {}));

var INatApi;

(function (INatApi) {
  INatApi["recentObservations"] = "recentObservations";
  INatApi["commonTaxa"] = "commonTaxa";
  INatApi["favourites"] = "favourites";
  INatApi["stats"] = "stats";
})(INatApi || (INatApi = {}));

var Tab;

(function (Tab) {
  Tab["recent"] = "recent";
  Tab["favourites"] = "favourites";
  Tab["mostCommon"] = "mostCommon";
  Tab["stats"] = "stats";
})(Tab || (Tab = {}));

const NoResults = () => {
  return jsx("p", {
    children: "No results found."
  });
};

const getCurrentYear = () => new Date().getFullYear(); // not 100% this shows the date in the right timezone, but it's fine for BC

const formatDate = (date, dateFormat = "MMM do, h:mm b") => {
  let formattedDate = "";

  try {
    formattedDate = format(Date.parse(date), dateFormat);
  } catch (e) {
    console.log("Failed to parse date: ", date);
  }

  return formattedDate;
};

var dateUtils = /*#__PURE__*/Object.freeze({
	__proto__: null,
	getCurrentYear: getCurrentYear,
	formatDate: formatDate
});

const RecentObservationLabel = obs => jsxs("div", Object.assign({
  className: styles$4.obsLabel
}, {
  children: [jsx("h3", {
    children: obs.taxonCommonName || obs.taxonName
  }), jsx("div", {
    children: formatDate(obs.obsDate)
  }), jsx("div", {
    children: jsx("a", Object.assign({
      href: `${BASE_URL}/people/${obs.observerUsername}`,
      target: "_blank",
      rel: "noreferrer",
      onClick: e => e.stopPropagation()
    }, {
      children: obs.observerUsername
    }))
  })]
}));
const RecentObservations = ({
  taxonId,
  placeId,
  data,
  dataUrl,
  source: _source = DataSource.autoLoad,
  perPage: _perPage = PER_PAGE,
  components,
  className
}) => {
  const [loading, setLoading] = useState(false);
  const [observations, setObservations] = useState(() => _source === DataSource.dataProp ? data : []);
  useEffect(() => {
    if (_source !== DataSource.autoLoad) {
      return;
    }

    if (!taxonId) {
      console.error("Please supply a `taxonId` prop for the `autoLoad` source prop option.");
      return;
    }

    if (!placeId) {
      console.error("Please supply a `placeId` prop for the `autoLoad` source prop option.");
      return;
    }

    (() => __awaiter(void 0, void 0, void 0, function* () {
      setLoading(true);
      const obs = yield getRecentObservations({
        taxonId,
        placeId,
        perPage: _perPage
      });
      setObservations(obs.results);
      setLoading(false);
    }))();
  }, [_source, taxonId, placeId, _perPage]);
  useEffect(() => {
    if (_source !== DataSource.url) {
      return;
    }

    if (!dataUrl) {
      console.error("Please supply a `dataUrl` prop for the `url` source prop option.");
      return;
    }

    (() => __awaiter(void 0, void 0, void 0, function* () {
      setLoading(true);
      const obs = yield fetch(dataUrl);
      const json = yield obs.json();
      setObservations(json.results);
      setLoading(false);
    }))();
  }, [_source, dataUrl]);
  const Load = (components === null || components === void 0 ? void 0 : components.loader) ? components.loader : Loader;
  const Label = (components === null || components === void 0 ? void 0 : components.label) ? components.label : RecentObservationLabel;
  let classes = styles$3.panel;

  if (className) {
    classes += ` ${className}`;
  }

  return jsxs("div", Object.assign({
    className: classes
  }, {
    children: [jsx(Load, {
      loading: loading
    }), jsxs("div", Object.assign({
      className: styles$4.grid
    }, {
      children: [!loading && observations.length === 0 && jsx(NoResults, {}), observations.map(obs => jsx(Observation, Object.assign({
        imageUrl: obs.imageUrl.replace(/square/, "medium"),
        linkUrl: obs.obsUrl
      }, {
        children: jsx(Label, Object.assign({}, obs))
      }), obs.id))]
    }))]
  }));
};

var tryToString = tryToString$5;

var $TypeError = TypeError;

var deletePropertyOrThrow$1 = function (O, P) {
  if (!delete O[P]) throw $TypeError('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
};

var toPropertyKey = toPropertyKey$3;
var definePropertyModule = objectDefineProperty;
var createPropertyDescriptor = createPropertyDescriptor$4;

var createProperty$1 = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};

var toAbsoluteIndex = toAbsoluteIndex$2;
var lengthOfArrayLike$1 = lengthOfArrayLike$4;
var createProperty = createProperty$1;

var $Array = Array;
var max = Math.max;

var arraySliceSimple = function (O, start, end) {
  var length = lengthOfArrayLike$1(O);
  var k = toAbsoluteIndex(start, length);
  var fin = toAbsoluteIndex(end === undefined ? length : end, length);
  var result = $Array(max(fin - k, 0));
  for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);
  result.length = n;
  return result;
};

var arraySlice = arraySliceSimple;

var floor = Math.floor;

var mergeSort = function (array, comparefn) {
  var length = array.length;
  var middle = floor(length / 2);
  return length < 8 ? insertionSort(array, comparefn) : merge(
    array,
    mergeSort(arraySlice(array, 0, middle), comparefn),
    mergeSort(arraySlice(array, middle), comparefn),
    comparefn
  );
};

var insertionSort = function (array, comparefn) {
  var length = array.length;
  var i = 1;
  var element, j;

  while (i < length) {
    j = i;
    element = array[i];
    while (j && comparefn(array[j - 1], element) > 0) {
      array[j] = array[--j];
    }
    if (j !== i++) array[j] = element;
  } return array;
};

var merge = function (array, left, right, comparefn) {
  var llength = left.length;
  var rlength = right.length;
  var lindex = 0;
  var rindex = 0;

  while (lindex < llength || rindex < rlength) {
    array[lindex + rindex] = (lindex < llength && rindex < rlength)
      ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
      : lindex < llength ? left[lindex++] : right[rindex++];
  } return array;
};

var arraySort = mergeSort;

var fails$2 = fails$l;

var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails$2(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};

var userAgent$1 = engineUserAgent;

var firefox = userAgent$1.match(/firefox\/(\d+)/i);

var engineFfVersion = !!firefox && +firefox[1];

var UA = engineUserAgent;

var engineIsIeOrEdge = /MSIE|Trident/.test(UA);

var userAgent = engineUserAgent;

var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

var engineWebkitVersion = !!webkit && +webkit[1];

var $ = _export;
var uncurryThis = functionUncurryThis;
var aCallable = aCallable$8;
var toObject = toObject$5;
var lengthOfArrayLike = lengthOfArrayLike$4;
var deletePropertyOrThrow = deletePropertyOrThrow$1;
var toString = toString$4;
var fails$1 = fails$l;
var internalSort = arraySort;
var arrayMethodIsStrict = arrayMethodIsStrict$1;
var FF = engineFfVersion;
var IE_OR_EDGE = engineIsIeOrEdge;
var V8 = engineV8Version;
var WEBKIT = engineWebkitVersion;

var test = [];
var un$Sort = uncurryThis(test.sort);
var push = uncurryThis(test.push);

// IE8-
var FAILS_ON_UNDEFINED = fails$1(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails$1(function () {
  test.sort(null);
});
// Old WebKit
var STRICT_METHOD = arrayMethodIsStrict('sort');

var STABLE_SORT = !fails$1(function () {
  // feature detection can be too slow, so check engines versions
  if (V8) return V8 < 70;
  if (FF && FF > 3) return;
  if (IE_OR_EDGE) return true;
  if (WEBKIT) return WEBKIT < 603;

  var result = '';
  var code, chr, value, index;

  // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
  for (code = 65; code < 76; code++) {
    chr = String.fromCharCode(code);

    switch (code) {
      case 66: case 69: case 70: case 72: value = 3; break;
      case 68: case 71: value = 4; break;
      default: value = 2;
    }

    for (index = 0; index < 47; index++) {
      test.push({ k: chr + index, v: value });
    }
  }

  test.sort(function (a, b) { return b.v - a.v; });

  for (index = 0; index < test.length; index++) {
    chr = test[index].k.charAt(0);
    if (result.charAt(result.length - 1) !== chr) result += chr;
  }

  return result !== 'DGBEFHACIJK';
});

var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (y === undefined) return -1;
    if (x === undefined) return 1;
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    return toString(x) > toString(y) ? 1 : -1;
  };
};

// `Array.prototype.sort` method
// https://tc39.es/ecma262/#sec-array.prototype.sort
$({ target: 'Array', proto: true, forced: FORCED }, {
  sort: function sort(comparefn) {
    if (comparefn !== undefined) aCallable(comparefn);

    var array = toObject(this);

    if (STABLE_SORT) return comparefn === undefined ? un$Sort(array) : un$Sort(array, comparefn);

    var items = [];
    var arrayLength = lengthOfArrayLike(array);
    var itemsLength, index;

    for (index = 0; index < arrayLength; index++) {
      if (index in array) push(items, array[index]);
    }

    internalSort(items, getSortCompare(comparefn));

    itemsLength = items.length;
    index = 0;

    while (index < itemsLength) array[index] = items[index++];
    while (index < arrayLength) deletePropertyOrThrow(array, index++);

    return array;
  }
});

const getCommonTaxa = ({
  year,
  taxonId,
  placeId,
  perPage
}) => __awaiter(void 0, void 0, void 0, function* () {
  let url = `${BASE_API_URL}/v1/observations/species_counts?verifiable=true&spam=false&place_id=${placeId}&taxon_id=${taxonId}&locale=en-US&per_page=${perPage}`;

  if (year !== "all") {
    url += `&d1=${year}-01-01&d2=${year}-12-31`;
  }

  const response = yield fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  });
  const resp = yield response.json();
  const sortedTaxa = resp.results.sort((a, b) => {
    if (a.count > b.count) {
      return -1;
    } else if (a.count < b.count) {
      return 1;
    }

    return 0;
  });
  return {
    totalResults: resp.total_results,
    results: sortedTaxa.map(row => {
      var _a, _b;

      return {
        id: row.taxon.id,
        imageUrl: ((_b = (_a = row.taxon) === null || _a === void 0 ? void 0 : _a.default_photo) === null || _b === void 0 ? void 0 : _b.square_url) || "",
        obsCount: row.count,
        taxonName: row.taxon.name || "",
        taxonCommonName: row.taxon.preferred_common_name
      };
    })
  };
});

var commonTaxa = /*#__PURE__*/Object.freeze({
	__proto__: null,
	getCommonTaxa: getCommonTaxa
});

var call = functionCall;
var hasOwn = hasOwnProperty_1;
var isPrototypeOf = objectIsPrototypeOf;
var regExpFlags = regexpFlags$1;

var RegExpPrototype$1 = RegExp.prototype;

var regexpGetFlags = function (R) {
  var flags = R.flags;
  return flags === undefined && !('flags' in RegExpPrototype$1) && !hasOwn(R, 'flags') && isPrototypeOf(RegExpPrototype$1, R)
    ? call(regExpFlags, R) : flags;
};

var PROPER_FUNCTION_NAME = functionName.PROPER;
var defineBuiltIn = defineBuiltIn$7;
var anObject = anObject$e;
var $toString = toString$4;
var fails = fails$l;
var getRegExpFlags = regexpGetFlags;

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var n$ToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return n$ToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = PROPER_FUNCTION_NAME && n$ToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  defineBuiltIn(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var pattern = $toString(R.source);
    var flags = $toString(getRegExpFlags(R));
    return '/' + pattern + '/' + flags;
  }, { unsafe: true });
}

const numberWithCommas = x => (x || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

var numberUtils = /*#__PURE__*/Object.freeze({
	__proto__: null,
	numberWithCommas: numberWithCommas
});

const CommonTaxaLabel = data => jsxs("div", Object.assign({
  className: styles$4.obsLabel
}, {
  children: [jsx("h3", {
    children: data.taxonCommonName || data.taxonName
  }), jsx("label", Object.assign({
    className: styles$4.count
  }, {
    children: numberWithCommas(data.obsCount)
  }))]
}));
const CommonTaxa = ({
  year,
  source,
  taxonId,
  placeId,
  perPage: _perPage = PER_PAGE,
  data,
  dataUrl,
  components,
  className
}) => {
  const [taxa, setTaxa] = useState(() => source === DataSource.dataProp ? data : []);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (source !== DataSource.autoLoad) {
      return;
    }

    if (!taxonId) {
      console.error("Please supply a `taxonId` prop for the `autoLoad` source prop option.");
      return;
    }

    if (!placeId) {
      console.error("Please supply a `placeId` prop for the `autoLoad` source prop option.");
      return;
    }

    (() => __awaiter(void 0, void 0, void 0, function* () {
      setLoading(true);
      const resp = yield getCommonTaxa({
        taxonId,
        placeId,
        year,
        perPage: _perPage
      });
      setTaxa(resp.results);
      setLoading(false);
    }))();
  }, [source, year, placeId, taxonId, _perPage]);
  useEffect(() => {
    if (source !== DataSource.url) {
      return;
    }

    if (!dataUrl) {
      console.error("Please supply a `dataUrl` prop for the `url` source prop option.");
      return;
    }

    (() => __awaiter(void 0, void 0, void 0, function* () {
      setLoading(true);
      const obs = yield fetch(dataUrl);
      const json = yield obs.json();
      setTaxa(json.results);
      setLoading(false);
    }))();
  }, [source, dataUrl]);
  const Load = (components === null || components === void 0 ? void 0 : components.loader) ? components.loader : Loader;
  const Label = (components === null || components === void 0 ? void 0 : components.label) ? components.label : CommonTaxaLabel;
  let classes = styles$4.panel;

  if (className) {
    classes += ` ${className}`;
  } // TODO move base URL to constant (people may want inaturalist.ca etc.)


  return jsxs("div", Object.assign({
    className: classes
  }, {
    children: [jsx(Load, {
      loading: loading
    }), !loading && taxa.length === 0 && jsx(NoResults, {}), jsx("div", Object.assign({
      className: styles$4.grid
    }, {
      children: taxa.map(data => jsx(Observation, Object.assign({
        imageUrl: data.imageUrl.replace(/square/, "medium"),
        linkUrl: `https://www.inaturalist.org/taxa/${data.id}`
      }, {
        children: jsx(Label, Object.assign({}, data))
      }), data.id))
    }))]
  }));
};

const getFavourites = ({
  year,
  taxonId,
  placeId,
  perPage
}) => __awaiter(void 0, void 0, void 0, function* () {
  let url = `${BASE_API_URL}/v1/observations?verifiable=true&order_by=votes&order=desc&page=1&spam=false&place_id=${placeId}&taxon_id=${taxonId}&locale=en-US&per_page=${perPage}`;

  if (year !== "all") {
    url += `&d1=${year}-01-01&d2=${year}-12-31`;
  }

  const response = yield fetch(url, {// method: 'GET',
    // headers: {
    //     Accept: 'application/json'
    // }
  });
  const resp = yield response.json();
  const sortedTaxa = resp.results.filter(i => i.faves.length > 0).sort((a, b) => {
    if (a.faves.length > b.faves.length) {
      return -1;
    } else if (a.faves.length < b.faves.length) {
      return 1;
    }

    return 0;
  });
  return {
    totalResults: resp.total_results,
    results: sortedTaxa.map(row => {
      var _a, _b;

      return {
        id: row.id,
        imageUrl: ((_b = (_a = row.taxon) === null || _a === void 0 ? void 0 : _a.default_photo) === null || _b === void 0 ? void 0 : _b.square_url) || "",
        obsDate: row.observed_on_string,
        obsUrl: row.uri,
        taxonName: row.taxon.name || "",
        taxonCommonName: row.taxon.preferred_common_name,
        numFaves: row.faves.length
      };
    })
  };
});

var favourites = /*#__PURE__*/Object.freeze({
	__proto__: null,
	getFavourites: getFavourites
});

const FavouritesLabel = data => jsxs("div", Object.assign({
  className: styles$4.obsLabel
}, {
  children: [jsx("h3", {
    children: data.taxonCommonName || data.taxonName
  }), jsx("div", {
    children: data.observerUsername
  }), jsx("div", {
    children: formatDate(data.obsDate)
  }), jsx("label", Object.assign({
    className: styles$4.count
  }, {
    children: data.numFaves
  }))]
}));
const Favourites = ({
  year,
  source,
  taxonId,
  placeId,
  perPage: _perPage = PER_PAGE,
  data,
  dataUrl,
  components,
  className
}) => {
  const [observations, setObservations] = useState(() => source === DataSource.dataProp ? data : []);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (source !== DataSource.autoLoad) {
      return;
    }

    if (!taxonId) {
      console.error("Please supply a `taxonId` prop for the `autoLoad` source prop option.");
      return;
    }

    if (!placeId) {
      console.error("Please supply a `placeId` prop for the `autoLoad` source prop option.");
      return;
    }

    (() => __awaiter(void 0, void 0, void 0, function* () {
      setLoading(true);
      const resp = yield getFavourites({
        taxonId,
        placeId,
        year,
        perPage: _perPage
      });
      setObservations(resp.results);
      setLoading(false);
    }))();
  }, [source, year, placeId, taxonId, _perPage]);
  useEffect(() => {
    if (source !== DataSource.url) {
      return;
    }

    if (!dataUrl) {
      console.error("Please supply a `dataUrl` prop for the `url` source prop option.");
      return;
    }

    (() => __awaiter(void 0, void 0, void 0, function* () {
      setLoading(true);
      const obs = yield fetch(dataUrl);
      const json = yield obs.json();
      setObservations(json.results);
      setLoading(false);
    }))();
  }, [source, dataUrl]);
  const Load = (components === null || components === void 0 ? void 0 : components.loader) ? components.loader : Loader;
  const Label = (components === null || components === void 0 ? void 0 : components.label) ? components.label : FavouritesLabel;
  let classes = styles$4.panel;

  if (className) {
    classes += ` ${className}`;
  }

  return jsxs("div", Object.assign({
    className: classes
  }, {
    children: [jsx(Load, {
      loading: loading
    }), !loading && observations.length === 0 && jsx(NoResults, {}), jsx("div", Object.assign({
      className: styles$4.grid
    }, {
      children: observations.map(obs => jsx(Observation, Object.assign({
        imageUrl: obs.imageUrl.replace(/square/, "medium"),
        linkUrl: obs.obsUrl
      }, {
        children: jsx(Label, Object.assign({}, obs))
      }), obs.id))
    }))]
  }));
};

const getSummary = ({
  taxonId,
  placeId,
  year
}) => __awaiter(void 0, void 0, void 0, function* () {
  const observers = yield getObserverSummary(taxonId, placeId, year);
  const observations = yield getObservationSummary(taxonId, placeId, year);
  const seasonalityData = yield getSeasonalityData(taxonId, placeId, year);
  return {
    observers,
    observations,
    seasonalityData
  };
});
const getObserverSummary = (taxonId, placeId, year) => __awaiter(void 0, void 0, void 0, function* () {
  let url = `${BASE_API_URL}/v1/observations/observers?verifiable=true&order_by=votes&order=desc&page=1&spam=false&place_id=${placeId}&taxon_id=${taxonId}&locale=en-US&per_page=10`;

  if (year !== "all") {
    url += `&d1=${year}-01-01&d2=${year}-12-31`;
  }

  const response = yield fetch(url);
  const data = yield response.json();
  return {
    totalCount: data.total_results,
    top: data.results.map(result => ({
      id: result.user.id,
      userName: result.user.login,
      numObservations: result.observation_count,
      iconUrl: result.user.icon_url
    }))
  };
});
const getObservationSummary = (taxonId, placeId, year) => __awaiter(void 0, void 0, void 0, function* () {
  let url = `${BASE_API_URL}/v1/observations?photos=true&per_page=1&taxon_id=${taxonId}&place_id=${placeId}&order=desc&order_by=observed_on`;

  if (year !== "all") {
    url += `&d1=${year}-01-01&d2=${year}-12-31`;
  }

  const response = yield fetch(url);
  const data = yield response.json();
  return {
    totalCount: data.total_results
  };
});
const getSeasonalityData = (taxonId, placeId, year) => __awaiter(void 0, void 0, void 0, function* () {
  let url = `${BASE_API_URL}/v1/observations/histogram?verifiable=true&taxon_id=${taxonId}&place_id=${placeId}&locale=en-US&date_field=observed&interval=month_of_year`;

  if (year !== "all") {
    url += `&d1=${year}-01-01&d2=${year}-12-31`;
  }

  const response = yield fetch(url);
  const resp = yield response.json();
  return {
    monthOfYear: resp.results.month_of_year
  };
});

var summary = /*#__PURE__*/Object.freeze({
	__proto__: null,
	getSummary: getSummary,
	getObserverSummary: getObserverSummary,
	getObservationSummary: getObservationSummary,
	getSeasonalityData: getSeasonalityData
});

var styles$2 = {"summaryPage":"summary-module_summaryPage__1-4Ye","top":"summary-module_top__BakM2","avatar":"summary-module_avatar__Ur76J","noAvatar":"summary-module_noAvatar__VWvnR","countSummary":"summary-module_countSummary__R9wR0","seasonalityBlock":"summary-module_seasonalityBlock__ipzJt","observersBlock":"summary-module_observersBlock__iUemu"};

const ObserverList = ({
  observers
}) => jsx("ul", Object.assign({
  className: styles$2.top
}, {
  children: observers.map(obs => jsx("li", {
    children: jsxs("a", Object.assign({
      href: `${BASE_URL}/people/${obs.userName}`,
      target: "_blank",
      rel: "noreferrer"
    }, {
      children: [obs.iconUrl ? jsx("img", {
        src: obs.iconUrl || "",
        className: styles$2.avatar,
        alt: "User icon"
      }) : jsx("div", {
        className: styles$2.noAvatar
      }), jsx("h3", {
        children: obs.userName
      }), jsx("label", {
        children: numberWithCommas(obs.numObservations)
      })]
    }))
  }, obs.id))
}));

const SeasonalityGraph = blah => null; // export const SeasonalityGraph = ({ data }: any) => {
//     const primaryAxis = React.useMemo<
//         AxisOptions<typeof data[number]["data"][number]>
//         >(
//         () => ({
//             getValue: (datum: any) => datum.primary as any
//         }),
//         []
//     );
//
//     const secondaryAxes = React.useMemo<
//         AxisOptions<typeof data[number]["data"][number]>[]
//         >(
//         () => [
//             {
//                 getValue: (datum: any) => datum.secondary,
//                 elementType: "area"
//             }
//         ],
//         []
//     );
//
//     const formattedData = [
//         {
//             "label": "Observations",
//             "data": Object.keys(data).map((monthNum) => ({
//                 primary: format(new Date(2000, parseInt(monthNum, 10)-1, 1), 'MMMM'),
//                 secondary: data[monthNum]
//             }))
//         }
//     ];
//
//     return (
//         <Chart
//             options={{
//                 data: formattedData,
//                 primaryAxis,
//                 secondaryAxes
//             }}
//         />
//     );
// }

const Summary = ({
  source,
  data,
  dataUrl,
  taxonId,
  placeId,
  year
}) => {
  var _a, _b, _c;

  const [summaryData, setSummaryData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (source !== DataSource.autoLoad) {
      return;
    }

    if (!taxonId) {
      console.error("Please supply a `taxonId` prop for the `autoLoad` source prop option.");
      return;
    }

    if (!placeId) {
      console.error("Please supply a `placeId` prop for the `autoLoad` source prop option.");
      return;
    }

    (() => __awaiter(void 0, void 0, void 0, function* () {
      setLoading(true);
      const data = yield getSummary({
        taxonId,
        placeId,
        year
      });
      setSummaryData(data);
      setLoading(false);
    }))();
  }, [source, year, placeId, taxonId]);
  useEffect(() => {
    if (source !== DataSource.url) {
      return;
    }

    if (!dataUrl) {
      console.error("Please supply a `dataUrl` prop for the `url` source prop option.");
      return;
    }

    (() => __awaiter(void 0, void 0, void 0, function* () {
      setLoading(true);
      const obs = yield fetch(dataUrl);
      const json = yield obs.json();
      setSummaryData(json);
      setLoading(false);
    }))();
  }, [source, dataUrl]);
  return jsxs("div", Object.assign({
    className: styles$2.summaryPage
  }, {
    children: [jsx(Loader, {
      loading: loading
    }), jsxs("ul", Object.assign({
      className: styles$2.countSummary
    }, {
      children: [jsxs("li", {
        children: ["Total number of observers: ", jsx("b", {
          children: ((_a = summaryData.observers) === null || _a === void 0 ? void 0 : _a.totalCount) ? numberWithCommas(summaryData.observers.totalCount) : ""
        })]
      }), jsxs("li", {
        children: ["Total number of observations: ", jsx("b", {
          children: ((_b = summaryData.observations) === null || _b === void 0 ? void 0 : _b.totalCount) ? numberWithCommas(summaryData.observations.totalCount) : ""
        })]
      })]
    })), jsxs("section", {
      children: [jsxs("div", Object.assign({
        className: styles$2.seasonalityBlock
      }, {
        children: [jsx("h1", {
          children: "Seasonality"
        }), summaryData.seasonalityData && jsx(SeasonalityGraph, {
          data: summaryData.seasonalityData.monthOfYear
        })]
      })), jsxs("div", Object.assign({
        className: styles$2.observersBlock
      }, {
        children: [jsx("h1", {
          children: "Top observers"
        }), ((_c = summaryData.observers) === null || _c === void 0 ? void 0 : _c.top) && jsx(ObserverList, {
          observers: summaryData.observers.top
        })]
      }))]
    })]
  }));
};

var styles$1 = {"dropdown":"year-dropdown-module_dropdown__N0UHx"};

const Years = ({
  value,
  onChange,
  className
}) => {
  const [years] = useState(() => {
    const currentYear = getCurrentYear();
    const years = [];

    for (let i = currentYear; i >= currentYear - 10; i--) {
      years.push(i);
    }

    return years;
  });
  let classes = styles$1.dropdown;

  if (className) {
    classes += ` ${className}`;
  }

  return jsxs("select", Object.assign({
    className: classes,
    onChange: e => onChange(e.target.value),
    defaultValue: value
  }, {
    children: [jsx("option", Object.assign({
      value: "all"
    }, {
      children: "All years"
    })), years.map(year => jsx("option", Object.assign({
      value: year
    }, {
      children: year
    }), year))]
  }));
};

var styles = {};

const Tabs = ({
  selectedTab,
  onChangeTab
}) => {
  return jsx(Fragment, {
    children: jsxs("ul", Object.assign({
      className: styles.tabs
    }, {
      children: [jsx("li", Object.assign({
        onClick: () => onChangeTab(Tab.recent),
        className: selectedTab === Tab.recent ? styles.selected : ""
      }, {
        children: "Recent"
      })), jsx("li", Object.assign({
        onClick: () => onChangeTab(Tab.mostCommon),
        className: selectedTab === Tab.mostCommon ? styles.selected : ""
      }, {
        children: "Most Common"
      })), jsx("li", Object.assign({
        onClick: () => onChangeTab(Tab.favourites),
        className: selectedTab === Tab.favourites ? styles.selected : ""
      }, {
        children: "Favourites"
      })), jsx("li", Object.assign({
        onClick: () => onChangeTab(Tab.stats),
        className: selectedTab === Tab.stats ? styles.selected : ""
      }, {
        children: "Stats"
      }))]
    }))
  });
};

const TAXA = [{
  label: "Butterflies and moth",
  short: "leps",
  taxonId: 47157
}, {
  label: "Beetles",
  short: "beetles",
  taxonId: 47208
}, {
  label: "Birds",
  short: "birds",
  taxonId: 3
}];
const PLACES = [{
  label: "BC",
  short: "bc",
  placeId: 7085
}, {
  label: "Alberta",
  short: "alberta",
  placeId: 6834
}]; // TODO this ok?

const DEMO_BASE_URL = "http://localhost:7777"; // return the demo filename without the base URL

const getDemoFile = (api, taxonId, placeId, year) => {
  const taxonInfo = TAXA.find(i => i.taxonId === taxonId);
  const placeInfo = PLACES.find(i => i.placeId === placeId);
  const yearStr = year === "all" ? "allyears" : year;
  let filename = "";

  if (api === INatApi.recentObservations) {
    filename = `${taxonInfo.short}-${placeInfo.short}-recent.json`;
  } else if (api === INatApi.commonTaxa) {
    filename = `${taxonInfo.short}-${placeInfo.short}-${yearStr}-commonTaxa.json`;
  } else if (api === INatApi.favourites) {
    filename = `${taxonInfo.short}-${placeInfo.short}-${yearStr}-favourites.json`;
  } else if (api === INatApi.stats) {
    filename = `${taxonInfo.short}-${placeInfo.short}-${yearStr}-stats.json`;
  }

  return filename;
};
const getDemoFileUrl = (api, taxonId, placeId, year) => `${DEMO_BASE_URL}/${getDemoFile(api, taxonId, placeId, year)}`;

const TaxonPanel = () => {
  const [tab, setTab] = useState(Tab.recent);
  const [year, setYear] = useState("all");
  const [taxonId, setTaxonId] = useState(DEFAULT_TAXON_ID);
  const [placeId, setPlaceId] = useState(DEFAULT_PLACE_ID);
  const [dataSource, setDataSource] = useState(DataSource.autoLoad);

  const getTitle = () => {
    const map = {
      [Tab.recent]: "Recent observations",
      [Tab.mostCommon]: "Most common",
      [Tab.favourites]: "Most favourited",
      [Tab.stats]: "General stats"
    };
    return map[tab];
  };

  const getCurrentTab = () => {
    switch (tab) {
      case Tab.recent:
        {
          const props = {
            source: dataSource
          };

          if (dataSource === DataSource.url) {
            props.dataUrl = getDemoFileUrl(INatApi.recentObservations, taxonId, placeId);
          } else {
            props.placeId = placeId;
            props.taxonId = taxonId;
          }

          return jsx(RecentObservations, Object.assign({}, props));
        }

      case Tab.mostCommon:
        {
          const props = {
            source: dataSource,
            year
          };

          if (dataSource === DataSource.url) {
            props.dataUrl = getDemoFileUrl(INatApi.commonTaxa, taxonId, placeId, year);
          } else {
            props.placeId = placeId;
            props.taxonId = taxonId;
          }

          return jsx(CommonTaxa, Object.assign({}, props));
        }

      case Tab.favourites:
        {
          const props = {
            source: dataSource,
            year
          };

          if (dataSource === DataSource.url) {
            props.dataUrl = getDemoFileUrl(INatApi.favourites, taxonId, placeId, year);
          } else {
            props.placeId = placeId;
            props.taxonId = taxonId;
          }

          return jsx(Favourites, Object.assign({}, props));
        }

      case Tab.stats:
        {
          const props = {
            source: dataSource,
            year
          };

          if (dataSource === DataSource.url) {
            props.dataUrl = getDemoFileUrl(INatApi.stats, taxonId, placeId, year);
          } else {
            props.placeId = placeId;
            props.taxonId = taxonId;
          }

          return jsx(Summary, Object.assign({}, props));
        }
    }
  };
  /*
      <SettingsRow
          taxonId={taxonId}
          onChangeTaxon={setTaxonId}
          placeId={placeId}
          onChangePlace={setPlaceId}
          dataSource={dataSource}
          onChangeDataSource={setDataSource}
      />
   */


  return jsxs("div", Object.assign({
    className: styles$4.page
  }, {
    children: [jsx(Tabs, {
      selectedTab: tab,
      onChangeTab: setTab
    }), jsxs("div", {
      children: [tab !== Tab.recent && jsx("div", Object.assign({
        style: {
          float: "right"
        }
      }, {
        children: jsx(Years, {
          value: year,
          onChange: setYear
        })
      })), jsx("h1", {
        children: getTitle()
      })]
    }), getCurrentTab()]
  }));
};

var index = /*#__PURE__*/Object.freeze({
	__proto__: null,
	commonTaxa: commonTaxa,
	favourites: favourites,
	recentObservations: recentObservations,
	summary: summary
});

export { CommonTaxa, CommonTaxaLabel, DataSource, Favourites, FavouritesLabel, INatApi, Observation, RecentObservationLabel, RecentObservations, SeasonalityGraph, Summary, Tab, index as api, dateUtils, TaxonPanel as default, numberUtils };
