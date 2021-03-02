declare const _default: "\n<% if(it.props.wrapperStyles) { %>\n<div class=\"<%= it.props.wrapperStyles %>\">\n<% } %>\n<input class=\"<%= it.props.stylesBefore ? it.props.stylesBefore : '' %> \n<%-= it.props.hasText ? 'text' : '' %> \n<%-= it.props.size ? 'text--size--' + it.props.size : '' %> \n<%-= it.props.theme ? 'text--theme--' + it.props.theme : '' %>  \n<%-= it.props.weight ? 'text--weight--' + it.props.weight : '' %>  \n<%-= it.props.align ? 'text--align--' + it.props.align : '' %>  \n<%-= it.props.stylesAfter ? it.props.stylesAfter : '' %> \"\ntype=\"<%= it.props.type ? it.props.type : 'text' %>\"\n\n<% if(it.props.id) { %> \nid=\"<%= it.props.id %>\" \n<% } %>\n \n<% if(it.props.name) { %>\nname=\"<%= it.props.name %>\" \n<% } %>\n \n<% if(it.props.text) { %>\nvalue=\"<%= it.props.text %>\" \n<% } %>\n\n<% if(it.props.accept) { %>\naccept=\"<%= it.props.accept %>\" \n<% } %>\n\n<% if(it.props.placeholder) { %>\nplaceholder=\"<%= it.props.placeholder %>\" \n<% } %> \n<%-= it.props.isReadonly? 'readonly' : '' %> \n<%-= it.props.attrs ? it.props.attrs : '' %>\n>\n\n<% if(it.slots.label) { %>\n    <%~ it.slots.label.outerHTML %>\n<% } %>\n\n\n<% if(it.slots.error) { %>\n    <%~ it.slots.error.outerHTML %>\n<% } %>\n\n<% if(it.props.iconStyles) { %>\n<i class=\"<%= it.props.iconStyles %>\"></i>\n<% } %>\n<% if(it.props.wrapperStyles) { %>\n</div>\n<% } %>\n";
export default _default;
