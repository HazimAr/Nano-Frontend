/* eslint-disable @typescript-eslint/no-explicit-any */
export var debounce = function (func, waitFor) {
	var timeout = null;
	var debounced = function () {
		var args = [];
		for (var _i = 0; _i < arguments.length; _i++) {
			args[_i] = arguments[_i];
		}
		if (timeout !== null) {
			clearTimeout(timeout);
			timeout = null;
		}
		timeout = setTimeout(function () {
			return func.apply(void 0, args);
		}, waitFor);
	};
	return debounced;
};
//# sourceMappingURL=utils.js.map
