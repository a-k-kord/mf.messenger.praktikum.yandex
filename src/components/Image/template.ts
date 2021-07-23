// eslint-disable-next-line import/no-default-export
export default `
<img   
class="<%= it.props?.stylesBefore ? it.props?.stylesBefore : '' %> 
<%-= 'image' %> 
<%-= it.props?.stylesAfter ? it.props?.stylesAfter : '' %>" 
<%-= it.props?.attrs ? it.props?.attrs : '' %>

<% if(it.props?.src) { %>
src="<%= it.props?.src %>" 
<% } %>

<% if(it.props?.alt) { %>
alt="<%= it.props?.alt %>" 
<% } %>
>
`;
