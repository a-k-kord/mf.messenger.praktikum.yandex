export default "\n<<%= it.props?.tagName ? it.props?.tagName : 'div' %>   \nclass=\"<%= it.props?.stylesBefore ? it.props?.stylesBefore : '' %> \n<%-= 'text' %> \n<%-= it.props?.size ? 'text--size--' + it.props?.size : '' %> \n<%-= it.props?.theme ? 'text--theme--' + it.props?.theme : '' %> \n<%-= it.props?.weight ? 'text--weight--' + it.props?.weight : '' %> \n<%-= it.props?.align ? 'text--align--' + it.props?.align : '' %> \n<%-= it.props?.stylesAfter ? it.props?.stylesAfter : '' %>\" \n<%-= it.props?.attrs ? it.props?.attrs : '' %>\n>\n<%= it.props?.text %>\n</<%= it.props?.tagName ? it.props?.tagName : 'div' %>>\n";
