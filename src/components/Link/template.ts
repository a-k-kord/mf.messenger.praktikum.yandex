export default `
<% if(it.props.wrapperStyles) { %>
<div class="<%= it.props.wrapperStyles %>">
<% } %>
<a class="<%= it.props.stylesBefore ? it.props.stylesBefore : '' %> 
<%-= 'link' %> 
<%-= it.props.hasText ? 'text' : 'box box--all-parent-space' %> 
<%-= it.props.size ? 'text--size--' + it.props.size : '' %> 
<%-= it.props.theme ? 'text--theme--' + it.props.theme : '' %>  
<%-= it.props.weight ? 'text--weight--' + it.props.weight : '' %>  
<%-= it.props.align ? 'text--align--' + it.props.align : '' %>  
<%-= it.props.stylesAfter ? it.props.stylesAfter : '' %>" 
href="<%= it.props.linkTo %>"
<%-= it.props.attrs ? it.props.attrs : '' %>
>
<%= it.props.text ? it.props.text : '' %>

<% if(it.props.image) { %>
<%-~ it.props.image %>
<% } %>
</a>
<% if(it.props.wrapperStyles) { %>
</div>
<% } %>
`