import React from "react";
var DEFAULT_CONTEXT = {
	selected: "",
	refs: {},
	meta: {},
	scrollTo: function () {},
	registerRef: function () {
		return null;
	},
};
export var ScrollContext = React.createContext(DEFAULT_CONTEXT);
export var Consumer = ScrollContext.Consumer,
	Provider = ScrollContext.Provider;
//# sourceMappingURL=context.js.map
