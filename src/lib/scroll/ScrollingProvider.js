import React, { useEffect, useMemo, useState } from "react";
import { debounce } from "./utils";
import { Provider } from "./context";
import smoothscroll from "smoothscroll-polyfill";
var REFS = {};
var META = {};
if (typeof window !== "undefined") {
	smoothscroll.polyfill();
}
var ScrollingProvider = function (_a) {
	var _b = _a.debounceDelay,
		debounceDelay = _b === void 0 ? 50 : _b,
		_c = _a.scrollBehavior,
		scrollBehavior = _c === void 0 ? "smooth" : _c,
		_d = _a.offset,
		offset = _d === void 0 ? 0 : _d,
		children = _a.children;
	var _e = useState(""),
		selected = _e[0],
		setSelected = _e[1];
	useEffect(function () {
		document.addEventListener("scroll", debounceScroll, true);
		handleScroll();
		return function () {
			document.removeEventListener("scroll", debounceScroll, true);
		};
	}, []);
	var handleScroll = function () {
		var selectedSection = Object.keys(REFS).reduce(
			function (acc, id) {
				var top = REFS[id].current.getBoundingClientRect().top;
				var differenceFromTop = Math.abs(top);
				if (differenceFromTop >= acc.differenceFromTop) return acc;
				return {
					differenceFromTop: differenceFromTop,
					id: id,
				};
			},
			{
				differenceFromTop: 9999,
				id: "",
			}
		);
		if (selected !== selectedSection.id) setSelected(selectedSection.id);
	};
	var debounceScroll = debounce(handleScroll, debounceDelay);
	var registerRef = function (_a) {
		var id = _a.id,
			meta = _a.meta;
		var ref = React.createRef();
		REFS[id] = ref;
		META[id] = meta;
		return ref;
	};
	var scrollTo = function (section) {
		var sectionRef = REFS[section];
		if (!sectionRef) return console.warn("Section ID not recognized!"); // eslint-disable-line
		var top = sectionRef.current.offsetTop + offset;
		setSelected(section);
		window.scrollTo({
			top: top,
			behavior: scrollBehavior,
		});
	};
	var value = useMemo(
		function () {
			return {
				registerRef: registerRef,
				scrollTo: scrollTo,
				refs: REFS,
				meta: META,
				selected: selected,
			};
		},
		[selected, REFS]
	);
	return React.createElement(Provider, { value: value }, children);
};
export default ScrollingProvider;
//# sourceMappingURL=ScrollingProvider.js.map
