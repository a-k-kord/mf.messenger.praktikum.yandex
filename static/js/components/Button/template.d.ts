declare const _default: "\n<% if(it.props?.wrapperStyles) { %>\n<div class=\"<%= it.props?.wrapperStyles %>\">\n<% } %>\n<button class=\"<%= it.props?.stylesBefore ? it.props?.stylesBefore : '' %> \n<%-= 'button' %> \n<%-= it.props?.hasText ? 'button__text text' : '' %> \n<%-= it.props?.size ? 'text--size--' + it.props?.size : '' %> \n<%-= it.props?.theme ? 'text--theme--' + it.props?.theme : '' %>  \n<%-= it.props?.weight ? 'text--weight--' + it.props?.weight : '' %>  \n<%-= it.props?.align ? 'text--align--' + it.props?.align : '' %>  \n<%-= it.props?.stylesAfter ? it.props?.stylesAfter : '' %>\" \n\n<% if(it.props?.type) { %>\ntype=\"<%= it.props?.type %>\"\n<% } %>\n\n<% if(it.props?.formMethod) { %>\n\n<% } %>\n<%-= it.props?.isDisabled? 'disabled' : '' %> \n<%-= it.props?.attrs ? it.props?.attrs : '' %>\n>\n<%= it.props?.text ? it.props?.text : '' %>\n\n<% if(it.props?.image) { %>\n<%-~ it.props?.image %>\n<% } %>\n</button>\n<% if(it.props?.wrapperStyles) { %>\n</div>\n<% } %>\n";
export default _default;
