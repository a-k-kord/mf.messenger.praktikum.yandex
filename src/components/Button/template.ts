export default `
<% if(it.props.wrapperStyles) { %>
<div class="<%= it.props.wrapperStyles %>">
<% } %>
<button class="<%= it.props.stylesBefore ? it.props.stylesBefore : '' %> 
<%-= 'button' %> 
<%-= it.props.hasText ? 'button__text text' : '' %> 
<%-= it.props.size ? 'text--size--' + it.props.size : '' %> 
<%-= it.props.theme ? 'text--theme--' + it.props.theme : '' %>  
<%-= it.props.weight ? 'text--weight--' + it.props.weight : '' %>  
<%-= it.props.align ? 'text--align--' + it.props.align : '' %>  
<%-= it.props.stylesAfter ? it.props.stylesAfter : '' %>" 

<% if(it.props.type) { %>
type="<%= it.props.type %>"
<% } %>

<% if(it.props.formMethod) { %>
formmethod="<%= it.props.formMethod %>"
<% } %>

<%-= it.props.attrs ? it.props.attrs : '' %>
>
<%= it.props.text ? it.props.text : '' %>

<% if(it.props.image) { %>
<%-~ it.props.image %>
<% } %>
</button>
<% if(it.props.wrapperStyles) { %>
</div>
<% } %>
`
