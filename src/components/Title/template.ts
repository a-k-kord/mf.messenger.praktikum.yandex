// props: tagName, size, theme, weight, align, stylesBefore, stylesAfter
export default `
<<%= it.props.tagName ? it.props.tagName : 'div' %>   
class="<%= it.props.stylesBefore ? it.props.stylesBefore : '' %> 
<%-= 'text' %> 
<%-= it.props.size ? 'text--size--' + it.props.size : '' %> 
<%-= it.props.theme ? 'text--theme--' + it.props.theme : '' %> 
<%-= it.props.weight ? 'text--weight--' + it.props.weight : '' %> 
<%-= it.props.align ? 'text--align--' + it.props.align : '' %> 
<%-= it.props.stylesAfter ? it.props.stylesAfter : '' %>" 
<%-= it.props.attrs ? it.props.attrs : '' %>
>
<%= it.props.text %>
</<%= it.props.tagName ? it.props.tagName : 'div' %>>
`