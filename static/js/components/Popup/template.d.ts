declare const _default: "\n<img   \nclass=\"<%= it.props.stylesBefore ? it.props.stylesBefore : '' %> \n<%-= 'image' %> \n<%-= it.props.stylesAfter ? it.props.stylesAfter : '' %>\" \n<%-= it.props.attrs ? it.props.attrs : '' %>\n\n<% if(it.props.src) { %>\nsrc=\"<%= it.props.src %>\" \n<% } %>\n\n<% if(it.props.alt) { %>\nalt=\"<%= it.props.alt %>\" \n<% } %>\n>\n";
export default _default;
