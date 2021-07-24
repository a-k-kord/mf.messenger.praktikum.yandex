export default "\n<% if(it.props?.wrapperStyles) { %>\n<div class=\"<%= it.props?.wrapperStyles %>\">\n<% } %>\n<a class=\"<%= it.props?.stylesBefore ? it.props?.stylesBefore : '' %> \n<%-= 'link' %> \n<%-= it.props?.hasText ? 'text' : 'box box--all-parent-space' %> \n<%-= it.props?.size ? 'text--size--' + it.props?.size : '' %> \n<%-= it.props?.theme ? 'text--theme--' + it.props?.theme : '' %>  \n<%-= it.props?.weight ? 'text--weight--' + it.props?.weight : '' %>  \n<%-= it.props?.align ? 'text--align--' + it.props?.align : '' %>  \n<%-= it.props?.stylesAfter ? it.props?.stylesAfter : '' %>\" \nhref=\"<%= it.props?.linkTo %>\"\n<%-= it.props?.attrs ? it.props?.attrs : '' %>\n>\n<%= it.props?.text ? it.props?.text : '' %>\n\n<% if(it.props?.image) { %>\n<%-~ it.props?.image %>\n<% } %>\n</a>\n<% if(it.props?.wrapperStyles) { %>\n</div>\n<% } %>\n";