var __assign =
	(this && this.__assign) ||
	function () {
		__assign =
			Object.assign ||
			function (t) {
				for (var s, i = 1, n = arguments.length; i < n; i++) {
					s = arguments[i];
					for (var p in s)
						if (Object.prototype.hasOwnProperty.call(s, p))
							t[p] = s[p];
				}
				return t;
			};
		return __assign.apply(this, arguments);
	};
var __rest =
	(this && this.__rest) ||
	function (s, e) {
		var t = {};
		for (var p in s)
			if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
				t[p] = s[p];
		if (s != null && typeof Object.getOwnPropertySymbols === "function")
			for (
				var i = 0, p = Object.getOwnPropertySymbols(s);
				i < p.length;
				i++
			) {
				if (
					e.indexOf(p[i]) < 0 &&
					Object.prototype.propertyIsEnumerable.call(s, p[i])
				)
					t[p[i]] = s[p[i]];
			}
		return t;
	};
import React, { useMemo, useContext } from "react";
import { ScrollContext } from "./context";
var Section = function (_a) {
	var id = _a.id,
		children = _a.children,
		meta = _a.meta,
		rest = __rest(_a, ["id", "children", "meta"]);
	var registerRef = useContext(ScrollContext).registerRef;
	var ref = useMemo(
		function () {
			return registerRef({ id: id, meta: meta });
		},
		[id]
	);
	return React.createElement(
		"section",
		__assign({}, rest, { ref: ref, id: id }),
		children
	);
};
export default Section;
//# sourceMappingURL=Section.js.map
