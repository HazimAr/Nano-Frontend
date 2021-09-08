import { useContext } from "react";
import { ScrollContext } from "./context";
export var useScrollSection = function (id) {
	var _a = useContext(ScrollContext),
		scrollTo = _a.scrollTo,
		selectedSection = _a.selected;
	var onClick = function () {
		return scrollTo(id);
	};
	var selected = selectedSection === id;
	return { onClick: onClick, selected: selected };
};
export var useScrollSections = function () {
	var _a = useContext(ScrollContext),
		scrollTo = _a.scrollTo,
		selectedSection = _a.selected,
		refs = _a.refs,
		meta = _a.meta;
	var sections = Object.keys(refs).map(function (id) {
		return {
			id: id,
			meta: meta[id],
			onClick: function () {
				return scrollTo(id);
			},
			selected: selectedSection === id,
		};
	});
	return sections;
};
//# sourceMappingURL=useScrollSection.js.map
