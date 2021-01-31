export default `
<% if(it.props.wrapperStyles) { %>
<div class="<%= it.props.wrapperStyles %>">
<% } %>
<input class="<%= it.props.stylesBefore ? it.props.stylesBefore : '' %> 
<%-= it.props.hasText ? 'text' : '' %> 
<%-= it.props.size ? 'text--size--' + it.props.size : '' %> 
<%-= it.props.theme ? 'text--theme--' + it.props.theme : '' %>  
<%-= it.props.weight ? 'text--weight--' + it.props.weight : '' %>  
<%-= it.props.align ? 'text--align--' + it.props.align : '' %>  
<%-= it.props.stylesAfter ? it.props.stylesAfter : '' %> "
type="<%= it.props.type ? it.props.type : 'text' %>"

<% if(it.props.id) { %> 
id="<%= it.props.id %>" 
<% } %>
 
<% if(it.props.name) { %>
name="<%= it.props.name %>" 
<% } %>
 
<% if(it.props.text) { %>
value="<%= it.props.text %>" 
<% } %>

<% if(it.props.placeholder) { %>
placeholder="<%= it.props.placeholder %>" 
<% } %> 
<%-= it.props.isReadonly? 'readonly' : '' %> 
<%-= it.props.attrs ? it.props.attrs : '' %>
>

<% if(it.slots.label) { %>
    <%~ it.slots.label.outerHTML %>
<% } %>


<% if(it.slots.error) { %>
    <%~ it.slots.error.outerHTML %>
<% } %>

<% if(it.props.iconStyles) { %>
<i class="<%= it.props.iconStyles %>"></i>
<% } %>
<% if(it.props.wrapperStyles) { %>
</div>
<% } %>
`

//TODO сделать label и error вложенными компонентами.
//
